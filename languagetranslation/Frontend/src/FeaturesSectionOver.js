import React from 'react';

function FeaturesSection() {
  return (
    <section className="gallery10 cid-u87MqKUOR7" id="features-61-u87MqKUOR7">
      <div className="container-fluid">
        <div className="loop-container">
          <LoopItem />
          <LoopItem />
        </div>
      </div>
    </section>
  );
}

function LoopItem() {
  return (
    <div className="item display-1" data-linewords="
      Instant Translation Magic *
      Seamless English to Marathi *
      Magical Language Conversion *
      Effortless Communication *
      Quick and Accurate Results *
      Unlock Marathi Mysteries *"
      data-direction="-1" data-speed="0.05">
    </div>
  );
}

export default FeaturesSection;