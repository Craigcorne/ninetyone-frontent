import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSidebar";
import CreateCarouselPage from "../components/Admin/CreateCarousel";

const AdminCarousel = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={9} />
          </div>
          <CreateCarouselPage />
        </div>
      </div>
    </div>
  );
};

export default AdminCarousel;
