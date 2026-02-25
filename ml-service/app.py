from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load trained model
model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    text = data.get("text")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    vec = vectorizer.transform([text])
    probability = model.predict_proba(vec)[0][1]

    return jsonify({
        "phishingProbability": float(probability)
    })

if __name__ == "__main__":
    app.run(port=8000)