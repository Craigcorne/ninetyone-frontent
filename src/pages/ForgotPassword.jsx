import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Meta from "../components/Meta";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Email should be valid"),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [successMessage, setSucessMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const email = values.email;
      await axios
        .post(
          `${server}/user/forgot-password-token`,
          {
            email,
          },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("Email send to your email");
          setSucessMessage("Check your email to reset your password");
          setSuccess(true);
          setError(false);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setLoading(false);
          setError(true);
          setSuccess(false);
          setErrorMessage(err.response.data.message);
        });
      setLoading(false);
    },
  });
  return (
    <>
      <Header />
      <Meta title="Reset Password" />
      <section class="bg-gray-50 dark:bg-gray-900">
        <div
          class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
          style={{ height: "60vh" }}
        >
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Reset Your Password
            </h2>
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
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              action="#"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="abcdef00@example.com"
                />
                <div className="text-red-500 text-xs">
                  {formik.touched.email && formik.errors.email}
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

export default ForgotPassword;
