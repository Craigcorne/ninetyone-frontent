import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  OrderDetailsPage,
  TrackOrderPage,
  UserInbox,
} from "./routes/Routes.js";
import {
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopAllCoupouns,
  ShopPreviewPage,
  ShopAllOrders,
  ShopOrderDetails,
  ShopAllRefunds,
  ShopSettingsPage,
  ShopWithDrawMoneyPage,
  ShopInboxPage,
} from "./routes/ShopRoutes";
import {
  AdminDashboardPage,
  AdminDashboardUsers,
  AdminDashboardSellers,
  AdminDashboardOrders,
  AdminDashboardProducts,
  AdminDashboardEvents,
  AdminDashboardWithdraw,
} from "./routes/AdminRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import { ShopHomePage } from "./ShopRoutes.js";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import { getAllProducts } from "./redux/actions/product";
import { getProduct } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";
import axios from "axios";
import { server } from "./server";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ShopForgotPassword from "./components/Shop/ShopForgotPassword";
import ShopResetPassword from "./components/Shop/ShopResetPassword";
import TrialPage from "./Trial/TrialPage";
import CompareProducts from "./pages/CompareProducts";
import AdminCategories from "./pages/AdminCategories";
import { getAllStatements } from "./redux/actions/statements";
import AdminCarousel from "./pages/AdminCarousel";
import ShopUpdateProduct from "./pages/Shop/ShopUpdateProduct";
import EditProduct from "./components/Shop/UpdateProduct";
import AdminEditProduct from "./components/Admin/UpdateProduct";
import ComingSoon from "./pages/ComingSoon";
import AdminStatements from "./pages/AdminStatements";
import NotFound from "./pages/NotFound";
import Unsubscribe from "./pages/Unsubscribe";
import SendEmailsPage from "./pages/SendEmailsPage";
import Location from "./Trial/Location";
import ScrollToTop from "./components/ScroolTop";
import CreateFlashSale from "./components/Shop/CreateFlashSale";
import ShopAllFlashSale from "./pages/Shop/ShopAllFlashSale";
import GuestCheckoutPage from "./pages/GuestCheckout";
import GuestPaymentPage from "./pages/GuestPaymentPage";
import AdminOrders from "./components/Admin/AdminOrders";
import SearchOrder from "./components/SearchOrder.jsx";

const App = () => {
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }
  useEffect(() => {
    Store.dispatch(getAllStatements());
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApikey();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/terms" element={<Terms />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/compare-products" element={<CompareProducts />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/guest-checkout" element={<GuestCheckoutPage />} />
        <Route path="/guest-payment" element={<GuestPaymentPage />} />
        <Route path="/searchorder" element={<SearchOrder />} />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/unsubscribe"
          element={
            <ProtectedRoute>
              <Unsubscribe />
            </ProtectedRoute>
          }
        />

        <Route path="/login/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/shop-login/forgot-password"
          element={<ShopForgotPassword />}
        />
        <Route path="reset-password/:token" element={<ResetPassword />} />
        <Route
          path="shop/reset-password/:token"
          element={<ShopResetPassword />}
        />
        <Route
          path="/carousel"
          element={
            <ProtectedAdminRoute>
              <AdminCarousel />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <ProtectedAdminRoute>
              <AdminCategories />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/statements"
          element={
            <ProtectedAdminRoute>
              <AdminStatements />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/edit-product/:productId"
          element={
            <SellerProtectedRoute>
              <EditProduct />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/admin-orders/:id"
          element={
            <ProtectedAdminRoute>
              <AdminOrders />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/dashboard-update-product"
          element={
            <SellerProtectedRoute>
              <ShopUpdateProduct />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <UserInbox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/flash-sale"
          element={
            <SellerProtectedRoute>
              <CreateFlashSale />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/all-flash-sale"
          element={
            <SellerProtectedRoute>
              <ShopAllFlashSale />
            </SellerProtectedRoute>
          }
        />
        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
        {/* shop Routes */}
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <SellerProtectedRoute>
              <ShopSettingsPage />
            </SellerProtectedRoute>
          }
        />
        {/* to be removed in production */}
        <Route path="/trial" element={<TrialPage />} />

        <Route path="/location" element={<Location />} />

        {/* /// */}

        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-product"
          element={
            <SellerProtectedRoute>
              <ShopCreateProduct />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-orders"
          element={
            <SellerProtectedRoute>
              <ShopAllOrders />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-refunds"
          element={
            <SellerProtectedRoute>
              <ShopAllRefunds />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/order/:id"
          element={
            <SellerProtectedRoute>
              <ShopOrderDetails />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-products"
          element={
            <SellerProtectedRoute>
              <ShopAllProducts />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-event"
          element={
            <SellerProtectedRoute>
              <CreateFlashSale />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-events"
          element={
            <SellerProtectedRoute>
              <ShopAllEvents />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-coupouns"
          element={
            <SellerProtectedRoute>
              <ShopAllCoupouns />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-withdraw-money"
          element={
            <SellerProtectedRoute>
              <ShopWithDrawMoneyPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-messages"
          element={
            <SellerProtectedRoute>
              <ShopInboxPage />
            </SellerProtectedRoute>
          }
        />
        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-users"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardUsers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-sellers"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardSellers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-orders"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardOrders />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-products"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardProducts />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-events"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardEvents />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-withdraw-request"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardWithdraw />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-edit-product/:productId"
          element={
            <ProtectedAdminRoute>
              <AdminEditProduct />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-sendemails"
          element={
            <ProtectedAdminRoute>
              <SendEmailsPage />
            </ProtectedAdminRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
};

export default App;
