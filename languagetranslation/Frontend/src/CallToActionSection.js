import React from 'react';

function scrollToTranslationUI(){
  document.getElementById('translationUI').scrollIntoView({ behavior: 'smooth' });
}

function CallToActionSection() {
  return (
    <section className="article13 cid-u87MqKTDvN" id="call-to-action-3-u87MqKTDvN">
      <div className="container">
        <div className="row justify-content-center">
          <div className="card col-md-12 col-lg-10">
            <div className="card-wrapper">
              <div className="card-box align-left">
                <h4 className="card-title mbr-fonts-style display-2">
                  <strong>Ready to Dive into Marathi Magic?</strong>
                </h4>
                <div className="mbr-section-btn mt-4">
                  <button className="btn btn-primary display-4" onClick={()=>scrollToTranslationUI()}>Start Translating</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallToActionSection;