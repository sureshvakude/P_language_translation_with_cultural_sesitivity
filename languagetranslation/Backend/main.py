# Link for datasets : https://www.manythings.org/anki/

from flask import Flask, jsonify, request # type: ignore
from flask_cors import CORS # type: ignore
from EngToMarTranslate import TranslateEngToMar
from EngToHiTranslate import TranslateEngToHin
from EngToJPTranslate import TranslateEngToJpn
from EngToTelTranslate import TranslateEngToTel

app = Flask(__name__)
CORS(app)

@app.route('/translateEngToMar', methods=['POST'])
def translateEngToMar():
    data = request.get_json()
    english_text = data.get('englishText')
    if not english_text:
        return jsonify({'error': 'English text not provided'}), 400
    translated_text = TranslateEngToMar().translate_English(english_text)
    return jsonify({'translatedText': translated_text})

@app.route('/translateEngToHin', methods=['POST'])
def translateEngToHin():
    data = request.get_json()
    english_text = data.get('englishText')
    if not english_text:
        return jsonify({'error': 'English text not provided'}), 400
    translated_text = TranslateEngToHin().translate_English(english_text)
    return jsonify({'translatedText': translated_text})

@app.route('/translateEngToJpn', methods=['POST'])
def translateEngToJpn():
    data = request.get_json()
    english_text = data.get('englishText')
    if not english_text:
        return jsonify({'error': 'English text not provided'}), 400
    translated_text = TranslateEngToJpn().translate_English(english_text)
    return jsonify({'translatedText': translated_text})

@app.route('/translateEngToTel', methods=['POST'])
def translateEngToTel():
    data = request.get_json()
    english_text = data.get('englishText')
    if not english_text:
        return jsonify({'error': 'English text not provided'}), 400
    translated_text = TranslateEngToTel().translate_English(english_text)
    return jsonify({'translatedText': translated_text})

if __name__ == '__main__':
    app.run(debug=True)