import { Hero } from "../sections/Hero";
import { FeaturedApparel } from "../sections/FeaturedApparel";
import { BryonCampaign } from "../sections/BryonCampaign";
import { AboutLucid } from "../sections/AboutLucid";
import { Contact } from "../sections/Contact";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedApparel />
      <BryonCampaign />
      <AboutLucid />
      <Contact />
    </>
  );
};

export default Home;