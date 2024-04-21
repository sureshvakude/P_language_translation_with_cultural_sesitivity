import React from 'react';

function ContactSection() {
  return (
    <section className="contacts4 map1 cid-u87MqKUNBd" id="contacts-3-u87MqKUNBd">
      <div className="main_wrapper">
        <div className="b_wrapper">
          <div className="container-fluid">
            <div className="row justify-content-start">
              <div className="col-md-5 col-lg-4 item-wrapper">
                <h5 className="cardTitle mbr-fonts-style mb-2 display-5">
                  <strong>Contact Us</strong>
                </h5>
                <ul className="list mbr-fonts-style display-7">
                  <li className="mbr-text item-wrap">Phone: <a href="tel:123-456-7890" className="text-black">123-456-7890</a></li>
                  <li className="mbr-text item-wrap">WhatsApp: <a href="tel:123-456-7890" className="text-black">123-456-7890</a></li>
                  <li className="mbr-text item-wrap">Email: <a href="mailto:info@example.com" className="text-black">info@example.com</a></li>
                  <li className="mbr-text item-wrap">Address: Bengaluru India</li>
                  <li className="mbr-text item-wrap">Working Hours: Mon-Fri: 9am-5pm</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="google-map">
          <iframe title="Google Map" frameBorder="0" style={{ border: 0 }} src="https://www.google.com/maps/embed/v1/place?key&#x3D;AIzaSyCt1265A4qvZy9HKUeA8J15AOC4SrCyZe4&amp;q&#x3D;Bengaluru%20India" allowFullScreen=""></iframe>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;