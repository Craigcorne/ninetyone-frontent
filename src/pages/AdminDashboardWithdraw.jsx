import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSidebar";
import AllWithdraw from "../components/Admin/AllWithdraw";
import Meta from "../components/Meta";

const AdminDashboardWithdraw = () => {
  return (
    <div>
      <Meta title="Admin Dashboard Withdrawals" />

      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={7} />
          </div>
          <AllWithdraw />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardWithdraw;
