import React, { useState } from 'react';

function TranslationUI() {
  const [englishText, setEnglishText] = useState('');
  const [marathiText, setMarathiText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = () => {
    setLoading(true); // Set loading to true when starting the translation

    fetch('http://127.0.0.1:5000/translate', {
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
        setMarathiText(data.translatedText);
      })
      .catch((error) => {
        console.error('Error:', error);
        setMarathiText('प्रतिसाद मिळाला नाही');
      })
      .finally(() => {
        setLoading(false); // Reset loading after receiving the response or encountering an error
      });
  };

  return (
    <section className="translation-ui mt-5 mb-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5">
            <h2 className="text-center mb-4">Translate English to Marathi</h2>
          </div>
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
              placeholder="Marathi"
              value={loading ? 'प्रतीक्षा करा...' : marathiText}
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