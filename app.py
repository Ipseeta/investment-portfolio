from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    salary = data.get("salary", 0)
    emi = data.get("emi", 0)
    other_expenses = data.get("other_expenses", 0)

    total_expenses = emi + other_expenses
    savings = salary - total_expenses
    if savings < 0:
        savings = 0

    response = {
        "expenses": total_expenses,
        "savings": savings
    }
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)