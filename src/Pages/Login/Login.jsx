


import React, { useEffect, useState } from 'react';
import { Lock, Mail, Eye, EyeOff, CheckCircle, ChevronDown } from 'lucide-react';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import image  from "../../assets/loginimg.png"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  
 const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({ code: '+20', flag: '🇪🇬' });
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const countries = [
    { code: '+20', name: 'Egypt', flag: '🇪🇬' },
    { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+971', name: 'UAE', flag: '🇦🇪' },
    { code: '+965', name: 'Kuwait', flag: '🇰🇼' },
    { code: '+973', name: 'Bahrain', flag: '🇧🇭' },
    { code: '+974', name: 'Qatar', flag: '🇶🇦' },
  ];

  const handleSubmit = () => {
    console.log('Phone:', selectedCountry.code + phoneNumber);
    console.log('Password:', password);
  };

  const navigate = useNavigate();

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const errors = {};
    
    // Email validation
    if (!loginForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(loginForm.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!loginForm.password.trim()) {
      errors.password = 'Password is required';
    } else if (loginForm.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear general login error
    if (loginError) {
      setLoginError('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validate form before submitting
    if (!validateForm()) {
      return;
    }

    setLoginLoading(true);
    setLoginError('');
    setFieldErrors({});

    try {
      // const response = await axios.post(
      //   "https://api.crunchy-friedchicken.com/auth/login",
      //   {
      //     email: loginForm.email.trim(),
      //     password: loginForm.password
      //   },
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     }
      //   }
      // );
console.log({response});

      // Check if response is successful
      // if (response.status === 200 && response.data) {
      
      //     sessionStorage.setItem("token", response.data.authorization.token);
      //      navigate("/dashboard");
          
      //     // Optional: Store user data if needed
      //     sessionStorage.setItem("user", JSON.stringify(response.data.result));
          
          
        
       
      // } else {
      //   // Handle non-200 responses
      //   console.log({res:response.data?.message});
        
      //   setLoginError(response.data?.message || 'Login failed. Please try again.');
      // }
    } catch (error) {
      console.log('Login error:', error);
      
      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;

        console.log({data});
        
        
        switch (status) {
          case 400:
            setLoginError(data?.message || 'Invalid email or password');
            break;
          case 401:
            setLoginError(data?.message ||'Invalid email or password');
            break;
          case 403:
            setLoginError(data?.message ||'Access denied. Please contact support.');
            break;
          case 404:
            setLoginError(data?.message ||'Service not found. Please try again later.');
            break;
          case 429:
            setLoginError(data?.message ||'Too many login attempts. Please wait and try again.');
            break;
          case 500:
            setLoginError(data?.message ||'Server error. Please try again later.');
            break;
          default:
            setLoginError(data?.Error || data?.message || 'Login failed. Please try again.');
        }
      } else if (error.request) {
        // Network error
        setLoginError('Network error. Please check your connection and try again.');
      } else {
        // Other error
        setLoginError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };
  useEffect(()=>{
         window.scrollTo({
          top: 0,
          behavior: "smooth", // smooth scrolling
        });
    },[])
  return (
    <div className="min-h-screen image flex items-center justify-center lg:justify-around p-2 sm:p-4 lg:p-6">
      {/* Background overlay */}
      <div className='bg-[linear-gradient(to_left,rgba(0,0,0,0.6),rgba(0,0,0,0))] fixed inset-0'></div>
      
      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full max-w-7xl relative z-10 gap-4 lg:gap-8">
        
        {/* Mobile Brand Section - Only visible on small screens at the top */}
        <div className='block lg:hidden text-center mb-4 sm:mb-6 px-4'>
          <h1 className="font-[Montserrat-Arabic] font-bold text-xl xs:text-2xl sm:text-3xl text-white mb-2" dir="rtl">
            منصة روحاني
          </h1>
          <p className='font-[Montserrat-Arabic] text-white text-xs xs:text-sm sm:text-base leading-relaxed text-center max-w-sm mx-auto' dir="rtl">
            منصة إلكترونية متكاملة للتعليم والعالج الروحاني والطاقي
          </p>
        </div>

        {/* Login Form Card */}
        <div className="relative bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 w-full max-w-[320px] xs:max-w-[360px] sm:max-w-md lg:max-w-lg shadow-2xl order-2 lg:order-1">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6 lg:mb-8">
            <h1 className="text-lg xs:text-xl font-montserratArabic sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2" dir="rtl">
              تسجيل الدخول
            </h1>
            <p className="text-gray-600 font-montserratArabic text-xs sm:text-sm lg:text-base leading-relaxed px-2" dir="rtl">
              أدخل إلى عالمك الخاص وتواصل للعالم بطريقة ممتعة
              وآمنة
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            {/* Phone Number Field */}
            <div className="space-y-1 sm:space-y-2">
              <div className="block text-right text-gray-700 text-xs sm:text-sm lg:text-base font-medium" dir="rtl">
                رقم التواصل
              </div>
              <div className="relative flex" dir="rtl">
                {/* Country Code Selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 lg:py-3 bg-gray-50 border border-gray-300 rounded-r-lg sm:rounded-r-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-xs sm:text-sm lg:text-base min-w-[60px] sm:min-w-[80px]"
                  >
                    <span className="text-xs sm:text-sm lg:text-base">{selectedCountry.flag}</span>
                    <span className="text-gray-700 font-medium text-xs sm:text-sm">{selectedCountry.code}</span>
                    <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                  </button>
                  
                  {/* Dropdown */}
                  {showCountryDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-30 max-h-32 sm:max-h-40 lg:max-h-48 overflow-y-auto min-w-[100px] ">
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          onClick={() => {
                            setSelectedCountry(country);
                            setShowCountryDropdown(false);
                          }}
                          className="w-full  flex items-center gap-2 sm:gap-3 px-2   py-2 sm:py-2.5 lg:py-3 hover:bg-gray-50 transition-colors text-xs sm:text-sm lg:text-base"
                        >
                          <span className="text-xs sm:text-sm lg:text-base">{country.flag}</span>
                          <span className="text-gray-700 text-xs sm:text-sm">{country.code}</span>
                          {/* <span className="text-gray-500 text-xs hidden sm:inline lg:text-sm">{country.name}</span> */}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Phone Input */}
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="1010101000"
                  className="flex-1 px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-gray-50 border border-gray-300 border-r-0 rounded-l-lg sm:rounded-l-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right text-xs sm:text-sm lg:text-base min-w-0"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1 sm:space-y-2">
              <div className="block text-right text-gray-700 text-xs sm:text-sm lg:text-base font-medium" dir="rtl">
                كلمة المرور
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-gray-50 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right text-xs sm:text-sm lg:text-base"
                dir="rtl"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-2.5 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-xs sm:text-sm lg:text-base"
            >
              تسجيل دخول 
            </button>

            {/* Footer Links */}
            <div className="text-center space-y-2 pt-2 sm:pt-3 lg:pt-4">
              <p className="text-gray-600 text-xs sm:text-sm lg:text-base" dir="rtl">
                ليس لديك حساب؟ 
                <Link to={"/register"} className="text-purple-600 hover:text-purple-700 font-medium mr-1">
                  إنشاء حساب
                </Link>
              </p>
              <button 
                className="text-purple-600 hover:text-purple-700 text-xs sm:text-sm lg:text-base font-medium"
              >
                الهوية الشخصية الرئيسية
              </button>
            </div>
          </div>
        </div>
        
        {/* Desktop Brand Section - Hidden on small screens, visible on large screens */}
        <div className='hidden lg:block w-full max-w-[450px] xl:max-w-[550px] 2xl:max-w-[650px] order-1 lg:order-2'>
          <div className='flex justify-end items-center mb-4 lg:mb-6'>
            <img 
              src={image} 
              alt="" 
              className='w-full h-auto max-w-[300px] xl:max-w-[400px] 2xl:max-w-[500px]' 
            />
          </div>
          <h1 className="font-montserratArabic font-extrabold leading-tight xl:leading-relaxed text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl tracking-[0px] text-right text-white mb-4">
            منصة روحاني
          </h1>
          <p className='font-montserratArabic text-white font-bold text-sm lg:text-base xl:text-lg 2xl:text-xl leading-relaxed tracking-[0px] text-right'>
            منصة إلكترونية متكاملة للتعليم والعالج الروحاني والطاقي، تجمع بين الكورسات، الجلسات، المتجر، التحفيظ، والاستشارات المباشرة .
          </p>
        </div>
      </div>
    </div>
  );
}