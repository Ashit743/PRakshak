import http
import os
import base64
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .fileRendering import *
from .service import *

@api_view(["POST"])
@csrf_exempt
def upload_file(request):
    try:
        uploaded_file = request.FILES.get('file')
        # pdf_data = request.body
        phone_no = request.data.get("phone_no")
        print(phone_no)
        if not phone_no:
            return Response({'message': 'User information not found'}, status=status.HTTP_404_NOT_FOUND)
    except KeyError:
        return Response(status=http.HTTPStatus.BAD_REQUEST)

    os.makedirs('tmp', exist_ok=True)
    # with open(os.path.join(os.path.abspath(os.path.dirname(__file__)), os.path.join('test_pdf', pdf_name)),'wb') as f:
    filename = str(phone_no).replace('-', '')
    pdffilename = filename + ".pdf"
    pdf_path = os.path.join('tmp', pdffilename)
    index_path = os.path.join('tmp', filename)
    try:
        # with open(pdf_path, 'wb')as f:
        #     f.write(base64.b64decode(pdf_data))
        with open(pdf_path, "wb+") as f:
            for chunk in uploaded_file.chunks():
                f.write(chunk)

    # Creating index using pdf and removing the pdf file
        process_response = process_file(pdf_path, index_path)
        if process_response == "Max character exceeded":
            return Response({'message': 'Try uploading the PDF having less than 60k characters'}, status=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE)
    # pdf_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'test_pdf1', pdf_name)

    # try:
    #     with open(pdf_path, 'wb') as f:
    #         f.write(base64.b64decode(pdf_data))
    #         print('File saved successfully!')
    # except FileNotFoundError:
    #     print(f'message: No such file or directory: {pdf_path}')
    # except PermissionError:
    #     print(f'message: Permission denied to write to {pdf_path}')

        return Response({'message': 'PDF saved successfully!'})

    except FileNotFoundError:
        print(f'message: No such file or directory: {pdf_path}')
    except PermissionError:
        print(f'message: Permission denied to write to {pdf_path}')


@api_view(['POST'])
@csrf_exempt
def process_query(request):
    query = request.data['query']
    phone_no=request.data['phone_no']
    print(query)
    response = get_model_response(query,phone_no)
    if response:
        # return JsonResponse({'query':query, 'response': response})
        if "fail" in response and response.get("fail_type") == "ratelimit":
            return JsonResponse({'response': "Ratelimit for Token exhausted. Please try again after sometime"}, status=status.HTTP_429_TOO_MANY_REQUESTS)
        return JsonResponse(response)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)