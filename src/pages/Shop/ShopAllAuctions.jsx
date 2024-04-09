import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import Meta from "../../components/Meta";
import AllAuction from "../../components/Shop/AllAuction";

const ShopAllAuctions = () => {
  return (
    <div>
      <Meta title="Shop's all Coupons" />

      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={7} />
        </div>
        <div className="w-full justify-center flex">
          <AllAuction />
        </div>
      </div>
    </div>
  );
};

export default ShopAllAuctions;
