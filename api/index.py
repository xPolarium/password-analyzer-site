from flask import Flask, jsonify, request
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer

import dill # type: ignore
import numpy as np

app = Flask(__name__)
CORS(app)

models = {}

algos = ['logistic_regr_ovr','logistic_regr_mutinomial','xgboost','naive_bayes']

for name in algos:
    model = dill.load(open(f"./ml_models/{name}.pkl", "rb"))
    models[name] = model

@app.route("/check")
def check():
    password = request.args.get("password")

    vectorizer = dill.load(open("./ml_models/vectorizer.pkl","rb"))

    x_pred = [password]
    x_pred = vectorizer.transform(x_pred)

    results = {}

    for name, model in models.items():
        predicted = model.predict(x_pred)
        
        # probab = model.predict_proba(x_pred) * 100
        # results[name] = { "predicted": predicted.tolist(), "probability": probab.tolist() }

        results[name] = { "predicted": predicted.tolist() }

    return jsonify(results)