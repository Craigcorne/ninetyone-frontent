import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";
import Meta from "../components/Meta";
import FlashSaleCard from "../components/Route/FlashSales/FlashSalesCard";
import FlashSale from "../components/Route/FlashSales/FlashSales";
import RecentProduct from "../components/Route/RecentProduct/RecentProduct";

const HomePage = () => {
  return (
    <div>
      <Meta title="Home" />
      <Header activeHeading={1} activeItem={"home"} />
      <Hero />
      {/* <Categories /> */}
      <FlashSale />
      <BestDeals />
      <RecentProduct />
      {/* <Events /> */}
      <FeaturedProduct />
      <Sponsored />
      <Footer />
    </div>
  );
};

export default HomePage;
