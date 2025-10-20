import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VerifyOTP() {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {}; // تغيير من phone إلى email

  // التحقق من وجود `email`
  useEffect(() => {
    if (!email) { // تغيير من phone إلى email
      toast.error("لا يوجد بريد إلكتروني لإكمال العملية، سيتم إعادة توجيهك لتسجيل الدخول.");
      setTimeout(() => navigate('/login'), 3000);
    }
  }, [email, navigate]); // تغيير من phone إلى email

  // عداد الوقت لإعادة الإرسال
  useEffect(() => {
  if (timer > 0 && !canResend) {
    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  } else if (timer === 0) {
    setCanResend(true);
  }
}, [timer, canResend]);

  // إرسال `token` للتحقق
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token.trim()) {
      toast.error("يرجى إدخال رمز التحقق");
      return;
    } else if (token.length !== 5) {
      toast.error("رمز التحقق يجب أن يتكون من 5 أرقام");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('https://spiritual.brmjatech.uk/api/verify-otp', {
        email, // تغيير من phone إلى email
        
      });
      if (response.data && (response.data.success || response.data.message?.toLowerCase().includes('verified'))) {
        toast.success("تم التحقق بنجاح!");
        navigate('/reset-password', {
          state: {
            email,
            token, // تمرير رمز التحقق إلى صفحة إعادة تعيين كلمة المرور
          }
        });
      } else {
        toast.error(response.data.message || "رمز التحقق غير صحيح");
      }
    } catch (error) {
      console.error("خطأ في التحقق:", error);
      toast.error(error.response?.data?.message || "حدث خطأ أثناء التحقق");
    } finally {
      setIsLoading(false);
    }
  };

  // إعادة إرسال `token`
  const handleResendOtp = async () => {
    if (!canResend) return;
    setIsResending(true);
    try {
      const response = await axios.post('https://spiritual.brmjatech.uk/api/resend-otp', {
        email, // تغيير من phone إلى email
      });
      if (response.data.success) {
        toast.success("تم إعادة إرسال رمز التحقق بنجاح إلى بريدك الإلكتروني!");
        setTimer(60);
        setCanResend(false);
      } else {
        toast.error(response.data.message || "فشل في إعادة إرسال الرمز");
      }
    } catch (error) {
      console.error("خطأ في إعادة الإرسال:", error);
      toast.error(error.response?.data?.message || "حدث خطأ أثناء إعادة الإرسال");
    } finally {
      setIsResending(false);
    }
  };

  // دالة للتعامل مع ضغط زر Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md">
        <>
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center flex-1">
              التحقق من رمز التحقق
            </h2>
          </div>
          <div className="text-center mb-8">
            <p className="text-gray-600">
              تم إرسال رمز التحقق إلى بريدك الإلكتروني: <span className="font-medium">{email}</span>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="block text-right text-gray-700 text-sm font-medium">رمز التحقق</label>
              <div className="relative">
                <input
                  type="text"
                  name="token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="12345"
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
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
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              لم تستلم الرمز؟
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={!canResend || isResending}
                className={`font-medium ml-1 ${
                  canResend && !isResending ? 'text-purple-600 hover:text-purple-700' : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                {isResending ? (
                  <div className="flex items-center justify-center gap-1">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>جاري الإرسال...</span>
                  </div>
                ) : (
                  `أعد الإرسال (${canResend ? 'إرسال' : timer})`
                )}
              </button>
            </p>
          </div>
        </>
      </div>
      <ToastContainer />
    </div>
  );
}
