import React, { useState } from 'react';

function TranslationUI() {
  const [englishText, setEnglishText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('marathi');

  const handleTranslate = () => {
    setLoading(true); // Set loading to true when starting the translation

    const apiUrl = getTranslationAPIUrl(selectedLanguage);

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ englishText }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTranslatedText(data.translatedText);
      })
      .catch((error) => {
        console.error('Error:', error);
        setTranslatedText(getErrorMessage(selectedLanguage));
      })
      .finally(() => {
        setLoading(false); // Reset loading after receiving the response or encountering an error
      });
  };

  const getErrorMessage = (language) => {
    switch (language) {
      case 'marathi':
        return 'प्रतिसाद मिळाला नाही';
      case 'hindi':
        return 'जवाब मिला नहीं';
      case 'japanese':
        return '回答がありません';
      case 'telugu':
        return 'సమాధానం లేదు';
      default:
        return '';
    }
  };

  const getTranslationAPIUrl = (language) => {
    switch (language) {
      case 'marathi':
        return 'http://127.0.0.1:5000/translateEngToMar';
      case 'hindi':
        return 'http://127.0.0.1:5000/translateEngToHin';
      case 'japanese':
        return 'http://127.0.0.1:5000/translateEngToJpn';
      case 'telugu':
        return 'http://127.0.0.1:5000/translateEngToTel';
      default:
        return '';
    }
  };

  const getPlaceholderText = () => {
    switch (selectedLanguage) {
      case 'marathi':
        return 'प्रतीक्षा करा...';
      case 'hindi':
        return 'थोड़ी देर रुकिए...';
      case 'japanese':
        return '少し待ってください...';
      case 'telugu':
        return 'కొన్ని కాలం ఆయితే...';
      default:
        return '';
    }
  };

  return (
    <section className="translation-ui mt-5 mb-5" id='translationUI'>
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5">
            <h2 className="text-center mb-4">Translate Language</h2>
          </div>
        </div>
        <div className='dropDown'>
          <select 
            className="form-control" 
            value={selectedLanguage} 
            onChange={(e) => setSelectedLanguage(e.target.value)}>
            <option value="marathi">Marathi</option>
            <option value="hindi">Hindi</option>
            <option value="japanese">Japanese</option>
            <option value="telugu">Telugu</option>
          </select>
        </div>
        <div className="row">
          <div className="col-md-6 mt-5">
            <textarea
              className="form-control"
              rows="10"
              placeholder="English"
              value={englishText}
              onChange={(e) => setEnglishText(e.target.value)}
            ></textarea>
          </div>
          <div className="col-md-6 mt-5">
            <textarea
              className="form-control"
              rows="10"
              placeholder={loading ? getPlaceholderText() : translatedText}
              readOnly
            ></textarea>
          </div>
        </div>
        <div className="row mt-3 mb-5">
          <div className="col-md-12">
            <button className="btn btn-primary btn-sm" onClick={handleTranslate}>
              Translate
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TranslationUI;