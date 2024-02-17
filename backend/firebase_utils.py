from flask import jsonify
from google.cloud import firestore
# from app import app

db = firestore.Client.from_service_account_json('key.json')

def get_data():
    # Assuming you have a "users" collection and you want to retrieve documents from it
    users_ref = db.collection('users')
    users = users_ref.get()

    user_data = []
    for user in users:
        user_data.append({
            'id': user.id,
            'data': user.to_dict()
        })
    return jsonify(user_data)

def get_patient_appointments(patient_id):
    try:
        patient_ref = db.collection('patients').document(patient_id)
        appointments_ref = patient_ref.collection('appointments')
        appointments = appointments_ref.get()
        appointment_data = []
        for appointment in appointments:
            appointment_data.append(appointment.to_dict())
        return appointment_data
    
    except Exception as e:
        return {'error': str(e)}