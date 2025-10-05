import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, RefreshCw } from 'lucide-react';
import axios from 'axios';

export default function OTP() {
  const [otp, setOtp] = useState(['', '', '', '', '']); // 5 أرقام بدلاً من 6
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [phone, setPhone] = useState('+201013503789'); // رقم الهاتف الافتراضي
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(60); // 60 ثانية
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // عداد الوقت لإعادة الإرسال
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

  // إعادة إرسال OTP
  const handleResendOTP = async () => {
    if (!canResend) return;
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post('https://app.raw7any.com/api/resend-otp', {
        phone,
      });
      if (response.status !== 200) {
        throw new Error('فشل في إعادة إرسال OTP');
      }
      setResendTimer(60);
      setCanResend(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'حدث خطأ أثناء إعادة الإرسال');
    } finally {
      setIsLoading(false);
    }
  };

  // التركيز تلقائيًا على الحقل التالي
  const handleChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 4) { // تعديل الشرط إلى `index < 4` بدلاً من `index < 5`
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // التركيز على الحقل السابق عند الحذف
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // التحقق من رمز OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const enteredToken = otp.join('');
    try {
      const response = await axios.post('https://app.raw7any.com/api/verify-otp', {
        phone,
        token: enteredToken,
      });
      if (response.status !== 200) {
        throw new Error('رمز OTP غير صحيح');
      }
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'حدث خطأ أثناء التحقق');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg">
        {!success ? (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">تحقق من OTP</h2>
              <p className="text-gray-600">تم إرسال رمز التحقق إلى رقم هاتفك</p>
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
                    className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ))}
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <div className="flex justify-center mb-4">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={!canResend || isLoading}
                  className={`flex items-center gap-2 text-purple-600 font-medium ${
                    !canResend || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:text-purple-800'
                  }`}
                >
                  <RefreshCw className="w-4 h-4" />
                  إعادة إرسال OTP {canResend ? '' : `(${resendTimer}s)`}
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
                    <span>جاري التحقق...</span>
                  </div>
                ) : (
                  'تحقق'
                )}
              </button>
            </form>
          </>
        ) : (
          // صفحة "تم بنجاح"
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
