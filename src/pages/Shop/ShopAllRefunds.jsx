import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import AllRefundOrders from "../../components/Shop/AllRefundOrders";
import Meta from "../../components/Meta";

const ShopAllRefunds = () => {
  return (
    <div>
      <Meta title="Shop's all Refunds" />

      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={11} />
        </div>
        <div className="w-full justify-center flex">
          <AllRefundOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllRefunds;
