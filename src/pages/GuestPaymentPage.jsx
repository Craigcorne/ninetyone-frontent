import React from "react";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Meta from "../components/Meta";
import GuestPayment from "../components/Payment/GuestPayment";

const GuestPaymentPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#f6f9fc]">
      <Meta title="Payment" />

      <Header />
      <br />
      <br />
      <CheckoutSteps active={2} />
      <GuestPayment />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default GuestPaymentPage;
