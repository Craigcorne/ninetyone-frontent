import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import { server } from "../../server";
import { toast } from "react-toastify";
import { duration } from "moment";
import { useNavigate } from "react-router-dom";

const AllAuction = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [auctions, setAuctions] = useState([]);
  const [duration, setDuration] = useState(1);
  const [startingPrice, setStartingPrice] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [size, setSize] = useState("");
  const [productId, setProductId] = useState(null);
  const [bidIncrement, setBidIncrement] = useState(null);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/auction/all`, {
        params: { shopId: seller._id },
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setAuctions(res.data.auctions);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [dispatch]);

  const handleProductChange = (selectedProductId) => {
    const selectedProduct = products.find(
      (product) => product._id === selectedProductId
    );

    if (selectedProduct) {
      setProductId(selectedProductId);
      setName(selectedProduct.name);
      setSelectedProduct(selectedProduct);
    }
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/coupon/delete-coupon/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success("Coupon code deleted succesfully!");
      });
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/auction/create`,
        {
          productId,
          name,
          startingPrice,
          bidIncrement,
          duration,
          size,
          shopId: seller._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Auction created successfully!");
        setOpen(false);
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Auction",
      minWidth: 150,
      flex: 1.4,
    },
    {
      field: "currentBid",
      headerName: "Current Bid",
      minWidth: 80,
      flex: 0.6,
    },
    {
      field: "timeLeft",
      headerName: "Time Left",
      minWidth: 100,
      flex: 0.6,
    },
    // {
    //   field: "Delete",
    //   flex: 0.8,
    //   minWidth: 120,
    //   headerName: "",
    //   type: "number",
    //   sortable: false,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Button onClick={() => handleDelete(params.id)}>
    //           <AiOutlineDelete size={20} />
    //         </Button>
    //       </>
    //     );
    //   },
    // },
  ];

  const row = [];

  auctions &&
    auctions.forEach((item) => {
      const endDate = new Date(item.endDate);
      const startDate = Date.now();
      // Calculate the time left in milliseconds
      const timeLeftMilliseconds = endDate - startDate;

      // Convert milliseconds to seconds
      const timeLeftSeconds = timeLeftMilliseconds / 1000;
      const hours = Math.floor(timeLeftSeconds / 3600);
      const minutes = Math.floor((timeLeftSeconds % 3600) / 60);
      const seconds = Math.floor(timeLeftSeconds) % 60;

      row.push({
        id: item._id,
        name: item.name,
        currentBid: item.currentBid,
        timeLeft: `${hours}h ${minutes}m ${seconds}s`,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Create Auction</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
              <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-[30px] font-Poppins text-center">
                  Create Auction
                </h5>
                {/* create coupoun code */}
                <form onSubmit={handleSubmit} aria-required={true}>
                  <br />
                  <div>
                    <label className="pb-2">Selected Product</label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      value={productId}
                      onChange={(e) => handleProductChange(e.target.value)}
                    >
                      <option value="">Choose a product</option>
                      {products.map((product) => (
                        <option value={product._id} key={product._id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <br />
                  {selectedProduct &&
                    selectedProduct.sizes &&
                    selectedProduct.sizes.length > 0 && (
                      <div>
                        <label className="pb-2">Select Size</label>
                        <select
                          className="w-full mt-2 border h-[35px] rounded-[5px]"
                          value={size}
                          onChange={(e) => setSize(e.target.value)}
                        >
                          <option value="">Choose a size</option>
                          {selectedProduct.sizes.map((size) => (
                            <option value={size.name} key={size._id}>
                              {size.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                  <br />
                  <div>
                    <label className="pb-2">
                      Starting Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="startingPrice"
                      value={startingPrice}
                      required
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setStartingPrice(e.target.value)}
                      placeholder="Enter Starting Price ..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Bid Increment</label>
                    <input
                      type="number"
                      name="bidIncrement"
                      value={bidIncrement}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setBidIncrement(e.target.value)}
                      placeholder="The bid increment amount..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Duration</label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    >
                      <option value="1">1 day</option>
                      <option value="2">2 days</option>
                      <option value="3">3 days</option>
                    </select>
                  </div>
                  <br />
                  <div>
                    <div
                      className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
                      onClick={handleSubmit}
                    >
                      <span className="text-white">Create Auction</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllAuction;
