import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import "./styles.css";
import { server2 } from "../../server";

const Announcement = () => {
  const [showForm1, setShowForm1] = useState(true);
  const [positions, setPositions] = useState({
    btn: "0px",
  });

  const handleSellerClick = () => {
    setShowForm1((prevShowForm1) => !prevShowForm1);
    setPositions({
      btn: showForm1 ? "0px" : "50px", // Toggle btn position
    });
  };

  const handleSubscriberClick = () => {
    setShowForm1();
    setPositions({
      btn: showForm1 ? "50px" : "0px",
    });
  };

  return (
    <div className="App">
      <div className="hero"></div>
      <div className="form-box">
        <div className="button-box">
          <div id="btn">
            <button
              type="button"
              className="toggle-btn"
              onClick={handleSellerClick}
            >
              Sellers
            </button>
            <button
              type="button"
              className="toggle-btn"
              onClick={handleSubscriberClick}
            >
              Subscribers
            </button>
          </div>
        </div>
        {showForm1 ? <Form1 /> : <Form2 />}
      </div>
    </div>
  );
};

const Form2 = () => {
  const [name, setName] = useState("");

  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleCreateCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      await axios.post(`${server2}/client-status`, {
        name,
        image,
      });

      toast.success("Category and sub-category created!");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };
  return (
    <form onSubmit={handleCreateCategory} className="w-full">
      <div className="w-full block p-4">
        <div className="w-full pb-2">
          <label className="pb-2">Name:</label>
          <input
            type="text"
            name="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter Category Name..."
            required
          />
          <br />
        </div>
        <div className="w-full pb-4">
          <label className="block pb-2 text-lg font-semibold">
            Upload Image <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            <label htmlFor="upload" className="cursor-pointer">
              <AiOutlinePlusCircle size={40} color="#555" />
            </label>
            <input
              type="file"
              className="hidden"
              id="upload"
              required
              name=""
              onChange={handleImageChange}
            />
            {/* Image preview */}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="ml-4 h-24 w-24 object-cover rounded-md"
              />
            )}
          </div>
        </div>
        <div className=" w-full pb-2">
          <input
            type="submit"
            value="Create Category"
            // className={`${styles.input} mt-5 cursor-pointer`}
            required
            readOnly
          />
        </div>
      </div>
    </form>
  );
};

const Form1 = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    try {
      const formData = new FormData();
      formData.append("message", message);

      await axios.post(`${server2}/send-messages`, {
        message,
      });

      toast.success("Messages sent!");
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  return (
    <form onSubmit={handleSendMessage}>
      <h2>Send To Sellers</h2>
      <label for="message">Message:</label>
      <textarea
        id="message"
        name="message"
        rows="4"
        cols="50"
        placeholder="Enter your message"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className="textarea"
        required
      ></textarea>

      <button
        disabled={loading}
        type="submit"
        className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        {loading ? (
          <p className="flex">{/* <Spinner /> Sending... */} sending...</p>
        ) : (
          <p className="">Update Product</p>
        )}
      </button>
    </form>
  );
};

export default Announcement;
