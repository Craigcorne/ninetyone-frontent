import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShopLogin from "../components/Shop/ShopLogin";
import Meta from "../components/Meta";

const ShopLoginPage = () => {
  const navigate = useNavigate();
  const { isSeller, isLoading } = useSelector((state) => state.seller);

  useEffect(() => {
    if (isSeller === true) {
      navigate(`/dashboard`);
    }
  }, [isLoading, isSeller]);
  return (
    <div>
      <Meta title="Shop Login" />

      <ShopLogin />
    </div>
  );
};

export default ShopLoginPage;
