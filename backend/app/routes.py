from app import app

# Define routes and view functions
@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/about')
def about():
    return 'This is a simple Flask application.'