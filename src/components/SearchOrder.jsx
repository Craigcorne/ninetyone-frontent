import React, { useEffect, useState } from "react";
import { server } from "../server";
import axios from "axios";
import {
  FaBox,
  FaTruck,
  FaCheck,
  FaInfoCircle,
  FaHourglass,
  FaHandshake,
} from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { NumericFormat } from "react-number-format";
import { BsFillBagFill } from "react-icons/bs";
import { FcDownload } from "react-icons/fc";
import { BiPhoneCall } from "react-icons/bi";
import moment from "moment";
import styles from "../styles/styles";
import { TbTruckDelivery } from "react-icons/tb";
import Typed from "react-typed";

const SearchOrder = () => {
  const [order, setOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("order isss", order);
  console.log("orders isss", orders);

  const getSpecificOrder = async () => {
    try {
      setLoading(true);
      await axios
        .get(`${server}/order/specific-order`, {
          params: {
            orderNo: inputValue,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setOrder(res.data.order);
          if (res.data.order === undefined) {
            setOrders(res.data.orders);
          }
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error occours", error);
      setLoading(false);
    }
  };

  const getStatusIndex = (status) => {
    return progressSteps.findIndex((step) => step.status === status);
  };

  const progressSteps = [
    { status: "Processing", label: "Order Placed", icon: <FaHourglass /> },
    {
      status: "Transferred to delivery partner",
      label: "Order Confirmed",
      icon: <FaHandshake />,
    },
    { status: "Shipping", label: "Order Shipped", icon: <FaTruck /> },
    { status: "Received", label: "Order In Transit", icon: <FaBox /> },
    {
      status: "On the way",
      label: "Out for Delivery",
      icon: <FaInfoCircle />,
    },
    { status: "Delivered", label: "Order Delivered", icon: <FaCheck /> },
    {
      status: "Rate Us",
      label: "Give us Rating",
      icon: <AiOutlineLike />,
    },
  ];

  const subTotals = order?.cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );
  const subTotals2 =
    orders[0]?.totalPrice - (orders[0]?.shippingPrice + orders[0]?.discount);
  const getCurrentStep = () => {
    const currentIndex = getStatusIndex(order?.status);
    return currentIndex > -1 ? currentIndex : progressSteps.length;
  };

  const refundHandler = async () => {
    toast.error("we are working on this");
    // await axios
    //   .put(`${server}/order/order-refund/${id}`, {
    //     status: "Processing refund",
    //   })
    //   .then((res) => {
    //     toast.success(res.data.message);
    //     dispatch(getAllOrdersOfUser(user._id));
    //   })
    //   .catch((error) => {
    //     toast.error(error.response.data.message);
    //   });
  };

  const id = order?._id;

  const handleDownloadReceipt = async () => {
    try {
      // Make a GET request to the backend route that generates the receipt.
      const response = await axios.get(
        `${server}/order/generate-receipt/${id}`,
        {
          responseType: "blob", // Set the response type to "blob".
        }
      );

      // Create a Blob from the response data.
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a download link and trigger the download.
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `receipt_${id}.pdf`;
      a.click();

      // Clean up by revoking the Object URL.
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // Handle any errors, e.g., show a notification.
      console.error("Error downloading receipt:", error);
    }
  };

  return (
    <>
      <Header activeHeading={5} />
      <div className="my-[50px] ml-10 justify-center">
        <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem]">
          <input
            type="email"
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            onChange={(e) => setInputValue(e.target.value)}
            required
          />
          <button
            className="!absolute right-1 top-1 z-10 select-none rounded bg-green-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
            type="button"
            data-ripple-light="true"
            onClick={() => getSpecificOrder()}
          >
            {loading ? <p>tracking...</p> : <p>track order</p>}
          </button>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Put order number
          </label>
        </div>

        {order && (
          <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="hidden lg:block m-5 mb-10">
              <h1 className="text-3xl font-bold mb-8 text-center">
                Track Your Order
              </h1>
              <div className="mb-6 text-center">
                <h2 className="text-xl font-bold mb-2">Order Status:</h2>
                <p className="text-lg">{order.status}</p>
              </div>
              <div className="mb-6 text-center">
                <h2 className="text-xl font-bold mb-2">Order Details:</h2>
                <p className="text-lg">Order No: {order.orderNo}</p>
                <p className="text-lg">
                  Ordered On: {order.createdAt.slice(0, 10)}
                </p>
              </div>
              <ol className="flex items-center w-full">
                {progressSteps.map((step, index) => (
                  <li
                    key={index}
                    className={`flex w-full items-center ${
                      index <= getCurrentStep()
                        ? "text-green-600 dark:text-green-400 after:content-[''] after:mb-[45px] after:w-full after:h-1 after:border-b after:border-white-100 after:border-4 after:inline-block dark:after:border-white-400"
                        : "after:content-[''] after:mb-[45px] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700"
                    }`}
                  >
                    <Link className="block">
                      <span
                        className={`flex ring-4 ring-white items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12  shrink-0`}
                      >
                        {step.icon ? (
                          <span
                            className={`w-3.5 h-3.5 text-${
                              index <= getCurrentStep() ? "green" : "gray"
                            }-600 lg:w-4 lg:h-4 dark:text-${
                              index <= getCurrentStep() ? "green" : "gray"
                            }-300`}
                          >
                            {step.icon}
                          </span>
                        ) : null}
                      </span>
                      <span className="">{step.label}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
        {order && (
          <div className="flex justify-start item-start space-y-2 flex-col">
            <div className="m-5 block lg:hidden justify-center items-center">
              <h1 className="text-3xl font-bold mb-8">Track Your Order</h1>
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Order Status:</h2>
                <p className="text-lg">{order.status}</p>
              </div>
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Order Details:</h2>
                <p className="text-lg">Order No: {order.orderNo}</p>
                <p className="text-lg">
                  Ordered On: {order.createdAt.slice(0, 10)}
                </p>
              </div>
              <ol className="relative ml-[30%] text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
                {order &&
                  progressSteps.map((step, index) => (
                    <li
                      key={index}
                      className={`mb-10 ml-6 ${
                        index <= getCurrentStep()
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      <Link>
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                          {step.icon ? (
                            <span>
                              {index <= getCurrentStep() ? (
                                <span className="w-3.5 h-3.5 text-green-500 dark:text-green-400">
                                  {step.icon}
                                </span>
                              ) : (
                                <span className="w-3.5 h-3.5">{step.icon}</span>
                              )}
                            </span>
                          ) : null}
                        </span>
                        <h3 className="font-medium align-center">
                          {step.label}
                        </h3>
                      </Link>
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        )}
        {order && (
          <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center">
                  <BsFillBagFill size={30} color="crimson" />
                  <h1 className="pl-2 text-[25px]">Order Details</h1>
                </div>
                <a
                  onClick={handleDownloadReceipt}
                  className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px] cursor-pointer`}
                >
                  <FcDownload
                    size={30}
                    color="crimson"
                    style={{ marginRight: "5px" }}
                  />{" "}
                  Receipt
                </a>
              </div>
              <h1 className="text-[20px] dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                Order No: {order?.orderNo}
              </h1>
              <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
                <p className="dark:text-gray-400 text-gray-300">Placed on: </p>{" "}
                {moment(order?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
              </p>
            </div>
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
              <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                <div className="flex flex-col rounded-md justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                  <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                    Customer's Cart
                  </p>
                  {order &&
                    order?.cart.map((item, index) => {
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
                      {order?.discount && (
                        <div className="flex justify-between items-center w-full">
                          <p className="text-base dark:text-white leading-4 text-gray-800">
                            Discount{" "}
                            <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                              exclusive
                            </span>
                          </p>
                          <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                            <NumericFormat
                              value={order.discount}
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
                            value={order?.shippingPrice}
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
                          value={Math.round(order?.totalPrice)}
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
                          value={order?.shippingPrice}
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
                        src="https://res.cloudinary.com/bramuels/image/upload/v1694812086/avatars/jyletzkwiydp6lyvvfcq.png"
                        className="w-[60px] h-[60px] rounded-full avatarimg"
                        alt=""
                      />
                      <div className="flex justify-start items-start flex-col space-y-2">
                        <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                          {order?.user.name}
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
                            {order?.user.email}
                          </p>
                        </div>
                        <div className="flex text-gray-800 dark:text-white items-center space-x-4 pb-4 border-b border-gray-200 w-full">
                          <BiPhoneCall size={25} className="dark:hidden" />
                          <BiPhoneCall
                            size={25}
                            className="hidden dark:block"
                          />

                          <p className="cursor-pointer text-sm leading-5 ">
                            {order?.user.phoneNumber}
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
                          {order?.user.phoneNumber}
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {order?.shippingAddress.address1}
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {order?.shippingAddress.address2}
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {order?.shippingAddress.country}
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {order?.shippingAddress.city}
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {order?.shippingAddress.zipCode}
                        </p>
                      </div>
                      <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                          Payment Info:{" "}
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          Status:{" "}
                          {order?.paymentInfo?.status
                            ? order?.paymentInfo?.status
                            : "Not Paid"}{" "}
                          <br />
                          Mode:{" "}
                          {order?.paymentInfo?.type
                            ? order?.paymentInfo?.type
                            : "Processing"}{" "}
                        </p>
                      </div>
                      <div className="flex justify-center md:justify-start items-center md:items-start flex-col">
                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                          Request a refund
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {order?.status === "Delivered" ? (
                            <div
                              className={`${styles.button} text-white`}
                              onClick={refundHandler}
                            >
                              Request a Refund:
                            </div>
                          ) : order?.status === "Processing refund" ? (
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
        )}
        {orders && orders.length !== 0 && (
          <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center">
                  <BsFillBagFill size={30} color="crimson" />
                  <h1 className="pl-2 text-[25px]">Order Details</h1>
                </div>
                <a
                  onClick={handleDownloadReceipt}
                  className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px] cursor-pointer`}
                >
                  <FcDownload
                    size={30}
                    color="crimson"
                    style={{ marginRight: "5px" }}
                  />{" "}
                  Receipt
                </a>
              </div>
              <h1 className="text-[20px] dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                Order No: {orders[0]?.orderNo}
              </h1>
              <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
                <p className="dark:text-gray-400 text-gray-300">Placed on: </p>{" "}
                {moment(orders[0]?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
              </p>
            </div>
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
              <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                <div className="flex flex-col rounded-md justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                  <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                    Customer's Cart
                  </p>
                  {orders.map((order, orderIndex) => (
                    <>
                      {order &&
                        order?.cart.map((item, index) => {
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
                    </>
                  ))}
                </div>

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
                            value={subTotals2}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Ksh. "}
                          />
                        </p>
                      </div>
                      {order?.discount && (
                        <div className="flex justify-between items-center w-full">
                          <p className="text-base dark:text-white leading-4 text-gray-800">
                            Discount{" "}
                            <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                              exclusive
                            </span>
                          </p>
                          <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                            <NumericFormat
                              value={orders[0]?.discount}
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
                            value={orders[0]?.shippingPrice}
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
                          value={Math.round(orders[0]?.totalPrice)}
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
                          value={order?.shippingPrice}
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
                        src="https://res.cloudinary.com/bramuels/image/upload/v1694812086/avatars/jyletzkwiydp6lyvvfcq.png"
                        className="w-[60px] h-[60px] rounded-full avatarimg"
                        alt=""
                      />
                      <div className="flex justify-start items-start flex-col space-y-2">
                        <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                          {orders[0]?.user.name ||
                            orders[0]?.user.user.guestName}
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
                            {orders[0]?.user.email}
                          </p>
                        </div>
                        <div className="flex text-gray-800 dark:text-white items-center space-x-4 pb-4 border-b border-gray-200 w-full">
                          <BiPhoneCall size={25} className="dark:hidden" />
                          <BiPhoneCall
                            size={25}
                            className="hidden dark:block"
                          />

                          <p className="cursor-pointer text-sm leading-5 ">
                            {orders[0]?.user.phoneNumber}
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
                          {orders[0]?.user.phoneNumber}
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {orders[0]?.shippingAddress.address1}
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {orders[0]?.shippingAddress.address2}
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {orders[0]?.shippingAddress.country}
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {orders[0]?.shippingAddress.city}
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {orders[0]?.shippingAddress.zipCode}
                        </p>
                      </div>
                      <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                          Payment Info:{" "}
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          Status:{" "}
                          {orders[0]?.paymentInfo?.status
                            ? orders[0]?.paymentInfo?.status
                            : "Not Paid"}{" "}
                          <br />
                          Mode:{" "}
                          {orders[0]?.paymentInfo?.type
                            ? orders[0]?.paymentInfo?.type
                            : "Processing"}{" "}
                        </p>
                      </div>
                      <div className="flex justify-center md:justify-start items-center md:items-start flex-col">
                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                          Request a refund
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {order?.status === "Delivered" ? (
                            <div
                              className={`${styles.button} text-white`}
                              onClick={refundHandler}
                            >
                              Request a Refund:
                            </div>
                          ) : order?.status === "Processing refund" ? (
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
        )}
      </div>

      <Footer />
    </>
  );
};

export default SearchOrder;
