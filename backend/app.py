import os
import json
import random
import re
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DB_FILE = os.path.join(os.path.dirname(__file__), 'utils', 'users.json')

def load_users():
    if os.path.exists(DB_FILE):
        try:
            with open(DB_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading users.json: {e}")
    return []

def save_users(users):
    try:
        os.makedirs(os.path.dirname(DB_FILE), exist_ok=True)
        with open(DB_FILE, 'w', encoding='utf-8') as f:
            json.dump(users, f, indent=2)
    except Exception as e:
        print(f"Error saving users.json: {e}")

pending_registrations = []

def generate_id():
    return str(random.randint(100000000, 999999999))

@app.route('/api/auth/register-request', methods=['POST'])
def register_request():
    data = request.json or {}
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'beginner')

    users = load_users()
    if any(u.get('email') == email for u in users):
        return jsonify({'message': 'User already exists'}), 400

    otp = str(random.randint(100000, 999999))

    # Remove existing pending for this email
    global pending_registrations
    pending_registrations = [p for p in pending_registrations if p.get('email') != email]
    pending_registrations.append({
        'name': name,
        'email': email,
        'password': password,
        'role': role,
        'otp': otp
    })

    print(f"[Python Server OTP] Email: {email} | OTP: {otp}")
    return jsonify({
        'message': 'OTP sent to email. Please verify.',
        'email': email,
        'mockOtp': otp
    }), 200

@app.route('/api/auth/verify-otp', methods=['POST'])
def verify_otp():
    data = request.json or {}
    email = data.get('email')
    otp = data.get('otp')

    global pending_registrations
    pending = next((p for p in pending_registrations if p.get('email') == email and p.get('otp') == otp), None)
    if not pending:
        return jsonify({'message': 'Invalid OTP or email'}), 400

    user_id = generate_id()
    new_user = {
        '_id': user_id,
        'name': pending.get('name'),
        'email': pending.get('email'),
        'password': pending.get('password'),
        'role': pending.get('role', 'beginner'),
        'location': '',
        'soilType': '',
        'landSize': '',
        'savedCrops': []
    }

    users = load_users()
    users.append(new_user)
    save_users(users)

    pending_registrations = [p for p in pending_registrations if p.get('email') != email]
    token = f"py_token_{user_id}"

    return jsonify({
        'token': token,
        'user': {
            'id': new_user['_id'],
            'name': new_user['name'],
            'email': new_user['email'],
            'role': new_user['role']
        }
    }), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json or {}
    email = data.get('email')
    password = data.get('password')

    users = load_users()
    user = next((u for u in users if u.get('email') == email), None)

    if not user:
        return jsonify({'message': 'Invalid credentials'}), 400

    # Basic password comparison for mock server
    if user.get('password') != password:
        return jsonify({'message': 'Invalid credentials'}), 400

    token = f"py_token_{user['_id']}"
    return jsonify({
        'token': token,
        'user': {
            'id': user['_id'],
            'name': user['name'],
            'email': user['email'],
            'role': user.get('role', 'beginner')
        }
    }), 200

@app.route('/api/user/profile', methods=['GET', 'PUT'])
@app.route('/api/users/profile', methods=['GET', 'PUT'])
def user_profile():
    token = request.headers.get('x-auth-token', '')
    users = load_users()

    if not token or not token.startswith('py_token_') and not token.startswith('secret'):
        # Fallback to match first user if token is present or mock
        user = users[0] if users else None
    else:
        user_id = token.replace('py_token_', '')
        user = next((u for u in users if u.get('_id') == user_id), None)
        if not user and users:
            user = users[0]

    if not user:
        return jsonify({'message': 'User not found'}), 404

    if request.method == 'GET':
        user_copy = dict(user)
        user_copy.pop('password', None)
        return jsonify(user_copy), 200

    if request.method == 'PUT':
        data = request.json or {}
        if 'name' in data: user['name'] = data['name']
        if 'location' in data: user['location'] = data['location']
        if 'soilType' in data: user['soilType'] = data['soilType']
        if 'landSize' in data: user['landSize'] = data['landSize']
        if 'savedCrops' in data: user['savedCrops'] = data['savedCrops']

        save_users(users)
        user_copy = dict(user)
        user_copy.pop('password', None)
        return jsonify(user_copy), 200

