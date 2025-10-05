import React, { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import image from "../../assets/loginimg.png";

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = 'البريد الإلكتروني مطلوب';
    } else if (!emailRegex.test(email)) {
      errors.email = 'الرجاء إدخال بريد إلكتروني صحيح';
    }
    if (!newPassword.trim()) {
      errors.newPassword = 'كلمة المرور الجديدة مطلوبة';
    } else if (newPassword.length < 8) {
      errors.newPassword = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    }
    if (!confirmPassword.trim()) {
      errors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'كلمة المرور وتأكيدها غير متطابقين';
    }
    if (!otp.trim()) {
      errors.otp = 'كود التحقق مطلوب';
    } else if (otp.length !== 6) {
      errors.otp = 'كود التحقق يجب أن يتكون من 6 أرقام';
    }
    if (Object.keys(errors).length > 0) {
      setError(errors.email || errors.newPassword || errors.confirmPassword || errors.otp);
      return false;
    }
    setError('');
    return true;
  };

  /**
   * API: إعادة تعيين كلمة المرور
   * - URL: {{base_url}}/forgot/reset-password
   * - Method: POST
   * - Body: {
   *     "email": string,
   *     "password": string,
   *     "password_confirmation": string,
   *     "otp": string
   *   }
   * - Headers: { Content-Type: application/json }
   * - Success: 200 -> الانتقال إلى صفحة تسجيل الدخول
   * - Error: عرض رسالة الخطأ المناسبة
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        "https://app.raw7any.com/api/forgot/reset-password",
        {
          email: email.trim(),
          password: newPassword.trim(),
          password_confirmation: confirmPassword.trim(),
          otp: otp.trim(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      console.log('Error:', err);
      if (err.response) {
        setError(err.response.data.message || 'حدث خطأ أثناء إعادة تعيين كلمة المرور. الرجاء المحاولة مرة أخرى.');
      } else if (err.request) {
        setError('خطأ في الشبكة. الرجاء التحقق من اتصال الإنترنت والمحاولة مرة أخرى.');
      } else {
        setError('حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="min-h-screen image flex items-center justify-center lg:justify-around p-2 sm:p-4 lg:p-6">
      {/* Background overlay */}
      <div className='bg-[linear-gradient(to_left,rgba(0,0,0,0.6),rgba(0,0,0,0))] fixed inset-0'></div>

      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full max-w-7xl relative z-10 gap-4 lg:gap-8">
        {/* Mobile Brand Section */}
        <div className='block lg:hidden text-center mb-4 sm:mb-6 px-4'>
          <h1 className="font-bold font-montserratArabic text-xl xs:text-2xl sm:text-3xl text-white mb-2" dir="rtl">
            منصة روحاني
          </h1>
          <p className='text-white font-montserratArabic text-xs xs:text-sm sm:text-base leading-relaxed text-center max-w-sm mx-auto' dir="rtl">
            منصة إلكترونية متكاملة للتعليم والعالج الروحاني والطاقي
          </p>
        </div>

        {/* Reset Password Form Card */}
        <div className="relative bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 w-full max-w-[320px] xs:max-w-[360px] sm:max-w-md lg:max-w-lg shadow-2xl order-2 lg:order-1">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6 lg:mb-8">
            <h1 className="text-lg xs:text-xl font-montserratArabic sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2" dir="rtl">
              إعادة تعيين كلمة المرور
            </h1>
            <p className="text-gray-600 font-montserratArabic text-xs sm:text-sm lg:text-base leading-relaxed px-2" dir="rtl">
              أدخل بريدك الإلكتروني، كلمة المرور الجديدة، تأكيد كلمة المرور، وكود التحقق
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 text-xs sm:text-sm rounded-lg text-center">
              تم إعادة تعيين كلمة المرور بنجاح. سيتم تحويلك إلى صفحة تسجيل الدخول.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 lg:space-y-6">
            {/* Email Field */}
            <div className="space-y-1 sm:space-y-2">
              <div className="block text-right text-gray-700 text-xs sm:text-sm lg:text-base font-medium" dir="rtl">
                البريد الإلكتروني
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="example@example.com"
                  className={`w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-gray-50 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right text-xs sm:text-sm lg:text-base`}
                  dir="ltr"
                />
              </div>
            </div>

            {/* OTP Field */}
            <div className="space-y-1 sm:space-y-2">
              <div className="block text-right text-gray-700 text-xs sm:text-sm lg:text-base font-medium" dir="rtl">
                كود التحقق
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="123456"
                  className={`w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-gray-50 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right text-xs sm:text-sm lg:text-base`}
                  dir="ltr"
                />
              </div>
            </div>

            {/* New Password Field */}
            <div className="space-y-1 sm:space-y-2">
              <div className="block text-right text-gray-700 text-xs sm:text-sm lg:text-base font-medium" dir="rtl">
                كلمة المرور الجديدة
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="••••••••••••"
                  className={`w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-gray-50 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right text-xs sm:text-sm lg:text-base`}
                  dir="rtl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1 sm:space-y-2">
              <div className="block text-right text-gray-700 text-xs sm:text-sm lg:text-base font-medium" dir="rtl">
                تأكيد كلمة المرور
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="••••••••••••"
                  className={`w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-gray-50 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right text-xs sm:text-sm lg:text-base`}
                  dir="rtl"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-2.5 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-xs sm:text-sm lg:text-base ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>جاري إعادة التعيين...</span>
                </div>
              ) : (
                'إعادة تعيين كلمة المرور'
              )}
            </button>

            {/* Footer Links */}
            <div className="text-center space-y-2 pt-2 sm:pt-3 lg:pt-4">
              <p className="text-gray-600 text-xs sm:text-sm lg:text-base" dir="rtl">
                تذكرت كلمة المرور؟
                <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium mr-1">
                  تسجيل دخول
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Desktop Brand Section */}
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
            منصة إلكترونية متكاملة للتعليم والعالج الروحاني والطاقي، تجمع بين الكورسات، الجلسات، المتجر، التحفيظ، والاستشارات المباشرة.
          </p>
        </div>
      </div>
    </div>
  );
}
