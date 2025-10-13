import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OTP() {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { phone, autoVerify } = location.state || {};

  useEffect(() => {
    if (!phone) {
      toast.error("لا يوجد رقم هاتف صالح. سيتم إعادة توجيهك لتسجيل الدخول.");
      setTimeout(() => navigate('/login'), 3000);
    } else if (autoVerify) {
      handleAutoVerify(autoVerify);
    }
  }, [phone, navigate, autoVerify]);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleResendOTP = async () => {
    if (!canResend || !phone) return;
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post('https://spiritual.brmjatech.uk/api/resend-otp', {
        phone,
      });
      if (response.data && response.data.success) {
        toast.success("تم إعادة إرسال رمز OTP بنجاح!");
        setResendTimer(60);
        setCanResend(false);
      } else {
        throw new Error(response.data?.message || 'فشل في إعادة إرسال OTP');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'حدث خطأ أثناء إعادة الإرسال');
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 4) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const enteredToken = otp.join('');
  if (enteredToken.length !== 5) {
    setError("يرجى إدخال رمز OTP الكامل (5 أرقام)");
    toast.error("يرجى إدخال رمز OTP الكامل (5 أرقام)");
    return;
  }
  setIsLoading(true);
  setError('');
  try {
    const response = await axios.post('https://spiritual.brmjatech.uk/api/verify-otp', {
      phone,
      token: enteredToken,
    });

    if (response.data && (response.data.success || response.data.message?.toLowerCase().includes('verified'))) {
      toast.success("تم التحقق بنجاح!");
      navigate('/login');
    } else {
      throw new Error(response.data?.message || 'رمز OTP غير صحيح');
    }
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message || 'حدث خطأ أثناء التحقق';
    setError(errorMessage);
    toast.error(errorMessage);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <ToastContainer rtl />
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg">
        {!success ? (
          <>
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center flex-1">
                التحقق من رمز OTP
              </h2>
            </div>
            <div className="text-center mb-8">
              <p className="text-gray-600">
                تم إرسال رمز التحقق إلى رقم الهاتف: <span className="font-medium">{phone}</span>
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                ))}
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={!canResend || isLoading}
                  className={`flex items-center justify-center mx-auto gap-2 text-purple-600 font-medium ${
                    !canResend || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:text-purple-800'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      إعادة إرسال OTP {canResend ? '' : `(${resendTimer}s)`}
                    </>
                  )}
                </button>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    جاري التحقق...
                  </div>
                ) : (
                  'تحقق'
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800">تم التحقق بنجاح!</h2>
            <p className="text-gray-600">سيتم إعادة توجيهك إلى صفحة تسجيل الدخول...</p>
          </div>
        )}
      </div>
    </div>
  );
}
