import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import Meta from "../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { FaInfo, FaMailBulk } from "react-icons/fa";
import { server } from "../server";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const contactSchema = yup.object({
  name: yup.string().required("First Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email should be valid"),
  mobile: yup.string().required("Mobile Number is required"),
  comment: yup.string().required("Comment is required"),
});
const Contact = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      comment: "",
    },
    validationSchema: contactSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      await axios
        .post(`${server}/user/email`, {
          name: values.name,
          email: values.email,
          mobile: values.mobile,
          comment: values.comment,
        })
        .then((res) => {
          toast.success(res.data.message);
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
      setLoading(false);
      resetForm();
    },
  });
  return (
    <>
      <Meta title="Contact Us" />
      <div>
        <Header activeHeading={6} />
        <div className="m-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl ...">
          <h3 className="my-4 text-center text-3xl">Contact Us</h3>
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
            action=""
            onSubmit={formik.handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="name"
                placeholder="Your Name"
                onChange={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                value={formik.values.name}
              />
              <p class="text-red-500 text-xs">
                {formik.touched.name && formik.errors.name}
              </p>
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Your Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                placeholder="Email"
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                value={formik.values.email}
              />
              <p class="text-red-500 text-xs">
                {formik.touched.email && formik.errors.email}
              </p>
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Telephone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="tel"
                name="mobile"
                placeholder="Telephone Number"
                onChange={formik.handleChange("mobile")}
                onBlur={formik.handleBlur("mobile")}
                value={formik.values.mobile}
              />
              <p class="text-red-500 text-xs">
                {formik.touched.mobile && formik.errors.mobile}
              </p>
            </div>
            <div>
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Your Comments
              </label>
              <textarea
                name="comment"
                id=""
                placeholder="Comments"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                cols="30"
                rows="4"
                onChange={formik.handleChange("comment")}
                onBlur={formik.handleBlur("comment")}
                value={formik.values.comment}
              ></textarea>
              <p class="text-red-500 text-xs">
                {formik.touched.comment && formik.errors.comment}
              </p>
            </div>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <p className="flex">
                  <Spinner /> sending...
                </p>
              ) : (
                <p className="">Send</p>
              )}
            </button>
          </form>
          <div className="mx-3">
            <h3 className="my-6 text-center text-3xl">Get in touch with Us</h3>
            <div>
              <ul className="ps-0">
                <li className="mb-3 flex">
                  <AiOutlineHome className="text-3xl mr-2" />
                  <p className="mb-0">
                    Nairobi, Kenya. Kahawa Sukari; Baringo Road 34 Street.
                  </p>
                </li>
                <li className="mb-3 flex">
                  <FiPhoneCall className="text-3xl mr-2" />
                  <a href="tel:+254712012113">0712 012 113</a>
                </li>
                <li className="mb-3 flex">
                  <FaMailBulk className="text-3xl mr-2" />
                  <a href="mailto:samuelndewa2018@gmail.com">
                    samuelndewa2018@gmail.com
                  </a>
                </li>
                <li className="mb-3 flex">
                  <FaInfo className="text-3xl mr-2" />
                  <p className="mb-0">Monday - Friday 10 AM - 8 PM</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Contact;
