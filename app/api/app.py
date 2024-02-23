import pickle
with open("models/RMClassifier2.pkl", "rb") as f:
    model = pickle.load(f)

from flask import Flask,jsonify, request

app = Flask(__name__)

@app.route('/')
def hello_world():
	return 'Hello World'

@app.route('/predict', methods=['GET','POST'])
def PredictData():
	try:
		data = request.json.get('data')
		predictions = model.predict_proba([data])
		print(predictions)
		return str(predictions[0][1])
	except Exception as e:
		return jsonify({
			'message':"wrong input"
		})

if __name__ == '__main__':
	app.run()

if __name__ == '__main__':
    app.run(debug=True)
