import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { server } from "../../../server";
import { useSelector } from "react-redux";
import { BsQuestionCircle, BsPersonExclamation } from "react-icons/bs";
import { BiSolidPhoneCall } from "react-icons/bi";
import { TfiShoppingCartFull } from "react-icons/tfi";
import CustomModal from "../../CustomModal";

const Hero = () => {
  const { statements } = useSelector((state) => state.statements);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const [carouselData, setCarouselData] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    fetchData2();
    getSellers();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${server}/carousel/get-carousel`);
      const products = await axios.get(`${server}/product/get-all-products`);

      setCarouselData(response.data);
      setBestSelling(products.data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching carousel data:", error);
    }
  };
  const fetchData2 = async () => {
    try {
      const products2 = await axios.get(`${server}/product/get-all-products`);
      setFeaturedProduct(products2.data.products);
    } catch (error) {
      console.error("Error fetching carousel data:", error);
    }
  };

  //getting sellers
  const getSellers = async () => {
    axios
      .get(`${server}/shop/get-all-sellers`)
      .then((res) => {
        setSellers(res.data.sellers);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sortedBestSellingProducts = bestSelling.sort((a, b) => {
    return b.sold_out - a.sold_out;
  });

  const sortedNewProducts = featuredProduct.sort((a, b) => {
    return b.createdAt - a.createdAt;
  });
  const loginNow = () => {
    navigate("/login");
  };

  const searchOrder = (e) => {
    setModalOpen(false);
    navigate("/searchorder");
    if (!e) {
      var e = window.event;
      e.cancelBubble = true;
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };

  return (
    <>
      {modalOpen && (
        <CustomModal
          message={"You can login or search order Directly"}
          ok={"Log In"}
          cancel={"Search order"}
          setModalOpen={setModalOpen}
          performAction={() => loginNow()}
          closeModel={() => searchOrder()}
          secondOptions
        />
      )}
      <div className="grid gap-3 lg:grid-cols-2 sm:grid-cols-1 mb-14">
        {loading ? (
          <div className="rounded mt-3">
            <div class="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
              <div class="relative">
                <div class="h-[50vh] bg-slate-200 rounded animate-stripes p-10">
                  <div class="preloader">
                    <svg
                      class="cart"
                      role="img"
                      aria-label="Shopping cart line animation"
                      viewBox="0 0 128 128"
                      width="128px"
                      height="128px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="8"
                      >
                        <g class="cart__track" stroke="hsla(0,10%,10%,0.1)">
                          <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
                          <circle cx="43" cy="111" r="13" />
                          <circle cx="102" cy="111" r="13" />
                        </g>
                        <g class="cart__lines" stroke="currentColor">
                          <polyline
                            class="cart__top"
                            points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"
                            stroke-dasharray="338 338"
                            stroke-dashoffset="-338"
                          />
                          <g
                            class="cart__wheel1"
                            transform="rotate(-90,43,111)"
                          >
                            <circle
                              class="cart__wheel-stroke"
                              cx="43"
                              cy="111"
                              r="13"
                              stroke-dasharray="81.68 81.68"
                              stroke-dashoffset="81.68"
                            />
                          </g>
                          <g
                            class="cart__wheel2"
                            transform="rotate(90,102,111)"
                          >
                            <circle
                              class="cart__wheel-stroke"
                              cx="102"
                              cy="111"
                              r="13"
                              stroke-dasharray="81.68 81.68"
                              stroke-dashoffset="81.68"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                    <div class="preloader__text">
                      <p class="preloader__msg">Bringing you the goods…</p>
                      <p class="preloader__msg preloader__msg--last">
                        This is taking long. Something's wrong.
                      </p>
                    </div>
                  </div>
                </div>{" "}
                <div class="h-3 mt-3 bg-slate-200 rounded animate-stripes"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded carousel-container mt-3">
            <Carousel
              autoPlay
              infiniteLoop
              showStatus={false}
              showThumbs={false}
            >
              {carouselData.map((slide) => (
                <div key={slide._id}>
                  <img
                    className="rounded carousel-image object-contain"
                    src={`${slide.image[0]?.url}`}
                    alt={slide.caption}
                  />
                  <p className="legend">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: slide.caption,
                      }}
                    ></p>
                    <br />
                    <Link
                      to="/products"
                      class="text-white border p-2 border-white focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm"
                    >
                      see more
                    </Link>
                  </p>
                </div>
              ))}
            </Carousel>

            <style jsx>{`
              .carousel-image {
                /* Increase size for smaller screens */
                max-width: 100%;
                height: 500px;
              }
              @media (max-width: 768px) {
                /* Adjust size for smaller screens */
                .carousel-image {
                  /* Increase size for smaller screens */
                  max-width: 100%;
                  width: 100%;
                  height: 400px;
                }
              }
            `}</style>
          </div>
        )}
        <div>
          <div className="rounded grid grid-cols-3 lg:grid-cols-3 gap-2 mt-3 max-h-[370px] mx-2">
            {loading ? (
              <div className="rounded mt-3">
                <div class="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                  <div class="relative">
                    <div class="h-28 lg:w-full lg:h-[300px] bg-slate-200 rounded animate-stripes"></div>
                    <div class="h-3 mt-3 bg-slate-200 rounded animate-stripes"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex">
                {sortedBestSellingProducts &&
                  sortedBestSellingProducts.slice(0, 1).map((i) => {
                    return (
                      <Link
                        to={`/product/${i._id}`}
                        className="rounded relative overflow-hidden shadow-lg flex flex-col w-36 h-36 lg:w-full lg:h-[350px]"
                      >
                        <div className="absolute top-1 left-2">
                          <span
                            className="bg-blue-500 text-white py-1 px-2 text-xs rounded-full"
                            style={{ transform: "rotate(45deg)" }}
                          >
                            best sold
                          </span>
                        </div>
                        <img
                          className="w-36 h-36 lg:w-full lg:h-[245px] object-cover"
                          src={`${i.images && i.images[0].url}`}
                          alt="Sunset in the mountains"
                        />
                        <div className="px-6 py-12 lg:py-6 flex-1 hidden lg:flex flex-col">
                          <div className="font-bold text-sm mb-2">{i.name}</div>
                        </div>
                        <div className="absolute bottom-1 left-2 sm:hidden">
                          <span
                            className="bg-zinc-400 text-white py-1 px-2 text-xs rounded-full"
                            style={{ transform: "rotate(45deg)" }}
                          >
                            {i.name.length > 10
                              ? i.name.slice(0, 10) + "..."
                              : i.name}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            )}
            {loading ? (
              <div className="rounded carousel-container mt-3">
                <div class="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                  <div class="relative">
                    <div class="h-28 lg:w-full lg:h-[300px] bg-slate-200 rounded animate-stripes"></div>
                    <div class="h-3 mt-3 bg-slate-200 rounded animate-stripes"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex">
                {featuredProduct &&
                  featuredProduct.slice(0, 1).map((i) => {
                    return (
                      <Link
                        to={`/product/${i._id}`}
                        className="rounded relative overflow-hidden shadow-lg flex flex-col w-36 h-36 lg:w-full lg:h-[350px]"
                      >
                        <div className="absolute top-1 left-2">
                          <span
                            className="bg-blue-500 text-white py-1 px-2 text-xs rounded-full"
                            style={{ transform: "rotate(45deg)" }}
                          >
                            latest
                          </span>
                        </div>
                        <img
                          className="w-36 h-36 lg:w-full lg:h-[245px] object-cover"
                          src={`${i.images && i.images[0].url}`}
                          alt="Sunset in the mountains"
                        />
                        <div className="px-6 py-12 lg:py-6 flex-1 flex flex-col">
                          <div className="font-bold text-sm mb-2">{i.name}</div>
                        </div>
                        <div className="absolute bottom-1 left-2 sm:hidden">
                          <span
                            className="bg-zinc-400 text-white py-1 px-2 text-xs rounded-full"
                            style={{ transform: "rotate(45deg)" }}
                          >
                            {i.name.length > 10
                              ? i.name.slice(0, 10) + "..."
                              : i.name}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            )}

            {loading ? (
              <div className="rounded carousel-container mt-3">
                <div class="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                  <div class="relative">
                    <div class="h-28 lg:w-full lg:h-[300px] bg-slate-200 rounded animate-stripes"></div>
                    <div class="h-3 mt-3 bg-slate-200 rounded animate-stripes"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex">
                {statements &&
                  statements.map((i) => {
                    return (
                      <Link
                        to={`/product/${i.productId}`}
                        className="rounded relative overflow-hidden shadow-lg flex flex-col w-36 h-36 lg:w-full lg:h-[350px]"
                      >
                        <div className="absolute top-1 left-2">
                          <span
                            className="bg-blue-500 text-white py-1 px-2 text-xs rounded-full"
                            style={{ transform: "rotate(45deg)" }}
                          >
                            sponsored
                          </span>
                        </div>
                        <img
                          className="w-36 h-36 lg:w-full lg:h-[245px] object-cover"
                          src={i.promotionImage}
                          alt="Sunset in the mountains"
                        />
                        <div className="px-6 py-12 lg:py-6 flex-1 flex flex-col">
                          <div className="font-bold text-sm mb-2">
                            {i.promotionDetails}
                          </div>
                        </div>
                        <div className="absolute bottom-1 left-2 sm:hidden">
                          <span
                            className="bg-zinc-400 text-white py-1 px-2 text-xs rounded-full"
                            style={{ transform: "rotate(45deg)" }}
                          >
                            {i.promotionDetails.length > 10
                              ? i.promotionDetails.slice(0, 10) + "..."
                              : i.promotionDetails}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            )}
          </div>
          {loading ? (
            <div className="rounded carousel-container mt-3">
              <div class="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                <div class="relative">
                  <div class="h-14 bg-slate-200 rounded animate-stripes"></div>
                  <div class="h-3 mt-3 bg-slate-200 rounded animate-stripes"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded flex justify-center lg:grid lg:grid-cols-2 gap-2 mt-3 mx-2">
              <div className="flex max-h-[120px] relative">
                <div className="max-w-full lg:max-w-[100%] my-4 lg:my-0">
                  <div className="absolute top-4 left-2 z-10">
                    <span
                      className="bg-blue-500 text-white py-1 px-2 text-xs rounded-full"
                      style={{ transform: "rotate(45deg)" }}
                    >
                      best shops
                    </span>
                  </div>
                  <Carousel
                    autoPlay
                    infiniteLoop
                    showIndicators={false}
                    showStatus={false}
                    showThumbs={false}
                    interval={5000}
                    // stopOnHover={true}
                    className="rounded relative overflow-hidden shadow-lg flex flex-row w-32 h-32 lg:w-full lg:h-full"
                  >
                    {sellers &&
                      sellers.map((i) => (
                        <Link
                          key={i}
                          to={`/shop/preview/${i._id}`}
                          class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                          <div className="flex w-full h-[120px]">
                            <img
                              className="w-32 h-32 lg:w-full lg:h-full object-cover lg:max-h-[120px] lg:max-w-[150px] rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                              src={`${i.avatar && i.avatar.url}`}
                              alt="shop avatars"
                            />
                            <div className="flex flex-col justify-between p-4 mt-3 leading-normal">
                              <h5 class="mb-2 px-6 lg:px-0 font-bold tracking-tight text-gray-900 dark:text-white">
                                {i.name}
                              </h5>
                            </div>
                          </div>
                          <div className="absolute bottom-1 left-2 lg:hidden">
                            <span
                              className="bg-zinc-400 text-white py-1 px-2 text-xs rounded-full"
                              style={{ transform: "rotate(45deg)" }}
                            >
                              {i.name.length > 14
                                ? i.name.slice(0, 14) + "..."
                                : i.name}
                            </span>
                          </div>
                        </Link>
                      ))}
                  </Carousel>
                </div>
              </div>
              <div className="max-h-[120px]">
                <div class="w-full my-4 lg:my-0 p-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <ul class="space-y-1 space-x-1 grid grid-cols-2">
                    <li>
                      <Link
                        to="/faq"
                        class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                      >
                        <BsQuestionCircle color="#2330db" size={25} />
                        <span class="flex-1 ml-3 whitespace-nowrap font-light">
                          FAQ
                        </span>
                      </Link>
                    </li>
                    <li>
                      <a
                        href="tel: +254712012113"
                        class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                      >
                        <BiSolidPhoneCall color="#2330db" size={25} />
                        <span class="flex-1 ml-3 whitespace-nowrap font-light">
                          Call
                        </span>
                      </a>
                    </li>
                    <li class="relative">
                      <button
                        onClick={
                          isAuthenticated
                            ? () => {
                                navigate("/profile?active=2");
                              }
                            : () => setModalOpen(true)
                        }
                        class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                      >
                        <TfiShoppingCartFull color="#2330db" size={25} />
                        <span class="flex-1 ml-1 whitespace-nowrap font-light">
                          Orders
                        </span>
                      </button>
                      {orders?.length > 0 && (
                        <div class="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                    </li>
                    <li>
                      <Link
                        to="/login"
                        class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                      >
                        <BsPersonExclamation color="#2330db" size={25} />
                        <span class="flex-1 ml-3 whitespace-nowrap font-light">
                          Sign
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Hero;
