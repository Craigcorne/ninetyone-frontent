import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../styles/styles";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import axios from "axios";
import { server } from "../../../server";

const Categories = () => {
  const navigate = useNavigate();
  const [hideLeftArrow, setHideLeftArrow] = useState(true);
  const [hideRightArrow, setHideRightArrow] = useState(false);
  const sliderRef = useRef(null);

  const [categoriesData, setCategoriesData] = useState([]);

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
    const slider = sliderRef.current;
    slider.addEventListener("scroll", handleScroll);

    return () => {
      slider.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const submitHandle = (category) => {
    navigate(`/products?category=${category.name}`);
    // window.location.reload();
  };

  const handleScroll = () => {
    const slider = sliderRef.current;
    const isAtStart = slider.scrollLeft === 0;
    const isAtEnd =
      slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth;

    setHideLeftArrow(isAtStart);
    setHideRightArrow(isAtEnd);
  };

  const slideLeft = () => {
    const slider = sliderRef.current;
    slider.scrollLeft -= 250;
  };

  const slideRight = () => {
    const slider = sliderRef.current;
    slider.scrollLeft += 250;
  };

  const handleSubmit = (category) => {
    navigate(`/products?category=${category.title}`);
  };

  return (
    <>
      {/* Branding component */}
      <div className={`${styles.section} hidden sm:block`}>
        {/* Branding content */}
      </div>

      {/* Categories component */}
      <div className="mt-1 lg:mt-6 ">
        <div
          className={`${styles.section} relative  bg-white lg:p-6 sm:p-2 rounded-lg lg:mb-12 sm:mb-3 `}
          id="categories"
        >
          {!hideLeftArrow && (
            <MdChevronLeft
              className="absolute z-10 top-[37%] rounded-full left-[-11px] bg-[#f9f4f4]"
              onClick={slideLeft}
              size={35}
            />
          )}

          <div
            className="overflow-x-auto flex space-x-4 border-0 scroll__bar removeScrollbar"
            id="slider"
            ref={sliderRef}
            style={{ scrollBehavior: "smooth" }}
          >
            {categoriesData &&
              categoriesData
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((category, index) => (
                  <div
                    className="border mx-2 mt-1 p-3 min-w-[100px] w-fit h-[100px] lg:h-[120px] rounded-md cursor-pointer"
                    key={index}
                    onClick={() => submitHandle(category)}
                  >
                    <p className="text-sm">{category.name}</p>
                    <img
                      src={`${category.image[0]?.url}`}
                      className="lg:w-[170px] sm:w-[100px] object-cover h-[60px] lg:h-[80px]"
                      alt=""
                    />
                  </div>
                ))}
          </div>

          {!hideRightArrow && (
            <MdChevronRight
              className="absolute z-10 top-[37%] rounded-full right-[-11px] bg-[#f9f4f4]"
              onClick={slideRight}
              size={35}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Categories;
