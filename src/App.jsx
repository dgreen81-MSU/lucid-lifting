import { Navbar } from "./layout/Navbar";
import { Footer } from "./layout/Footer";

import { Hero } from "./sections/Hero";
import { AboutLucid } from "./sections/AboutLucid";
import { FeaturedApparel } from "./sections/FeaturedApparel";
import { TrainingExperience } from "./sections/TrainingExperience";
import { Community } from "./sections/Community";
import { Contact } from "./sections/Contact";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      <main>
        <Hero />
        <AboutLucid />
        <FeaturedApparel />
        <TrainingExperience />
        <Community />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;