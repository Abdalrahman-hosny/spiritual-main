import { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NotFound from './Pages/NotFound/NotFound';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import AboutUs from './Pages/AboutUs/AboutUs';
import HomePage from './Pages/Home/HomePage';
import Shop from './Pages/Shop/Shop';
import Details from './Pages/Details/Details';
import Cart from './Pages/Cart/Cart';
import CheckOut from './Pages/CheckOut/CheckOut';
import CategoryProducts from './Pages/CategoryProducts/CategoryProducts';
import TrainerProfile from './Pages/TrainerProfile/TrainerProfile';
import CourseDetails from './Pages/CourseDetails/CourseDetails';
import ContactUs from './Pages/ContactUs/ContactUs';
import OTPPage from './Pages/OTP/Otp';
import ForgetPassword from './Pages/ForgetPassword/ForgetPasswor';
import VerifyReset from './Pages/verifyReset/verifyReset';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import Profile from './Pages/profile/profile';
import Wishlist from './Pages/wishlist/wishlist'; 
import TermsAndConditions from './Pages/TermsAndConditions/terms-and-conditions';
import PrivacyPolicy from './Pages/PrivacyPolicy/privacy-policy';
import FAQs from './Pages/FAQS/faqs.JSX';


import i18n from './locales/i18n';

// ✅ استدعاء الـ Layout
import MainLayout from './layout/MainLayout';


function App() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <BrowserRouter>
        <Routes>

          {/* ✅ الصفحات اللي فيها Navbar + Footer */}
          <Route  element={<MainLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product-details/:id" element={<Details />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/categoryProducts" element={<CategoryProducts />} />
            <Route path="/trainer/:id" element={<TrainerProfile />} />
            <Route path="/courseDetails/:id" element={<CourseDetails />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
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

          {/* ❌ صفحة الخطأ */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
