import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import CustomModal from "../CustomModal";
import { toast } from "react-toastify";
import { server } from "../../server";
import axios from "axios";

const AllFlashSale = () => {
  const { seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [row, setRow] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState("");

  const handleDelete = async () => {
    try {
      const updatedFlashSaleProducts = flashSaleProducts.filter(
        (product) => product.id !== id
      );
      setFlashSaleProducts(updatedFlashSaleProducts);

      toast.success("Product deleted!");

      setIsLoading(true);

      const response = await axios.get(
        `${server}/flashsale/flash-sales/shop/${seller._id}`
      );

      if (response.status === 200) {
        setFlashSaleProducts(response.data);
        setIsLoading(false);
        navigate("/dashboard");
      } else {
        setIsLoading(false);
        console.error(response.data.error);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const setOperations = async (productId) => {
    setModalOpen(true);
    setId(productId);
  };

  useEffect(() => {
    const fetchFlashSaleProducts = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          `${server}/flashsale/flash-sales/shop/${seller._id}`
        );

        if (response.status === 200) {
          setFlashSaleProducts(response.data);
          console.log(response.data);
        } else {
          console.error(response.data.error);
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchFlashSaleProducts();
  }, []);

  const columns = [
    { field: "id", headerName: "Event Id", minWidth: 150, flex: 0.7 },
    {
      field: "name1",
      headerName: "Name",
      minWidth: 100,
      flex: 1.4,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      minWidth: 130,
      type: "date",
      flex: 0.6,
    },
    {
      field: "endDate",
      headerName: "End Date",
      type: "date",
      minWidth: 130,
      flex: 0.5,
    },

    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const productId = params.row.name;
        return (
          <>
            <Link to={`/product/${productId}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setOperations(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = flashSaleProducts.map((item) => {
    const product = products.find((product) => product._id === item.productId);

    return {
      id: item._id,
      name: item.productId,
      name1: product ? product.name : "Product Not Found",
      startDate: item.startDate.substring(0, 10),
      endDate: item.endDate.substring(0, 10),
    };
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          {modalOpen && (
            <CustomModal
              message={"Are you sure you want to delete this event?"}
              ok={" Yes, I'm sure"}
              cancel={"No, cancel"}
              setModalOpen={setModalOpen}
              performAction={() => handleDelete()}
              closeModel={() => setModalOpen(false)}
            />
          )}
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllFlashSale;
