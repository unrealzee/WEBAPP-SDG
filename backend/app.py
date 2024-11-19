from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

# Replace with your Gemini API key
GEMINI_API_KEY = 'AIzaSyBoSCMuEho3bor89djpJX4DRnt6AxnQE4I'

# Configure Gemini API
genai.configure(api_key=GEMINI_API_KEY)

@app.route('/api/chat', methods=['POST'])
def generate_response():
    data = request.json
    message = data.get('message', '')

    try:
        # Initialize Gemini model
        model = genai.GenerativeModel('gemini-pro')
        
        # Generate response
        response = model.generate_content(message)
        
        return jsonify({
            'response': response.text
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)