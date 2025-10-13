import React, { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import image from "../../assets/loginimg.png";

export default function ForgetPassword() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // دالة للتحقق من رقم الهاتف (بدون كود دولة)
  const validatePhone = () => {
    if (!phone.trim()) {
      setError('رقم الهاتف مطلوب');
      return false;
    } else if (!/^(010|011|012|015)\d{8}$/.test(phone.trim())) {
      setError('الرجاء إدخال رقم هاتف مصري صحيح (مثال: 01012345678)');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePhone()) {
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        "https://spiritual.brmjatech.uk/api/forgot/password",
        {
          phone: phone.trim(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      if (response.status === 200) {
        setSuccess(true);
        navigate("/verify-reset", {
          state: {
            phone: phone.trim(),
            token: response.data.token
          }
        });
      }
    } catch (err) {
      console.log('Error:', err);
      if (err.response) {
        setError(err.response.data.message || 'حدث خطأ أثناء إرسال الطلب. الرجاء المحاولة مرة أخرى.');
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
        {/* Forget Password Form Card */}
        <div className="relative bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 w-full max-w-[320px] xs:max-w-[360px] sm:max-w-md lg:max-w-lg shadow-2xl order-2 lg:order-1">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6 lg:mb-8">
            <h1 className="text-lg xs:text-xl font-montserratArabic sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2" dir="rtl">
              نسيت كلمة المرور؟
            </h1>
            <p className="text-gray-600 font-montserratArabic text-xs sm:text-sm lg:text-base leading-relaxed px-2" dir="rtl">
              أدخل رقم هاتفك وسنرسل لك رابطًا لإعادة تعيين كلمة المرور
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
              تم إرسال رابط إعادة تعيين كلمة المرور إلى رقم هاتفك بنجاح. سيتم تحويلك إلى صفحة التحقق.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 lg:space-y-6">
            {/* Phone Field */}
            <div className="space-y-1 sm:space-y-2">
              <div className="block text-right text-gray-700 text-xs sm:text-sm lg:text-base font-medium" dir="rtl">
                رقم الهاتف
              </div>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="01012345678"
                  className={`w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-gray-50 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right text-xs sm:text-sm lg:text-base`}
                  dir="ltr"
                />
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
                  <span>جاري الإرسال...</span>
                </div>
              ) : (
                'إرسال رابط إعادة تعيين'
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
