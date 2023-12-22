import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const ComingSoon = () => {
  return (
    <div>
      <Header />
      <div
        className="coming-soon-container bg-cover bg-center flex flex-col items-center justify-center min-h-screen"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/bramuels/image/upload/v1691076678/logo/V_20_May_29_generated_yxwdx5.jpg)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <Footer />
    </div>
  );
};

export default ComingSoon;