@app.route('/api/diagnostics/analyze', methods=['POST'])
def analyze_diagnostics():
    data = request.json or {}
    text = data.get('text', '')
    file_name = data.get('fileName', 'uploaded_soil_report.txt')

    if not text:
        return jsonify({'message': 'No text content provided for analysis'}), 400

    ph = 6.5
    ph_match = re.search(r'ph\s*(?:level)?\s*:\s*([0-9\.]+)', text, re.IGNORECASE)
    if ph_match:
        try:
            ph = float(ph_match.group(1))
        except ValueError:
            pass

    def parse_status(pattern, default_val="Medium"):
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            val = match.group(1).lower()
            if 'low' in val or 'deficient' in val:
                return 'Low'
            if 'high' in val or 'optimal' in val:
                return 'High'
            return 'Medium'
        return default_val

    nitrogen = parse_status(r'nitrogen\s*(?:\(n\))?\s*:\s*(.*)', 'Medium')
    phosphorus = parse_status(r'phosphorus\s*(?:\(p\))?\s*:\s*(.*)', 'Medium')
    potassium = parse_status(r'potassium\s*(?:\(k\))?\s*:\s*(.*)', 'Medium')
    carbon = parse_status(r'carbon\s*:\s*(.*)', 'Medium')

    if ph < 6.0:
        ph_status = "Acidic"
        verdict = "Acidic Soil with Nutrient Deficiencies (Python Analyzed)"
        advisories = [
            {"id": 1, "category": "pH Correction", "text": "Apply agricultural lime (calcium carbonate) at 2.0-3.0 t/ha to correct soil acidity and raise pH towards 6.5."},
            {"id": 2, "category": "NPK Supplements", "text": f"Nitrogen level is {nitrogen} and Potassium level is {potassium}. Apply balanced organic compost and NPK boosters."},
            {"id": 3, "category": "Soil Conservation", "text": "Incorporate organic green manure crops (e.g., Sunnhemp or Dhaincha) before main crop transplantation."}
        ]
    elif ph > 7.8:
        ph_status = "Alkaline"
        verdict = "Alkaline / Saline Soil Profile (Python Analyzed)"
        advisories = [
            {"id": 1, "category": "pH Correction", "text": "Apply elemental sulfur at 1.0-1.5 t/ha or agricultural gypsum to mitigate alkaline pH and reduce salinity."},
            {"id": 2, "category": "Water Drainage", "text": "Improve field drainage networks. Flush fields with high-quality water to leach out soluble salt deposits."},
            {"id": 3, "category": "Fertilizer Selection", "text": "Avoid sodium-based fertilizers. Prefer Ammonium Sulfate and Sulfate of Potash (SOP) over standard chloride variants."}
        ]
    else:
        ph_status = "Optimal"
        verdict = "Healthy, Fertile Soil Profile (Python Analyzed)"
        advisories = [
            {"id": 1, "category": "pH Status", "text": "Soil pH is optimal. No correction or lime/sulfur treatment required."},
            {"id": 2, "category": "Maintenance", "text": "Maintain organic carbon levels by applying basal Farm Yard Manure (FYM) at 12.5 t/ha during soil preparation."},
            {"id": 3, "category": "Crop Rotation", "text": "Rotate heavy nutrient feeders with nitrogen-fixing leguminous crops like Black Gram or Green Gram to maintain soil vitality."}
        ]

    return jsonify({
        'id': file_name,
        'name': file_name,
        'rawText': text,
        'parsed': {
            'ph': ph,
            'phStatus': ph_status,
            'nitrogen': nitrogen,
            'phosphorus': phosphorus,
            'potassium': potassium,
            'carbon': carbon,
            'salinity': 'Saline' if ph > 7.8 else 'Safe',
            'verdict': verdict,
            'advisories': advisories
        }
    }), 200

if __name__ == '__main__':
    print("Python AgriHelp Backend Server is running on http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
