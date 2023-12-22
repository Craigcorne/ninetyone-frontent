import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import DashboardHeader from "./Layout/DashboardHeader";
import DashboardSideBar from "./Layout/DashboardSideBar";

const CreateFlashSale = () => {
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productId, setProductId] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState(getCurrentDate());
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleProductIdChange = (e) => {
    const selectedProductId = e.target.value;
    setProductId(selectedProductId);

    // Find the selected product from the products array
    const selectedProduct = products.find(
      (product) => product._id === selectedProductId
    );

    // Update the selected product state
    setSelectedProduct(selectedProduct);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const flashSale = {
        productId,
        startDate,
        endDate,
        shopId: seller._id,
      };
      console.log("error", flashSale);

      await axios.post(`${server}/flashsale/flash-sale`, flashSale);

      setLoading(false);
      toast.success("Flash sale created successfully!");
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);

      if (error.response) {
        // The server responded with an error status code
        console.error("Error Response Data:", error.response.data);
      } else {
        // Something else went wrong
        console.error("Error submitting the form:", error.message);
      }
    }
  };

  return (
    <div>
      <DashboardHeader />
      <div className="flex items-stretch">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={5} />
        </div>
        <div className="w-[90%] 800px:w-[50%] bg-white shadow mx-auto rounded p-6">
          <h5 className="text-[30px] font-Poppins text-center">
            Create Flash Sale
          </h5>
          <form onSubmit={handleSubmit}>
            <br />
            <div>
              <label className="pb-2">
                Select Product <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full mt-2 border h-[35px] rounded-[5px]"
                value={productId}
                onChange={handleProductIdChange}
              >
                <option value="">Select a product</option>
                {products && products.length > 0 ? (
                  products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No products available
                  </option>
                )}
              </select>
            </div>
            <div>
              <label className="pb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="start-date"
                value={startDate}
                min={getCurrentDate()}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={handleStartDateChange}
                placeholder="Select the start date..."
              />
            </div>
            <br />
            <div>
              <label className="pb-2">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="end-date"
                value={endDate}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={handleEndDateChange}
                placeholder="Select the end date..."
              />
            </div>
            <br />
            <div>
              <input
                type="submit"
                value="Create Flash Sale"
                className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                disabled={loading}
              />
            </div>
          </form>
          <br />
          {selectedProduct && (
            <div>
              <h2>Selected Product Details</h2>
              <p>Name: {selectedProduct.name}</p>
              <p>Description: </p>
              <p
                dangerouslySetInnerHTML={{
                  __html: selectedProduct.description,
                }}
              ></p>{" "}
              <p>Category: {selectedProduct.category}</p>
              <p>tags: {selectedProduct.tags}</p>
              <p>originalPrice: {selectedProduct.originalPrice}</p>
              <p> discountPrice: {selectedProduct.discountPrice}</p>
              <p>stock: {selectedProduct.stock}</p>
              <p> condition: {selectedProduct.condition}</p>
              <div>
                <h2>Product Images</h2>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    overflowX: "auto",
                  }}
                >
                  {selectedProduct.images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image.url}
                        alt="product images"
                        className="h-[120px] w-[120px] object-cover m-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2>Product Sizes</h2>
                {selectedProduct.sizes.map((size, index) => (
                  <div key={index}>
                    <p>Size Name: {size.name}</p>
                    <p>Price: {size.price}</p>
                    <p>Dollar Price: {size.dollarPrice}</p>
                    <p>Stock: {size.stock}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <br />
        </div>
      </div>
    </div>
  );
};

export default CreateFlashSale;
