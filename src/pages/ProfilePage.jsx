import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import Loader from "../components/Layout/Loader";
import ProfileSideBar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
import { useSelector } from "react-redux";
import Meta from "../components/Meta";
import Footer from "../components/Layout/Footer";
import { useLocation } from "react-router-dom";

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const activeParam = params.get("active");

    if (activeParam === "2") {
      setActive(2);
    }
  }, [location]);

  return (
    <div>
      <Meta title="Profile" />

      {loading ? (
        <Loader />
      ) : (
        <>
          <Header activeItem={"settings"} />
          <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
            <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
              <ProfileSideBar active={active} setActive={setActive} />
            </div>
            <ProfileContent active={active} />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default ProfilePage;
