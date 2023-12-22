import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import DashboardHero from "../../components/Shop/DashboardHero";
import Meta from "../../components/Meta";

const ShopDashboardPage = () => {
  return (
    <div>
      <Meta title="Shop's Dashboard" />

      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={1} />
        </div>
        <DashboardHero />
      </div>
    </div>
  );
};

export default ShopDashboardPage;
