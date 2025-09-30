import { useEffect, useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import NotFound from './Pages/NotFound/NotFound'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import AboutUs from './Pages/AboutUs/AboutUs';
import HomePage from './Pages/Home/HomePage'
import Shop from './Pages/Shop/Shop'
import Details from './Pages/Details/Details'
import Cart from './Pages/Cart/Cart'
import CheckOut from './Pages/CheckOut/CheckOut'
import CategoryProducts from './Pages/CategoryProducts/CategoryProducts'
import TrainerProfile from './Pages/TrainerProfile/TrainerProfile'
import CourseDetails from './Pages/CourseDetails/CourseDetails'
import ContactUs from './Pages/ContactUs/ContactUs'
import OTPPage from './Pages/OTP/Otp'
import i18n from './locales/i18n'



function App() {

    useEffect(()=>{
           window.scrollTo({
            top: 0,
            behavior: "smooth", // smooth scrolling
          });
      },[])

  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="">
    <BrowserRouter>
        <Routes>
          <Route path='/login'  element={<Login />} />
          <Route path='/register'  element={<Register />} />
          <Route path='/shop'  element={<Shop />} />
          <Route path='/product-details/:id'  element={<Details />} />
          <Route index  element={<HomePage />} />
          <Route path='/cart'  element={<Cart />} />
          <Route path='/checkout'  element={<CheckOut />} />
          <Route path='/categoryProducts'  element={<CategoryProducts />} />
          <Route path='/trainer/:id'  element={<TrainerProfile />} />
          <Route path='/courseDetails/:id'  element={<CourseDetails />} />
          <Route path='/contact-us'  element={<ContactUs />} />
          <Route path='/about-us' element={<AboutUs />} />
           <Route path="/verify-otp" element={<OTPPage />} />

          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
