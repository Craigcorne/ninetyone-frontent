import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const RecentProduct = () => {
  const allProducts = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

  return (
    <div>
      {allProducts.length !== 0 && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Recently viewed Products</h1>
          </div>

          <div className="overflow-x-auto flex space-x-4 mb-12 border-0 ">
            {allProducts &&
              allProducts.map((i, index) => (
                <div className="flex-none w-[168px] sm:w-[250px]" key={index}>
                  <ProductCard data={i} inRecent />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentProduct;
