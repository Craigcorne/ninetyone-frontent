import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import FlashSaleCard from "./FlashSalesCard";
import { server } from "../../../server";
const FlashSale = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);
  useEffect(() => {
    axios
      .get(`${server}/flashsale/flash-sales`)
      .then((response) => {
        const flashSalesData = response.data;
        const combinedData = [];
        for (const flashSale of flashSalesData) {
          const product = allProducts.find(
            (product) => product._id === flashSale.productId
          );
          if (product) {
            combinedData.push({
              flashSale,
              product,
            });
          }
        }
        combinedData.sort((a, b) => {
          const endDateA = new Date(a.flashSale.endDate).getTime();
          const endDateB = new Date(b.flashSale.endDate).getTime();
          return endDateA - endDateB;
        });
        setData(combinedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [allProducts]);
  return (
    <div className="overflow-y-hidden">
      <div className={`${styles.section}`}>
        {/* add this */}
        {data.length > 0 && (
          <>
            <div className={`${styles.heading}`}>
              <h1>Flash Sale</h1>
            </div>
            <div className="overflow-x-auto border-0">
              <div className="flex space-x-4 mb-12">
                {data.map((combinedItem, index) => (
                  <div
                    key={index}
                    className="flex-none w-[200px] sm:w-[295px] lg:w-[300px]"
                  >
                    <FlashSaleCard data={combinedItem} key={index} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default FlashSale;
