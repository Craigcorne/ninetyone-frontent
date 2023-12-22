import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct } from "../../redux/actions/product";
import axios from "axios";
import { server } from "../../server";
import { useState } from "react";
import { toast } from "react-toastify";
import CustomModal from "../CustomModal";

const AllProducts = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    axios
      .get(`${server}/product/admin-all-products`, { withCredentials: true })
      .then((res) => {
        setData(res.data.products);
      });
  }, []);

  const handleDelete = async () => {
    dispatch(deleteProduct(id));
    toast.success("Product deleted!");
    navigate("/admin/dashboard");
  };

  const setOperations = async (productId) => {
    setModalOpen(true);
    setId(productId);
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Edit",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const productId = params.row.id;
        return (
          <>
            <Link to={`/admin-edit-product/${productId}`}>
              <Button>
                <AiOutlineEdit size={20} />
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

  const row = [];

  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "Ksh " + item.discountPrice,
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });

  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        {modalOpen && (
          <CustomModal
            message={"Are you sure you want to delete this product?"}
            ok={" Yes, I'm sure"}
            cancel={"No, cancel"}
            setModalOpen={setModalOpen}
            performAction={() => handleDelete()}
            closeModel={() => setModalOpen(false)}
          />
        )}
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </>
  );
};

export default AllProducts;
