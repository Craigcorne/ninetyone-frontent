import React, { useState } from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
  AiOutlineWhatsApp,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

import { Link } from "react-router-dom";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";

const subscribeSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Email should be valid"),
});

const Footer = () => {
  const [loading, setLoading] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: subscribeSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      await axios
        .post(`${server}/subscribe/subscribe`, {
          email: values.email,
        })
        .then((res) => {
          toast.success(res.data.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoading(false);
        });
      setLoading(false);
      resetForm();
    },
  });

  const myClickHandler2 = (e, props) => {
    setOpenCart(props);
    setOpenWishlist(false);
    setSearchOpen(false);

    if (!e) {
      var e = window.event;
      e.cancelBubble = true;
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };
  return (
    <>
      <div className="bg-[#000] text-white">
        <div className="md:flex md:justify-between md:items-center px-2 lg:px-4 bg-[#342ac8] py-4 lg:py-7">
          <h1 className="lg:text-[24px] md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5 text-[16px]">
            <span className="text-[#56d879]">Subscribe</span> us for get news,
            events and offers
          </h1>
          <div>
            <form onSubmit={formik.handleSubmit} className="block lg:flex">
              <div className="block">
                <input
                  type="text"
                  placeholder="Enter your email..."
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email}
                  className="text-gray-800
                sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
                />
                <p className="text-red-500 text-xs mt-0 lg:mt-1">
                  {formik.touched.email && formik.errors.email}
                </p>
              </div>
              <button
                type="submit"
                className="bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-whie md:w-auto w-full"
              >
                {loading ? (
                  <p className="flex ml-[30%]">
                    <Spinner /> sending...
                  </p>
                ) : (
                  <p className="">Send</p>
                )}
              </button>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-4 lg:py-8 sm:text-center">
          <ul className="text-center sm:text-start flex sm:block flex-col items-center">
            <img
              src="https://res.cloudinary.com/bramuels/image/upload/v1695878268/logo/LOGO-01_moo9oc.png"
              className="w-40 h-28 m-auto"
              alt=""
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <br />
            <p>The home and elements needed to create beautiful products.</p>
            <div className="flex items-center mt-[15px]">
              <BsFacebook
                size={20}
                style={{ marginRight: "10px", cursor: "pointer" }}
                className="icon facebook-icon"
              />
              <AiOutlineTwitter
                size={20}
                style={{ marginRight: "10px", cursor: "pointer" }}
                className="icon twitter-icon"
              />
              <AiFillInstagram
                size={20}
                style={{ marginRight: "10px", cursor: "pointer" }}
                className="icon instagram-icon"
              />
              <AiFillYoutube
                size={20}
                style={{ marginRight: "10px", cursor: "pointer" }}
                className="icon youtube-icon"
              />
              <a
                href="https://api.whatsapp.com/send?phone=254741895028&text=Hey%20NinetyOne,%20what%20do%20I%20add"
                target="_blank"
                rel="noopener noreferrer"
                className="icon whatsapp-icon"
              >
                <AiOutlineWhatsApp size={20} />
              </a>
            </div>
          </ul>
          <ul className="text-center hidden lg:block sm:text-start">
            <h1 className="mb-1 font-semibold">Company</h1>
            {footerProductLinks.map((link, index) => (
              <li key={index}>
                <Link
                  className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="text-center hidden lg:block  sm:text-start">
            <h1 className="mb-1 font-semibold">Shop</h1>
            {footercompanyLinks.map((link, index) => (
              <li key={index}>
                <Link
                  className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="text-center hidden lg:block  sm:text-start">
            <h1 className="mb-1 font-semibold">Support</h1>
            {footerSupportLinks.map((link, index) => (
              <li key={index}>
                <Link
                  className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex lg:hidden gap-3 ml-[10%]">
            <ul className="text-start">
              <h1 className="mb-1 font-semibold">Company</h1>
              {footerProductLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                    to={link.link}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="text-start">
              <h1 className="mb-1 font-semibold">Shop</h1>
              {footercompanyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                    to={link.link}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="text-start">
              <h1 className="mb-1 font-semibold">Support</h1>
              {footerSupportLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                    to={link.link}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="">
          <div class="w-full p-2 text-center">
            <h5 class="mb-2 font-bold">Shop fast from anywhere</h5>
            <p class="mb-5 text-gray-400">
              Stay up to date and move work forward with 3dolts on iOS &
              Android. Download the app today.
            </p>
            <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <a
                href="https://onlineshop-2xjp.vercel.app/"
                class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                <svg
                  class="mr-3 w-7 h-7"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="apple"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                  ></path>
                </svg>
                <div class="text-left">
                  <div class="mb-1 text-xs">Download on the</div>
                  <div class="-mt-1 font-sans text-sm font-semibold">
                    Mac App Store
                  </div>
                </div>
              </a>
              <a
                href="https://onlineshop-2xjp.vercel.app/"
                class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                <svg
                  class="mr-3 w-7 h-7"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google-play"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
                  ></path>
                </svg>
                <div class="text-left">
                  <div class="mb-1 text-xs">Get in on</div>
                  <div class="-mt-1 font-sans text-sm font-semibold">
                    Google Play
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-white-400 text-sm pb-8 mb-[50px] lg:mb-0">
          <span>
            &copy; {new Date().getFullYear()} eShop. All rights reserved.
          </span>
          <span>Terms · Privacy Policy</span>
          <div className="sm:block flex items-center justify-center w-full">
            <img
              src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
              alt=""
            />
          </div>
        </div>
        <a
          href="https://api.whatsapp.com/send?phone=254712012113&text=Hey%20Brams,%20what%20do%20I%20add"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-16 lg:bottom-4 right-4 bg-green-500 text-white rounded-full p-3 hover:bg-green-600 transition duration-300 z-10 flex items-center justify-center group appear__smoothly"
        >
          <AiOutlineWhatsApp size={24} />
          <span className="smart-text hidden group-hover:inline-block ml-2 appear__smoothly">
            Chat with us
          </span>
        </a>
        <div
          className="relative mr-[20px]"
          onClick={(e) => myClickHandler2(e, true)}
        >
          <div
            className="fixed bottom-24 lg:bottom-12 right-4 bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600 transition duration-300 z-10 flex items-center justify-center group"
            style={{ marginBottom: "20px" }}
            onClick={(e) => myClickHandler2(e, true)}
          >
            <AiOutlineShoppingCart size={24} />
            <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-5 h-5 top right p-0 m-0 text-white font-mono leading-tight justify-center items-center text-center">
              {cart && cart.length}
            </span>
          </div>
        </div>
      </div>
      {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
    </>
  );
};

export default Footer;
