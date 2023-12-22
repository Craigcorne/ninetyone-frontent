import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import Meta from "../../components/Meta";
import AllFlashSale from "../../components/Shop/AllFlashSale";

const ShopAllFlashSale = () => {
  return (
    <div>
      <Meta title="Shop's all Products" />

      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={3} />
        </div>
        <div className="w-full justify-center flex">
          <AllFlashSale />
        </div>
      </div>
    </div>
  );
};

export default ShopAllFlashSale;
