import React from 'react';

function HeaderWithVideo() {
  return (
    <section className="header18 cid-u87MqKUF0L" id="video-5-u87MqKUF0L" style={{ position: 'relative' }}>
      <div className="mbr-overlay" style={{ opacity: 0.3, backgroundColor: 'rgb(0, 0, 0)' }}></div>
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
        <div
          className="disable-mouse"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 2,
            pointerEvents: 'auto', // Disable pointer events
          }}
        ></div>
        <iframe
          title="YouTube Video"
          style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 1 }}
          src="https://www.youtube.com/embed/lj0bFX9HXeE?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&autohide=1&mute=1&loop=1&playlist=lj0bFX9HXeE"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}

export default HeaderWithVideo;