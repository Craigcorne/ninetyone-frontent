import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="mt-9 mb-28 bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">
            404 Not Found
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Oops! We couldn't find anything at this URL.
          </p>
          <Link
            to="/"
            className="text-blue-500 font-semibold text-lg px-6 py-2 rounded-md bg-blue-100 hover:bg-blue-200 transition duration-300"
          >
            Go Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
