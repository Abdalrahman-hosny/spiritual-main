import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, RefreshCw } from 'lucide-react';
import axios from 'axios';

export default function VerifyReset() {
  const [token, setToken] = useState(''); // كود التحقق
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // استخراج `phone` من `location.state`
  const phone = location.state?.phone;

  // إذا لم يكن هناك `phone`، قم بإعادة التوجيه إلى صفحة "نسيت كلمة المرور"
  useEffect(() => {
    if (!phone) {
      navigate('/forgot-password');
    }
  }, [phone, navigate]);

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

  // إعادة إرسال الرسالة إلى نفس رقم الهاتف
  const handleResendToken = async () => {
    if (!canResend) return;
    setResendLoading(true);
    setError('');
    try {
      const response = await axios.post('https://app.raw7any.com/api/forgot/password', {
        phone,
      });
      if (response.status !== 200) {
        throw new Error('فشل في إعادة إرسال الرسالة');
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

  // التحقق من `token`
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token.trim()) {
      setError('كود التحقق مطلوب');
      return;
    } else if (token.length !== 5) {
      setError('كود التحقق يجب أن يتكون من 5 أرقام');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post('https://app.raw7any.com/api/forgot/verify-otp', {
        phone,
        token,
      });
      if (response.status !== 200) {
        throw new Error('كود التحقق غير صحيح');
      }
      setSuccess(true);
      // تمرير `phone` و `token` إلى صفحة ResetPassword
      setTimeout(() => {
        navigate('/reset-password', {
          state: {
            phone: phone,
            token: token
          }
        });
      }, 2000);
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
              <p className="text-gray-600">
                تم إرسال كود التحقق إلى رقم هاتفك: <span className="font-bold">{phone}</span>
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* حقل كود التحقق (token) */}
              <div className="space-y-1">
                <label className="block text-right text-gray-700 text-sm font-medium">كود التحقق</label>
                <div className="relative">
                  <input
                    type="text"
                    name="token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="12345"
                    className={`w-full px-3 py-2 text-sm bg-gray-50 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right`}
                  />
                </div>
              </div>
              {/* عرض رسالة الخطأ */}
              {error && <p className="text-red-500 text-center">{error}</p>}
              {/* زر إعادة إرسال الرسالة */}
              <div className="flex justify-center mb-4">
                <button
                  type="button"
                  onClick={handleResendToken}
                  disabled={!canResend || resendLoading}
                  className={`flex items-center gap-2 text-purple-600 font-medium ${
                    !canResend || resendLoading ? 'opacity-50 cursor-not-allowed' : 'hover:text-purple-800'
                  }`}
                >
                  <RefreshCw className="w-4 h-4" />
                  {resendLoading ? 'جاري الإرسال...' : `إعادة إرسال الرسالة ${canResend ? '' : `(${resendTimer}s)`}`}
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
                  تم إعادة إرسال الرسالة بنجاح.
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
