import React, { useEffect, useState } from "react";
import {
  AiOutlineMessage,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import Typed from "react-typed";
import { FiCopy } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { server } from "../../server";
import styles from "../../styles/styles";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";
import { TbArrowsShuffle2 } from "react-icons/tb";
import { addTocompare } from "../../redux/actions/compare";
import { NumericFormat } from "react-number-format";
import { formatDistanceToNow } from "date-fns";
import { IoIosShareAlt } from "react-icons/io";
import Loader from "../Layout/Loader";

const ProductDetails = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { compare } = useSelector((state) => state.compare);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
    setLoading(false);
  }, [data, wishlist]);

  const incrementCount = () => {
    if (data.sizes.length > 1 && selectedSize === "") {
      toast.info("select size first");
    } else {
      setCount(count + 1);
    }
  };
  const maximum = () => {
    toast.error("Maximun Stock reached");
  };
  const minimum = () => {
    toast.error("Minimun Stock reached");
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  useEffect(() => {
    // Whenever selectedSize changes, reset the count to 1
    setCount(1);
  }, [selectedSize]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    // setClick(!click);
    dispatch(addToWishlist(data));
    toast.success("Product added to wishlist");
  };
  const notifyMe = () => {
    toast.info("We will let you know");
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
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
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
  const copyToClipboard = (text) => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    toast.info("Link copied to clipboard");
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

  const shareToSocialMedia = (value) => {
    // Check if the navigator supports the share API
    if (navigator.share) {
      navigator
        .share({
          title: "Product Link",
          text: "Check out this product!",
          url: value,
        })
        .then(() => {
          console.log("Product link shared successfully!");
        })
        .catch((error) => {
          console.error("Error sharing product link:", error);
        });
    } else {
      // Fallback to copying the link to clipboard
      copyToClipboard(value);
    }
  };

  return (
    <div className="bg-white">
      {loading ? (
        <Loader />
      ) : (
        <>
          {data ? (
            <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
              <div className="w-full py-5">
                <div className="block w-full 800px:flex">
                  <div className="w-full 800px:w-[50%]">
                    <img
                      src={`${data && data.images[select]?.url}`}
                      alt=""
                      className="w-[370px] lg:w-[80%] h-[370px] lg:h-fit object-contain"
                    />
                    <div className="w-full flex justify-center items-center gap-1">
                      {data &&
                        data.images.map((i, index) => (
                          <div
                            className={`${
                              select === 0 ? "border rounded" : "null"
                            } cursor-pointer`}
                          >
                            <img
                              src={`${i?.url}`}
                              alt=""
                              className="h-[50px] w-[50px] lg:h-[100px] lg:w-[100px] object-cover mr-3 mt-3"
                              onClick={() => setSelect(index)}
                            />
                          </div>
                        ))}
                      <div
                        className={`${
                          select === 1 ? "border" : "null"
                        } cursor-pointer`}
                      ></div>
                    </div>
                  </div>
                  <div className="w-full 800px:w-[50%] pt-5 ml-2">
                    <h1 className="text-[16px] lg:text-[25px]  font-[600] font-Roboto text-[#333]">
                      {data.name}
                    </h1>
                    <div className="disableStyles mt-3 text-[14px] lg:text-[16px]">
                      <p
                        dangerouslySetInnerHTML={{ __html: getDescription() }}
                      ></p>
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
                          value={
                            selectedSize ? selectedPrice : data.discountPrice
                          }
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Ksh. "}
                        />
                      </h4>
                      <h3 className={`${styles.price}`}>
                        <NumericFormat
                          value={data.originalPrice}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </h3>
                    </div>
                    <p
                      className={`
                      ${
                        selectedSize && selectedQuantity !== 0
                          ? `text-[#5500ff]`
                          : selectedSize && selectedQuantity <= 0
                          ? `text-red-500`
                          : !selectedSize && data.stock !== 0
                          ? `text-[#5500ff]`
                          : `text-red-500`
                      }
                      `}
                    >
                      {selectedSize &&
                      selectedQuantity !== 0 &&
                      selectedQuantity > 0
                        ? `${selectedQuantity} products remaining`
                        : selectedSize && selectedQuantity <= 0
                        ? `Out of Stock`
                        : !selectedSize && data.stock !== 0
                        ? `${data.stock} products remaining`
                        : `Out of Stock`}
                    </p>
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
                                  size.stock <= 0
                                    ? "text-gray-300	"
                                    : "text-black"
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
                                  selectedQuantity <= 0
                                }
                                style={{
                                  opacity:
                                    selectedSize === size.name &&
                                    selectedQuantity <= 0
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
                      <div className="w-full mt-4 flex flex-end">
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
                      {data.stock <= 0 ? (
                        <div
                          className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                          onClick={() => notifyMe()}
                        >
                          <span className="text-white flex items-center">
                            Notify Me <AiOutlineHeart className="ml-1" />
                          </span>
                        </div>
                      ) : selectedSize && selectedQuantity <= 0 ? (
                        <div
                          className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                          onClick={() => notifyMe()}
                        >
                          <span className="text-white flex items-center">
                            Notify Me <AiOutlineHeart className="ml-1" />{" "}
                          </span>
                        </div>
                      ) : (
                        <div
                          className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                          onClick={() => addToCartHandler(data._id)}
                        >
                          <span className="text-white flex items-center">
                            Add to cart{" "}
                            <AiOutlineShoppingCart className="ml-1" />
                          </span>
                        </div>
                      )}
                      <div
                        className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                        onClick={() => addToCompareHandler(data._id)}
                      >
                        <span className="text-white flex items-center">
                          Add to compare <TbArrowsShuffle2 className="ml-1" />
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center my-3 text-szm">
                      <h3 className="product-heading mr-1 text-[13px]">
                        Share Product:
                      </h3>

                      <p
                        onClick={() =>
                          shareToSocialMedia(
                            `${
                              isEvent === true
                                ? `/product/${data._id}?isEvent=true`
                                : `/product/${data._id}`
                            }`
                          )
                        }
                        className="cursor-pointer"
                      >
                        <div className="flex items-center text-[13px]">
                          <IoIosShareAlt
                            size={20}
                            color="blue"
                            className="fs-5 me-2"
                          />{" "}
                          <Typed
                            strings={["Click Here To Share this Product."]}
                            typeSpeed={40}
                            backSpeed={50}
                            loop
                          />
                        </div>
                      </p>
                    </div>
                    <div className="flex items-center pt-4">
                      <Link to={`/shop/preview/${data?.shop._id}`}>
                        <img
                          src={`${data?.shop?.avatar?.url}`}
                          alt=""
                          className="w-[50px] h-[50px] rounded-full mr-2"
                        />
                      </Link>
                      <div className="pr-8">
                        <Link to={`/shop/preview/${data?.shop._id}`}>
                          <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                            {data.shop.name}
                          </h3>
                        </Link>
                        <h5 className="pb-3">({averageRating}/5) Ratings</h5>
                      </div>
                      <div
                        className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                        onClick={handleMessageSubmit}
                      >
                        <span className="text-white flex items-center">
                          Send Message <AiOutlineMessage className="ml-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ProductDetailsInfo
                data={data}
                products={products}
                totalReviewsLength={totalReviewsLength}
                averageRating={averageRating}
              />
              <br />
              <br />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-5 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[14px] lg:text-[16px] px-1 leading-5 font-[600] cursor-pointer"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[14px] lg:text-[16px] px-1 leading-5 font-[600] cursor-pointer"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[14px] lg:text-[16px] px-1 leading-5 font-[600] cursor-pointer"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p
            className="py-2 leading-8 pb-10 whitespace-pre-line disableStyles"
            dangerouslySetInnerHTML={{
              __html: data.description,
            }}
          ></p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data &&
            data.reviews
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((item, index) => (
                <div className="w-full flex my-4" key={index}>
                  <img
                    src={`${item.user.avatar.url}`}
                    className="w-[50px] h-[50px] rounded-full"
                    alt=""
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://res.cloudinary.com/bramuels/image/upload/v1692606180/avatars/pgjeicwdkm5pdpk99eon.png";
                    }}
                  />
                  <div className="pl-2">
                    <div className="flex w-full items-center">
                      <h1 className="font-[600] pr-2">{item.user.name}</h1>
                      <Ratings rating={item.rating} />
                    </div>
                    <p className="font-[400] text-[#000000a7]">
                      {item?.comment}
                    </p>
                    <p className="text-[#1307f1a7] text-sm">
                      {formatDistanceToNow(new Date(item?.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              ))}

          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5>No Reviews have for this product!</h5>
            )}
          </div>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${data.shop._id}`}>
              <div className="flex items-center">
                <img
                  src={`${data?.shop?.avatar?.url}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-2">({averageRating}/5) Ratings</h5>
                </div>
              </div>
            </Link>
            <p
              className="pt-2"
              dangerouslySetInnerHTML={{
                __html: data.shop.description,
              }}
            ></p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[500]">
                  {data.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:{" "}
                <span className="font-[500]">
                  {products && products.length}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews:{" "}
                <span className="font-[500]">{totalReviewsLength}</span>
              </h5>
              <Link to="/">
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
