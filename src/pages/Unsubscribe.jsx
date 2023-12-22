import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaGrinBeamSweat } from "react-icons/fa";
import { useSelector } from "react-redux";
import { server } from "../server";
import axios from "axios";
import { loadUser } from "../redux/actions/user";
import Store from "../redux/store";

const Unsubscribe = () => {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const email = user?.email;

  console.log(email);

  const handleUnsubscribe = async () => {
    setLoading(true);
    await axios
      .delete(`${server}/subscribe/delete-subscribe`, {
        params: {
          email,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoading(false);
        navigate("/");
      });
    navigate("/");
    setLoading(false);
  };

  const handleRemain = () => {
    // Implement your unsubscribe logic here
    toast.success("Thanks. We were worried.");
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="h-[50vh] flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md max-w-md m-3">
          <h1 className="font-bold mb-4">Unsubscribe from Newsletter</h1>
          <div className="ml-[40%] mb-2">
            <FaGrinBeamSweat size={50} color={"rgb(59 127 238 / 59%)"} />
          </div>
          <p className="text-gray-600 mb-6 justify-center items-center">
            Are you sure you want to unsubscribe?
          </p>
          <div className="">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-3"
              onClick={handleUnsubscribe}
            >
              {loading ? "Unsubscribing..." : "Unsubscribe"}
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleRemain}
            >
              Remain
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Unsubscribe;
