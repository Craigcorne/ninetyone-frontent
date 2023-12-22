import React, { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { virtualize } from "react-swipeable-views-utils";
import { Link, useNavigate } from "react-router-dom";

import styles from "../../../styles/styles";
import { NumericFormat } from "react-number-format";
import CountDownn from "./CountDownn";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../../redux/actions/cart";

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const FlashSaleCard = ({ data }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { product } = data;
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { images, sizes, _id, name, shop, originalPrice, discountPrice } =
    product;

  const maxIndex = images.length - 1;

  const handleChangeIndex = (index) => {
    setCurrentImageIndex(index);
  };

  const addToCartHandler = (id) => {
    console.log("data", data);
    if (sizes.length > 1) {
      navigate(`/product/${_id}`);
      toast.info("Select size first.");
    } else {
      const isItemExists = cart && cart.find((i) => i._id === _id);
      if (isItemExists) {
        toast.error("Item already in cart!");
      } else {
        if (data.stock < 1) {
          toast.error("Product stock limited!");
        } else {
          const cartData = { ...product, qty: 1 };

          dispatch(addTocart(cartData));
          toast.success("Item added to cart successfully!");
        }
      }
    }
  };

  const nextImage = () => {
    const newIndex = currentImageIndex === maxIndex ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  const prevImage = () => {
    const newIndex = currentImageIndex === 0 ? maxIndex : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const slideRenderer = ({ index, key }) => (
    <div key={key} className="image-carousel relative">
      {images && images.length > 0 && images[index] && images[index].url ? (
        <img
          src={images[index].url}
          alt={`Product ${index + 1}`}
          className="w-full h-[170px] object-cover"
        />
      ) : (
        <div className="w-full h-[250px] bg-gray-200 flex items-center justify-center">
          No Image Available
        </div>
      )}
    </div>
  );

  // Function to show/hide arrows based on the current image index
  const toggleArrows = () => {
    const prevArrow = document.getElementById("prevArrow");
    const nextArrow = document.getElementById("nextArrow");

    if (prevArrow && nextArrow) {
      prevArrow.style.display = "block";
      nextArrow.style.display = "block";
    }
  };

  useEffect(() => {
    toggleArrows();
  }, [currentImageIndex]);

  return (
    <div
      className="w-full max-w-auto mx-auto"
      style={{ pointerEvents: "auto" }}
    >
      <div className="relative">
        <VirtualizeSwipeableViews
          index={currentImageIndex}
          onChangeIndex={handleChangeIndex}
          slideRenderer={slideRenderer}
          enableMouseEvents
          slideCount={images.length}
        />

        <div className="dot-indicators absolute bottom-2 left-0 right-0 flex justify-center gap-0.9">
          {images.map((_, index) => (
            <div
              key={index}
              className={`dot ${currentImageIndex === index ? "active" : ""}`}
              onClick={() => setCurrentImageIndex(index)}
              style={{ width: "7px", height: "7px" }}
            ></div>
          ))}
        </div>
      </div>

      <>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <Link to={`/shop/preview/${shop._id}`}>
            <h5 className={`${styles.shop_name}`}>{shop.name}</h5>
          </Link>
          <Link to={`/product/${_id}`}>
            <h4 className="pb-3 font-[500]">
              {name.length > 25 ? name.slice(0, 25) + "..." : name}
            </h4>
          </Link>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h4 className={`${styles.productDiscountPrice} text-base flex`}>
                <p className="text-sm mr-1">Ksh</p>
                <NumericFormat
                  value={originalPrice === 0 ? originalPrice : discountPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" "}
                />
              </h4>
              <h4 className={`${styles.price} text-sm`}>
                {originalPrice ? originalPrice : null}
              </h4>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-gray-600">Sale Ends In:</p>
            <CountDownn data={data} />
          </div>
          <div className="flex gap-2">
            <button
              href="#"
              className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => addToCartHandler(_id)}
            >
              Add to Cart
              {/* we need to work on this add to cart // go to cart  */}
            </button>
            <Link
              to={`/product/${_id}`}
              className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              see more
            </Link>
          </div>
        </div>
      </>
    </div>
  );
};

export default FlashSaleCard;
