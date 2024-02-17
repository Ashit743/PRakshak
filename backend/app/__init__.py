from flask import Flask



# Create Flask app
app = Flask(__name__)

# Import routes
from app import routes



#add data for patients programatically to database

# # Patient phone number
# patient_phone_number = "9380340883"

# # Appointment data to be added
# appointments_data = [
#     { 
#       "title": "Booked", 
#       "start": "2024-02-15T10:00:00", 
#       "end": "2024-02-15T10:30:00", 
#       "doctor": "Dr. Arun", 
#       "category": "checkup"
#     },
#     { 
#       "title": "Booked", 
#       "start": "2024-02-16T10:30:00", 
#       "end": "2024-02-16T11:00:00", 
#       "doctor": "Dr. Rakesh", 
#       "category": "checkup"
#     },
#     { 
#       "title": "Booked", 
#       "start": "2024-02-17T10:00:00", 
#       "end": "2024-02-17T10:30:00", 
#       "doctor": "Dr. Krishna", 
#       "category": "checkup"
#     },
#     { 
#       "title": "Booked", 
#       "start": "2024-02-19T10:00:00", 
#       "end": "2024-02-19T10:30:00", 
#       "doctor": "Dr. Smith", 
#       "category": "checkup"
#     },
#     { 
#       "title": "Booked", 
#       "start": "2024-02-21T10:30:00", 
#       "end": "2024-02-21T11:00:00", 
#       "doctor": "Dr. Patel", 
#       "category": "checkup"
#     },
#     { 
#       "title": "Booked", 
#       "start": "2024-02-23T10:00:00", 
#       "end": "2024-02-23T10:30:00", 
#       "doctor": "Dr. Khan", 
#       "category": "checkup"
#     },
#     {
#       "title": "Blood sugar check",
#       "start": "2024-02-20",
#       "end": "2024-02-20",
#       "doctor": "Dr. Patel", 
#       "category": "labTest"
#     },
#     {
#       "title": "Blood test",
#       "start": "2024-02-17",
#       "end": "2024-02-17",
#       "doctor": "Dr. Patel", 
#       "category": "labTest"
#     }
#   ]
  
# # Reference to the patient document
# patient_ref = db.collection('patients').document(patient_phone_number)

# # Reference to the appointments subcollection
# appointments_ref = patient_ref.collection('appointments')

# # Add appointments to Firestore
# for appointment_data in appointments_data:
#     appointments_ref.add(appointment_data)

