import React, { useState } from "react";
import styles from "../../styles/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { NumericFormat } from "react-number-format";
import { updatUserAddress } from "../../redux/actions/user";
import { v4 as uuidv4 } from "uuid";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("Kenya");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [referee, setReferee] = useState("");
  const [refCode, setRefCode] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [deliveryOption, setDeliveryOption] = useState("");
  const [shippingPrice, setShippingPrice] = useState(100);
  const [discShop, setDiscShop] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!userInfo && city !== "Self Pickup") {
      setAddress1("");
    }
    if (!userInfo && city === "Self Pickup") {
      setAddress1("Nairobi City");
    }
  }, [city, userInfo]);

  // shipping addresses
  const handleDeliveryOptionChange = (option) => {
    switch (option) {
      case "Nairobi":
        setShippingPrice(100);
        setCity("Nairobi");
        setDeliveryOption("Nairobi");
        break;
      case "Mombasa":
        setShippingPrice(250);
        setCity("Mombasa");
        break;
      case "Kwale":
        setShippingPrice(250);
        setCity("Kwale");
        break;
      case "Kilifi":
        setShippingPrice(250);
        setCity("Kilifi");
        break;
      case "Tana River":
        setShippingPrice(250);
        setCity("Tana River");
        break;
      case "Lamu":
        setShippingPrice(250);
        setCity("Lamu");
        break;
      case "Taita Taveta":
        setShippingPrice(250);
        setCity("Taita Taveta");
        break;
      case "Garissa":
        setShippingPrice(250);
        setCity("Garissa");
        break;
      case "Wajir":
        setShippingPrice(250);
        setCity("Wajir");
        break;
      case "Mandera":
        setShippingPrice(250);
        setCity("Mandera");
        break;
      case "Marsabit":
        setShippingPrice(250);
        setCity("Marsabit");
        break;
      case "Isiolo":
        setShippingPrice(250);
        setCity("Isiolo");
        break;
      case "Meru":
        setShippingPrice(250);
        setCity("Meru");
        break;
      case "Tharaka-Nithi":
        setShippingPrice(250);
        setCity("Tharaka-Nithi");
        break;
      case "Embu":
        setShippingPrice(250);
        setCity("Embu");
        break;
      case "Kitui":
        setShippingPrice(250);
        setCity("Kitui");
        break;
      case "Machakos":
        setShippingPrice(250);
        setCity("Machakos");
        break;
      case "Makueni":
        setShippingPrice(250);
        setCity("Makueni");
        break;
      case "Nyandarua":
        setShippingPrice(250);
        setCity("Nyandarua");
        break;
      case "Nyeri":
        setShippingPrice(250);
        setCity("Nyeri");
        break;
      case "Kirinyaga":
        setShippingPrice(250);
        setCity("Kirinyaga");
        break;
      case "Murang'a":
        setShippingPrice(250);
        setCity("Murang'a");
        break;
      case "Kiambu":
        setShippingPrice(150);
        setCity("Kiambu");
        break;
      case "Turkana":
        setShippingPrice(250);
        setCity("Turkana");
        break;
      case "West Pokot":
        setShippingPrice(250);
        setCity("West Pokot");
        break;
      case "Samburu":
        setShippingPrice(250);
        setCity("Samburu");
        break;
      case "Trans-Nzoia":
        setShippingPrice(250);
        setCity("Trans-Nzoia");
        break;
      case "Uasin Gishu":
        setShippingPrice(250);
        setCity("Uasin Gishu");
        break;
      case "Elgeyo-Marakwe":
        setShippingPrice(250);
        setCity("Elgeyo-Marakwe");
        break;
      case "Nandi":
        setShippingPrice(250);
        setCity("Nandi");
        break;
      case "Baringo":
        setShippingPrice(250);
        setCity("Baringo");
        break;
      case "Laikipia":
        setShippingPrice(250);
        setCity("Laikipia");
        break;
      case "Nakuru":
        setShippingPrice(250);
        setCity("Nakuru");
        break;
      case "Narok":
        setShippingPrice(250);
        setCity("Narok");
        break;
      case "Kajiado":
        setShippingPrice(250);
        setCity("Kajiado");
        break;
      case "Kericho":
        setShippingPrice(250);
        setCity("Kericho");
        break;
      case "Bomet":
        setShippingPrice(250);
        setCity("Bomet");
        break;
      case "Kakamega":
        setShippingPrice(250);
        setCity("Kakamega");
        break;
      case "Vihiga":
        setShippingPrice(250);
        setCity("Vihiga");
        break;
      case "Bungoma":
        setShippingPrice(250);
        setCity("Bungoma");
        break;
      case "Busia":
        setShippingPrice(250);
        setCity("Busia");
        break;
      case "Siaya":
        setShippingPrice(250);
        setCity("Siaya");
        break;
      case "Kisumu":
        setShippingPrice(250);
        setCity("Kisumu");
        break;
      case "Homa Bay":
        setShippingPrice(250);
        setCity("Homa Bay");
        break;
      case "Migori":
        setShippingPrice(250);
        setCity("Migori");
        break;
      case "Kisii":
        setShippingPrice(250);
        setCity("Kisii");
        break;
      case "Nyamira":
        setShippingPrice(250);
        setCity("Nyamira");
        break;
      case "Self Pickup":
        setShippingPrice(0);
        setCity("Self Pickup");
        setZipCode("Nairobi");
        break;
      case "Pick up mtaani":
        setShippingPrice(150);
        break;
      default:
        setShippingPrice(100);
        setCity("");
        setZipCode("");
        break;
    }
  };

  const paymentSubmit = () => {
    if (
      address1 === "" ||
      // address2 === "" ||
      // zipCode === "" ||
      country === "" ||
      city === ""
    ) {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = {
        address1,
        address2,
        zipCode,
        country,
        city,
      };

      const currentDate = new Date()
        .toLocaleDateString("en-US", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "");
      const randomPart = uuidv4().slice(0, 5);

      const orderNumber = `#N1SCM${currentDate}${randomPart}`;

      const orderData = {
        cart,
        orderNumber,
        totalPrice,
        subTotalPrice,
        shippingPrice,
        discountPrice,
        shippingAddress,
        user,
        discShop,
        referee,
      };

      // update local storage with the updated orders array
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
      const shopId = res.data.couponCode?.shopId;
      const couponCodeValue = res.data.couponCode?.value;
      if (res.data.couponCode !== null) {
        const isCouponValid =
          cart && cart.filter((item) => item.shopId === shopId);
        setDiscShop(shopId);

        if (isCouponValid.length === 0) {
          toast.error("Coupon code is not valid for this shop");
          setCouponCode("");
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );
          // const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          const discountPrice = (eligiblePrice * couponCodeValue) / 100;

          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.couponCode);
          setCouponCode("");
        }
      }
      if (res.data.couponCode === null) {
        toast.error("Coupon code doesn't exists!");
        setCouponCode("");
      }
    });
  };

  const handleSubmitt = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${server}/user/get-user-id/${refCode}`);

      if (response.data.success) {
        const userId = response.data.userId;

        if (userId === user._id) {
          setReferee("");
          console.log("Referee is", referee);
          toast.error("You cannot use your own RefCode");
        }
        if (userId === !user._id) {
          console.log("User ID:", userId);
          setReferee(userId);
          toast.success("Referral added");
          setLoading(true);
        }
      } else {
        console.log("User not found.");
        toast.error("Referral code does not exist");
        setRefCode("");
      }
    } catch (error) {
      setRefCode("");
      if (error.response && error.response.status === 404) {
        toast.error("Referral code does not exist");
      } else {
        toast.error("An error occurred while fetching user ID");
      }
      setLoading(false);
    }
  };

  const discountPercentenge = couponCodeData ? discountPrice : "";
  const shippingPricee = subTotalPrice >= 5000 ? 0 : shippingPrice;

  const totalPrice = couponCodeData
    ? (subTotalPrice + shippingPricee - discountPercentenge).toFixed(2)
    : (subTotalPrice + shippingPricee).toFixed(2);

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
            handleDeliveryOptionChange={handleDeliveryOptionChange}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            handleSubmitt={handleSubmitt}
            totalPrice={totalPrice}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}
            shipping={shippingPricee}
            refCode={refCode}
            setRefCode={setRefCode}
            referee={referee}
            setReferee={setReferee}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      </div>
      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
  deliveryOption,
  handleDeliveryOptionChange,
}) => {
  const email = user?.email;
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  const saveNumber = async (e) => {
    e.preventDefault();
    await axios.put(
      `${server}/user/update-user-phone`,
      {
        email,
        phoneNumber,
      },
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
      }
    );
  };

  const handleSubmit = async (e) => {
    const addressType = "Others";

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updatUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        ),
        toast.success("Address saved")
      );
    }
  };
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        <div className="w-full block lg:flex pb-3 gap-3">
          <div className="w-full lg:w-[50%]">
            <label className="block pb-2 font-[500]">Full Name</label>
            <input
              type="text"
              value={user && user.name}
              required
              className="w-full px-3 h-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="w-full lg:w-[50%]">
            <label className="block pb-2 font-[500] ">Email Address</label>
            <input
              type="email"
              value={user && user.email}
              required
              className="w-full px-3 h-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="w-full flex pb-3 gap-3">
          <div className="w-[50%]">
            <label className="block pb-2 font-[500]">Phone Number</label>
            <input
              type="number"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 h-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2 font-[500]">Country</label>
            <select
              className="w-[95%] border h-10 rounded-md px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={"Kenya"}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="Kenya">Kenya</option>
            </select>
          </div>
        </div>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2 font-bold">County</label>
            <select
              name="county"
              className="w-[95%] border h-10 rounded-md px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => handleDeliveryOptionChange(e.target.value)}
              value={city}
            >
              <option value="" selected disabled>
                Select County
              </option>
              <option value="Nairobi">Nairobi</option>
              <option value="Mombasa">Mombasa</option>
              <option value="Kwale">Kwale</option>
              <option value="Kilifi">Kilifi</option>
              <option value="Tana River">Tana River</option>
              <option value="Lamu">Lamu</option>
              <option value="Taita Taveta">Taita Taveta</option>
              <option value="Garissa">Garissa</option>
              <option value="Wajir">Wajir</option>
              <option value="Mandera">Mandera</option>
              <option value="Marsabit">Marsabit</option>
              <option value="Isiolo">Isiolo</option>
              <option value="Meru">Meru</option>
              <option value="Tharaka-Nithi">Tharaka-Nithi</option>
              <option value="Embu">Embu</option>
              <option value="Kitui">Kitui</option>
              <option value="Machakos">Machakos</option>
              <option value="Makueni">Makueni</option>
              <option value="Nyandarua">Nyandarua</option>
              <option value="Nyeri">Nyeri</option>
              <option value="Kirinyaga">Kirinyaga</option>
              <option value="Murang'a">Murang'a</option>
              <option value="Kiambu">Kiambu</option>
              <option value="Turkana">Turkana</option>
              <option value="West Pokot">West Pokot</option>
              <option value="Samburu">Samburu</option>
              <option value="Trans-Nzoia">Trans-Nzoia</option>
              <option value="Uasin Gishu">Uasin Gishu</option>
              <option value="Elgeyo-Marakwe">Elgeyo-Marakwet</option>
              <option value="Nandi">Nandi</option>
              <option value="Baringo">Baringo</option>
              <option value="Laikipia">Laikipia</option>
              <option value="Nakuru">Nakuru</option>
              <option value="Narok">Narok</option>
              <option value="Kajiado">Kajiado</option>
              <option value="Kericho">Kericho</option>
              <option value="Bomet">Bomet</option>
              <option value="Kakamega">Kakamega</option>
              <option value="Vihiga">Vihiga</option>
              <option value="Bungoma">Bungoma</option>
              <option value="Busia">Busia</option>
              <option value="Siaya">Siaya</option>
              <option value="Kisumu">Kisumu</option>
              <option value="Homa Bay">Homa Bay</option>
              <option value="Migori">Migori</option>
              <option value="Kisii">Kisii</option>
              <option value="Nyamira">Nyamira</option>
              <option value="Self Pickup">Self Pickup(Nairobi)</option>
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2 font-[500]">Town/City</label>
            <input
              type="text"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              required
              className="w-[95%] border h-10 rounded-md px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        {city !== "Self Pickup" && (
          <div className="w-full block lg:flex pb-3 gap-3">
            <div className="w-full lg:w-[50%]">
              <label className="block pb-2 font-[500]">Address</label>
              <input
                type="address"
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="w-full px-3 h-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="w-full lg:w-[50%]">
              <label className="block pb-2 font-[500]">
                Other Delivery Information(optional)
              </label>
              <input
                type="address"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                required
                className="w-full px-3 h-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        )}
        {city === "Self Pickup" && (
          <div class="bg-transparent border rounded-lg  mb-5 overflow-hidden">
            <h5 class="card-header bg-slate-100 text-black text-xl font-bold px-4 py-2">
              PickUp Address
            </h5>
            <div class="card-body px-4 py-2">
              <p class="card-text mb-4">
                Rasumal house shop 3F , 17 ,on third floor. <br /> It's opposite
                imenti house on Tom mboya street . <br />
                It's also the same building that hosts Heltz driving
                school,(next to Dominion expo center. )
              </p>
            </div>
          </div>
        )}

        <div></div>
      </form>
      <div className="w-[50%] flex items-center">
        <button
          className="flex justify-center items-center mb-3"
          onClick={() => handleSubmit()}
        >
          <input
            type="checkbox"
            value=""
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            // onChange={(e) => {
            //   setIsChecked(e.target.checked);
            //   saveNumber(e);
            // }}
          />{" "}
          <label className="ml-2 text-gray-900">save my address</label>
        </button>
      </div>
      <h5
        className="text-[18px] cursor-pointer inline-block"
        onClick={() => setUserInfo(!userInfo)}
      >
        Choose From saved address
      </h5>
      {userInfo && (
        <div>
          {user &&
            user.addresses.map((item, index) => (
              <div className="w-full flex mt-1">
                <input
                  type="checkbox"
                  className="mr-3"
                  value={item.addressType}
                  onClick={() => {
                    setAddress1(item.address1) ||
                      setAddress2(item.address2) ||
                      setZipCode(item.zipCode) ||
                      setCountry(item.country) ||
                      setCity(item.city);
                    handleDeliveryOptionChange(item.city);
                  }}
                />
                <h2>{item.addressType}</h2>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

const CartData = ({
  handleSubmit,
  handleSubmitt,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
  refCode,
  setRefCode,
  referee,
  setReferee,
  loading,
  setLoading,
}) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">
          {" "}
          <NumericFormat
            value={subTotalPrice.toFixed(2)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"Ksh. "}
          />
        </h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">
          {" "}
          <NumericFormat
            value={shipping.toFixed(2)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"Ksh. "}
          />
        </h5>
      </div>
      <br />
      {discountPercentenge.toString() > 0 && (
        <div className="flex justify-between border-b pb-3">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
          <h5 className="text-[18px] font-[600]">
            {discountPercentenge ? (
              <NumericFormat
                value={discountPercentenge.toString()}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"- Ksh. "}
              />
            ) : null}
          </h5>
        </div>
      )}
      <div className="flex justify-between border-b border-t pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4] pt-3">
          Total Amount:
        </h3>
        <h5 className="text-[18px] font-[600] text-end pt-3">
          <NumericFormat
            value={totalPrice}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"Ksh. "}
          />
        </h5>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Coupoun code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Apply code"
          type="submit"
        />
      </form>
      <br />
      <form onSubmit={handleSubmitt}>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Referral Code"
          value={refCode}
          onChange={(e) => setRefCode(e.target.value)}
          required
        />
        {!loading && (
          <input
            className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
            required
            value="Apply code"
            type="submit"
          />
        )}
      </form>
    </div>
  );
};

export default Checkout;
