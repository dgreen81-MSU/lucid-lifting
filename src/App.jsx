import { Navbar } from "./layout/Navbar";
import { Footer } from "./layout/Footer";

import { Hero } from "./sections/Hero";
import { AboutLucid } from "./sections/AboutLucid";
import { FeaturedApparel } from "./sections/FeaturedApparel";
import { BryonCampaign } from "./sections/BryonCampaign";
import { TrainingExperience } from "./sections/TrainingExperience";
import { Community } from "./sections/Community";
import { Contact } from "./sections/Contact";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black">
      <Navbar />

      <main>
        {/* Brand / Campaign Hero */}
        <Hero />

        {/* Shop First */}
        <FeaturedApparel />

        {/* Video Campaign */}
        <BryonCampaign />

        {/* Brand Story */}
        <AboutLucid />

        {/* Services */}
        <TrainingExperience />

        {/* Community */}
        <Community />

        {/* Contact */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;