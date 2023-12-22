import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addTocompare, removeFromCompare } from "../redux/actions/compare";
import CompareProductsCard from "../components/compare/CompareProductsCard";
import Meta from "../components/Meta";
import Loader from "../components/Layout/Loader";
import styles from "../styles/styles";
import { Link } from "react-router-dom";
import SuggestedProduct from "../components/Products/SuggestedProduct";

const CompareProducts = () => {
  const { compare, isLoading } = useSelector((state) => state.compare);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const removeFromCompareHandler = (data) => {
    dispatch(removeFromCompare(data));
  };
  return (
    <>
      <Meta title="Compare-Products" />

      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} activeItem={"camera"} />
          <br />
          <br />
          <div className={`${styles.section} appear__smoothly`}>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {compare &&
                compare.map((i, index) => (
                  <CompareProductsCard data={i} key={index} />
                ))}
            </div>
            {compare && compare.length === 0 ? (
              <>
                <h1 className="text-center w-full pb-[100px] text-[20px]">
                  No products in Compare!
                  <Link
                    to="/products"
                    className="m-auto w-32 group mt-2 relative h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Add Now
                  </Link>
                </h1>
              </>
            ) : null}
          </div>
          <SuggestedProduct data={compare?.[0]} />

          <Footer />
        </div>
      )}
    </>
  );
};

export default CompareProducts;
