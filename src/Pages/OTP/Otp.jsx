import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, RefreshCw } from 'lucide-react';

export default function OTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // توليد رمز OTP عشوائي وحفظه في state
  const generateOTP = () => {
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(newOTP);
    console.log("OTP sent to network console:", newOTP);
  };

  // توليد OTP عند تحميل الصفحة
  useEffect(() => {
    generateOTP();
  }, []);

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

  // إعادة تعيين العداد عند إعادة الإرسال
  const handleResendOTP = () => {
    if (canResend) {
      generateOTP();
      setResendTimer(30);
      setCanResend(false);
      setError('');
    }
  };

  // التركيز تلقائيًا على الحقل التالي
  const handleChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const enteredOTP = otp.join('');

    setTimeout(() => {
      if (enteredOTP === generatedOTP) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError('رمز OTP غير صحيح');
      }
      setIsLoading(false);
    }, 1500);
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
                  disabled={!canResend}
                  className={`flex items-center gap-2 text-purple-600 font-medium ${!canResend ? 'opacity-50 cursor-not-allowed' : 'hover:text-purple-800'}`}
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
