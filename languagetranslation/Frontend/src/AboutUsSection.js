import React from 'react';
import AboutImage from './images/photo-1657302155485-790b74d0b5d1.jpeg';

function AboutUsSection() {
  return (
    <section className="article4 cid-u87MqKTPIw" id="about-us-4-u87MqKTPIw">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-12 col-lg-6 image-wrapper">
            <img className="w-100" src={AboutImage} alt="About Us" />
          </div>
          <div className="col-12 col-md-12 col-lg">
            <div className="text-wrapper align-left">
              <h1 className="mbr-section-title mbr-fonts-style mb-4 display-2">
                <strong>Translate with Ease</strong>
              </h1>
              <p className="mbr-text mbr-fonts-style mb-3 display-7">Welcome to our innovative translation service where you can effortlessly convert English sentences into Marathi with just a click.</p>
              <p className="mbr-text mbr-fonts-style mb-3 display-7">Say goodbye to language barriers and hello to seamless communication. Experience the magic of instant translation!</p>
              <p className="mbr-text mbr-fonts-style mb-3 display-7">Our cutting-edge technology ensures accurate and efficient conversions, making language translation a breeze for everyone.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsSection;