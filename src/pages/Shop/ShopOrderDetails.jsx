import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import Footer from "../../components/Layout/Footer";
import OrderDetails from "../../components/Shop/OrderDetails";
import Meta from "../../components/Meta";

const ShopOrderDetails = () => {
  return (
    <div>
      <Meta title="Shop's Order Details" />
      <DashboardHeader />
      <OrderDetails />
      <Footer />
    </div>
  );
};

export default ShopOrderDetails;
