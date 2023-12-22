import React, { useEffect } from "react";
import Header from "../components/Layout/Header";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";

import Footer from "../components/Layout/Footer";
import Meta from "../components/Meta";
import GuestCheckout from "../components/Checkout/GuestCheckout";
import { useNavigate } from "react-router-dom";

const GuestCheckoutPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Meta title="Checkout" />

      <Header />
      <br />
      <br />
      <CheckoutSteps active={1} />
      <GuestCheckout />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default GuestCheckoutPage;
