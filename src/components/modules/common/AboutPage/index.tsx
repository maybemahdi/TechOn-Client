import FooterDark from "@/components/shared/Footer/FooterDark";
import FAQDark from "../HomePage/FAQ/FAQDark";
import NewsletterDark from "../HomePage/Newsletter/NewsLetterDark";
import AboutBanner from "./AboutBanner/AboutBanner";
import OurStory from "./OurStory/OurStory";
import Promise from "./Promise/Promise";

const AboutPage = () => {
  return (
    <div>
      <AboutBanner />
      <Promise></Promise>
      <OurStory />
      <FAQDark />
      <NewsletterDark />
      <FooterDark />
    </div>
  );
};

export default AboutPage;
