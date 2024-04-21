from flask import Flask, jsonify, request
from flask_cors import CORS
from Translate import TransEngToMar

app = Flask(__name__)
CORS(app)

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    english_text = data.get('englishText')
    if not english_text:
        return jsonify({'error': 'English text not provided'}), 400
    translated_text = TransEngToMar().translate_English_to_marathi(english_text)
    return jsonify({'translatedText': translated_text})

if __name__ == '__main__':
    app.run(debug=True)