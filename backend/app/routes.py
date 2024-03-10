from flask import Flask,request,jsonify,json,session,redirect
import pymysql
from db import connection
from twilio.rest import Client
import urllib.request;
from dotenv import load_dotenv
from app import app
from flask_cors import CORS

from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.chat_models import ChatOpenAI
import json
from flask import jsonify, request



import os




load_dotenv()
account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
client = Client(account_sid, auth_token)

semicolons_gateway_api_key = os.environ['OPEN_API_KEY'] # Insert the provided API key
semicolons_gateway_base_url = "https://4veynppxjm.us-east-1.awsapprunner.com"
model = "gpt-35-turbo-16k"

llm_resto = ChatOpenAI(
    model_name=model,
    temperature=0.1,
    openai_api_base=semicolons_gateway_base_url, # openai_api_base represents the endpoint the Langchain object will make a call to when invoked
    openai_api_key=semicolons_gateway_api_key,
)

prompt_template_resto = PromptTemplate(
    input_variables=['age', 'gender', 'weight', 'height', 'veg_or_nonveg', 'disease', 'region', 'allergics', 'foodtype'],
    template="Diet Recommendation System:\n"
             "I want you to recommend 6 breakfast names, 6 lunch names, 6 dinner names in json format, "
             "breakfast as 1st key, lunch as 2nd key, dinner as 3rd key"
             "each value will food item as key and it's description as value"
             "while creating json dont add json just plane output"
             "based on the following criteria:\n"
             "take care of his medical condition as importance:\n"
             "syntactically correct json"
             "Person age: {age}\n"
             "Person gender: {gender}\n"
             "Person weight: {weight}\n"
             "Person height: {height}\n"
             "Person veg_or_nonveg: {veg_or_nonveg}\n"
             "Person generic disease: {disease}\n"
             "Person region: {region}\n"
             "Person allergics: {allergics}\n"
             "Person foodtype: {foodtype}."

)


input_mock_data = {             'age': 23,
                                'gender': "male",
                                'weight': 75,
                                'height': 5.9,
                                'veg_or_nonveg': "veg",
                                'disease': "diabetic",
                                'region': "India",
                                'allergics': "peanuts",
                                'foodtype': 'Indian meals'
                    }


def getData(inputData) :
    try:
        chain_resto = LLMChain(llm=llm_resto, prompt=prompt_template_resto)
        results = chain_resto.run(inputData)
        results = json.loads(results)
        return results
    except Exception:
        pass



# Create Flask app
# app = Flask(__name__)
CORS(app)
@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/about')
def about():
    return 'This is a simple Flask application.'


@app.route('/sendotp',methods=["post"])
def sendotp():
    data = json.loads(request.data)
    try:
        phonenumber=data.get("number")
        service_id=os.environ['TWILIO_SERVICE_ID']
        verification = client.verify.v2.services(service_id).verifications.create(to="+91"+phonenumber, channel='sms')
        return create_api_response("Success",data=verification.status)
    except Exception as e:
        job_status = "Failure"
        error_message = str(e)
        return create_api_response(job_status,error=error_message)

@app.route('/verifyotp',methods=["post"])
def verifyotp():
    data = json.loads(request.data)
    try:
        phonenumber=data.get("number")
        otp=data.get("otp")
        service_id=os.environ['TWILIO_SERVICE_ID']
        verification_check = client.verify.v2.services(service_id).verification_checks.create(to="+91"+phonenumber, code=otp)
        session["mobile"]=data.get("number")
        return create_api_response("Success",data=verification_check.status)
    except Exception as e:
        job_status = "Failure"
        error_message = str(e)
        return create_api_response(job_status,error=error_message)
    
@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session["mobile"] = None
    return create_api_response("Failure", error="Not Authenticated")
    

