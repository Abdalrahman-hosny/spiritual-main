import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./Pages/NotFound/NotFound";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import AboutUs from "./Pages/AboutUs/AboutUs";
import HomePage from "./Pages/Home/HomePage";
import Shop from "./Pages/Shop/Shop";
import Details from "./Pages/Details/Details";
import Cart from "./Pages/Cart/Cart";
import CheckOut from "./Pages/CheckOut/CheckOut";
import CategoryProducts from "./Pages/CategoryProducts/CategoryProducts";
import TrainerProfile from "./Pages/TrainerProfile/TrainerProfile";
import CourseDetails from "./Pages/CourseDetails/CourseDetails";
import ContactUs from "./Pages/ContactUs/ContactUs";
import OTPPage from "./Pages/OTP/Otp";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPasswor";
import VerifyReset from "./Pages/verifyReset/verifyReset";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Profile from "./Pages/profile/profile";
import Wishlist from "./Pages/wishlist/wishlist";
import TermsAndConditions from "./Pages/TermsAndConditions/terms-and-conditions";
import PrivacyPolicy from "./Pages/PrivacyPolicy/privacy-policy";
import FAQs from "./Pages/FAQS/faqs";
import MainLayout from "./layout/MainLayout";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Courses from "./Pages/Dashboard/Courses/Courses";
import AddCourse from "./Pages/Dashboard/Courses/AddCourse";
import EditCourse from "./Pages/Dashboard/Courses/EditCourse";
import Students from "./Pages/Dashboard/Students/Students";
import StudentDetails from "./Pages/Dashboard/Students/StudentDetails";
import Brands from "./Pages/Dashboard/Brands/Brands";
import AddBrand from "./Pages/Dashboard/Brands/AddBrand";
import EditBrand from "./Pages/Dashboard/Brands/EditBrand";
import BrandDetails from "./Pages/Dashboard/Brands/BrandDetails";
import Store from "./Pages/Dashboard/Store/Store";
import AddProduct from "./Pages/Dashboard/Store/AddProduct";
import Orders from "./Pages/Dashboard/Orders/Orders";
import Coupons from "./Pages/Dashboard/Coupons/Coupons";
import AddCoupon from "./Pages/Dashboard/Coupons/AddCoupon";
import EditCoupon from "./Pages/Dashboard/Coupons/EditCoupon";
import CouponDetails from "./Pages/Dashboard/Coupons/CouponDetails";
import DashboardProfile from "./Pages/Dashboard/Profile/Profile";
import Settings from "./Pages/Dashboard/Settings/Settings";

function App() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* ✅ الصفحات اللي فيها Navbar + Footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product-details/:id" element={<Details />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route
              path="/categoryProducts/:slug/:id"
              element={<CategoryProducts />}
            />
            <Route
              path="/categoryProducts/:id"
              element={<CategoryProducts />}
            />
            <Route path="/trainer/:id" element={<TrainerProfile />} />
            <Route path="/courseDetails/:id" element={<CourseDetails />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/faqs" element={<FAQs />} />
          </Route>

          {/* 🚫 الصفحات اللي مافيهاش Navbar ولا Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<OTPPage />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/verify-reset" element={<VerifyReset />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Dashboard Pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/courses" element={<Courses />} />
          <Route path="/dashboard/courses/add" element={<AddCourse />} />
          <Route path="/dashboard/courses/edit/:id" element={<EditCourse />} />
          <Route path="/dashboard/students" element={<Students />} />
          <Route
            path="/dashboard/students/:studentId"
            element={<StudentDetails />}
          />
          <Route path="/dashboard/brands" element={<Brands />} />
          <Route path="/dashboard/brands/add" element={<AddBrand />} />
          <Route path="/dashboard/brands/edit/:id" element={<EditBrand />} />
          <Route path="/dashboard/brands/:id" element={<BrandDetails />} />
          <Route path="/dashboard/store" element={<Store />} />
          <Route path="/dashboard/store/add" element={<AddProduct />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/coupons" element={<Coupons />} />
          <Route path="/dashboard/coupons/add" element={<AddCoupon />} />
          <Route path="/dashboard/coupons/edit/:id" element={<EditCoupon />} />
          <Route path="/dashboard/coupons/:id" element={<CouponDetails />} />
          <Route path="/dashboard/profile" element={<DashboardProfile />} />
          <Route path="/dashboard/settings" element={<Settings />} />

          {/* ❌ صفحة الخطأ */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
