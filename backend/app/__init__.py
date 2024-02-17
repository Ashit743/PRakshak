from flask import Flask

# Create Flask app
app = Flask(__name__)

# Import routes
from app import routes