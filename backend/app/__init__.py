from flask import Flask, jsonify
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

# Create Flask app
app = Flask(__name__)

# Import routes
from app import routes