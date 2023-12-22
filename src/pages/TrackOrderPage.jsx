import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import TrackOrder from "../components/Profile/TrackOrder";
import Meta from "../components/Meta";

const TrackOrderPage = () => {
  return (
    <div>
      <Meta title="Track Order" />

      <Header />
      <TrackOrder />
      <Footer />
    </div>
  );
};

export default TrackOrderPage;
