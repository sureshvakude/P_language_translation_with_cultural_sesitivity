import logo from './images/logo.jpg';

function scrollToTranslationUI(){
  document.getElementById('translationUI').scrollIntoView({ behavior: 'smooth' });
}

function scrollToContactSecion(){
  document.getElementById('follow-us-1-u87MqKUotR').scrollIntoView({ behavior: 'smooth' });
}

function scrollToGallerySecion(){
  document.getElementById('gallery-16-u87MqKUvSE').scrollIntoView({ behavior: 'smooth' });
}

function Navbar() {
  return (
    <section className="menu menu2 cid-u87MqKSUVM" once="menu" id="menu-5-u87MqKSUVM">
      <nav className="navbar navbar-dropdown navbar-expand-lg">
        <div className="container">
          <div className="navbar-brand">
            <span className="navbar-logo">
              <a href="/">
                <img src={logo} style={{ height: '4.3rem' }} alt="logo" />
              </a>
            </span>
            <span className="navbar-caption-wrap">
              <a className="navbar-caption text-black display-4" href="/">LTCS</a>
            </span>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse"
            data-bs-toggle="collapse" data-target="#navbarSupportedContent"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarNavAltMarkup" aria-expanded="false"
            aria-label="Toggle navigation">
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
              <li className="nav-item">
                <button className="nav-link link text-black display-4" onClick={()=>scrollToGallerySecion()}
                  aria-expanded="false" >Gallery</button>
              </li>
              <li className="nav-item">
                <button className="nav-link link text-black display-4" onClick={()=>scrollToContactSecion()}>Contact</button>
              </li>
            </ul>
            <div className="navbar-buttons mbr-section-btn">
              <button className="btn btn-primary display-4" onClick={()=>scrollToTranslationUI()}>Get Started</button>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
}

export default Navbar;