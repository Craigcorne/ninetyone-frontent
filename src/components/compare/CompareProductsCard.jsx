import React, { useState } from "react";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { NumericFormat } from "react-number-format";
import styles from "../../styles/styles";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { RxCross2 } from "react-icons/rx";
import { addTocart } from "../../redux/actions/cart";
import Ratings from "../Products/Ratings";
import ProductDetailsCard from "../Route/ProductDetailsCard/ProductDetailsCard";
import { removeFromCompare } from "../../redux/actions/compare";
import CustomModal from "../CustomModal";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const removeFromCompareHandler = (data) => {
    dispatch(removeFromCompare(data));
    toast.success("Product Removed form compare");
  };
  const addToCartHandler = (id) => {
    console.log("data", data);
    if (data.sizes.length > 1) {
      navigate(`/product/${id}`);
      toast.info("Select size first.");
    } else {
      const isItemExists = cart && cart.find((i) => i._id === id);
      if (isItemExists) {
        toast.error("Item already in cart!");
      } else {
        if (data.stock < 1) {
          toast.error("Product stock limited!");
        } else {
          const cartData = { ...data, qty: 1 };
          dispatch(addTocart(cartData));
          toast.success("Item added to cart successfully!");
        }
      }
    }
  };

  return (
    <>
      {modalOpen && (
        <CustomModal
          message={"Are you sure you want to remove from compare?"}
          ok={" Yes, I'm sure"}
          cancel={"No, cancel"}
          setModalOpen={setModalOpen}
          performAction={() => removeFromCompareHandler(data)}
          closeModel={() => setModalOpen(false)}
        />
      )}
      <div className="w-full h-full bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
        >
          <img
            src={`${data.images && data.images[0]?.url}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>
            <p className="text-[#4b5563]">Seller:</p> {data.shop.name}
          </h5>
        </Link>
        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
        >
          <p className="text-[#4b5563]">Product Name:</p>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
          <hr />
          <div className="lg:flex sm:block gap-4 my-2">
            <p className="text-[#4b5563]">Ratings:</p>
            <div className="flex">
              <Ratings rating={data?.ratings} />
            </div>
          </div>
          <hr />
          <div className="py-2 flex items-center justify-between">
            <div className="block">
              <div className="lg:flex sm:block gap-4 my-2">
                <p className="text-[#4b5563]">Price Now:</p>
                <h5 className={`${styles.productDiscountPrice}`}>
                  {data.originalPrice === 0 ? (
                    <NumericFormat
                      value={data.originalPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Ksh. "}
                    />
                  ) : (
                    <NumericFormat
                      value={data.discountPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Ksh. "}
                    />
                  )}
                </h5>
              </div>
              <div className="lg:flex sm:block gap-4 my-2 ">
                <p className="text-[#4b5563]">Price Was:</p>
                <h4 className="text-red-400 line-through">
                  {data.originalPrice ? (
                    <NumericFormat
                      value={data.originalPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Ksh. "}
                    />
                  ) : null}
                </h4>
              </div>
            </div>
          </div>
          <hr className="w-full" />
          <div className="lg:flex sm:block gap-5 my-2">
            <p className="text-[#4b5563]">Total sales:</p>
            <p>
              {data.sold_out === 0 ? "No Sales" : `${data.sold_out} product(s)`}
            </p>
          </div>
          <hr className="w-full" />
          <div className="lg:flex sm:block gap-5 my-2">
            <p className="text-[#4b5563]">Stock:</p>
            <p>
              {data.stock === 0 ? "Out of Stock" : `${data.stock} remaining`}
            </p>
          </div>
          <hr />
          <div className="lg:flex sm:block gap-4 my-2">
            <p className="text-[#4b5563] ">Category:</p>
            <p>{data.category}</p>
          </div>
          <hr />
          <div className="block my-2">
            <p className="text-[#4b5563] ">Name in Full:</p>
            <p>{data.name}</p>
          </div>
          <hr />
        </Link>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-36"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-36"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Add to cart"
          />
          <RxCross2
            size={25}
            className="cursor-pointer absolute right-2 top-1"
            onClick={() => setModalOpen(true)}
            color="#444"
            title="remove from compare"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
