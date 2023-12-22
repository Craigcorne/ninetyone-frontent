import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import { getAllProducts } from "../../redux/actions/product";

const SuggestedProduct = ({ data }) => {
  const { allProducts } = useSelector((state) => state.products);
  const [productData, setProductData] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const d =
      allProducts && allProducts.filter((i) => i?.category === data?.category);
    setProductData(d);
  }, []);

  const handleScrollToTop = () => {
    dispatch(getAllProducts());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      {data ? (
        <div className={`p-4 ${styles.section}`} onClick={handleScrollToTop}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Product
          </h2>
          <div className="overflow-x-auto flex space-x-4 mb-12 border-0 ">
            {productData &&
              productData.map((i, index) => (
                <div className="flex-none h-[400px] w-[168px] sm:w-[250px]">
                  <ProductCard data={i} key={index} />
                </div>
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;
