import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../server";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import "react-quill/dist/quill.snow.css";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import CustomModal from "../CustomModal";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");
  const [editingCategoryImage, setEditingCategoryImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [catId, setCatId] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${server}/category/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  const handleCreateCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      await axios.post(`${server}/category/create-category`, {
        name,
        image,
      });
      await fetchCategories();
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

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${server}/category/delete-category/${id}`);
      toast.success("Category deleted!");
      fetchCategories();
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const setOperations = (id) => {
    setCatId(id);
    setModalOpen(true);
  };

  return (
    <>
      {modalOpen && (
        <CustomModal
          message={"Are you sure you want to delete this category?"}
          ok={" Yes, I'm sure"}
          cancel={"No, cancel"}
          setModalOpen={setModalOpen}
          performAction={() => handleDeleteCategory(catId)}
          closeModel={() => setModalOpen(false)}
        />
      )}
      <div className="w-full px-5">
        {open && (
          <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
            <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
              <div className="w-full flex justify-end p-3">
                <RxCross1
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <h1 className="text-center text-[25px] font-Poppins">
                Add Category
              </h1>
              <div className="w-full">
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
                        className={`${styles.input} mt-5 cursor-pointer`}
                        required
                        readOnly
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
            Categories
          </h1>
          <div
            className={`${styles.button} !rounded-md`}
            onClick={() => setOpen(true)}
          >
            <span className="text-[#fff]">Add New</span>
          </div>
        </div>

        {categories.map((category) => (
          <>
            <div
              className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
              key={category._id}
            >
              {/* Display category image */}
              {!editingCategoryId || editingCategoryId !== category._id ? (
                <div className="flex items-center">
                  <img
                    src={`${category.image[0]?.url}`}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    alt=""
                  />
                </div>
              ) : null}

              {/* Edit mode */}
              {editingCategoryId && editingCategoryId === category._id ? (
                <div className="w-full pb-2">
                  <div className="flex items-center">
                    <label
                      htmlFor={`image-upload-${category._id}`}
                      className="cursor-pointer"
                    >
                      <AiOutlinePlusCircle size={25} color="#555" />
                    </label>
                    <input
                      type="file"
                      id={`image-upload-${category._id}`}
                      className="hidden"
                      name=""
                      onChange={(e) =>
                        setEditingCategoryImage(e.target.files[0])
                      }
                    />
                    {/* Image preview */}
                    {editingCategoryImage && (
                      <img
                        src={URL.createObjectURL(editingCategoryImage)}
                        alt="Preview"
                        className="ml-4 h-24 w-24 object-cover rounded-md"
                      />
                    )}
                  </div>
                  <input
                    type="text"
                    name="text"
                    onChange={(e) => setEditingCategoryName(e.target.value)}
                    value={editingCategoryName}
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter Category Name..."
                    required
                  />
                </div>
              ) : (
                <div className="pl-8 flex items-center">
                  <h6 className="text-[12px] 800px:text-[unset]">
                    {category.name}
                  </h6>
                </div>
              )}

              <div className="min-w-[10%] flex items-center justify-between pl-8">
                {/* Delete button */}
                <AiOutlineDelete
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOperations(category._id)}
                />
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};
export default CreateCategory;
