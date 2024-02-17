import os
import json

def import_patient_data():
    json_file_path = os.path.join(os.path.dirname(__file__), 'app/mock', 'patient_data.json')
    with open(json_file_path, 'r') as f:
        data = json.load(f)
    print("Patient data imported successfully.")
    return data

def import_doctor_data():
    json_file_path = os.path.join(os.path.dirname(__file__), 'app/mock', 'doctors_slots.json')
    with open(json_file_path, 'r') as f:
        data = json.load(f)
    print("doctors slots data imported successfully.")
    return data


if __name__ == "__main__":
    import_patient_data()
    import_doctor_data()
