import copy
import json
import time
import urllib.parse

import openai
import os
import requests

from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain.evaluation import load_evaluator
from langchain.prompts import PromptTemplate
from langchain.chat_models import AzureChatOpenAI
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import AzureSearch
from langchain.chains import RetrievalQA, LLMChain
from langchain.vectorstores import FAISS
from datetime import datetime, timedelta
from openai.error import RateLimitError
from .Utility.ssl_issue_solution import no_ssl_verification
from langchain.schema.vectorstore import VectorStoreRetriever
from django.conf import settings
from langchain import PromptTemplate
import copy
import json
import time
import urllib.parse
 
import openai
import os
from langchain.chat_models import AzureChatOpenAI
from langchain.embeddings import OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain.vectorstores import AzureSearch
from django.conf import settings
 
def get_model_response(data,phone_no):
    try:
 
        # Initialize AzureChatOpenAI model
        llm = AzureChatOpenAI(deployment='text-embedding-ada-002',
                            model="davinci",
                            openai_api_type = "azure",
                            openai_api_key="56dc6d2fdf8c48debea0493b8db17bfa",
                            openai_api_base="https://dattaraj-openai-demo.openai.azure.com/",
                            temperature=0,
                            streaming=True,
                            deployment_name="davinci",
                            open_api_version="2022-12-01"
                            )
 
        # Initialize OpenAIEmbeddings
        # embeddings = OpenAIEmbeddings(deployment_id='text-embedding-ada-002', chunk_size=1, openai_api_type = "azure",
        #                     openai_api_key="56dc6d2fdf8c48debea0493b8db17bfa",
        #                     openai_api_base="https://dattaraj-openai-demo.openai.azure.com/")
 
        # Set up RetrievalQA model
        embeddings = OpenAIEmbeddings(deployment_id='text-embedding-ada-002', chunk_size=1, openai_api_type = "azure",
                            openai_api_key="56dc6d2fdf8c48debea0493b8db17bfa",
                            openai_api_base="https://dattaraj-openai-demo.openai.azure.com/",open_api_version="2022-12-01")   
        user_index_path = os.path.join('tmp', str(phone_no))    
     
       
       
              
        qa_chain = RetrievalQA.from_chain_type(llm,
                                               retriever=FAISS.load_local(folder_path=user_index_path,embeddings=embeddings).as_retriever(),
                                               chain_type="stuff",            
                                               return_source_documents=True, 
                                                
                                               )
        # retriever = VectorStoreRetriever(vectorstore=FAISS(...))
        # qa_chain = RetrievalQA.from_chain_type(
        #     llm,
        #     retriever=retriever,  # Assuming AzureSearch is used for retriever
        #     chain_type="stuff",
        #     return_source_documents=True,
        #     chain_type_kwargs={"verbose": True},
        # )
 
        # Execute model with user query
        print(data)
        result = qa_chain.invoke(data)
 
        # Process the model response and extract relevant information
        responses = [doc.page_content for doc in result.get("source_documents")]
        response_data = {
            "response": result.get("result"),
            "source_responses": responses
        }
 
        return response_data
 
    except Exception as err:
        print(err)
        return None