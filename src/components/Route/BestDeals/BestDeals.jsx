import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const inStockProducts = allProductsData.filter(
      (product) => product.stock > 0
    );
    const sortedData = inStockProducts.sort((a, b) => b.sold_out - a.sold_out);
    const firstFive = sortedData.slice(0, 6);
    setData(firstFive);
  }, [allProducts]);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="overflow-x-auto flex space-x-4 mb-12 border-0">
          {data &&
            data.map((product, index) => (
              <div className="flex-none w-[168px] sm:w-[250px]" key={index}>
                <ProductCard data={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
