from app import app, get_data
from flask import jsonify,abort
from import_data import import_patient_data, import_doctor_data

patient_data = import_patient_data()
doctors_data = import_doctor_data()

# Define routes and view functions
@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/about')
def about():
    return 'This is a simple Flask application.'

@app.route('/api/patient/<string:patient_id>', methods=['GET'])
def get_patient_data(patient_id):
    patient_data = [entry for entry in patient_data if entry.get('patientPhoneNumber') == patient_id]
    if not patient_data:
            return jsonify({'message': 'Patient data not found'}), 404
    return jsonify(patient_data)

@app.route('/api/doctors/available/', methods=['GET'])
def get_doctors_data():
    if not doctors_data:
            return jsonify({'message': 'Sorry no doctors available'}), 404
    return jsonify(doctors_data)

@app.route('/api/test', methods=['GET'])
def get_dummy_data():
    db = get_data()
    return db
