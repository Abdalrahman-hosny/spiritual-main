import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, RefreshCw } from 'lucide-react';
import axios from 'axios'; // تأكد من تثبيت axios: npm install axios

export default function VerifyReset() {
  // تعريف المتغيرات والحالات
  const [email, setEmail] = useState(''); // بريد المستخدم
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // كود التحقق
  const [isLoading, setIsLoading] = useState(false); // حالة التحميل
  const [error, setError] = useState(''); // رسالة الخطأ
  const [success, setSuccess] = useState(false); // حالة النجاح
  const [canResend, setCanResend] = useState(false); // إمكانية إعادة الإرسال
  const [resendTimer, setResendTimer] = useState(60); // عداد إعادة الإرسال (60 ثانية)
  const [resendLoading, setResendLoading] = useState(false); // حالة تحميل إعادة الإرسال
  const [resendSuccess, setResendSuccess] = useState(false); // حالة نجاح إعادة الإرسال
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // دالة للتحقق من صحة المدخلات
  const validateInputs = () => {
    const enteredOTP = otp.join('');
    if (!email.trim()) {
      setError('البريد الإلكتروني مطلوب');
      return false;
    } else if (!enteredOTP.trim()) {
      setError('كود التحقق مطلوب');
      return false;
    } else if (enteredOTP.length !== 6) {
      setError('كود التحقق يجب أن يتكون من 6 أرقام');
      return false;
    }
    setError('');
    return true;
  };

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
    if (!email.trim()) {
      setError('البريد الإلكتروني مطلوب');
      return;
    }
    setResendLoading(true);
    setError('');
    try {
      const response = await axios.post('https://app.raw7any.com/api/forgot/resend-otp', {
        email,
      });
      if (response.status !== 200) {
        throw new Error('فشل في إعادة إرسال OTP');
      }
      setResendTimer(60);
      setCanResend(false);
      setResendSuccess(true);
      setTimeout(() => {
        setResendSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'حدث خطأ أثناء إعادة الإرسال');
    } finally {
      setResendLoading(false);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    setIsLoading(true);
    setError('');
    const enteredOTP = otp.join('');
    try {
      const response = await axios.post('https://app.raw7any.com/api/forgot/verify-otp', {
        email,
        otp: enteredOTP,
      });
      if (response.status !== 200) {
        throw new Error('رمز OTP غير صحيح');
      }
      setSuccess(true);
      setTimeout(() => {
        navigate('/reset-password');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'حدث خطأ أثناء التحقق');
    } finally {
      setIsLoading(false);
    }
  };

  // دالة للتعامل مع ضغط زر Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  // عند تحميل الصفحة، انتقل إلى الأعلى بشكل سلس
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg">
        {!success ? (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">التحقق من كود إعادة التعيين</h2>
              <p className="text-gray-600">أدخل بريدك الإلكتروني وكود التحقق المرسل إليه</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* حقل البريد الإلكتروني */}
              <div className="space-y-1">
                <label className="block text-right text-gray-700 text-sm font-medium">البريد الإلكتروني</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="example@example.com"
                    className={`w-full px-3 py-2 text-sm bg-gray-50 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right`}
                  />
                </div>
              </div>

              {/* حقل كود التحقق */}
              <div className="flex justify-center gap-2" dir='ltr'>
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

              {/* عرض رسالة الخطأ */}
              {error && <p className="text-red-500 text-center">{error}</p>}

              {/* زر إعادة إرسال OTP */}
              <div className="flex justify-center mb-4">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={!canResend || resendLoading}
                  className={`flex items-center gap-2 text-purple-600 font-medium ${
                    !canResend || resendLoading ? 'opacity-50 cursor-not-allowed' : 'hover:text-purple-800'
                  }`}
                >
                  <RefreshCw className="w-4 h-4" />
                  {resendLoading ? 'جاري الإرسال...' : `إعادة إرسال الكود ${canResend ? '' : `(${resendTimer}s)`}`}
                </button>
              </div>

              {/* زر التحقق */}
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
                  'تحقق من الكود'
                )}
              </button>

              {/* عرض رسالة نجاح إعادة الإرسال */}
              {resendSuccess && (
                <div className="p-3 bg-green-50 border border-green-200 text-green-600 text-sm rounded-lg text-center">
                  تم إعادة إرسال كود التحقق بنجاح.
                </div>
              )}
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
            <p className="text-gray-600">سيتم إعادة توجيهك إلى صفحة إعادة تعيين كلمة المرور...</p>
          </div>
        )}
      </div>
    </div>
  );
}
