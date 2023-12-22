import React, { useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Lottie from "react-lottie";
import animationData from "../Assests/animations/107043-success.json";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderSuccessPage = () => {
  const user = useSelector((state) => state.user);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const navigate = useNavigate();

  const goToProfilePage = () => {
    if (user.isAuthenticated === false) {
      navigate("/searchorder");
    } else if (user.isAuthenticated === true) {
      navigate("/profile?active=2");
    }
  };

  return (
    <div>
      <Meta title="Orders" />

      <Header />
      <div>
        <Lottie options={defaultOptions} width={300} height={300} />
        <h5 className="text-center mb-0 text-[25px] text-[#000000a1]">
          Order placed successfully 😍
        </h5>
        <div
          onClick={goToProfilePage}
          className="m-auto cursor-pointer w-32 group mt-2 relative h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          See my Order
        </div>
        <br />
        <br />
      </div>
      <Footer />
    </div>
  );
};

export default OrderSuccessPage;
