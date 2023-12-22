import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { NumericFormat } from "react-number-format";
import { TbArrowsShuffle2 } from "react-icons/tb";
import { addTocompare } from "../../../redux/actions/compare";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { compare } = useSelector((state) => state.compare);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    if (data.sizes.length > 1 && selectedSize === "") {
      toast.info("select size first");
    } else {
      setCount(count + 1);
    }
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else if (data.sizes.length > 1 && selectedSize === "") {
        toast.error("Please select the size!");
      } else {
        const cartData = {
          ...data,
          qty: count,
          size: selectedSize,
          discountPrice: selectedSize ? selectedPrice : data.discountPrice,
          selectedQuantity: selectedSize ? selectedQuantity : data.stock,
        };
        console.log("cartData", cartData);
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };
  const myClickHandler = (e, props) => {
    setOpen(props);

    if (!e) {
      var e = window.event;
      e.cancelBubble = true;
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };
  const addToCompareHandler = (id) => {
    const isItemExists = compare && compare.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Product already in comparelist!");
    } else {
      const compareData = { ...data, qty: 1 };
      dispatch(addTocompare(compareData));
      toast.success("Product added to comparelist!");
    }
  };

  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const getDescription = () => {
    if (showMore) {
      return data.description;
    } else {
      return data.description.length > 450
        ? data.description.slice(0, 450) + "..."
        : data.description;
    }
  };

  const maximum = () => {
    toast.error("Maximun Stock reached");
  };

  const notifyMe = () => {
    toast.info("We will let you know");
  };

  return (
    <div className="bg-[#fff] ">
      {data ? (
        <div
          onClick={(e) => myClickHandler(e, false)}
          className="appear__smoothly fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center"
        >
          <div
            onClick={(e) => myClickHandler(e, true)}
            className="w-[90%] 800px:w-[60%] h-[75vh] lg:h-[90vh] my-14 overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4 scroll__bar"
          >
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={(e) => myClickHandler(e, false)}
            />

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img src={`${data.images && data.images[0]?.url}`} alt="" />
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className="text-[#333] font-[600]">{data.name}</h1>
                <div className="disableStyles">
                  <p dangerouslySetInnerHTML={{ __html: getDescription() }}></p>
                  {data.description.length > 450 && (
                    <button
                      className="text-blue-500 hover:underline focus:outline-none"
                      onClick={toggleShowMore}
                    >
                      {showMore ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    <NumericFormat
                      value={selectedSize ? selectedPrice : data.discountPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Ksh. "}
                    />
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? (
                      <NumericFormat
                        value={data.originalPrice}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Ksh. "}
                      />
                    ) : null}
                  </h3>
                </div>
                {/* Display Sizes */}
                {data.sizes && data.sizes.length > 1 && (
                  <div className="block mt-3 items-center">
                    <span className="mr-3">Size:</span>
                    <div className="flex flex-wrap gap-2">
                      {data.sizes &&
                        data.sizes.length > 1 &&
                        data.sizes.map((size, index) => (
                          <button
                            key={index}
                            className={`px-4 py-2 rounded border ${
                              size.stock === 0 ? "text-gray-300	" : "text-black"
                            }  ${
                              selectedSize === size.name
                                ? "border-blue-500 text-blue-500"
                                : "bg-white text-black"
                            }`}
                            onClick={() => {
                              setSelectedSize(size.name);
                              setSelectedPrice(size.price);
                              setSelectedQuantity(size.stock);
                            }}
                            disabled={
                              selectedSize === size.name &&
                              selectedQuantity === 0
                            }
                            style={{
                              opacity:
                                selectedSize === size.name &&
                                selectedQuantity === 0
                                  ? 0.2
                                  : 1,
                            }}
                          >
                            {size.name}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
                {data.stock < 1 ? (
                  <p className="text-red-600">Out Of Stock</p>
                ) : (
                  <div className="w-full mt-4 flex justify-end">
                    <div className="w-full flex">
                      <div className="w-1/2">
                        <div className="text-lg font-bold">Qty:</div>
                        <div className="flex items-center mt-2">
                          <div
                            className={`${
                              count <= 1
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-gray-300 cursor-pointer"
                            } w-10 h-10 flex items-center justify-center rounded-full`}
                            onClick={decrementCount}
                          >
                            <span className="text-xl">-</span>
                          </div>
                          <div className="mx-4">{count}</div>
                          <div
                            className={`${
                              count >= data.stock
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-gray-300 cursor-pointer"
                            } w-10 h-10 flex items-center justify-center rounded-full`}
                            onClick={
                              data.stock <= count
                                ? maximum
                                : selectedSize && selectedQuantity <= count
                                ? maximum
                                : incrementCount
                            }
                          >
                            <span className="text-xl">+</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      {click ? (
                        <AiFillHeart
                          size={30}
                          className="cursor-pointer"
                          onClick={() => removeFromWishlistHandler(data)}
                          color={click ? "red" : "#333"}
                          title="Remove from wishlist"
                        />
                      ) : (
                        <AiOutlineHeart
                          size={30}
                          className="cursor-pointer"
                          onClick={() => addToWishlistHandler(data)}
                          title="Add to wishlist"
                        />
                      )}
                    </div>
                  </div>
                )}
                <div className="flex gap-4">
                  {data.stock === 0 ? (
                    <div
                      className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                      onClick={() => notifyMe()}
                    >
                      <span className="text-white flex items-center">
                        Notify Me <AiOutlineHeart className="ml-1" />
                      </span>
                    </div>
                  ) : selectedSize && selectedQuantity === 0 ? (
                    <div
                      className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                      onClick={() => notifyMe()}
                    >
                      <span className="text-white flex items-center">
                        Notify Me <AiOutlineHeart className="ml-1" />
                      </span>
                    </div>
                  ) : (
                    <div
                      className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                      onClick={() => addToCartHandler(data._id)}
                    >
                      <span className="text-white flex items-center">
                        Add to cart <AiOutlineShoppingCart className="ml-1" />
                      </span>
                    </div>
                  )}
                  <div
                    className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                    onClick={() => addToCompareHandler(data._id)}
                  >
                    <span className="text-white flex items-center">
                      Add to compare <TbArrowsShuffle2 className="ml-1" />
                    </span>
                  </div>
                </div>
                <h5 className="text-[16px] text-[#68d284] mt-5 ml-4">
                  {data?.sold_out !== 0 && <span>({data?.sold_out}) sold</span>}
                </h5>
                <div className="flex">
                  <Link to={`/shop/preview/${data.shop._id}`} className="flex">
                    <img
                      src={`${data.shop && data.shop?.avatar?.url}`}
                      alt=""
                      className="h-[100px] w-[100px] object-cover mr-3 mt-3"
                    />
                    <div>
                      <h3 className={`${styles.shop_name}`}>
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">
                        {data?.ratings} Ratings
                      </h5>
                    </div>
                  </Link>
                </div>
                <div
                  className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
