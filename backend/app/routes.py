from flask import Flask,request,jsonify,json,session,redirect
import pymysql
from db import connection
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
        id=data.get("id")
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM doctor where doctor_id= %s" %id)
        d=cursor.fetchall()

        return create_api_response("Success",data=d)
    except Exception as e:
        job_status = "Failure"
        error_message = str(e)
        return create_api_response(job_status,error=error_message)
    
@app.route('/api/availableDoctors', methods=['GET','POST'])
def availableDoctors():
    if not session.get("phone"):
        # if not there in the session then redirect to the login page
        return create_api_response("Failure", error="Not Authenticated")
    
    pass

#This route is to get appointments of current user
@app.route('/api/getAppointments', methods=['GET', 'POST'])
def getAppointments():
    if not session.get("phone"):
        # if not there in the session then redirect to the login page
        return create_api_response("Failure", error="Not Authenticated")
    pass

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
    

