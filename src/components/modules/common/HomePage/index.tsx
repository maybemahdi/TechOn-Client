import React from "react";
import Banner from "./Banner/Banner";
import OurCollection from "./OurCollection/OurCollection";
import Testimonials from "./Testimonials/Testimonials";
import FAQ from "./FAQ/FAQ";
import Newsletter from "./Newsletter/Newsletter";
import Footer from "@/components/shared/Footer/Footer";
import NewBanner from "./NewBanner/NewBanner";

const HomePage = () => {
  return (
    <div>
      {/* <Banner /> */}
      <NewBanner />
      <OurCollection />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;
