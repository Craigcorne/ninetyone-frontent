import { React, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import Spinner from "../Spinner";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const shopLoginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Email should be valid"),
  password: yup.string().required("Password is required"),
});
const ShopLogin = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: shopLoginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const email = values.email;
      const password = values.password;

      await axios
        .post(
          `${server}/shop/login-shop`,
          {
            email,
            password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("Login Success!");
          navigate("/dashboard");
          window.location.reload(true);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setError(true);
          setLoading(false);
          setErrorMessage(err.response.data.message);
        });
      setLoading(false);
    },
  });

  return (
    <>
      <Header />
      <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your shop
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-1 py-1 text-center mb-2 rounded relative"
                role="alert"
              >
                <p>{errorMessage}</p>
              </div>
            )}
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
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
                    required
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
                    required
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
              <div className={`${styles.noramlFlex} justify-between`}>
                <div className={`${styles.noramlFlex}`}>
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link
                    to="forgot-password"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <p className="flex">
                      <Spinner /> signing...
                    </p>
                  ) : (
                    <p className="">Login In</p>
                  )}
                </button>
              </div>
              <div className={`${styles.noramlFlex} w-full`}>
                <h4>Not have any account?</h4>
                <Link to="/shop-create" className="text-blue-600 pl-2">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopLogin;
