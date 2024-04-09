import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import Meta from "../components/Meta";
import { server } from "../server";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get(`${server}/category/categories`);
      const data = await response.data;
      dispatch({ type: "SET_CATEGORIES", payload: data });
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const categoriesData = useSelector((state) => state.categories);

  useEffect(() => {
    const sortedData = allProducts
      ?.slice()
      .sort((a, b) => b.sold_out - a.sold_out);
    const firstFive = sortedData && sortedData.slice(0, 6);
    setData(firstFive);
  }, [allProducts]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    if (selectedCategory === "") {
      const sortedData = allProducts
        ?.slice()
        .sort((a, b) => b.sold_out - a.sold_out);
      const firstFive = sortedData && sortedData.slice(0, 10);
      setData(firstFive);
    } else {
      const filteredData = allProducts?.filter(
        (product) => product.category === selectedCategory
      );
      const sortedData = filteredData
        ?.slice()
        .sort((a, b) => b.sold_out - a.sold_out);
      const firstFive = sortedData && sortedData.slice(0, 6);
      setData(firstFive);
    }
  }, [selectedCategory, allProducts]);

  return (
    <>
      <Meta title="Best Selling" />

      {isLoading || categoriesData === null ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={2} />
          <br />
          <br />
          <div className={`${styles.section} appear__smoothly`}>
            <div className="flex justify-start mb-4">
              <label className="mr-2">Category:</label>
              <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">All</option>
                {categoriesData &&
                  categoriesData
                    .sort((a, b) => a.name.localeCompare(b.name)) // Sort categories alphabetically
                    .map((i) => (
                      <option value={i.name} key={i.name}>
                        {i.name}
                      </option>
                    ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BestSellingPage;
