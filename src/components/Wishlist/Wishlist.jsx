import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { NumericFormat } from "react-number-format";
import { toast } from "react-toastify";
import CustomModal from "../CustomModal";
import { AiFillDelete } from "react-icons/ai";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const myClickHandler = (e, props) => {
    setOpenWishlist(props);

    if (!e) {
      var e = window.event;
      e.cancelBubble = true;
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };
  const addToCartHandler = (data) => {
    if (data.sizes.length > 1) {
      navigate(`/product/${data._id}`);
      toast.info("Select size first.");
    } else {
      const newData = { ...data, qty: 1 };
      dispatch(addTocart(newData));
      dispatch(removeFromWishlist(data));
      toast.success("Item added to cart");
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 appear__smoothly"
      onClick={(e) => myClickHandler(e, false)}
    >
      <div
        onClick={(e) => myClickHandler(e, true)}
        className="fixed top-0 right-0 h-full w-[80%] overflow-y-scroll 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm"
      >
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center appear__smoothly">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={(e) => myClickHandler(e, false)}
              />
            </div>
            <div>
              <h5>Wishlist Items is empty!</h5>
              <Link
                to="/products"
                onClick={(e) => myClickHandler(e, false)}
                className="m-auto w-32 group mt-2 relative h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Add Wishlist
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={(e) => myClickHandler(e, false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {wishlist && wishlist.length} items
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {wishlist &&
                  wishlist.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      removeFromWishlistHandler={removeFromWishlistHandler}
                      addToCartHandler={addToCartHandler}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const totalPrice = data.discountPrice * value;

  return (
    <>
      {modalOpen && (
        <CustomModal
          message={"Are you sure you want to remove from favourite?"}
          ok={" Yes, I'm sure"}
          cancel={"No, cancel"}
          setModalOpen={setModalOpen}
          performAction={() => removeFromWishlistHandler(data)}
          closeModel={() => setModalOpen(false)}
        />
      )}
      <div className="border-b p-4 appear__smoothly">
        <div className="w-full flex items-center">
          <AiFillDelete
            className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2 min-w-[20px]"
            onClick={() => setModalOpen(true)}
            size={60}
            color={"rgb(240 11 11 / 86%)"}
          />
          <img
            src={`${data?.images[0]?.url}`}
            alt=""
            className="w-[70px] lg:w-[130px] h-min ml-2 mr-2 rounded-[5px]"
          />
          <div className="pl-[5px]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
            <h4 className="font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#d02222] font-Roboto">
              <NumericFormat
                value={totalPrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Ksh. "}
              />
            </h4>
          </div>
          <div>
            <BsCartPlus
              size={30}
              color="green"
              className="cursor-pointer"
              tile="Add to cart"
              onClick={() => addToCartHandler(data)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
