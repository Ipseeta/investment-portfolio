from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

class Calculator:
    def add(self, a, b):
        """Add two numbers"""
        return a + b

    def divide(self, a, b):
        """Divide a by b"""
        if b == 0:
            raise ValueError("Cannot divide by zero")
        return a / b

    def get_string_length(self, text):
        """Return the length of a string"""
        return len(text)

    def sum_list(self, numbers):
        """Return the sum of all numbers in a list"""
        return sum(numbers)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        # Convert inputs to float and validate
        try:
            salary = float(data.get("salary", 0))
            emi = float(data.get("emi", 0))
            other_expenses = float(data.get("other_expenses", 0))
        except ValueError:
            return jsonify({"error": "Invalid numeric values"}), 400

        # Validate for negative values
        if any(x < 0 for x in [salary, emi, other_expenses]):
            return jsonify({"error": "Negative values are not allowed"}), 400

        total_expenses = emi + other_expenses
        savings = max(0, salary - total_expenses)

        response = {
            "expenses": round(total_expenses, 2),
            "savings": round(savings, 2),
            "expense_ratio": round((total_expenses / salary * 100), 2) if salary > 0 else 0
        }
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": "An unexpected error occurred"}), 500

if __name__ == "__main__":
    app.run(debug=True)