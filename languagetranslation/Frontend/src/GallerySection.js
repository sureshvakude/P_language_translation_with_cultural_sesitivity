import React from 'react';
import galleryImg1 from './images/photo-1688330393342-09b6c1bb85eb.jpeg';
import galleryImg2 from './images/photo-1532522750741-628fde798c73.jpeg';
import galleryImg3 from './images/photo-1584143257251-9fcd5b0632eb.jpeg';
import galleryImg4 from './images/photo-1563509769909-174be967b5df.jpeg';

function GallerySection() {
  return (
    <section className="gallery07 cid-u87MqKUvSE" id="gallery-16-u87MqKUvSE">
      <div className="container-fluid gallery-wrapper">
        <div className="row justify-content-center">
          <div className="col-12 content-head">
            <div className="mbr-section-head mb-5">
              <h4 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                <strong>Visual Translation Journey</strong>
              </h4>
            </div>
          </div>
        </div>
        <div className="grid-container">
          <div className="grid-container-3" style={{ transform: 'translate3d(-200px, 0px, 0px)' }}>
            <div className="grid-item">
              <img src={galleryImg1} alt="Image 1" />
            </div>
            <div className="grid-item">
              <img src={galleryImg2} alt="Image 2" />
            </div>
            <div className="grid-item">
              <img src={galleryImg3} alt="Image 3" />
            </div>
            <div className="grid-item">
              <img src={galleryImg4} alt="Image 4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GallerySection;