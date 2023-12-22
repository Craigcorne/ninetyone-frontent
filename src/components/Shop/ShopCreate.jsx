import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";
import { useFormik } from "formik";
import * as yup from "yup";
import Header from "../Layout/Header";
import Spinner from "../Spinner";

const shopSignupSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email should be valid"),
  phoneNumber: yup.number().required("Phone Number is required"),
  address: yup.string().required("Address is required"),
  zipCode: yup.string().required("Zip Code is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must contain atleast 6 Characters"),
  termsAndConditions: yup
    .bool()
    .oneOf([true], "You need to accept the terms and conditions"),
});
const ShopCreate = () => {
  const [avatar, setAvatar] = useState();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [checked, setChecked] = useState(false);

  const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      zipCode: "",
      password: "",
      avatar: "",
      termsAndConditions: false,
    },
    validationSchema: shopSignupSchema,
    onSubmit: async (values) => {
      const name = values.name;
      const email = values.email;
      const phoneNumber = values.phoneNumber;
      const address = values.address;
      const zipCode = values.zipCode;
      const password = values.password;

      setLoading(true);

      axios
        .post(`${server}/shop/create-shop`, {
          name,
          email,
          password,
          avatar,
          zipCode,
          address,
          phoneNumber,
        })
        .then((res) => {
          toast.success(res.data.message);
          setAvatar();
          setLoading(false);
          setSuccess(true);
          setError(false);
          setSuccessMessage(res.data.message);
          window.scrollTo(0, 0);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoading(false);
          setError(true);
          setSuccess(false);
          setErrorMessage(error.response.data.message);
          window.scrollTo(0, 0);
        });
    },
  });

  const Checkbox = () => {
    var checkBox = document.getElementById("link-checkbox");
    if (checkBox.checked === true) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 m-1 rounded">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register as a seller
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {error && (
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
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Shop Name
                </label>
                <div className="mt-1">
                  <input
                    type="name"
                    name="name"
                    onChange={formik.handleChange("name")}
                    onBlur={formik.handleBlur("name")}
                    value={formik.values.name}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <div className="text-red-500 text-xs">
                    {formik.touched.name && formik.errors.name}
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    type="phonenumber"
                    name="phone-number"
                    onChange={formik.handleChange("phoneNumber")}
                    onBlur={formik.handleBlur("phoneNumber")}
                    value={formik.values.phoneNumber}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <div className="text-red-500 text-xs">
                    {formik.touched.phoneNumber && formik.errors.phoneNumber}
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    value={formik.values.email}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <div className="text-red-500 text-xs">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <div className="mt-1">
                  <input
                    type="address"
                    name="address"
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                    value={formik.values.address}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <div className="text-red-500 text-xs">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zip Code
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="zipcode"
                    onChange={formik.handleChange("zipCode")}
                    onBlur={formik.handleBlur("zipCode")}
                    value={formik.values.zipCode}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <div className="text-red-500 text-xs">
                    {formik.touched.zipCode && formik.errors.zipCode}
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                    value={formik.values.password}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <div className="text-red-500 text-xs">
                    {formik.touched.password && formik.errors.password}
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
                  htmlFor="avatar"
                  className="block text-sm font-medium text-gray-700"
                ></label>
                <div className="mt-2 flex items-center">
                  <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="avatar"
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : (
                      <RxAvatar className="h-8 w-8" />
                    )}
                  </span>
                  <label
                    htmlFor="file-input"
                    className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <span>Upload shop logo (required)</span>
                    <input
                      type="file"
                      name="avatar"
                      id="file-input"
                      onChange={handleFileInputChange}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
              <div className="">
                <div className="flex items-center">
                  <input
                    id="link-checkbox"
                    type="checkbox"
                    onClick={() => {
                      Checkbox();
                    }}
                    onChange={formik.handleChange("termsAndConditions")}
                    onBlur={formik.handleBlur("termsAndConditions")}
                    value={formik.values.termsAndConditions}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="link-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I agree with the{" "}
                    <Link
                      to="/terms"
                      href="#"
                      className="text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      terms and conditions
                    </Link>
                    .
                  </label>
                </div>
                <div className="text-red-500 text-xs">
                  {formik.touched.termsAndConditions &&
                    formik.errors.termsAndConditions}
                </div>
              </div>

              <div>
                <button
                  disabled={loading}
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <p className="flex">
                      <Spinner /> Registering...
                    </p>
                  ) : (
                    <p className="">Register</p>
                  )}
                </button>
              </div>
              <div className={`${styles.noramlFlex} w-full`}>
                <h4>Already have an account?</h4>
                <Link to="/shop-login" className="text-blue-600 pl-2">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopCreate;
