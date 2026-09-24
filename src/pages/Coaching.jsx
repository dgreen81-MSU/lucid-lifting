import { CoachingHero } from "../sections/CoachingHero";
import { CoachingExperience } from "../sections/CoachingExperience";
import { CoachingAbout } from "../sections/CoachingAbout";
import { CoachingReviews } from "../sections/CoachingReviews";
import { CoachingFAQ } from "../sections/CoachingFAQ";
import { CoachingCTA } from "../sections/CoachingCTA";

const Coaching = () => {
  return (
    <>
      <CoachingHero />
      <CoachingExperience />
      <CoachingAbout />
      <CoachingReviews />
      <CoachingFAQ />
      <CoachingCTA />
    </>
  );
};

export default Coaching;