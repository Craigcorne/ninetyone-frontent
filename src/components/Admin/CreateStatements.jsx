import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import CustomModal from "../CustomModal";

const CreateStatements = () => {
  const [statements, setStatements] = useState([]);
  const [formData, setFormData] = useState({
    promotionName: "",
    typingName1: "",
    typingName2: "",
    typingName3: "",
    promotionImage: "",
    promotionDetails: "",
    productId: "",
    exchangeRate: "",
  });
  const [selectedStatement, setSelectedStatement] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchStatements();
  }, []);

  const fetchStatements = async () => {
    try {
      const response = await axios.get(`${server}/statements/get-statements`);
      const { success, statements } = response.data;

      if (success) {
        setStatements(statements);
      } else {
        console.error("Failed to fetch statements");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (selectedStatement) {
        response = await axios.put(
          `${server}/statements/update-statement/${selectedStatement._id}`,
          formData
        );
      } else {
        response = await axios.post(
          `${server}/statements/create-statements`,
          formData
        );
      }

      const { success, statement } = response.data;

      if (success) {
        setStatements((prevStatements) => {
          if (selectedStatement) {
            const index = prevStatements.findIndex(
              (s) => s._id === selectedStatement._id
            );
            const updatedStatements = [...prevStatements];
            updatedStatements[index] = statement;
            return updatedStatements;
          } else {
            return [...prevStatements, statement];
          }
        });

        setFormData({
          promotionName: "",
          typingName1: "",
          typingName2: "",
          typingName3: "",
          promotionImage: "",
          promotionDetails: "",
          productId: "",
          exchangeRate: "",
        });
        setSelectedStatement(null);
      } else {
        console.error("Failed to save statement");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleEdit = (statement) => {
    setSelectedStatement(statement);
    setFormData({
      promotionName: statement.promotionName,
      typingName1: statement.typingName1,
      typingName2: statement.typingName2,
      typingName3: statement.typingName3,
      promotionImage: statement.promotionImage,
      promotionDetails: statement.promotionDetails,
      productId: statement.productId,
      exchangeRate: statement.exchangeRate,
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${server}/statements/delete-statement/${id}`
      );
      const { success } = response.data;

      if (success) {
        setStatements((prevStatements) =>
          prevStatements.filter((statement) => statement._id !== id)
        );
      } else {
        console.error("Failed to delete statement");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="container m-4 px-4">
      <h1 className="text-2xl font-bold mb-4">Manage Statements</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Create Statement</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="promotionName" className="block font-medium mb-1">
              Promotion Name
            </label>
            <input
              type="text"
              id="promotionName"
              name="promotionName"
              className="border border-gray-300 rounded px-4 py-2 w-full"
              value={formData.promotionName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="typingName1" className="block font-medium mb-1">
              Typing Name 1
            </label>
            <input
              type="text"
              id="typingName1"
              name="typingName1"
              className="border border-gray-300 rounded px-4 py-2 w-full"
              value={formData.typingName1}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="typingName2" className="block font-medium mb-1">
              Typing Name 2
            </label>
            <input
              type="text"
              id="typingName2"
              name="typingName2"
              className="border border-gray-300 rounded px-4 py-2 w-full"
              value={formData.typingName2}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="typingName3" className="block font-medium mb-1">
              Typing Name 3
            </label>
            <input
              type="text"
              id="typingName3"
              name="typingName3"
              className="border border-gray-300 rounded px-4 py-2 w-full"
              value={formData.typingName3}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="promotionImage" className="block font-medium mb-1">
              Promotion Image
            </label>
            <input
              type="text"
              id="promotionImage"
              name="promotionImage"
              className="border border-gray-300 rounded px-4 py-2 w-full"
              value={formData.promotionImage}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="promotionImage" className="block font-medium mb-1">
              Product Id
            </label>
            <input
              type="text"
              id="productId"
              name="productId"
              className="border border-gray-300 rounded px-4 py-2 w-full"
              value={formData.productId}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="promotionImage" className="block font-medium mb-1">
              Exchange Rate
            </label>
            <input
              type="text"
              id="exchangeRate"
              name="exchangeRate"
              className="border border-gray-300 rounded px-4 py-2 w-full"
              value={formData.exchangeRate}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="promotionDetails"
              className="block font-medium mb-1"
            >
              Promotion Details
            </label>
            <textarea
              id="promotionDetails"
              name="promotionDetails"
              className="border border-gray-300 rounded px-4 py-2 w-full"
              value={formData.promotionDetails}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 mt-4"
        >
          {selectedStatement ? "Update Statement" : "Create Statement"}
        </button>
      </form>

      <div>
        <h2 className="text-xl font-semibold mb-2">Statements List</h2>
        <table className="min-w-full">
          <thead>
            <tr className="font-bold">
              <td className="py-2">Promotion Name</td>
              <td className="py-2">Actions</td>
            </tr>
          </thead>
          <tbody>
            {statements.map((statement) => (
              <>
                {" "}
                {modalOpen && (
                  <CustomModal
                    message={"Are you sure you want to delete this statement?"}
                    ok={" Yes, I'm sure"}
                    cancel={"No, cancel"}
                    setModalOpen={setModalOpen}
                    performAction={() => handleDelete(statement._id)}
                    closeModel={() => setModalOpen(false)}
                  />
                )}
                <tr key={statement._id}>
                  <td>{statement.promotionName}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(statement)}
                      className="bg-green-500 text-white rounded px-2 py-1 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setModalOpen(true)}
                      className="bg-red-500 text-white rounded px-2 py-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                <div className="flex">
                  <img
                    src={statement.promotionImage}
                    alt="imgalt"
                    className="w-36 h-36"
                  />
                  <div>
                    <li>{statement.promotionName}</li>
                    <li>{statement.typingName1}</li>
                    <li>{statement.typingName2}</li>
                    <li>{statement.typingName3}</li>
                    <li>{statement.promotionDetails}</li>
                    <li>{statement.productId}</li>
                    <li>{statement.exchangeRate}</li>
                  </div>
                </div>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateStatements;
