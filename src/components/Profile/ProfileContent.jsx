import React, { useState } from "react";
import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import Typed from "react-typed";
import {
  deleteUserAddress,
  loadUser,
  updatUserAddress,
  updateUserInformation,
} from "../../redux/actions/user";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import { useFormik } from "formik";
import * as yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiUserRemove } from "react-icons/hi";
import Spinner from "../Spinner";
import CustomModal from "../CustomModal";
import DynamicLoader from "../Layout/DynamicLoader";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();

  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  const handleImage = async (e) => {
    const files = Array.from(e.target.files);
    const imageBase64List = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        imageBase64List.push(reader.result);
        if (imageBase64List.length === files.length) {
          uploadImages(imageBase64List);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const uploadImages = async (imageBase64List) => {
    try {
      for (const imageBase64 of imageBase64List) {
        await axios.put(
          `${server}/user/update-avatar`,
          { avatar: imageBase64 },
          {
            withCredentials: true,
          }
        );
      }
      dispatch(loadUser());
      toast.success("Avatar(s) updated successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeImage = async (e) => {
    try {
      await axios.put(
        `${server}/user/update-avatar`,
        {
          avatar:
            "https://res.cloudinary.com/bramuels/image/upload/v1690231799/avatars/defaultavatar_xl1nel.png",
        },
        {
          withCredentials: true,
        }
      );

      dispatch(loadUser());
      toast.success("Avatar(s) updated successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full">
      {/* profile */}
      {active === 1 && (
        <>
          {modalOpen && (
            <CustomModal
              message={"Are you sure you want to remove this image?"}
              ok={" Yes, I'm sure"}
              cancel={"No, cancel"}
              setModalOpen={setModalOpen}
              performAction={(e) => removeImage(e)}
              closeModel={() => setModalOpen(false)}
            />
          )}
          <div className="flex justify-center w-full">
            <div className="">
              <img
                src={`${user?.avatar?.url}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="flex">
                <div className="flex mx-5">
                  <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer bottom-[2px] right-[2px]">
                    <input
                      type="file"
                      id="image"
                      className="hidden"
                      onChange={handleImage}
                    />
                    <label htmlFor="image">
                      <AiOutlineCamera size={18} className="text-gray-600" />
                    </label>
                  </div>
                </div>
                <div className="flex mx-5">
                  <div
                    onClick={() => setModalOpen(true)}
                    className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer bottom-[2px] right-[2px]"
                  >
                    <HiUserRemove size={18} className="text-gray-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">
                    {/* Enter your password to Update */}
                    <Typed
                      strings={["Enter your password to Update"]}
                      typeSpeed={40}
                      backSpeed={50}
                      loop
                    />
                  </label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Refund */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* Track order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* Change Password */}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {/*  user Address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders, isLoading } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const getOrderStatusColor = (status) => {
    return status === "Delivered" ? "text-green-500" : "text-red-500";
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KES",
    }).format(value);
  };

  const renderOrderButton = (orderId) => {
    return (
      <Link to={`/user/order/${orderId}`}>
        <button className="bg-blue-500 text-white rounded-lg py-2 px-4 flex items-center">
          See Order
        </button>
      </Link>
    );
  };

  const rows = orders?.map((item) => ({
    id: item._id,
    no: item.orderNo,
    createdAt: item.createdAt.slice(0, 10),
    items: item.cart.map((i) => i.name),
    image: item.cart.map((i) => i.images[0]),
    itemsQty: item.cart.length,
    total: formatCurrency(item.totalPrice),
    status: item.status,
    orderButton: renderOrderButton(item._id),
  }));

  return (
    <div>
      <h3 className="pb-4 ml-2 font-bold">{user.name}'s Orders</h3>
      {isLoading ? (
        <DynamicLoader
          message={"Bringing orders..."}
          delayedmessage={"Sorry orders not coming..."}
        />
      ) : (
        <div className="grid grid-cols-1">
          {rows?.map((row) => (
            <div
              key={row.id}
              className="p-4 border m-2 border-indigo-500  rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-medium">Order No. {row.no}</h4>
                <span
                  className={`font-medium ${getOrderStatusColor(row.status)}`}
                >
                  {row.status}
                </span>
              </div>
              <p className="mb-2">Ordered On: {row.createdAt}</p>
              <div className="block lg:flex">
                <div className="flex">
                  <div className="mb-4 flex mr-1 w-full lg:w-24">
                    <img
                      src={`${row.image[0]?.url}`}
                      alt="Order"
                      className="w-fit lg:w-24 h-24 ml-[20%] lg:ml-0 rounded-lg object-contain"
                    />
                  </div>
                </div>
                <div className="ml-1 block lg:flex space-x-0 lg:space-x-8">
                  <div>
                    <div className="mb-2">
                      <p className="font-bold">Items:</p>
                      {row.items.slice(0, 1) + "..."}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mb-2 block">
                      <p className="font-bold">Items Qty:</p>{" "}
                      <p>{row.itemsQty}</p>
                    </div>
                    <div className="mb-2 ml-6 lg:ml-2">
                      <p className="font-bold">Total:</p>
                      <p>{row.total}</p>
                    </div>
                  </div>
                  <div className="block">
                    <p className="font-bold mb-3">Actions</p>
                    {row.orderButton}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const TrackOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KES",
    }).format(value);
  };

  const getOrderStatusColor = (status) => {
    return status === "Delivered" ? "text-green-500" : "text-red-500";
  };

  const renderOrderButton = (orderId) => {
    return (
      <Link to={`/user/track/order/${orderId}`}>
        <button className="bg-blue-500 text-white rounded-lg py-2 px-4 flex items-center">
          Track Order
        </button>
      </Link>
    );
  };

  const rows = orders?.map((item) => ({
    id: item._id,
    no: item.orderNo,
    createdAt: item.createdAt.slice(0, 10),
    items: item.cart.map((i) => i.name).join(","),
    image: item.cart.map((i) => i.images[0]),
    itemsQty: item.cart.length,
    total: formatCurrency(item.totalPrice),
    status: item.status,
    orderButton: renderOrderButton(item._id),
  }));
  return (
    <div>
      <h3 className="pb-4 ml-2 font-bold">Track Orders</h3>
      <div className="grid grid-cols-1">
        {rows?.map((row) => (
          <div
            key={row.id}
            className="p-4 border m-2 border-indigo-500  rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-medium">Order No. {row.no}</h4>
              <span
                className={`font-medium ${getOrderStatusColor(row.status)}`}
              >
                {row.status}
              </span>
            </div>
            <p className="mb-2">Ordered On: {row.createdAt}</p>
            <div className="block lg:flex">
              <div className="flex">
                <div className="mb-4 flex mr-1 w-full lg:w-24">
                  <img
                    src={`${row.image[0]?.url}`}
                    alt="Order"
                    className="w-fit lg:w-24 h-24 ml-[20%] lg:ml-0 rounded-lg object-contain"
                  />
                </div>
              </div>
              <div className="ml-1 block lg:flex space-x-0 lg:space-x-8">
                <div>
                  <div className="mb-2">
                    <p className="font-bold">Items:</p>
                    {row.items.slice(0, 70) + "..."}
                  </div>
                </div>
                <div className="flex">
                  <div className="mb-2 block">
                    <p className="font-bold">Items Qty:</p>{" "}
                    <p>{row.itemsQty}</p>
                  </div>
                  <div className="mb-2 ml-6 lg:ml-2">
                    <p className="font-bold">Total:</p>
                    <p>{row.total}</p>
                  </div>
                </div>
                <div className="block">
                  <p className="font-bold mb-3">Actions</p>
                  {row.orderButton}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AllRefundOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const eligibleOrders =
    orders && orders.filter((item) => item.status === "Processing refund");

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KES",
    }).format(value);
  };

  const getOrderStatusColor = (status) => {
    return status === "Delivered" ? "text-green-500" : "text-red-500";
  };

  const renderOrderButton = (orderId) => {
    return (
      <Link to={`/user/order/${orderId}`}>
        <button className="bg-blue-500 text-white rounded-lg py-2 px-4 flex items-center">
          See Order
        </button>
      </Link>
    );
  };

  const rows = eligibleOrders?.map((item) => ({
    id: item._id,
    no: item.orderNo,
    createdAt: item.createdAt.slice(0, 10),
    items: item.cart.map((i) => i.name).join(","),
    image: item.cart.map((i) => i.images[0]),
    itemsQty: item.cart.length,
    total: formatCurrency(item.totalPrice),
    status: item.status,
    orderButton: renderOrderButton(item._id),
  }));
  return (
    <div>
      <h3 className="pb-4 ml-2 font-bold">Refunds page</h3>
      <div className="grid grid-cols-1">
        {rows?.map((row) => (
          <div
            key={row.id}
            className="p-4 border m-2 border-indigo-500  rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-medium">Order No. {row.no}</h4>
              <span
                className={`font-medium ${getOrderStatusColor(row.status)}`}
              >
                {row.status}
              </span>
            </div>
            <p className="mb-2">Ordered On: {row.createdAt}</p>
            <div className="block lg:flex">
              <div className="flex">
                <div className="mb-4 flex mr-1 w-full lg:w-24">
                  <img
                    src={`${row.image[0]?.url}`}
                    alt="Order"
                    className="w-fit lg:w-24 h-24 ml-[20%] lg:ml-0 rounded-lg object-contain"
                  />
                </div>
              </div>
              <div className="ml-1 block lg:flex space-x-0 lg:space-x-8">
                <div>
                  <div className="mb-2">
                    <p className="font-bold">Items:</p>
                    {row.items.slice(0, 70) + "..."}
                  </div>
                </div>
                <div className="flex">
                  <div className="mb-2 block">
                    <p className="font-bold">Items Qty:</p>{" "}
                    <p>{row.itemsQty}</p>
                  </div>
                  <div className="mb-2 ml-6 lg:ml-2">
                    <p className="font-bold">Total:</p>
                    <p>{row.total}</p>
                  </div>
                </div>
                <div className="block">
                  <p className="font-bold mb-3">Actions</p>
                  {row.orderButton}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const updatePasswordSchema = yup.object({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(6, "New password must contain atleast 6 Characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "New Passwords must match"),
});

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [errorer, setErrorer] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: updatePasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const oldPassword = values.oldPassword;
      const newPassword = values.newPassword;
      const confirmPassword = values.confirmPassword;
      await axios
        .put(
          `${server}/user/update-user-password`,
          { oldPassword, newPassword, confirmPassword },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success(res.data.message);
          resetForm();
          setSucessMessage(res.data.message);
          setSuccess(true);
          setErrorer(false);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setLoading(false);
          setErrorer(true);
          setSuccess(false);
          setErrorMessage(err.response.data.message);
        });
      setLoading(false);
    },
  });
  return (
    <>
      <section class="bg-gray-50 dark:bg-gray-900">
        <div
          class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
          style={{ height: "60vh" }}
        >
          <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Change Password
            </h2>
            {errorer && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-1 py-1 text-center mb-2 rounded relative"
                role="alert"
              >
                <p>{errorMessage}</p>
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
            <form
              class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              action="#"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Old Password
                </label>
                <div className="relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="oldPassword"
                    id="oldPassword"
                    placeholder="••••••••"
                    onChange={formik.handleChange("oldPassword")}
                    onBlur={formik.handleBlur("oldPassword")}
                    value={formik.values.oldPassword}
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="text-red-500 text-xs">
                    {formik.touched.oldPassword && formik.errors.oldPassword}
                  </div>
                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={visible2 ? "text" : "password"}
                    name="newPassword"
                    id="newPassword"
                    placeholder="••••••••"
                    onChange={formik.handleChange("newPassword")}
                    onBlur={formik.handleBlur("newPassword")}
                    value={formik.values.newPassword}
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="text-red-500 text-xs">
                    {formik.touched.newPassword && formik.errors.newPassword}
                  </div>
                  {visible2 ? (
                    <AiOutlineEye
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible2(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible2(true)}
                    />
                  )}
                </div>
              </div>
              <div>
                <label
                  for="confirm-password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm New password
                </label>
                <div className="relative">
                  <input
                    type={visible3 ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    onChange={formik.handleChange("confirmPassword")}
                    onBlur={formik.handleBlur("confirmPassword")}
                    value={formik.values.confirmPassword}
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="text-red-500 text-xs">
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword}
                  </div>
                  {visible3 ? (
                    <AiOutlineEye
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible3(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible3(true)}
                    />
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <p className="flex">
                      <Spinner /> Updating...
                    </p>
                  ) : (
                    <p className="">Update</p>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("Kenya");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
    {
      name: "Anonymous",
    },
    {
      name: "Others",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updatUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode("");
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="w-full px-5">
        {open && (
          <div
            onClick={(e) => myClickHandler(e, false)}
            className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center "
          >
            <div
              onClick={(e) => myClickHandler(e, true)}
              className="w-[85%] lg:w-[35%] h-[70vh] lg:h-[80vh] bg-white rounded shadow relative overflow-y-scroll appear__smoothly"
            >
              <div className="w-full flex justify-end p-3">
                <RxCross1
                  size={30}
                  className="cursor-pointer"
                  onClick={(e) => myClickHandler(e, false)}
                />
              </div>
              <h1 className="text-center text-[25px] font-Poppins">
                Add New Address
              </h1>
              <div className="w-full">
                <form aria-required onSubmit={handleSubmit} className="w-full">
                  <div className="w-full block p-4">
                    <div className="w-full pb-2">
                      <label className="block pb-2">Country</label>
                      <select
                        name=""
                        id=""
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-[95%] border h-[40px] rounded-[5px]"
                      >
                        <option value="Kenya">Kenya</option>
                      </select>
                    </div>

                    <div className="w-full pb-2">
                      <label className="block pb-2">Choose your County</label>

                      <select
                        name="county"
                        className="w-[95%] border h-[40px] rounded-[5px]"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                      >
                        <option value="" selected disabled>
                          Select County
                        </option>
                        <option value="Nairobi">Nairobi</option>
                        <option value="Mombasa">Mombasa</option>
                        <option value="Kwale">Kwale</option>
                        <option value="Kilifi">Kilifi</option>
                        <option value="Tana River">Tana River</option>
                        <option value="Lamu">Lamu</option>
                        <option value="Taita Taveta">Taita Taveta</option>
                        <option value="Garissa">Garissa</option>
                        <option value="Wajir">Wajir</option>
                        <option value="Mandera">Mandera</option>
                        <option value="Marsabit">Marsabit</option>
                        <option value="Isiolo">Isiolo</option>
                        <option value="Meru">Meru</option>
                        <option value="Tharaka-Nithi">Tharaka-Nithi</option>
                        <option value="Embu">Embu</option>
                        <option value="Kitui">Kitui</option>
                        <option value="Machakos">Machakos</option>
                        <option value="Makueni">Makueni</option>
                        <option value="Nyandarua">Nyandarua</option>
                        <option value="Nyeri">Nyeri</option>
                        <option value="Kirinyaga">Kirinyaga</option>
                        <option value="Murang'a">Murang'a</option>
                        <option value="Kiambu">Kiambu</option>
                        <option value="Turkana">Turkana</option>
                        <option value="West Pokot">West Pokot</option>
                        <option value="Samburu">Samburu</option>
                        <option value="Trans-Nzoia">Trans-Nzoia</option>
                        <option value="Uasin Gishu">Uasin Gishu</option>
                        <option value="Elgeyo-Marakwe">Elgeyo-Marakwet</option>
                        <option value="Nandi">Nandi</option>
                        <option value="Baringo">Baringo</option>
                        <option value="Laikipia">Laikipia</option>
                        <option value="Nakuru">Nakuru</option>
                        <option value="Narok">Narok</option>
                        <option value="Kajiado">Kajiado</option>
                        <option value="Kericho">Kericho</option>
                        <option value="Bomet">Bomet</option>
                        <option value="Kakamega">Kakamega</option>
                        <option value="Vihiga">Vihiga</option>
                        <option value="Bungoma">Bungoma</option>
                        <option value="Busia">Busia</option>
                        <option value="Siaya">Siaya</option>
                        <option value="Kisumu">Kisumu</option>
                        <option value="Homa Bay">Homa Bay</option>
                        <option value="Migori">Migori</option>
                        <option value="Kisii">Kisii</option>
                        <option value="Nyamira">Nyamira</option>
                      </select>
                    </div>

                    <div className="w-full pb-2">
                      <label className="block pb-2">Town/City</label>
                      <input
                        type="address"
                        className={`${styles.input}`}
                        required
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                      />
                    </div>
                    <div className="w-full pb-2">
                      <label className="block pb-2">Phone Number</label>
                      <input
                        type="text"
                        className={`${styles.input}`}
                        required
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </div>
                    <div className="w-full pb-2">
                      <label className="block pb-2">Other Information</label>
                      <textarea
                        type="address"
                        className={`${styles.input}`}
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                      />
                    </div>
                    <div className="w-full pb-2">
                      <label className="block pb-2">Address Type</label>
                      <select
                        name=""
                        id=""
                        value={addressType}
                        onChange={(e) => setAddressType(e.target.value)}
                        className="w-[95%] border h-[40px] rounded-[5px]"
                      >
                        <option value="" className="block border pb-2">
                          Choose your Address Type
                        </option>
                        {addressTypeData &&
                          addressTypeData.map((item) => (
                            <option
                              className="block pb-2"
                              key={item.name}
                              value={item.name}
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className=" w-full pb-2">
                      <input
                        type="submit"
                        className={`${styles.input} mt-5 cursor-pointer`}
                        required
                        readOnly
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="flex w-full items-center justify-between">
          <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
            My Addresses
          </h1>
          <div
            className={`${styles.button} !rounded-md`}
            onClick={(e) => myClickHandler(e, true)}
          >
            <span className="text-[#fff]">Add New</span>
          </div>
        </div>
        <br />
        {user &&
          user.addresses.map((item, index) => (
            <div
              className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
              key={index}
            >
              {modalOpen && (
                <CustomModal
                  message={"Are you sure you want to delete this address?"}
                  ok={" Yes, I'm sure"}
                  cancel={"No, cancel"}
                  setModalOpen={setModalOpen}
                  performAction={() => handleDelete(item)}
                  closeModel={() => setModalOpen(false)}
                />
              )}
              <div className="flex items-center">
                <h5 className="pl-5 font-[600]">{item.addressType}</h5>
              </div>
              <div className="pl-8 flex items-center">
                <h6 className="text-[12px] 800px:text-[unset]">
                  {item.address1} {item.address2}
                </h6>
              </div>
              <div className="pl-8 flex items-center">
                <h6 className="text-[12px] 800px:text-[unset]">
                  {user && user.phoneNumber}
                </h6>
              </div>
              <div className="min-w-[10%] flex items-center justify-between pl-8">
                <AiOutlineDelete
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setModalOpen(true)}
                />
              </div>
            </div>
          ))}

        {user && user.addresses.length === 0 && (
          <h5 className="text-center pt-8 text-[18px]">
            You not have any saved address!
          </h5>
        )}
      </div>
    </>
  );
};
export default ProfileContent;
