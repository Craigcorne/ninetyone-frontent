import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiFillDelete } from "react-icons/ai";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import { NumericFormat } from "react-number-format";
import CustomModal from "../CustomModal";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  const myClickHandler = (e, props) => {
    setOpenCart(props);

    if (!e) {
      var e = window.event;
      e.cancelBubble = true;
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };

  const CheckoutClose = (e, props) => {
    e.preventDefault();
    setOpenCart(props);
    navigate("/checkout");

    if (!e) {
      var e = window.event;
      e.cancelBubble = true;
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 appear__smoothly"
      onClick={(e) => myClickHandler(e, false)}
    >
      <div
        onClick={(e) => myClickHandler(e, true)}
        className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm"
      >
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center appear__smoothly ">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer min-w-[20px]"
                onClick={(e) => myClickHandler(e, false)}
              />
            </div>
            <div>
              <h5>Cart Items is empty!</h5>
              <Link
                to="/products"
                onClick={(e) => myClickHandler(e, false)}
                className="m-auto w-32 group mt-2 relative h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Shop Now
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
              <div className={`${styles.noramlFlex} p-2 lg:p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cart && cart.length} items
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t appear__smoothly">
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>

            <div className="px-5 mb-3">
              {/* checkout buttons */}
              <div className="cursor-pointer">
                <div
                  className={`h-[45px] mb-12 mt-1 lg:mb-0 flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                  onClick={(e) => CheckoutClose(e, false)}
                >
                  <h1 className="text-[#fff] font-[600]">
                    Checkout Now (
                    <NumericFormat
                      value={totalPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Ksh. "}
                    />
                    )
                  </h1>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const [modalOpen, setModalOpen] = useState(false);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock <= value) {
      toast.error("Product stock limited!");
    } else if (data.selectedQuantity <= value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <>
      {modalOpen && (
        <CustomModal
          message={"Are you sure you want to delete this product?"}
          ok={" Yes, I'm sure"}
          cancel={"No, cancel"}
          setModalOpen={setModalOpen}
          performAction={() => removeFromCartHandler(data)}
          closeModel={() => setModalOpen(false)}
        />
      )}
      <div className="border-b p-4">
        <div className="w-full flex items-center">
          <div>
            <div
              className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
              onClick={() => increment(data)}
            >
              <HiPlus size={18} color="#fff" />
            </div>
            <span className="pl-[10px]">{data.qty}</span>
            <div
              className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
              onClick={() => decrement(data)}
            >
              <HiOutlineMinus size={16} color="#7d879c" />
            </div>
          </div>

          <img
            src={`${data?.images[0]?.url}`}
            alt=""
            className="w-[70px] lg:w-[130px] h-min ml-2 mr-2 rounded-[5px]"
          />
          <div className="pl-[5px] text-[14px] lg:text-[16px]">
            <Link to="/">
              <h1>
                {data.name.length > 40
                  ? data.name.slice(0, 40) + "..."
                  : data.name}
              </h1>
            </Link>
            <h4 className="font-[400] text-[15px] text-[#00000082]">
              <NumericFormat
                value={data.discountPrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Ksh. "}
              />
              x {value}
            </h4>
            {data.size && (
              <h4 className="font-[400] text-[15px] text-[#00000082]">
                size: {data.size}
              </h4>
            )}
            <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
              <NumericFormat
                value={totalPrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Ksh. "}
              />
            </h4>
          </div>

          <AiFillDelete
            className="cursor-pointer min-w-[20px]"
            onClick={() => setModalOpen(true)}
            size={40}
            color={"rgb(240 11 11 / 86%)"}
          />
        </div>
      </div>
    </>
  );
};

export default Cart;
