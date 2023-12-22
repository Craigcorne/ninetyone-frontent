import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/styles";
import { server } from "../../server";

const DropDown = ({ setDropDown }) => {
  const navigate = useNavigate();
  const [categoriesData, setCategoriesData] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await axios.get(`${server}/category/categories`);
        setCategoriesData(response.data);
      } catch (error) {
        console.error("Error fetching categoriesData:", error);
      }
    };

    fetchCategoriesData();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [setDropDown]);

  const submitHandle = (category) => {
    navigate(`/products?category=${category.name}`);
    setDropDown(false);
  };

  return (
    <div
      className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm"
      ref={dropdownRef}
    >
      {categoriesData
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((category, index) => (
          <div
            key={index}
            className={`${styles.noramlFlex}`}
            onClick={() => submitHandle(category)}
          >
            <img
              src={`${category?.image[0]?.url}`}
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
                marginLeft: "10px",
                userSelect: "none",
              }}
              alt=""
            />
            <h3 className="m-3 cursor-pointer select-none">{category.name}</h3>
          </div>
        ))}
    </div>
  );
};
export default DropDown;
