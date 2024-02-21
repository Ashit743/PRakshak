from flask import Flask, render_template,request,jsonify,json;
from twilio.rest import Client
import urllib.request;
from dotenv import load_dotenv
from app import app
from flask_cors import CORS
import os
load_dotenv()
account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
client = Client(account_sid, auth_token)

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
        return create_api_response("success",data=verification.status)
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
        return create_api_response("success",data=verification_check.status)
    except Exception as e:
        job_status = "Failure"
        error_message = str(e)
        return create_api_response(job_status,error=error_message)

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
    