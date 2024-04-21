import React from 'react';

function HeaderWithVideo() {
  return (
    <section className="header18 cid-u87MqKUF0L mbr-fullscreen" id="video-5-u87MqKUF0L">
      <div className="mbr-overlay" style={{ opacity: 0.3, backgroundColor: 'rgb(0, 0, 0)' }}></div>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <iframe
              title="YouTube Video"
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/lj0bFX9HXeE?autoplay=1&loop=1&playlist=lj0bFX9HXeE&t=20&mute=1&controls=0&showinfo=0&autohide=1&allowfullscreen=true&mode=transparent"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeaderWithVideo;
