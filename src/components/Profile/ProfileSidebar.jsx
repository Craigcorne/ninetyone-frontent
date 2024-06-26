import React, { useState } from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson, RxDashboard } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import CustomModal from "../CustomModal";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const [modalOpen, setModalOpen] = useState(false);

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <>
      {modalOpen && (
        <CustomModal
          message={"Are you sure you want to logout?"}
          ok={" Yes, I'm sure"}
          cancel={"No, cancel"}
          setModalOpen={setModalOpen}
          performAction={() => logoutHandler()}
          closeModel={() => setModalOpen(false)}
        />
      )}
      <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(1)}
        >
          <RxDashboard size={20} color={active === 1 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 1 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Dashboard
          </span>
        </div>
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(2)}
        >
          <RxPerson size={20} color={active === 2 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 2 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Profile
          </span>
        </div>
        <div
          className="block lg:flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(3)}
        >
          <HiOutlineShoppingBag
            size={20}
            color={active === 3 ? "red" : "black"}
          />
          <span
            className={`pl-3 ${
              active === 3 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Orders
          </span>
          <div class="w-[12px] h-[12px] bg-green-400 rounded-full mx-5"></div>
        </div>
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(4)}
        >
          <HiOutlineReceiptRefund size={20} color={active === 4 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 4 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Refunds
          </span>
        </div>

        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(5) || navigate("/inbox")}
        >
          <AiOutlineMessage size={20} color={active === 5 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 5 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Inbox
          </span>
        </div>

        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(6)}
        >
          <MdOutlineTrackChanges size={20} color={active === 6 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 6 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Track Order
          </span>
        </div>

        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(7)}
        >
          <RiLockPasswordLine size={20} color={active === 7 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 7 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Change Password
          </span>
        </div>

        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(8)}
        >
          <TbAddressBook size={20} color={active === 8 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 8 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Address
          </span>
        </div>

        {user && user?.role === "Admin" && (
          <Link to="/admin/dashboard">
            <div
              className="flex items-center cursor-pointer w-full mb-8"
              onClick={() => setActive(9)}
            >
              <MdOutlineAdminPanelSettings
                size={20}
                color={active === 9 ? "red" : ""}
              />
              <span
                className={`pl-3 ${
                  active === 9 ? "text-[red]" : ""
                } 800px:block hidden`}
              >
                Admin Dashboard
              </span>
            </div>
          </Link>
        )}
        {isSeller && (
          <Link to="/dashboard">
            <div
              className="flex items-center cursor-pointer w-full mb-8"
              onClick={() => setActive(8)}
            >
              <RxDashboard size={20} color={active === 9 ? "red" : ""} />
              <span
                className={`pl-3 ${
                  active === 9 ? "text-[red]" : ""
                } 800px:block hidden`}
              >
                Shop Dashboard
              </span>
            </div>
          </Link>
        )}
        <div
          className="single_item flex items-center cursor-pointer w-full mb-8"
          onClick={() => setModalOpen(true)}
        >
          <AiOutlineLogin size={20} color={active === 10 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 10 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Log out
          </span>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
