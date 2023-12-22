import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSidebar";
import CreateStatements from "../components/Admin/CreateStatements";

const AdminStatements = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={10} />
          </div>
          <CreateStatements />
        </div>
      </div>
    </div>
  );
};

export default AdminStatements;
