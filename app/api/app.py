import pickle
import logging
from flask_cors import CORS
with open("models/RMClassifier2.pkl", "rb") as f:
    model = pickle.load(f)

from flask import Flask,jsonify, request

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
	return 'Hello World'


@app.route('/predict', methods=['GET','POST'])
def PredictData():
    try:
        data = request.json.get('data')
        if data is None:
            raise ValueError("No data provided")

        predictions = model.predict_proba([data])
        prediction_result = predictions[0][1]
        app.logger.info("Prediction: %f", prediction_result)
        return jsonify({'prediction': prediction_result}), 200

    except ValueError as ve:
        app.logger.error("ValueError occurred: %s", ve)
        return jsonify({'error': str(ve)}), 400

    except Exception as e:
        app.logger.error("An error occurred: %s", str(e))
        return jsonify({'error': "An unexpected error occurred"}), 500


if __name__ == '__main__':
    app.run(debug=True)
