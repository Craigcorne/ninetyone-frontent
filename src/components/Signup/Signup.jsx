import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import Spinner from "../Spinner";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const signupSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email should be valid"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must contain atleast 6 Characters"),
  termsAndConditions: yup
    .bool()
    .oneOf([true], "You need to accept the terms and conditions"),
});

const Singup = () => {
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(
    "https://res.cloudinary.com/bramuels/image/upload/v1690231799/avatars/defaultavatar_xl1nel.png"
  );
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
      password: "",
      termsAndConditions: false,
      avatar: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      const name = values.name;
      const email = values.email;
      const password = values.password;

      await setLoading(true);

      await axios
        .post(`${server}/user/create-user`, { name, email, password, avatar })
        .then((res) => {
          toast.success(res.data.message);
          setAvatar();
          setLoading(false);
          setSuccess(true);
          setError(false);
          setSuccessMessage(res.data.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoading(false);
          setError(true);
          setSuccess(false);
          setErrorMessage(error.response.data.message);
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
      <div
        className="bg-gray-50 flex flex-col justify-center py-1 sm:px-6 lg:px-8 mb-1"
        style={{ margin: "0 20px" }}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-[14px] lg:text-[18px] font-extrabold text-gray-900">
            Register as a new user
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
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="text"
                    placeholder="Your Names"
                    autoComplete="name"
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
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    placeholder="email@example.com"
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
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    placeholder="●●●●●●"
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
                  <span className="inline-block h-10 w-10 rounded-full overflow-hidden">
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
                    <span>Upload an image (optional)</span>
                    <input
                      type="file"
                      name="avatar"
                      id="file-input"
                      accept=".jpg,.jpeg,.png"
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
                <Link to="/login" className="text-blue-600 pl-2">
                  Log In
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

export default Singup;
