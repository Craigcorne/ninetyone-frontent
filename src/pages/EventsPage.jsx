import React, { useState } from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import Meta from "../components/Meta";
import Footer from "../components/Layout/Footer";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const subscribeSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Email should be valid"),
});

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state?.events);
  const [loading, setLoading] = useState(false);

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
  return (
    <>
      <Meta title="Events" />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {allEvents && allEvents[0] ? (
            <div>
              <Header activeHeading={5} />
              <EventCard active={true} data={allEvents && allEvents[0]} />
            </div>
          ) : (
            <>
              <Header />
              <div className="h-[50vh] text-center">
                <p className="mt-[5%] mx-10">No Current Events</p>
                <div className="mx-10 mt-5">
                  <p>Subscribe to be notified when new event is updated</p>
                  <form
                    onSubmit={formik.handleSubmit}
                    className="block lg:flex justify-center"
                  >
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
                        <p className="flex">
                          <Spinner /> sending...
                        </p>
                      ) : (
                        <p className="">Send</p>
                      )}
                    </button>
                  </form>
                </div>
              </div>
              <Footer />
            </>
          )}
        </>
      )}
    </>
  );
};

export default EventsPage;
