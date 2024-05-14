import AboutUsSection from "./AboutUsSection";
import CallToActionSection from "./CallToActionSection";
import ContactSection from "./ContactSection";
import FAQSection from "./FAQSection";
import FeaturesSection from "./FeaturesSection";
import FeaturesSectionOver from "./FeaturesSectionOver";
import Footer from "./Footer";
import FullscreenImageSection from "./FullscreenImageSection";
import GallerySection from "./GallerySection";
import HeaderSection from "./HeaderSection";
import HeaderWithVideo from "./HeaderWithVideo";
import ImageSection from "./ImageSection";
import Navbar from "./Navbar";
import SocialMediaSection from "./SocialMediaSection";
import TestimonialsSection from "./TestimonialsSection";
import TranslationUI from "./TranslationUI";

function App() {
  return (
   <>
   <Navbar/>
   <HeaderSection/>
   <TranslationUI/>
   <ImageSection/>
   <CallToActionSection/>
   <FeaturesSection/>
   <AboutUsSection/>
   <GallerySection/>
   <FAQSection/>
   <HeaderWithVideo/>
   <TestimonialsSection/>
   <FeaturesSectionOver/>
   <FullscreenImageSection/>
   <SocialMediaSection/>
   <ContactSection/>
   <Footer/>
   </>
  );
}

export default App;