from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from .Utility.ssl_issue_solution import no_ssl_verification
import os
from langchain.document_loaders import PDFMinerLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from django.conf import settings
import io
import pdfminer.high_level
from pdfminer.layout import LTTextBoxHorizontal
from unidecode import unidecode
import copy
from langchain.docstore.document import Document
from openai.error import RateLimitError, OpenAIError
import time
from dotenv import load_dotenv

load_dotenv()



def process_pdf_to_txt(input_file):
    try:
        with io.BytesIO(input_file.read()) as file:
            combined_data = ""
            char_count = 0
            for page_number, page in enumerate(pdfminer.high_level.extract_pages(file)):
                text_page = ""
                table_data = []

                for element in page:
                    if isinstance(element, LTTextBoxHorizontal):
                        text = element.get_text().strip()
                        if text:
                            text_page += text + '\n'

                            # Check if the text might represent a table (simple check based on whitespace)
                            # if ' ' in text:
                            #     table_data.append(text.split())

                if text_page:
                    combined_data += f"newpage Page {page_number + 1}:\n{text_page}\n\n"
                    char_count += len(text_page)

                if char_count > 60000:
                    return "Max character exceeded"

                # if table_data:
                #     combined_data += f"Table Data:\n{str(table_data)}\n\n"

            ascii_converted_text = unidecode(combined_data)
            # Lowercase the text
            text_data = ascii_converted_text.lower()
            return text_data

    except Exception as err:
        print(f"Error occurred: {str(err)}")


# process the pdf file to break it into chunks of data for further processing
def process_file(file, indexpath):
    print(file)
    with open(file, "rb") as f_obj:
        text_data = process_pdf_to_txt(f_obj)
        if text_data == "Max character exceeded":
            return "Max character exceeded"
    pages = text_data.split('newpage ')
    if len(pages) > 0:
        pages = copy.deepcopy(pages[1:])
    output_data = []
    # char_count = 0
    for count, page in enumerate(pages):
        document = {
            'page_content': page.strip(),
            'metadata': {
                'source': file,
                'page': count + 1
            }
        }
        # char_count += len(document["page_content"])
        output_data.append(document)
    # if char_count > 60000:
    #     return "Max character exceeded"
    docs = []
    for indexes in output_data:
        page_content = indexes['page_content']
        metadata = indexes['metadata']
        document_source = metadata['source']
        page_no = metadata['page']

        metadata = dict(source=document_source, page=page_no)
        docs.append(Document(page_content=page_content, metadata=metadata))

    # loader = PDFMinerLoader(file)
    # text_splitter = RecursiveCharacterTextSplitter(
    #     chunk_size=8000,
    #     chunk_overlap=400,
    #     length_function=len,
    #     add_start_index=True
    # )
    # documents = loader.load_and_split(text_splitter)
    # chunks = documents
    with no_ssl_verification():
        embeddings = OpenAIEmbeddings(deployment='text-embedding-ada-002',
                                        model="davinci",
                                        openai_api_type = "azure",
                                        openai_api_key="56dc6d2fdf8c48debea0493b8db17bfa",
                                        openai_api_version= "2022-12-01",
                                        openai_api_base="https://dattaraj-openai-demo.openai.azure.com/"
                                      )
        pdfsearch = FAISS.from_texts([""], embeddings)
        max_retries = 3
        retry_delay = 60  # seconds
        print("Length of chunks %s" % len(pages))
        for chunk in docs:
            for _ in range(max_retries):
                try:
                    pdfsearch.merge_from(FAISS.from_documents([chunk], embeddings))
                    break
                except RateLimitError as e:
                    print("Retrying after Ratelimit error - %s" % e)
                    time.sleep(retry_delay)
                except OpenAIError as err:
                    print("Failed to add documents in vector store %s" % err)
        pdfsearch.save_local(indexpath)
        if os.path.exists(file):
            os.remove(file)
            print("PDF file deleted successfully!")
        else:
            print("PDF file does not exist.")
        return pdfsearch
