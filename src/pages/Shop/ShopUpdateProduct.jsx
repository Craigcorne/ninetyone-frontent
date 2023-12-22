import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import EditProduct from "../../components/Admin/UpdateProduct";
import AdminSideBar from "../../components/Admin/Layout/AdminSidebar";

const ShopUpdateProduct = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={6} />
        </div>
        <div className="w-full justify-center flex">
          <EditProduct />
        </div>
      </div>
    </div>
  );
};

export default ShopUpdateProduct;
