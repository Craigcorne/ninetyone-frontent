import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { loadSeller } from "../../redux/actions/user";
import { AiOutlineDelete } from "react-icons/ai";
import Spinner from "../Spinner";
import { BiMoney } from "react-icons/bi";
import { NumericFormat } from "react-number-format";

const WithdrawMoney = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const [withdrawAmount, setWithdrawAmount] = useState(50);
  const [phoneNumber, setPhoneNumber] = useState(seller.phoneNumber);
  const [availableBalance, setAvailableBalance] = useState(
    seller.availableBalance
  );
  const [loading, setLoading] = useState(false);

  const balance = parseInt(availableBalance);
  const amount = parseInt(withdrawAmount);

  const determineTransferFee = (amount) => {
    if (1 <= amount && amount <= 100) {
      return 0;
    } else if (101 <= amount && amount <= 500) {
      return 12;
    } else if (501 <= amount && amount <= 1000) {
      return 14;
    } else if (1001 <= amount && amount <= 1500) {
      return 16;
    } else if (1501 <= amount && amount <= 2500) {
      return 23;
    } else if (2501 <= amount && amount <= 5000) {
      return 33;
    } else if (5001 <= amount && amount <= 20000) {
      return 35;
    } else if (20001 <= amount && amount <= 150000) {
      return 42;
    } else {
      return "Amount out of range";
    }
  };

  const transferFee = determineTransferFee(amount);

  const maximumWithdrawAmount = balance - transferFee;
  const sellerId = seller._id;
  const charges = amount + transferFee;

  const updatedBalance = balance - charges;

  console.log("hreree", updatedBalance);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (withdrawAmount < 50 || withdrawAmount > maximumWithdrawAmount) {
      toast.error("Withdrawal amount is out of range.");
    } else {
      try {
        const response = await axios.post(
          `${server}/pesa/withdrawal`,
          {
            phoneNumber: phoneNumber,
            amount: withdrawAmount,
            sellerId: sellerId,
            updatedBalance: updatedBalance,
          },
          { withCredentials: true }
        );

        if (response.data) {
          console.log("M-Pesa API Response:", response.data);
          toast.success("Withdrawal request sent successfully!");
        }
      } catch (error) {
        console.error("Error sending M-Pesa withdrawal request:", error);
        toast.error("Failed to initiate withdrawal request.");
        setLoading(false);
      }
    }
    setLoading(false);
  };

  const error = () => {
    toast.error("You do not have enough balance to withdraw!");
    setLoading(false);
  };

  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
        <h5 className="text-[20px] pb-4">
          Available Balance: Ksh {availableBalance}
        </h5>
        <div
          className={`${styles.button} text-white !h-[42px] !rounded`}
          onClick={() => (availableBalance < 50 ? error() : setOpen(true))}
        >
          Withdraw
        </div>
      </div>
      {open && (
        <div className="w-full h-screen z-[9999] fixed top-0 left-0 flex items-center justify-center bg-[#0000004e]">
          <div
            className={`w-[95%] 800px:w-[50%] bg-white shadow rounded  min-h-[40vh] p-3`}
          >
            <div className="w-full flex justify-end">
              <RxCross1
                size={25}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>

            <div>
              <h3 className="text-[22px] font-Poppins text-center font-[600]">
                Mpesa Withdraw Method:
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="flex gap-10 justify-center">
                  <div>
                    <div>
                      <label>
                        Mpesa Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name=""
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        id=""
                        placeholder="Enter your Phone Number!"
                        className={`${styles.input} mt-2`}
                      />
                    </div>
                    <div>
                      <label>
                        Amount<span className="text-red-500">*</span>
                      </label>

                      <input
                        type="number"
                        name=""
                        required
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        id=""
                        placeholder="Enter Amount!"
                        className={`${styles.input} mt-2`}
                        min="50"
                        max={maximumWithdrawAmount}
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex gap-2 mt-3">
                      <label>Current Balance:</label>
                      <p className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 inline-flex items-center justify-center">
                        <NumericFormat
                          value={availableBalance}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <label>Transaction Cost:</label>
                      <p className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 inline-flex items-center justify-center">
                        <NumericFormat
                          value={transferFee}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <label>Remaining balance</label>
                      <p className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 inline-flex items-center justify-center">
                        <NumericFormat
                          value={updatedBalance}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-10 justify-center">
                  <button
                    disabled={loading || withdrawAmount > 150000}
                    type="submit"
                    className="group mt-3 relative h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-100"
                  >
                    {loading ? (
                      <p className="flex">
                        <Spinner /> Withdrawing...
                      </p>
                    ) : (
                      <p className="">Withdraw</p>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawMoney;
