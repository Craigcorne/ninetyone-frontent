import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/styles";
import { getAllOrdersOfUser } from "../redux/actions/order";
import { server } from "../server";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { BiPhoneCall } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";
import Typed from "react-typed";
import { FcDownload } from "react-icons/fc";

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);
  const [receipLoading, setReceiptLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  const subTotals = data?.cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const reviewHandler = async (e) => {
    if (rating > 1) {
      await axios
        .put(
          `${server}/product/create-new-review`,
          {
            user,
            rating,
            comment,
            productId: selectedItem?._id,
            orderId: id,
          },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success(res.data.message);
          dispatch(getAllOrdersOfUser(user._id));
          setComment("");
          setRating(null);
          setOpen(false);
        })
        .catch((error) => {
          toast.error(error);
        });
    } else {
      toast.error("Please give us a star");
    }
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
  const refundHandler = async () => {
    await axios
      .put(`${server}/order/order-refund/${id}`, {
        status: "Processing refund",
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

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

  const handleDownloadReceipt = async () => {
    setReceiptLoading(true);

    try {
      const response = await axios.get(
        `${server}/order/generate-receipt/${id}`,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `receipt_${id}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);
      setReceiptLoading(false);
    } catch (error) {
      console.error("Error downloading receipt:", error);
      setReceiptLoading(false);
    }
  };

  return (
    <>
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-start item-start space-y-2 flex-col">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center">
              <BsFillBagFill size={30} color="crimson" />
              <h1 className="pl-2 text-[25px]">Order Details</h1>
            </div>
            {receipLoading ? (
              <button
                disabled
                type="button"
                class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                Downloading...
              </button>
            ) : (
              <button
                onClick={handleDownloadReceipt}
                type="button"
                class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              >
                <FcDownload
                  size={30}
                  color="crimson"
                  style={{ marginRight: "5px" }}
                />{" "}
                Receipt
              </button>
            )}
          </div>
          <h1 className="text-[20px] dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
            Order No: {data?.orderNo}
          </h1>
          <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
            <p className="dark:text-gray-400 text-gray-300">Placed on: </p>{" "}
            {moment(data?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </p>
        </div>
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col rounded-md justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                Customer's Cart
              </p>
              {data &&
                data?.cart.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="mt-4 md:mt-6 flex md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8"
                    >
                      <div className="pb-4 md:pb-8 flex">
                        <img
                          className="w-36 h-36 hidden md:block object-contain"
                          src={`${item.images[0]?.url}`}
                          alt="dress"
                        />
                        <img
                          className="w-36 h-36 md:hidden object-contain"
                          src={`${item.images[0]?.url}`}
                          alt="dress"
                        />
                      </div>
                      <div className="ml-3 lg:ml-0 border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-80 lg:w-full pb-8">
                        <div className="w-full flex flex-col justify-start items-start">
                          <h3 className="dark:text-white font-semibold leading-6 text-gray-800">
                            {item.name}
                          </h3>
                          {item.size && (
                            <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                              Size: {item.size}
                            </p>
                          )}
                          <div className="flex justify-start items-start flex-col">
                            {!item.isReviewed &&
                            data?.status === "Delivered" ? (
                              <div
                                className={`${styles.button} text-[#fff]`}
                                onClick={() =>
                                  setOpen(true) || setSelectedItem(item)
                                }
                              >
                                Write a review
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="flex justify-center lg:justify-between gap-4 lg:gap-0 items-start w-full ">
                          <p className="text-base dark:text-white xl:text-lg leading-6">
                            <NumericFormat
                              value={item.discountPrice}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={""}
                              suffix={" "}
                            />{" "}
                          </p>
                          <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                            {item.qty}
                          </p>
                          <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                            <NumericFormat
                              value={item.discountPrice * item.qty}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"Ksh. "}
                              suffix={" "}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            {/* review popup */}
            {open && (
              <div
                onClick={(e) => myClickHandler(e, false)}
                className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center"
              >
                <div
                  onClick={(e) => myClickHandler(e, true)}
                  className="w-[85%] lg:w-[35%] h-[70vh] lg:h-[80vh] bg-[#fff] shadow rounded-md p-3"
                >
                  <div className="w-full flex justify-end p-3">
                    <RxCross1
                      size={30}
                      onClick={(e) => myClickHandler(e, false)}
                      className="cursor-pointer"
                    />
                  </div>
                  <h2 className="text-[30px] font-[500] font-Poppins text-center">
                    Give a Review
                  </h2>
                  <br />
                  <div className="w-full flex">
                    <img
                      src={`${selectedItem?.images[0]?.url}`}
                      alt=""
                      className="w-[80px] h-[80px]"
                    />
                    <div>
                      <div className="pl-3 text-[20px]">
                        {selectedItem?.name}
                      </div>
                      <h4 className="pl-3 text-[20px]">
                        Ksh.{selectedItem?.discountPrice} x {selectedItem?.qty}
                      </h4>
                    </div>
                  </div>

                  <br />
                  <br />

                  {/* ratings */}
                  <h5 className="pl-3 text-[20px] font-[500]">
                    Give a Rating <span className="text-red-500">*</span>
                  </h5>
                  <div className="flex w-full ml-2 pt-1">
                    {[1, 2, 3, 4, 5].map((i) =>
                      rating >= i ? (
                        <AiFillStar
                          key={i}
                          className="mr-1 cursor-pointer"
                          color="rgb(246,186,0)"
                          size={25}
                          onClick={() => setRating(i)}
                        />
                      ) : (
                        <AiOutlineStar
                          key={i}
                          className="mr-1 cursor-pointer"
                          color="rgb(246,186,0)"
                          size={25}
                          onClick={() => setRating(i)}
                        />
                      )
                    )}
                  </div>
                  <br />
                  <div className="w-full ml-3">
                    <label className="block text-[20px] font-[500]">
                      Write a comment
                      <span className="ml-1 font-[400] text-[16px] text-[#00000052]">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      name="comment"
                      id=""
                      // cols="20"
                      // rows="5"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="How was your product? write your expresion about it!"
                      className="mt-2 w-[95%] border p-2 outline-none"
                    ></textarea>
                  </div>
                  <div
                    className={`${styles.button} text-white text-[20px] ml-3`}
                    onClick={reviewHandler}
                  >
                    Submit
                  </div>
                </div>
              </div>
            )}
            {/* summary */}
            <div className="flex justify-center rounded-md flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Summary
                </h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      <NumericFormat
                        value={subTotals}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Ksh. "}
                      />
                    </p>
                  </div>
                  {data?.discount && (
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">
                        Discount{" "}
                        <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                          exclusive
                        </span>
                      </p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                        <NumericFormat
                          value={data.discount}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Ksh. "}
                        />
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Shipping
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      <NumericFormat
                        value={data?.shippingPrice}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Ksh. "}
                      />
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                    Total
                  </p>
                  <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                    <NumericFormat
                      value={Math.round(data?.totalPrice)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Ksh. "}
                    />
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Shipping
                </h3>
                <div className="flex justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="w-8 h-8">
                      <TbTruckDelivery size={45} />
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                        Normal Delivery
                        <br />
                        <span className="font-normal">
                          Delivery within 24 Hours
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">
                    <NumericFormat
                      value={data?.shippingPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Ksh. "}
                    />{" "}
                  </p>
                </div>
                <div className="w-full flex justify-center items-center">
                  <Link
                    to="/contact"
                    className="hover:bg-black rounded-md text-center dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white"
                  >
                    Send Us Email
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
              Customer
            </h3>
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  <img
                    src={`${user?.avatar?.url}`}
                    className="w-[60px] h-[60px] rounded-full avatarimg"
                    alt=""
                  />
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                      {data?.user.name}
                    </p>
                    <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">
                      Thanks-for-Shopping-with-Us!
                    </p>
                  </div>
                </div>

                <div className="">
                  <div className="block">
                    <div className="flex justify-center text-gray-800 dark:text-white items-center space-x-4 pt-4 w-full">
                      <img
                        className="dark:hidden"
                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg"
                        alt="email"
                      />
                      <img
                        className="hidden dark:block"
                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1dark.svg"
                        alt="email"
                      />
                      <p className="cursor-pointer text-sm leading-5 ">
                        {data?.user.email}
                      </p>
                    </div>
                    <div className="flex text-gray-800 dark:text-white items-center space-x-4 pb-4 border-b border-gray-200 w-full">
                      <BiPhoneCall size={25} className="dark:hidden" />
                      <BiPhoneCall size={25} className="hidden dark:block" />

                      <p className="cursor-pointer text-sm leading-5 ">
                        {data?.user.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-4 md:space-y-0 md:flex-row items-center md:items-start">
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col xl:mt-8">
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                      Shipping Address
                    </p>
                    <p className="w-48 mt-5 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      {data?.user.phoneNumber}
                    </p>
                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      {data?.shippingAddress.address1}
                    </p>
                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      {data?.shippingAddress.address2}
                    </p>
                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      {data?.shippingAddress.country}
                    </p>
                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      {data?.shippingAddress.city}
                    </p>
                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      {data?.shippingAddress.zipCode}
                    </p>
                  </div>
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                      Payment Info:{" "}
                    </p>
                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      Status:{" "}
                      {data?.paymentInfo?.status
                        ? data?.paymentInfo?.status
                        : "Not Paid"}{" "}
                      <br />
                      Mode:{" "}
                      {data?.paymentInfo?.type
                        ? data?.paymentInfo?.type
                        : "Processing"}{" "}
                    </p>
                  </div>
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col">
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                      Request a refund
                    </p>
                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      {data?.status === "Delivered" ? (
                        <div
                          className={`${styles.button} text-white`}
                          onClick={refundHandler}
                        >
                          Request a Refund:
                        </div>
                      ) : data?.status === "Processing refund" ? (
                        <p className="mt-2">
                          Refund Requested. It's being Processed
                        </p>
                      ) : (
                        <p className="mt-2">
                          Refunds only available after delivery
                        </p>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex w-full mt-2 justify-center items-center md:justify-start md:items-start">
                  <button className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-3 hover:bg-gray-200 outline-none ring-2 ring-offset-2 ring-gray-800 border border-gray-800 rounded-md font-medium w-96 2xl:w-full text-base leading-4 text-gray-800">
                    <Typed
                      className="text-black"
                      strings={["Asante Sana! Karibu Tena! 🥰"]}
                      typeSpeed={40}
                      backSpeed={50}
                      loop
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOrderDetails;
