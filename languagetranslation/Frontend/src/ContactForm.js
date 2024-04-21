import React from 'react';

function ContactForm() {
  return (
    <section className="form5 cid-u87MqKUoyn" id="contact-form-2-u87MqKUoyn">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 content-head">
            <div className="mbr-section-head mb-5">
              <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                <strong>Get in Touch</strong>
              </h3>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8 mx-auto mbr-form" data-form-type="formoid">
            <form action="https://mobirise.eu/" method="POST" className="mbr-form form-with-styler" data-form-title="Form Name">
              <input type="hidden" name="email" data-form-email="true" value="" />
              <div className="row">
                <div hidden="hidden" data-form-alert="" className="alert alert-success col-12">Thanks for filling out the form!</div>
                <div hidden="hidden" data-form-alert-danger="" className="alert alert-danger col-12">Oops...! some problem!</div>
              </div>
              <div className="dragArea row">
                <div className="col-md col-sm-12 form-group mb-3" data-for="name">
                  <input type="text" name="name" placeholder="Name" data-form-field="name" className="form-control" value="" id="name-form02-0" />
                </div>
                <div className="col-md col-sm-12 form-group mb-3" data-for="email">
                  <input type="email" name="email" placeholder="Email" data-form-field="email" className="form-control" value="" id="email-form02-0" />
                </div>
                <div className="col-12 form-group mb-3" data-for="textarea">
                  <textarea name="textarea" placeholder="Message" data-form-field="textarea" className="form-control" id="textarea-form02-0"></textarea>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 align-center mbr-section-btn">
                  <button type="submit" className="btn btn-primary display-7">Send Message</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
