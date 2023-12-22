import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import {
  FaBox,
  FaTruck,
  FaCheck,
  FaInfoCircle,
  FaHourglass,
  FaHandshake,
} from "react-icons/fa";

import { AiOutlineLike } from "react-icons/ai";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

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

  const getStatusIndex = (status) => {
    return progressSteps.findIndex((step) => step.status === status);
  };

  const getCurrentStep = () => {
    const currentIndex = getStatusIndex(data?.status);
    return currentIndex > -1 ? currentIndex : progressSteps.length;
  };

  return (
    <>
      {data && (
        <div className="hidden lg:block m-5 mb-10">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Track Your Order
          </h1>
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold mb-2">Order Status:</h2>
            <p className="text-lg">{data.status}</p>
          </div>
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold mb-2">Order Details:</h2>
            <p className="text-lg">Order No: {data.orderNo}</p>
            <p className="text-lg">Ordered On: {data.createdAt.slice(0, 10)}</p>
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
                <Link to={`/user/order/${data._id}`} className="block">
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
      )}
      {data && (
        <div className="m-5 block lg:hidden justify-center items-center">
          <h1 className="text-3xl font-bold mb-8">Track Your Order</h1>
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Order Status:</h2>
            <p className="text-lg">{data.status}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Order Details:</h2>
            <p className="text-lg">Order No: {data.orderNo}</p>
            <p className="text-lg">Ordered On: {data.createdAt.slice(0, 10)}</p>
          </div>
          <ol className="relative ml-[30%] text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
            {data &&
              progressSteps.map((step, index) => (
                <li
                  key={index}
                  className={`mb-10 ml-6 ${
                    index <= getCurrentStep()
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <Link to={`/user/order/${data._id}`}>
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
                    <h3 className="font-medium align-center">{step.label}</h3>
                  </Link>
                </li>
              ))}
          </ol>
        </div>
      )}
    </>
  );
};

export default TrackOrder;
