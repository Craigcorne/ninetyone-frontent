import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { NumericFormat } from "react-number-format";
import { useFormik } from "formik";
import * as yup from "yup";
import Spinner from "../Spinner";
import mpesa1 from "./mpesa1.png";

const Payment = () => {
  const { user } = useSelector((state) => state.user);
  const { statements } = useSelector((state) => state.statements);
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const exchangeRate = statements?.map((i) => i.exchangeRate);
  const paypalTotals = (
    (orderData?.totalPrice / exchangeRate) * 1.0349 +
    0.49
  ).toFixed(2);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: paypalTotals,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const order = {
    cart: orderData?.cart,
    orderNo: orderData?.orderNumber,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
    shippingPrice: orderData.shippingPrice,
    discount: orderData.discountPrice,
    date: Date.now(),
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;

      let paymentInfo = payer;

      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };

  const paypalPaymentHandler = async (paymentInfo) => {
    setLoading2(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    };

    await axios
      .post(`${server}/order/create-order`, order, config)
      .then(async (res) => {
        setOpen(false);
        navigate("/order/success");
        toast.success("Order successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
    try {
      axios.post(`${server}/order/sendmyorder`, order, config);
    } catch (error) {
      loading1(false);
      console.log(error);
    }

    setLoading2(false);
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();
    setLoading1(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      type: "Cash On Delivery",
    };
    try {
      await axios
        .post(`${server}/order/create-order`, order, config)

        .then(async (res, next) => {
          setOpen(false);
          navigate("/order/success");
          toast.success("Order successful!");
          localStorage.setItem("cartItems", JSON.stringify([]));
          localStorage.setItem("latestOrder", JSON.stringify([]));
          // await axios.post(`${server}/order/sendmyorder`, order, config);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
      try {
        axios.post(`${server}/order/sendmyorder`, order, config);
      } catch (error) {
        loading1(false);
        console.log(error);
      }
      setLoading1(false);
    } catch (error) {
      setLoading1(false);
    }

    setLoading1(false);
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            onApprove={onApprove}
            createOrder={createOrder}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
            loading1={loading1}
            loading2={loading2}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const mpesaSchema = yup.object({
  phone: yup
    .string()
    .required("Phone Number is required")
    .min(10, "Phone number should be 10 numbers")
    .max(10, "Phone number must be 10 numbers"),
});
const PaymentInfo = ({
  user,
  open,
  setOpen,
  onApprove,
  createOrder,
  cashOnDeliveryHandler,
  loading1,
  loading2,
}) => {
  const [select, setSelect] = useState(1);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [validating, setValidating] = useState(false);
  const [limit, setLimit] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [requestID, setRequestID] = useState("");
  const [callbackData, setCallbackData] = useState("");

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  useEffect(() => {
    console.log("this is the", requestID);
    if (requestID && callbackData) {
      if (callbackData.TinyPesaID !== requestID) {
        setErrorMessage(null);
      }
      if (
        callbackData.TinyPesaID === requestID &&
        callbackData.ResultCode === 0
      ) {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const order = {
          cart: orderData?.cart,
          orderNo: orderData?.orderNumber,
          shippingAddress: orderData?.shippingAddress,
          shippingPrice: orderData.shippingPrice,
          user: user && user,
          totalPrice: orderData?.totalPrice,
          date: Date.now(),
        };

        order.paymentInfo = {
          type: "Mpesa",
          status: "succeeded",
        };

        axios
          .post(`${server}/order/create-order`, order, config)
          .then((res) => {
            setOpen(false);
            navigate("/order/success");
            toast.success("Your Payment is Sucessful and order placed");
            localStorage.setItem("cartItems", JSON.stringify([]));
            localStorage.setItem("latestOrder", JSON.stringify([]));
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          });
        try {
          axios.post(`${server}/order/sendmyorder`, order, config);
        } catch (error) {
          loading1(false);
          console.log(error);
        }
      } else if (
        callbackData.TinyPesaID === requestID &&
        callbackData.ResultCode === 1032
      ) {
        setSuccessMessage(null);
        setErrorMessage(
          "You cancelled the transaction or took too long to pay"
        );
      } else if (
        callbackData.TinyPesaID === requestID &&
        callbackData.ResultCode === 2001
      ) {
        setSuccessMessage(null);
        setErrorMessage("You entered wrong PIN");
      } else if (
        callbackData.TinyPesaID === requestID &&
        callbackData.ResultCode === 1037
      ) {
        setSuccessMessage(null);
        setErrorMessage("Sorry, We did not reach your number");
      } else if (
        callbackData.TinyPesaID === requestID &&
        callbackData.ResultCode === 1
      ) {
        setSuccessMessage(null);
        setErrorMessage(
          "Your Mpesa balance is not enough for this transaction"
        );
      }
    }
  }, [requestID, callbackData]);

  let timeoutId;

  const fetchCallbackData = () => {
    axios
      .get(`${server}/tiny/get-callback-status`)
      .then((response) => {
        const callbackData = response.data;
        console.log(callbackData);
        setCallbackData(callbackData);

        if (callbackData) {
        }

        timeoutId = setTimeout(fetchCallbackData, 500);
      })
      .catch((error) => {
        console.error(error);

        timeoutId = setTimeout(fetchCallbackData, 500);
      });
  };
  setTimeout(() => {
    clearTimeout(timeoutId);
  }, 30000);

  const amount1 = Math.round(orderData.totalPrice);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      phone: `${user && user.phoneNumber ? user && user.phoneNumber : ""}`,
    },

    validationSchema: mpesaSchema,
    onSubmit: async (values) => {
      const phone = values.phone;
      const amount = amount1;
      await setLoading(true);
      await axios
        .post(
          `${server}/tiny/tinystk`,
          { phone, amount },
          { withCredentials: true }
        )
        .then((res) => {
          setRequestID(res.data.request_id);
          setErrorMessage(null);
          toast.success("Stk Pushed to your phone");
          setLoading(false);
          setSuccess(true);
          setError(false);
          fetchCallbackData();
          setSuccessMessage(
            "Please put Mpesa PIN in your phone to complete Payment"
          );
        })
        .catch((error) => {
          setError(true);
          if (error.response.data.message === "Request cancelled by user") {
            setErrorMessage("You cancelled the transaction");
          } else {
            setErrorMessage(error.response.data.message);
          }
          setLoading(false);
          setSuccess(false);
        });
    },
  });

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

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      {/* select buttons */}
      {/* mpesa payment */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(1)}
          >
            {select === 1 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Mpesa
          </h4>
        </div>

        {/* pay with payement */}
        {select === 1 ? (
          <>
            <div className="">
              {errorMessage && (
                <div
                  className="bg-red-100 border block border-red-400 text-red-700 px-1 py-1 text-center mb-2 rounded relative"
                  role="alert"
                >
                  <p>{errorMessage}</p>
                  <p className="text-xs text-gray-900 dark:text-white">
                    If your account has been debited please call or live chat us
                    0712012113
                  </p>

                  <p className="text-xs text-gray-900 dark:text-white">
                    (Refresh this page to send stk push again)
                  </p>
                </div>
              )}
              {success && (
                <div
                  className="bg-green-100 border border-green-400 text-green-700 px-1 py-1 text-center mb-2 rounded relative"
                  role="alert"
                >
                  <p>{successMessage}</p>
                </div>
              )}
            </div>
            <div className=" w-ful lg:flex sm:block border-b appear__smoothly">
              <div className="items-center">
                <img
                  className="w-[125px] h-[125px] m-auto"
                  src={mpesa1}
                  alt="mpesaImg"
                />
              </div>
              <form className="pt-2 " onSubmit={formik.handleSubmit}>
                <div className="w-full flex pb-3">
                  <label className=" w-[50%] pb-2 mt-[11px]">
                    Total Amount
                  </label>
                  <div className="w-[50%] text-[18px] font-[600] pb-2 mt-[11px]">
                    <NumericFormat
                      value={amount1}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Ksh. "}
                    />
                  </div>
                </div>

                <div className="w-full flex pb-3">
                  <label className=" w-[50%] pb-2 mt-[11px]">
                    Phone Number
                  </label>
                  <div>
                    <input
                      placeholder={
                        formik.values.phone === ""
                          ? "0712✱✱✱689"
                          : formik.values.phone
                      }
                      // placeholder="07✱✱✱✱✱✱✱✱"
                      className={`${styles.input} p-3 w-[50%] text-[#444]`}
                      onChange={formik.handleChange("phone")}
                      onBlur={formik.handleBlur("phone")}
                      value={formik.values.phone}
                    />
                    <div className="text-red-500 text-xs">
                      {formik.touched.phone && formik.errors.phone}
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    disabled={
                      loading ||
                      success ||
                      validating ||
                      error ||
                      amount1 > 250000
                    }
                    type="submit"
                    className="group relative w-full flex justify-center mb-4 py-3 px-4 border border-transparent text-[16px] font-[600] rounded-[5px] text-white !bg-[#12b32a] hover:!bg-[#12b32a] disabled:!bg-[#a8deb0] disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <p className="flex">
                        <Spinner /> Processing...
                      </p>
                    ) : (
                      <p>
                        {validating
                          ? "Validating Payment..."
                          : error
                          ? `${errorMessage}`
                          : amount1 > 150000
                          ? "Amout exceed Mpesa limt"
                          : "Pay Now"}
                      </p>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : null}
      </div>

      {/* paypal payment */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(2)}
          >
            {select === 2 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Paypal
          </h4>
        </div>

        {/* pay with payement */}
        {select === 2 ? (
          <div className="w-full flex border-b appear__smoothly">
            <div
              className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              onClick={() => setOpen(true)}
            >
              Pay Now
            </div>
            {open && (
              <div
                className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999] appear__smoothly"
                onClick={(e) => myClickHandler(e, false)}
              >
                <div
                  className="w-full 800px:w-[30%] 800px:h-[60vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll"
                  onClick={(e) => myClickHandler(e, true)}
                >
                  <div className="w-full flex justify-end p-3">
                    <RxCross1
                      size={30}
                      className="cursor-pointer absolute top-3 right-3"
                      onClick={(e) => myClickHandler(e, false)}
                    />
                  </div>
                  {loading2 ? (
                    <button
                      disabled
                      type="button"
                      class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                    >
                      <svg
                        aria-hidden="true"
                        role="status"
                        class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
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
                      Validating payment...
                    </button>
                  ) : (
                    <PayPalScriptProvider
                      options={{
                        "client-id":
                          "Ac-51__iZrtItCAT7sph7csXQgO-hWIeCc0mVT_6CPlHtW2Cv7C1B_HYA-HSCo2FanTiXVPVrtyQ_aGS",
                      }}
                    >
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        onApprove={onApprove}
                        createOrder={createOrder}
                      />
                    </PayPalScriptProvider>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      <br />
      {/* cash on delivery */}
      {orderData.shippingAddress &&
        (orderData.totalPrice >= 5000 ||
          orderData.shippingAddress.city === "Nairobi" ||
          orderData.shippingAddress.city === "Mombasa" ||
          orderData.shippingAddress.city === "Self Pickup") && (
          <div>
            <div className="flex w-full pb-5 border-b mb-2">
              <div
                className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
                onClick={() => setSelect(3)}
              >
                {select === 3 ? (
                  <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
                ) : null}
              </div>
              <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                Mpesa on Delivery
              </h4>
            </div>

            {/* cash on delivery */}
            {select === 3 ? (
              <div className="w-full flex">
                <form
                  className="w-full appear__smoothly"
                  onSubmit={cashOnDeliveryHandler}
                >
                  <button
                    type="submit"
                    disabled={loading1}
                    className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                  >
                    {loading1 ? (
                      <p className="flex mx-3">
                        <Spinner /> Processing...
                      </p>
                    ) : (
                      <p className="">Confirm</p>
                    )}
                  </button>
                </form>
              </div>
            ) : null}
          </div>
        )}
    </div>
  );
};

const CartData = ({ orderData }) => {
  const shipping = orderData?.shippingPrice?.toFixed(2);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">
          <NumericFormat
            value={orderData?.subTotalPrice}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"Ksh. "}
          />
        </h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">
          {" "}
          <NumericFormat
            value={shipping}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"Ksh. "}
          />
        </h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          {orderData?.discountPrice ? (
            <NumericFormat
              value={orderData?.discountPrice}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Ksh. "}
            />
          ) : (
            "-"
          )}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        <NumericFormat
          value={orderData?.totalPrice}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"Ksh. "}
        />
      </h5>
      <br />
    </div>
  );
};

export default Payment;