@app.route('/api/patientData', methods=['POST'])
def get_patientdata():
    #check if the users exist or not
    # if not session.get("phone"):
    #     # if not there in the session then redirect to the login page
    #     return create_api_response("Failure", error="Not Authenticated")
    data = json.loads(request.data)
    try:
        id=data.get("number")
        cursor = connection.cursor()
        cursor.execute("SELECT gender, blood_group, height, weight, allergies, disease FROM patient where patient_id in(SELECT patient_fk FROM user WHERE mobile_no= %s)" %id)
        d=cursor.fetchall()

        return create_api_response("Success",data=d)
    except Exception as e:
        job_status = "Failure"
        error_message = str(e)
        return create_api_response(job_status,error=error_message)
    
@app.route('/api/getUser', methods=['POST'])
def getUser():
    #check if the users exist or not
    # if not session.get("phone"):
    #     # if not there in the session then redirect to the login page
    #     return create_api_response("Failure", error="Not Authenticated")
    data = json.loads(request.data)
    try:
        id=data.get("number")
        cursor = connection.cursor()
        cursor.execute("SELECT patient_id,age FROM patient where patient_id in(SELECT patient_fk FROM user where mobile_no= %s)" %id)
        d=cursor.fetchall()

        return create_api_response("Success",data=d)
    except Exception as e:
        job_status = "Failure"
        error_message = str(e)
        return create_api_response(job_status,error=error_message)

#This route is to fetch all available doctors    
@app.route('/api/availableDoctors', methods=['GET','POST'])
def availableDoctors():
    # if not session.get("phone"):
    #     # if not there in the session then redirect to the login page
    #     return create_api_response("Failure", error="Not Authenticated")
    data = json.loads(request.data)
    try:
        #id=data.get("id")
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM doctor")
        d=cursor.fetchall()

        return create_api_response("Success",data=d)
    except Exception as e:
        job_status = "Failure"
        error_message = str(e)
        return create_api_response(job_status,error=error_message)

#This route is to get appointments of current user
@app.route('/api/getAppointments', methods=['GET', 'POST'])
def getAppointments():
    data=json.loads(request.data)
    # if not session.get("phone"):
    #     # if not there in the session then redirect to the login page
    #     return create_api_response("Failure", error="Not Authenticated")
    try:
        mobile=data.get("phone")
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM slot WHERE patient_id in (SELECT patient_fk FROM user WHERE mobile_no=%s)" % mobile)
        a=cursor.fetchall()
        return create_api_response("Success",data=a)
    except Exception as e:
        job_status = "Failure"
        error_message = str(e)
        return create_api_response(job_status,error=error_message)

#This route is for getting percentage of health status
@app.route('/api/predictHealth', methods=['GET', 'POST'])
def predictHealth():
    if not session.get("phone"):
        # if not there in the session then redirect to the login page
        return create_api_response("Failure", error="Not Authenticated")
    pass

#This route is to get food predictions for current user
@app.route('/api/getFood', methods=['GET', 'POST'])
def getFood():
    if not session.get("phone"):
        # if not there in the session then redirect to the login page
        return create_api_response("Failure", error="Not Authenticated")
    pass

#This route is to update the available doctors
@app.route('/api/updateAvailableDoctors', methods=['PUT'])
def updateAvailableDoctors():
    
    pass

#This route is to for counsellors
@app.route('/api/counsellors', methods=['GET'])
def counsellors():
    
    pass

@app.route('/recommend', methods=['GET','POST'])
def handleData() :
        try:
            jsonData = request.get_json()
            print(jsonData)
            return getData(jsonData)
        except Exception as e:
            return jsonify({'error': 'Internal server error'}), 500


def create_api_response(status, data=None, error=None):
  """
   Create a response to be sent to the API. This is a helper function to create a JSON response that can be sent to the API.
   
   Args:
   	 status: The status of the API call. Should be one of the constants in this module.
   	 data: The data that was returned by the API call.
   	 error: The error that was returned by the API call.
   
   Returns: 
   	 A dictionary containing the status data and error if any
  """
  response = {"status": status}

  # Set the data of the response
  if data is not None:
    response["data"] = data

  # Set the error message to the response.
  if error is not None:
    response["error"] = error

  return response
    

