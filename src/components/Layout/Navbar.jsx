import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";

const Navbar = ({ active }) => {
  const { compare } = useSelector((state) => state.compare);
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex">
            <Link
              to={i.url}
              className={`${
                active === index + 1
                  ? "text-[#17dd1f]"
                  : "text-black 800px:text-[#fff]"
              } pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
            >
              <div className="flex items-center">
                {i.title}
                {i.title === "Compare Products" && compare.length !== 0 && (
                  <div class="w-[10px] h-[10px] bg-green-400 rounded-full mx-1"></div>
                )}
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
