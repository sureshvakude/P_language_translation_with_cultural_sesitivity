import React from 'react';

function TeamSection() {
  return (
    <section className="people03 cid-u87MqKULjD" id="team-1-u87MqKULjD">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 content-head">
            <div className="mbr-section-head mb-5">
              <h4 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                <strong>Meet Our Team</strong>
              </h4>
            </div>
          </div>
        </div>
        <div className="row">
          <TeamMember name="SHANKAR PATIL" role="Chief Language Wizard" imgSrc="assets/images/photo-1586185018558-ea8f4b4c514f.jpeg" />
          <TeamMember name="KIRAN VIJAPURE" role="Translation Sorceress" imgSrc="assets/images/photo-1543965170-4c01a586684e.jpeg" />
          <TeamMember name="ROHAM PAYAMALLE" role="Language Alchemist" imgSrc="assets/images/photo-1694026307715-0d3709e69adf.jpeg" />
          <TeamMember name="SHUBHAM MAGDUM" role="Word Magician" imgSrc="assets/images/photo-1626899798511-c3eaacb02846.jpeg" />
        </div>
      </div>
    </section>
  );
}

function TeamMember({ name, role, imgSrc }) {
  return (
    <div className="item features-image col-12 col-md-6 col-lg-3">
      <div className="item-wrapper">
        <div className="item-img mb-3">
          <img src={imgSrc} alt={name} />
        </div>
        <div className="item-content align-left">
          <h6 className="item-subtitle mbr-fonts-style display-5">
            <strong>{name}</strong>
          </h6>
          <p className="mbr-text mbr-fonts-style display-7">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default TeamSection;