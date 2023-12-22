import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import { getAllProducts } from "../../redux/actions/product";

const ShopProduct = ({ data }) => {
  const { allProducts } = useSelector((state) => state.products);
  const [productData, setProductData] = useState([]);
  console.log("allProducts", data);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.shopId && data.category) {
      const filteredProducts = allProducts.filter(
        (product) =>
          product.shopId === data.shopId &&
          product.category === data.category &&
          product._id !== data._id
      );

      filteredProducts.sort((a, b) => b.sold_out - a.sold_out);

      const top10Products = filteredProducts.slice(0, 10);

      setProductData(top10Products);
    } else {
      setProductData([]);
    }
  }, [data, allProducts]);

  const handleScrollToTop = () => {
    dispatch(getAllProducts());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {data && productData.length > 0 ? (
        <div className={`p-1 ${styles.section}`} onClick={handleScrollToTop}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Similar From This Shop
          </h2>
          <div className="overflow-x-auto flex space-x-4 mb-12 border-0 ">
            {productData.map((product, index) => (
              <div
                className="flex-none h-[400px] w-[168px] sm:w-[250px]"
                key={index}
              >
                <ProductCard data={product} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ShopProduct;
