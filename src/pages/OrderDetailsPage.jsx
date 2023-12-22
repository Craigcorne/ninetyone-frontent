import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import UserOrderDetails from "../components/UserOrderDetails";
import Meta from "../components/Meta";

const OrderDetailsPage = () => {
  return (
    <div>
      <Meta title="Order Details" />

      <Header />
      <UserOrderDetails />
      <Footer />
    </div>
  );
};

export default OrderDetailsPage;
