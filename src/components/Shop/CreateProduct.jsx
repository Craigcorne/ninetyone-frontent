import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { conditionsData } from "../../static/data";
import { server } from "../../server";

const createProductSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  tags: yup.string().required("Tags is required"),
  originalPrice: yup
    .number("Price should be numbers")
    .required("Original Price is required"),
  discountPrice: yup
    .number("Price should be numbers")
    .required("Discount Price is required"),
  stock: yup.number("Stock should be numbers").required("Stock is required"),
  condition: yup.string().required("condition is required"),
});

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const { statements } = useSelector((state) => state.statements);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingg, setLoadingg] = useState(false);

  const [sizes, setSizes] = useState([{ name: "", price: "", stock: "" }]);
  const [totalStock, setTotalStock] = useState(0);
  const [hasSizes, setHasSizes] = useState(false);

  const exchangeRate = statements?.map((i) => i.exchangeRate);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${server}/category/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((old) => [...old, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  function calculateDollarPrice(price, exchangeRate) {
    return price / exchangeRate;
  }
  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...sizes];
    updatedSizes[index][field] = value;
    setSizes(updatedSizes);

    if (updatedSizes.length > 0) {
      let newTotalStock = 0;
      updatedSizes.forEach((size) => {
        if (!isNaN(parseInt(size.stock))) {
          newTotalStock += parseInt(size.stock);
        }
      });
      setTotalStock(newTotalStock);
      setHasSizes(true);

      // Update the product stock in the formik values
      formik.setFieldValue("stock", newTotalStock);
    } else {
      setTotalStock(0);
      setHasSizes(false);

      // Reset the product stock in the formik values
      formik.setFieldValue("stock", "");
    }
  };

  const handleDeleteSize = (index) => {
    const updatedSizes = [...sizes];
    const deletedItem = updatedSizes[index];
    setTotalStock(totalStock - deletedItem.stock);
    updatedSizes.splice(index, 1);
    setSizes(updatedSizes);
    console.log("totalStock", totalStock);
    if (updatedSizes.length === 0) {
      setHasSizes(false);
      setTotalStock(0);
      console.log(hasSizes);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      tags: "",
      originalPrice: "",
      discountPrice: "",
      stock: "",
      images: "",
      condition: "",
      sizes: [{ name: "", price: "", stock: "" }],
    },
    validationSchema: createProductSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setLoadingg(true);
      const name = values.name;
      const description = values.description;
      const category = values.category;
      const tags = values.tags;
      const originalPrice = values.originalPrice;
      const discountPrice = values.discountPrice;
      const stock = values.stock;
      const condition = values.condition;

      const dollarPrice = discountPrice / exchangeRate;

      const sizesWithDollarPrice = sizes.map((size) => ({
        ...size,
        dollarPrice: calculateDollarPrice(size.price, exchangeRate),
      }));

      const newForm = new FormData();

      images.forEach((image) => {
        newForm.append("images", image);
      });
      newForm.append("name", name);
      newForm.append("description", description);
      newForm.append("category", category);
      newForm.append("tags", tags);
      newForm.append("originalPrice", originalPrice);
      newForm.append("discountPrice", discountPrice);
      newForm.append("stock", stock);
      newForm.append("condition", condition);
      newForm.append("shopId", seller._id);
      sizesWithDollarPrice.forEach((size, index) => {
        newForm.append(`sizes[${index}].name`, size.name);
        newForm.append(`sizes[${index}].price`, size.price);
        newForm.append(`sizes[${index}].dollarPrice`, size.dollarPrice);
        newForm.append(`sizes[${index}].stock`, size.stock);
      });

      newForm.append("dollarPrice", dollarPrice);

      setLoading(true);
      dispatch(
        createProduct({
          name,
          description,
          category,
          condition,
          tags,
          originalPrice,
          discountPrice,
          stock,
          shopId: seller._id,
          images,
          sizes: sizesWithDollarPrice,
          dollarPrice: dollarPrice,
        })
      );
      setLoading(false);

      console.log(dollarPrice);
    },
  });
  const deleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
    "video",
  ];

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      {/* create product form */}
      <form onSubmit={formik.handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="text"
            onChange={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            value={formik.values.name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your product name..."
          />
          <div className="text-red-500 text-sm">
            {formik.touched.name && formik.errors.name}
          </div>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <ReactQuill
            theme="snow"
            name="description"
            onChange={formik.handleChange("description")}
            // onBlur={formik.handleBlur("description")}
            modules={quillModules}
            formats={quillFormats}
            value={formik.values.description}
            placeholder="Enter your product description..."
          />
          <div className="text-red-500 text-sm">
            {formik.touched.description && formik.errors.description}
          </div>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="text-red-500 text-sm">
            {formik.touched.category && formik.errors.category}
          </div>
        </div>
        <br />
        <div>
          <label className="pb-2">Tags</label>
          <input
            type="text"
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your product tags..."
          />
          <div className="text-red-500 text-sm">
            {formik.touched.tags && formik.errors.tags}
          </div>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Condition<span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            onChange={formik.handleChange("condition")}
            onBlur={formik.handleBlur("condition")}
            value={formik.values.condition}
          >
            <option value="Choose Product Condition">
              Choose Product Condition
            </option>
            {conditionsData &&
              conditionsData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
          <div className="text-red-500">
            {formik.touched.condition && formik.errors.condition}
          </div>
        </div>
        <br />
        {/* Sizes */}
        <br />
        <div>
          <label className="pb-2">Sizes</label>
          {sizes.map((size, index) => (
            <div key={index}>
              <input
                type="text"
                name={`sizes[${index}].name`}
                onChange={(e) =>
                  handleSizeChange(index, "name", e.target.value)
                }
                onBlur={formik.handleBlur(`sizes[${index}].name`)}
                value={size.name}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Size name"
              />

              <input
                type="text"
                name={`sizes[${index}].price`}
                onChange={(e) =>
                  handleSizeChange(index, "price", e.target.value)
                }
                onBlur={formik.handleBlur(`sizes[${index}].price`)}
                value={size.price}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Price"
              />

              <input
                type="text"
                name={`sizes[${index}].stock`}
                onChange={(e) =>
                  handleSizeChange(index, "stock", e.target.value)
                }
                onBlur={formik.handleBlur(`sizes[${index}].stock`)}
                value={size.stock}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Stock"
              />

              <p>
                Dollar Price:{" "}
                {exchangeRate ? (
                  (parseFloat(size.price) / exchangeRate).toFixed(2)
                ) : (
                  <span>Exchange rate not available</span>
                )}
              </p>
              <button
                type="button"
                onClick={() => handleDeleteSize(index)}
                className="text-red-500 cursor-pointer"
              >
                <AiOutlineDelete size={20} />
              </button>
              <div className="text-red-500">
                {/* Display validation errors for sizes (if any) */}
                {formik.touched.sizes &&
                  formik.errors.sizes &&
                  formik.errors.sizes[index] &&
                  (formik.errors.sizes[index].name ||
                    formik.errors.sizes[index].price ||
                    formik.errors.sizes[index].stock)}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setSizes((prevSizes) => [
                ...prevSizes,
                { name: "", price: "", stock: "" },
              ])
            }
            className="text-blue-600 underline"
          >
            Add Size
          </button>
        </div>

        <br />
        <div>
          <label className="pb-2">Original Price</label>
          <input
            type="text"
            name="price"
            onChange={formik.handleChange("originalPrice")}
            onBlur={formik.handleBlur("originalPrice")}
            value={formik.values.originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your product price..."
          />
          <div className="text-red-500 text-sm">
            {formik.touched.originalPrice && formik.errors.originalPrice}
          </div>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="price"
            onChange={formik.handleChange("discountPrice")}
            onBlur={formik.handleBlur("discountPrice")}
            value={formik.values.discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your product price with discount..."
          />
          <div className="text-red-500 text-sm">
            {formik.touched.discountPrice && formik.errors.discountPrice}
          </div>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="price"
            onChange={formik.handleChange("stock")}
            onBlur={formik.handleBlur("stock")}
            value={hasSizes ? totalStock : formik.values.stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your product stock..."
          />
          <div className="text-red-500 text-sm">
            {formik.touched.stock && formik.errors.stock}
          </div>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((image, index) => (
                <div className="relative" key={index}>
                  <img
                    src={image}
                    alt=""
                    className="h-[120px] w-[120px] object-cover m-2"
                  />
                  <p
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full cursor-pointer p-1"
                    onClick={() => deleteImage(index)}
                  >
                    <AiOutlineDelete size={16} />
                  </p>
                </div>
              ))}
          </div>
          <br />
          <div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {loadingg ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
