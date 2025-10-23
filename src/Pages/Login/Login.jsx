import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/loginimg.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Phone validation regex (Egyptian phone numbers without country code)
  // const phoneRegex = /^01[0-9]{9}$/;

  const validateForm = () => {
    const errors = {};
    if (!loginForm.email.trim()) {
      errors.email = "البريد الإلكتروني مطلوب";
    } else if (!emailRegex.test(loginForm.email)) {
      errors.email = "الرجاء إدخال بريد إلكتروني صحيح";
    }
    // Password validation
    if (!loginForm.password.trim()) {
      errors.password = "كلمة المرور مطلوبة";
    } else if (loginForm.password.length < 6) {
      errors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    if (loginError) {
      setLoginError("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoginLoading(true);
    setLoginError("");
    setFieldErrors({});
    try {
      const response = await axios.post(
        "https://spiritual.brmjatech.uk/api/login",
        {
          email: loginForm.email,
          password: loginForm.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const payload = response?.data?.data;
      if (payload?.token) {
        sessionStorage.setItem("token", payload.token);
      }
      if (payload?.user) {
        sessionStorage.setItem("user", JSON.stringify(payload.user));
      }

      if (payload?.user) {
        const userType = payload.user.type;
        navigate(userType === "client" ? "/" : "/dashboard");
      } else if (payload?.token) {
        // If only token exists, safely navigate to home
        navigate("/");
      } else {
        setLoginError(
          "لم يتم استقبال بيانات تسجيل الدخول. الرجاء المحاولة مرة أخرى."
        );
      }
    } catch (error) {
      console.log("Login error:", error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 422) {
          if (data?.errors) {
            const errorMessages = Object.values(data.errors).flat();
            setLoginError(errorMessages.join("\n"));
          } else {
            setLoginError(
              data?.message ||
                "البيانات المدخلة غير صحيحة. الرجاء التحقق من البريد الإلكتروني وكلمة المرور."
            );
          }
        } else {
          switch (status) {
            case 400:
              setLoginError(
                data?.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة"
              );
              break;
            case 401:
              setLoginError(
                data?.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة"
              );
              break;
            case 403:
              setLoginError(
                data?.message || "تم رفض الوصول. الرجاء التواصل مع الدعم."
              );
              break;
            case 404:
              setLoginError(
                data?.message || "الخدمة غير متاحة. الرجاء المحاولة لاحقًا."
              );
              break;
            case 429:
              setLoginError(
                data?.message ||
                  "عدد كبير جدًا من محاولات تسجيل الدخول. الرجاء الانتظار والمحاولة مرة أخرى."
              );
              break;
            case 500:
              setLoginError(
                data?.message || "خطأ في الخادم. الرجاء المحاولة لاحقًا."
              );
              break;
            default:
              setLoginError(
                data?.message || "فشل تسجيل الدخول. الرجاء المحاولة مرة أخرى."
              );
          }
        }
      } else if (error.request) {
        setLoginError(
          "خطأ في الشبكة. الرجاء التحقق من اتصال الإنترنت والمحاولة مرة أخرى."
        );
      } else {
        setLoginError("حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.");
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const savedRegisterEmail = sessionStorage.getItem("registerEmail");
    const savedRegisterPassword = sessionStorage.getItem("registerPassword");
    const savedResetEmail = sessionStorage.getItem("resetEmail");
    const savedResetPassword = sessionStorage.getItem("resetPassword");
    if (savedRegisterEmail && savedRegisterPassword) {
      setLoginForm({
        email: savedRegisterEmail,
        password: savedRegisterPassword,
      });
      sessionStorage.removeItem("registerEmail");
      sessionStorage.removeItem("registerPassword");
    } else if (savedResetEmail && savedResetPassword) {
      setLoginForm({
        email: savedResetEmail,
        password: savedResetPassword,
      });
      sessionStorage.removeItem("resetEmail");
      sessionStorage.removeItem("resetPassword");
    }
  }, []);

  return (
    <div className="min-h-screen image flex items-center justify-center lg:justify-around p-2 sm:p-4 lg:p-6">
      {/* Background overlay */}
      <div className="bg-[linear-gradient(to_left,rgba(0,0,0,0.6),rgba(0,0,0,0))] fixed inset-0"></div>
      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full max-w-7xl relative z-10 gap-4 lg:gap-8">
        {/* Mobile Brand Section */}
        <div className="block lg:hidden text-center mb-4 sm:mb-6 px-4">
          <h1
            className="font-bold font-montserratArabic text-xl xs:text-2xl sm:text-3xl text-white mb-2"
            dir="rtl"
          >
            منصة روحاني
          </h1>
          <p
            className="text-white font-montserratArabic text-xs xs:text-sm sm:text-base leading-relaxed text-center max-w-sm mx-auto"
            dir="rtl"
          >
            منصة إلكترونية متكاملة للتعليم والعالج الروحاني والطاقي
          </p>
        </div>
        {/* Login Form Card */}
        <div className="relative bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 w-full max-w-[320px] xs:max-w-[360px] sm:max-w-md lg:max-w-lg shadow-2xl order-2 lg:order-1">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6 lg:mb-8">
            <h1
              className="text-lg xs:text-xl font-montserratArabic sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2"
              dir="rtl"
            >
              تسجيل الدخول
            </h1>
            <p
              className="text-gray-600 font-montserratArabic text-xs sm:text-sm lg:text-base leading-relaxed px-2"
              dir="rtl"
            >
              أدخل إلى عالمك الخاص وتواصل للعالم بطريقة ممتعة وآمنة
            </p>
          </div>
          {/* Login Error Message */}
          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm rounded-lg text-center">
              {loginError}
            </div>
          )}
          <form
            onSubmit={handleLogin}
            className="space-y-3 sm:space-y-4 lg:space-y-6"
          >
            {/* Email Field */}
            <div className="space-y-1 sm:space-y-2">
              <div
                className="block text-right text-gray-700 text-xs sm:text-sm lg:text-base font-medium"
                dir="rtl"
              >
                البريد الإلكتروني
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="example@email.com"
                  className={`w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-gray-50 border ${
                    fieldErrors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right text-xs sm:text-sm lg:text-base`}
                  dir="ltr"
                />
                {fieldErrors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
            </div>
            {/* Password Field */}
            <div className="space-y-1 sm:space-y-2">
              <div
                className="block text-right text-gray-700 text-xs sm:text-sm lg:text-base font-medium"
                dir="rtl"
              >
                كلمة المرور
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={loginForm.password}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="••••••••••••"
                  className={`w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-gray-50 border ${
                    fieldErrors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right text-xs sm:text-sm lg:text-base`}
                  dir="rtl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                {fieldErrors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldErrors.password}
                  </p>
                )}
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loginLoading}
              className={`w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-2.5 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-xs sm:text-sm lg:text-base ${
                loginLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loginLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>جاري تسجيل الدخول...</span>
                </div>
              ) : (
                "تسجيل دخول"
              )}
            </button>
            {/* Footer Links */}
            <div className="text-center space-y-2 pt-2 sm:pt-3 lg:pt-4">
              <p
                className="text-gray-600 text-xs sm:text-sm lg:text-base"
                dir="rtl"
              >
                ليس لديك حساب؟
                <Link
                  to="/register"
                  className="text-purple-600 hover:text-purple-700 font-medium mr-1"
                >
                  إنشاء حساب
                </Link>
              </p>
              <Link
                to="/forget-password"
                className="text-purple-600 hover:text-purple-700 text-xs sm:text-sm lg:text-base font-medium block"
              >
                هل نسيت كلمة المرور؟
              </Link>
            </div>
          </form>
        </div>
        {/* Desktop Brand Section */}
        <div className="hidden lg:block w-full max-w-[450px] xl:max-w-[550px] 2xl:max-w-[650px] order-1 lg:order-2">
          <div className="flex justify-end items-center mb-4 lg:mb-6">
            <img
              src={image}
              alt=""
              className="w-full h-auto max-w-[300px] xl:max-w-[400px] 2xl:max-w-[500px]"
            />
          </div>
          <h1 className="font-montserratArabic font-extrabold leading-tight xl:leading-relaxed text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl tracking-[0px] text-right text-white mb-4">
            منصة روحاني
          </h1>
          <p className="font-montserratArabic text-white font-bold text-sm lg:text-base xl:text-lg 2xl:text-xl leading-relaxed tracking-[0px] text-right">
            منصة إلكترونية متكاملة للتعليم والعالج الروحاني والطاقي، تجمع بين
            الكورسات، الجلسات، المتجر، التحفيظ، والاستشارات المباشرة.
          </p>
        </div>
      </div>
    </div>
  );
}
