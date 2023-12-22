import React, { useState } from "react";
import Footer from "../Layout/Footer";
import Spinner from "../Spinner";
import Header from "../Layout/Header";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { server } from "../../server";

const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must contain atleast 6 Characters"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
const ShopResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  const getToken = location.pathname.split("/")[3];

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmpassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const password = values.password;
      await axios
        .put(
          `${server}/shop/reset-password/${getToken}`,
          {
            password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("Password reset Sucessful");
          navigate("/dashboard");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setLoading(false);
          setError(true);
          setErrorMessage(err.response.data.message);
        });
      setLoading(false);
    },
  });
  return (
    <>
      <Header />
      <section class="bg-gray-50 dark:bg-gray-900">
        <div
          class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
          style={{ height: "60vh" }}
        >
          <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Reset Password
            </h2>
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-1 py-1 text-center mb-2 rounded relative"
                role="alert"
              >
                <p>{errorMessage}</p>
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
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                    value={formik.values.password}
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    required=""
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
                  for="confirm-password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    type={visible2 ? "text" : "password"}
                    name="confirmpassword"
                    id="confirm-password"
                    placeholder="••••••••"
                    onChange={formik.handleChange("confirmpassword")}
                    onBlur={formik.handleBlur("confirmpassword")}
                    value={formik.values.confirmpassword}
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    required=""
                  />
                  <div className="text-red-500 text-xs">
                    {formik.touched.confirmpassword &&
                      formik.errors.confirmpassword}
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
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <p className="flex">
                      <Spinner /> Sending...
                    </p>
                  ) : (
                    <p className="">Reset</p>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ShopResetPassword;
