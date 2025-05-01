from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
import dotenv
from typing import Optional

# Load environment variables
dotenv.load_dotenv()

# Set OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def chat_with_gpt(message: str) -> Optional[str]:
    """
    Send a message to GPT-3.5-turbo and get a response.
    
    Args:
        message (str): The user's message to send to the AI
        
    Returns:
        Optional[str]: The AI's response, or None if there was an error
    """
    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{
                "role": "user",
                "content": message
            }]
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return None

@app.route('/api/chat', methods=['POST'])
def handle_chat():
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({'error': 'No message provided'}), 400
            
        user_message = data['message']
        response = chat_with_gpt(user_message)
        
        if response:
            return jsonify({'response': response})
        else:
            return jsonify({'error': 'Failed to get response from AI'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)