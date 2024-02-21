import joblib
model = joblib.load("random_forest_model.joblib") 



# app = Flask(__name__)



# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask,jsonify




app = Flask(__name__)

@app.route('/')
def hello_world():
	return 'Hello World'


@app.route('/app', methods=['GET'])
def getData():
	individual_data = [[75.0, 0.3687093980173878, -0.816784387725113, 0.17260957445317487, -0.35670253915327943, -0.2679214371360831, -0.34983506945283155, -1.2337105920700608, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.39827448420936584, 0.0, 0.39827448420936584, 1.0, 0.0, 0.0, 0.0, 0.6017255157906342, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0]]
	predictions = model.predict(individual_data)
	return str(predictions[0])


if __name__ == '__main__':
	app.run()
