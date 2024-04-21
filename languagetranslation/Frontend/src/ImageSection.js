import React from 'react';
import banner from './images/section2r.png';

function ImageSection() {
  return (
    <section className="image08 cid-u87MqKTz54" id="image-12-u87MqKTz54">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4">
            <div className="col-12 col-md-12">
              <h5 className="mbr-section-title mbr-fonts-style mt-0 mb-4 display-2">
                <strong>Visual Translation Fun</strong>
              </h5>
              <h6 className="mbr-section-subtitle mbr-fonts-style mt-0 mb-4 display-7">
                Experience the Joy of Seeing English Transform into Marathi Before Your Eyes!
              </h6>
            </div>
          </div>
          <div className="col-lg-8 side-features">
            <div className="image-wrapper mb-4">
              <img className="w-100" src={banner} alt="Visual Translation" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImageSection;