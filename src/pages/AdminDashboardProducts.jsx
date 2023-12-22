import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSidebar";
import AllProducts from "../components/Admin/AllProducts";
import Meta from "../components/Meta";

const AdminDashboardProducts = () => {
  return (
    <div>
      <Meta title="Admin Dashboard Products" />

      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={5} />
          </div>
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardProducts;
