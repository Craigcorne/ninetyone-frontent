import React from "react";

const Deleted = () => {
  //for upload purpose
  return (
    <p>these are deleted important ites</p>
    // order details page ///////
    //
    //     <div className={`py-4 min-h-screen ${styles.section}`}>
    //     <div className="w-full flex items-center justify-between">
    //       <div className="flex items-center">
    //         <BsFillBagFill size={30} color="crimson" />
    //         <h1 className="pl-2 text-[25px]">Order Details</h1>
    //       </div>
    //     </div>

    //     <div className="w-full flex items-center justify-between pt-6">
    //       <h5 className="text-[#00000084]">
    //         Order ID: <span>#{data?._id?.slice(0, 8)}</span>
    //       </h5>
    //       <h5 className="text-[#00000084]">
    //         Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
    //       </h5>
    //     </div>

    //     {/* order items */}
    //     <br />
    //     <br />
    //     {data &&
    //       data?.cart.map((item, index) => {
    //         return (
    //           <div className="w-full flex items-start mb-5">
    //             <img
    //               src={`${backend_url}/${item.images[0]}`}
    //               alt=""
    //               className="w-[80x] h-[80px]"
    //             />
    //             <div className="w-full">
    //               <h5 className="pl-3 text-[20px]">{item.name}</h5>
    //               <h5 className="pl-3 text-[20px] text-[#00000091]">
    //                 <NumericFormat
    //                   value={item.discountPrice}
    //                   displayType={"text"}
    //                   thousandSeparator={true}
    //                   prefix={"Ksh. "}
    //                   suffix={" "}
    //                 />
    //                 x {item.qty}
    //               </h5>
    //             </div>
    //             {!item.isReviewed && data?.status === "Delivered" ? (
    //               <div
    //                 className={`${styles.button} text-[#fff]`}
    //                 onClick={() => setOpen(true) || setSelectedItem(item)}
    //               >
    //                 Write a review
    //               </div>
    //             ) : null}
    //           </div>
    //         );
    //       })}

    //     {/* review popup */}
    //     {open && (
    //       <div
    //         onClick={(e) => myClickHandler(e, false)}
    //         className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center"
    //       >
    //         <div
    //           onClick={(e) => myClickHandler(e, true)}
    //           className="w-[50%] h-min bg-[#fff] shadow rounded-md p-3"
    //         >
    //           <div className="w-full flex justify-end p-3">
    //             <RxCross1
    //               size={30}
    //               onClick={(e) => myClickHandler(e, false)}
    //               className="cursor-pointer"
    //             />
    //           </div>
    //           <h2 className="text-[30px] font-[500] font-Poppins text-center">
    //             Give a Review
    //           </h2>
    //           <br />
    //           <div className="w-full flex">
    //             <img
    //               src={`${backend_url}/${selectedItem?.images[0]}`}
    //               alt=""
    //               className="w-[80px] h-[80px]"
    //             />
    //             <div>
    //               <div className="pl-3 text-[20px]">{selectedItem?.name}</div>
    //               <h4 className="pl-3 text-[20px]">
    //                 Ksh.{selectedItem?.discountPrice} x {selectedItem?.qty}
    //               </h4>
    //             </div>
    //           </div>

    //           <br />
    //           <br />

    //           {/* ratings */}
    //           <h5 className="pl-3 text-[20px] font-[500]">
    //             Give a Rating <span className="text-red-500">*</span>
    //           </h5>
    //           <div className="flex w-full ml-2 pt-1">
    //             {[1, 2, 3, 4, 5].map((i) =>
    //               rating >= i ? (
    //                 <AiFillStar
    //                   key={i}
    //                   className="mr-1 cursor-pointer"
    //                   color="rgb(246,186,0)"
    //                   size={25}
    //                   onClick={() => setRating(i)}
    //                 />
    //               ) : (
    //                 <AiOutlineStar
    //                   key={i}
    //                   className="mr-1 cursor-pointer"
    //                   color="rgb(246,186,0)"
    //                   size={25}
    //                   onClick={() => setRating(i)}
    //                 />
    //               )
    //             )}
    //           </div>
    //           <br />
    //           <div className="w-full ml-3">
    //             <label className="block text-[20px] font-[500]">
    //               Write a comment
    //               <span className="ml-1 font-[400] text-[16px] text-[#00000052]">
    //                 (optional)
    //               </span>
    //             </label>
    //             <textarea
    //               name="comment"
    //               id=""
    //               cols="20"
    //               rows="5"
    //               value={comment}
    //               onChange={(e) => setComment(e.target.value)}
    //               placeholder="How was your product? write your expresion about it!"
    //               className="mt-2 w-[95%] border p-2 outline-none"
    //             ></textarea>
    //           </div>
    //           <div
    //             className={`${styles.button} text-white text-[20px] ml-3`}
    //             onClick={rating > 1 ? reviewHandler : null}
    //           >
    //             Submit
    //           </div>
    //         </div>
    //       </div>
    //     )}

    //     <div className="border-t w-full text-right">
    //       <h5 className="pt-3 text-[18px]">
    //         Total Price:{" "}
    //         <strong>
    //           {" "}
    //           <NumericFormat
    //             value={data?.totalPrice}
    //             displayType={"text"}
    //             thousandSeparator={true}
    //             prefix={"Ksh. "}
    //           />
    //         </strong>
    //       </h5>
    //     </div>
    //     <br />
    //     <br />
    //     <div className="w-full 800px:flex items-center">
    //       <div className="w-full 800px:w-[60%]">
    //         <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
    //         <h4 className="pt-3 text-[20px]">
    //           {data?.shippingAddress.address1 +
    //             " " +
    //             data?.shippingAddress.address2}
    //         </h4>
    //         <h4 className=" text-[20px]">{data?.shippingAddress.country}</h4>
    //         <h4 className=" text-[20px]">{data?.shippingAddress.city}</h4>
    //         <h4 className=" text-[20px]">{data?.user?.phoneNumber}</h4>
    //       </div>
    //       <div className="w-full 800px:w-[40%]">
    //         <h4 className="pt-3 text-[20px]">Payment Info:</h4>
    //         <h4>
    //           Status:{" "}
    //           {data?.paymentInfo?.status
    //             ? data?.paymentInfo?.status
    //             : "Not Paid"}
    //         </h4>
    //         <br />
    //         {data?.status === "Delivered" && (
    //           <div
    //             className={`${styles.button} text-white`}
    //             onClick={refundHandler}
    //           >
    //             Give a Refund
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //     <br />
    //     <Link to="/">
    //       <div className={`${styles.button} text-white`}>Send Message</div>
    //     </Link>
    //     <br />
    //     <br />
    //   </div>
    //
    //payment page
    //
    // import React, { useState } from "react";
    // import { useNavigate } from "react-router-dom";
    // import styles from "../../styles/styles";
    // import { useEffect } from "react";
    // import mpesa from "./mpesa.png";
    // import mpesa1 from "./mpesa1.png";
    // import {
    //   CardNumberElement,
    //   useStripe,
    //   useElements,
    // } from "@stripe/react-stripe-js";
    // import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
    // import { useSelector } from "react-redux";
    // import axios from "axios";
    // import { server } from "../../server";
    // import { toast } from "react-toastify";
    // import { RxCross1 } from "react-icons/rx";
    // import { NumericFormat } from "react-number-format";
    // import { useFormik } from "formik";
    // import * as yup from "yup";
    // import Spinner from "../Spinner";

    // const Payment = () => {
    //   const [orderData, setOrderData] = useState([]);
    //   const [open, setOpen] = useState(false);
    //   const { user } = useSelector((state) => state.user);

    //   const navigate = useNavigate();
    //   const stripe = useStripe();
    //   const elements = useElements();

    //   useEffect(() => {
    //     const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    //     setOrderData(orderData);
    //   }, []);

    //   const createOrder = (data, actions) => {
    //     return actions.order
    //       .create({
    //         purchase_units: [
    //           {
    //             description: "Sunflower",
    //             amount: {
    //               currency_code: "USD",
    //               value: orderData?.totalPrice,
    //             },
    //           },
    //         ],
    //         // not needed if a shipping address is actually needed
    //         application_context: {
    //           shipping_preference: "NO_SHIPPING",
    //         },
    //       })
    //       .then((orderID) => {
    //         return orderID;
    //       });
    //   };

    //   const order = {
    //     cart: orderData?.cart,
    //     shippingAddress: orderData?.shippingAddress,
    //     user: user && user,
    //     totalPrice: orderData?.totalPrice,
    //   };

    //   const onApprove = async (data, actions) => {
    //     return actions.order.capture().then(function (details) {
    //       const { payer } = details;

    //       let paymentInfo = payer;

    //       if (paymentInfo !== undefined) {
    //         paypalPaymentHandler(paymentInfo);
    //       }
    //     });
    //   };

    //   const paypalPaymentHandler = async (paymentInfo) => {
    //     const config = {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     };

    //     order.paymentInfo = {
    //       id: paymentInfo.payer_id,
    //       status: "succeeded",
    //       type: "Paypal",
    //     };

    //     await axios
    //       .post(`${server}/order/create-order`, order, config)
    //       .then((res) => {
    //         setOpen(false);
    //         navigate("/order/success");
    //         toast.success("Order successful!");
    //         localStorage.setItem("cartItems", JSON.stringify([]));
    //         localStorage.setItem("latestOrder", JSON.stringify([]));
    //         setTimeout(() => {
    //           window.location.reload();
    //         }, 2000);
    //       });
    //   };

    //   const cashOnDeliveryHandler = async (e) => {
    //     e.preventDefault();

    //     const config = {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     };

    //     order.paymentInfo = {
    //       type: "Cash On Delivery",
    //     };

    //     await axios
    //       .post(`${server}/order/create-order`, order, config)
    //       .then((res) => {
    //         setOpen(false);
    //         navigate("/order/success");
    //         toast.success("Order successful!");
    //         localStorage.setItem("cartItems", JSON.stringify([]));
    //         localStorage.setItem("latestOrder", JSON.stringify([]));
    //         setTimeout(() => {
    //           window.location.reload();
    //         }, 2000);
    //       });
    //   };
    //   const mpesaPaymentHandler = async (e) => {
    //     e.preventDefault();

    //     const config = {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     };

    //     order.paymentInfo = {
    //       type: "Mpesa",
    //     };

    //     await axios
    //       .post(`${server}/order/create-order`, order, config)
    //       .then((res) => {
    //         setOpen(false);
    //         navigate("/order/success");
    //         toast.success("Order successful!");
    //         localStorage.setItem("cartItems", JSON.stringify([]));
    //         localStorage.setItem("latestOrder", JSON.stringify([]));
    //         setTimeout(() => {
    //           window.location.reload();
    //         }, 2000);
    //       });
    //   };

    //   return (
    //     <div className="w-full flex flex-col items-center py-8">
    //       <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
    //         <div className="w-full 800px:w-[65%]">
    //           <PaymentInfo
    //             user={user}
    //             open={open}
    //             setOpen={setOpen}
    //             onApprove={onApprove}
    //             createOrder={createOrder}
    //             cashOnDeliveryHandler={cashOnDeliveryHandler}
    //             mpesaPaymentHandler={mpesaPaymentHandler}
    //           />
    //         </div>
    //         <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
    //           <CartData orderData={orderData} />
    //         </div>
    //       </div>
    //     </div>
    //   );
    // };

    // const mpesaSchema = yup.object({
    //   phone: yup
    //     .string()
    //     .required("Phone Number is required")
    //     .min(10, "Phone number should be 10 numbers")
    //     .max(10, "Phone number must be 10 numbers"),
    // });
    // const PaymentInfo = ({
    //   user,
    //   open,
    //   setOpen,
    //   onApprove,
    //   createOrder,
    //   cashOnDeliveryHandler,
    //   mpesaPaymentHandler,
    // }) => {
    //   const [select, setSelect] = useState(1);
    //   const [orderData, setOrderData] = useState([]);
    //   const [loading, setLoading] = useState(false);
    //   const [error, setError] = useState(false);
    //   const [success, setSuccess] = useState(false);
    //   const [errorMessage, setErrorMessage] = useState("");
    //   const [successMessage, setSuccessMessage] = useState("");
    //   const navigate = useNavigate();

    //   useEffect(() => {
    //     const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    //     setOrderData(orderData);
    //   }, []);
    //   const amount1 = Math.round(orderData.totalPrice);

    //   const formik = useFormik({
    //     initialValues: {
    //       phone: `${user && user.phoneNumber ? user && user.phoneNumber : ""}`,
    //     },

    //     validationSchema: mpesaSchema,
    //     onSubmit: async (values) => {
    //       const phone = values.phone;
    //       const amount = amount1;

    //       await setLoading(true);
    //       await axios
    //         .post(
    //           `${server}/mpesa/stk`,
    //           { phone, amount },
    //           { withCredentials: true }
    //         )
    //         .then((res) => {
    //           toast.success("Stk Pushed to your phone");
    //           setLoading(false);
    //           setSuccess(true);
    //           setError(false);
    //           setSuccessMessage(
    //             "Please put Mpesa PIN in your phone to complete Payment"
    //           );
    //         })
    //         .catch((error) => {
    //           toast.error(error.response.data.message);
    //           setLoading(false);
    //           setError(true);
    //           setSuccess(false);
    //           setErrorMessage(error.response.data.message);
    //         });
    //       setTimeout(async () => {
    //         const config = {
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //         };
    //         const order = {
    //           cart: orderData?.cart,
    //           shippingAddress: orderData?.shippingAddress,
    //           user: user && user,
    //           totalPrice: orderData?.totalPrice,
    //         };

    //         order.paymentInfo = {
    //           type: "Mpesa",
    //         };
    //         await axios
    //           .post(`${server}/order/create-order`, order, config)
    //           .then((res) => {
    //             setOpen(false);
    //             navigate("/order/success");
    //             toast.success("Order successful!");
    //             localStorage.setItem("cartItems", JSON.stringify([]));
    //             localStorage.setItem("latestOrder", JSON.stringify([]));
    //             setTimeout(() => {
    //               window.location.reload();
    //             }, 3000);
    //           });
    //       }, 10000);
    //     },
    //   });

    //   return (
    //     <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
    //       {/* select buttons */}
    //       {/* mpesa payment */}
    //       <div>
    //         <div className="flex w-full pb-5 border-b mb-2">
    //           <div
    //             className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
    //             onClick={() => setSelect(1)}
    //           >
    //             {select === 1 ? (
    //               <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
    //             ) : null}
    //           </div>
    //           <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
    //             Pay with Mpesa
    //           </h4>
    //         </div>

    //         {/* pay with payement */}
    //         {select === 1 ? (
    //           <>
    //             <div className="">
    //               {error && (
    //                 <div
    //                   className="bg-red-100 border border-red-400 text-red-700 px-1 py-1 text-center mb-2 rounded relative"
    //                   role="alert"
    //                 >
    //                   <p>{errorMessage}</p>
    //                 </div>
    //               )}
    //               {success && (
    //                 <div
    //                   className="bg-green-100 border border-green-400 text-green-700 px-1 py-1 text-center mb-2 rounded relative"
    //                   role="alert"
    //                 >
    //                   <p>{successMessage}</p>
    //                 </div>
    //               )}
    //             </div>
    //             <div className=" w-ful lg:flex sm:block border-b">
    //               <div className="items-center">
    //                 <img
    //                   className="w-[125px] h-[125px] m-auto"
    //                   src={mpesa1}
    //                   alt="mpesaImg"
    //                 />
    //                 {/* <img
    //                   className="w-[125px] h-[100px] m-auto"
    //                   src={mpesa}
    //                   alt="mpesaImg"
    //                 /> */}
    //               </div>
    //               <form className="pt-2" onSubmit={formik.handleSubmit}>
    //                 <div className="w-full flex pb-3">
    //                   <label className=" w-[50%] pb-2 mt-[11px]">
    //                     Total Amount
    //                   </label>
    //                   <div className="w-[50%] text-[18px] font-[600] pb-2 mt-[11px]">
    //                     <NumericFormat
    //                       value={amount1}
    //                       displayType={"text"}
    //                       thousandSeparator={true}
    //                       prefix={"Ksh. "}
    //                     />
    //                   </div>
    //                 </div>

    //                 <div className="w-full flex pb-3">
    //                   <label className=" w-[50%] pb-2 mt-[11px]">
    //                     Phone Number
    //                   </label>
    //                   <div>
    //                     <input
    //                       placeholder={
    //                         formik.values.phone === ""
    //                           ? "07✱✱✱✱✱✱✱✱"
    //                           : formik.values.phone
    //                       }
    //                       // placeholder="07✱✱✱✱✱✱✱✱"
    //                       className={`${styles.input} p-3 w-[50%] text-[#444]`}
    //                       onChange={formik.handleChange("phone")}
    //                       onBlur={formik.handleBlur("phone")}
    //                       value={formik.values.phone}
    //                     />
    //                     <div className="text-red-500 text-xs">
    //                       {formik.touched.phone && formik.errors.phone}
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <div>
    //                   <button
    //                     disabled={loading || success}
    //                     type="submit"
    //                     className="group relative w-full flex justify-center mb-4 py-3 px-4 border border-transparent text-[16px] font-[600] rounded-[5px] text-white !bg-[#12b32a] hover:!bg-[#12b32a] disabled:!bg-[#a8deb0] disabled:cursor-not-allowed"
    //                   >
    //                     {loading ? (
    //                       <p className="flex">
    //                         <Spinner /> Processing...
    //                       </p>
    //                     ) : (
    //                       <p className="">
    //                         {success ? "Put PIN on your Phone" : "Pay Now"}
    //                       </p>
    //                     )}
    //                   </button>
    //                 </div>
    //               </form>
    //             </div>
    //           </>
    //         ) : null}
    //       </div>

    //       <br />
    //       {/* paypal payment */}
    //       <div>
    //         <div className="flex w-full pb-5 border-b mb-2">
    //           <div
    //             className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
    //             onClick={() => setSelect(2)}
    //           >
    //             {select === 2 ? (
    //               <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
    //             ) : null}
    //           </div>
    //           <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
    //             Pay with Paypal
    //           </h4>
    //         </div>

    //         {/* pay with payement */}
    //         {select === 2 ? (
    //           <div className="w-full flex border-b">
    //             <div
    //               className={`${styles.button} !bg-[#f0d613] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
    //               onClick={() => setOpen(true)}
    //             >
    //               Pay Now
    //             </div>
    //             {open && (
    //               <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
    //                 <div className="w-full 800px:w-[40%] h-screen 800px:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll">
    //                   <div className="w-full flex justify-end p-3">
    //                     <RxCross1
    //                       size={30}
    //                       className="cursor-pointer absolute top-3 right-3"
    //                       onClick={() => setOpen(false)}
    //                     />
    //                   </div>
    //                   <PayPalScriptProvider
    //                     options={{
    //                       "client-id":
    //                         "Aczac4Ry9_QA1t4c7TKH9UusH3RTe6onyICPoCToHG10kjlNdI-qwobbW9JAHzaRQwFMn2-k660853jn",
    //                     }}
    //                   >
    //                     <PayPalButtons
    //                       style={{ layout: "vertical" }}
    //                       onApprove={onApprove}
    //                       createOrder={createOrder}
    //                     />
    //                   </PayPalScriptProvider>
    //                 </div>
    //               </div>
    //             )}
    //           </div>
    //         ) : null}
    //       </div>

    //       <br />
    //       {/* cash on delivery */}
    //       <div>
    //         <div className="flex w-full pb-5 border-b mb-2">
    //           <div
    //             className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
    //             onClick={() => setSelect(3)}
    //           >
    //             {select === 3 ? (
    //               <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
    //             ) : null}
    //           </div>
    //           <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
    //             Cash on Delivery
    //           </h4>
    //         </div>

    //         {/* cash on delivery */}
    //         {select === 3 ? (
    //           <div className="w-full flex">
    //             <form className="w-full" onSubmit={cashOnDeliveryHandler}>
    //               <input
    //                 type="submit"
    //                 value="Confirm"
    //                 className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
    //               />
    //             </form>
    //           </div>
    //         ) : null}
    //       </div>
    //     </div>
    //   );
    // };

    // const CartData = ({ orderData }) => {
    //   const shipping = orderData?.shipping?.toFixed(2);
    //   return (
    //     <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
    //       <div className="flex justify-between">
    //         <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
    //         <h5 className="text-[18px] font-[600]">
    //           <NumericFormat
    //             value={Math.round(orderData?.subTotalPrice).toFixed(2)}
    //             displayType={"text"}
    //             thousandSeparator={true}
    //             prefix={"Ksh. "}
    //           />
    //         </h5>
    //       </div>
    //       <br />
    //       <div className="flex justify-between">
    //         <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
    //         <h5 className="text-[18px] font-[600]">
    //           {" "}
    //           <NumericFormat
    //             value={shipping}
    //             displayType={"text"}
    //             thousandSeparator={true}
    //             prefix={"Ksh. "}
    //           />
    //         </h5>
    //       </div>
    //       <br />
    //       <div className="flex justify-between border-b pb-3">
    //         <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
    //         <h5 className="text-[18px] font-[600]">
    //           {orderData?.discountPrice ? (
    //             <NumericFormat
    //               value={orderData?.discountPrice}
    //               displayType={"text"}
    //               thousandSeparator={true}
    //               prefix={"Ksh. "}
    //             />
    //           ) : (
    //             "-"
    //           )}
    //         </h5>
    //       </div>
    //       <h5 className="text-[18px] font-[600] text-end pt-3">
    //         <NumericFormat
    //           value={orderData?.totalPrice}
    //           displayType={"text"}
    //           thousandSeparator={true}
    //           prefix={"Ksh. "}
    //         />
    //       </h5>
    //       <br />
    //       <hr />
    //       <hr />
    //     </div>
    //   );
    // };

    // export default Payment;
    //
  );
};

export default Deleted;
