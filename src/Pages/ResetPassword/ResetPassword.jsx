import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // استخراج `phone` و `token` من `location.state`
  const { phone, token: otp } = location.state || {};

  // إذا لم يكن هناك `phone` أو `otp`، قم بإعادة التوجيه إلى صفحة "نسيت كلمة المرور"
  useEffect(() => {
    if (!phone || !otp) {
      navigate('/forgot-password');
    }
  }, [phone, otp, navigate]);

  // دالة للتعامل مع ضغط زر Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  // التحقق من تطابق كلمة المرور وتأكيدها
  const validatePasswords = () => {
    if (!password.trim() || !passwordConfirmation.trim()) {
      setError('كلمة المرور وتأكيدها مطلوبان');
      return false;
    }
    if (password !== passwordConfirmation) {
      setError('كلمة المرور وتأكيدها غير متطابقين');
      return false;
    }
    if (password.length < 8) {
      setError('كلمة المرور يجب أن تتكون من 8 أحرف على الأقل');
      return false;
    }
    return true;
  };

  // إرسال البيانات إلى API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://app.raw7any.com/api/forgot/reset-password',
        {
          phone,
          password,
          password_confirmation: passwordConfirmation,
          otp,
        }
      );

      if (response.status !== 200) {
        throw new Error('فشل في إعادة تعيين كلمة المرور');
      }

      setSuccess(true);
      // إعادة التوجيه إلى صفحة تسجيل الدخول بعد 2 ثانية
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'حدث خطأ أثناء إعادة تعيين كلمة المرور'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // عند تحميل الصفحة، انتقل إلى الأعلى بشكل سلس
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg">
        {!success ? (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">إعادة تعيين كلمة المرور</h2>
              <p className="text-gray-600">
                أدخل كلمة المرور الجديدة وتأكيدها
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* حقل كلمة المرور */}
              <div className="space-y-1">
                <label className="block text-right text-gray-700 text-sm font-medium">
                  كلمة المرور الجديدة
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="أدخل كلمة المرور الجديدة"
                    className={`w-full px-3 py-2 text-sm bg-gray-50 border ${
                      error ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* حقل تأكيد كلمة المرور */}
              <div className="space-y-1">
                <label className="block text-right text-gray-700 text-sm font-medium">
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type={showPasswordConfirmation ? 'text' : 'password'}
                    name="passwordConfirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="أعد إدخال كلمة المرور"
                    className={`w-full px-3 py-2 text-sm bg-gray-50 border ${
                      error ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPasswordConfirmation ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* عرض رسالة الخطأ */}
              {error && <p className="text-red-500 text-center">{error}</p>}

              {/* زر إعادة تعيين كلمة المرور */}
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
                    <span>جاري إعادة التعيين...</span>
                  </div>
                ) : (
                  'إعادة تعيين كلمة المرور'
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
            <h2 className="text-xl font-bold text-gray-800">تم إعادة تعيين كلمة المرور بنجاح!</h2>
            <p className="text-gray-600">سيتم إعادة توجيهك إلى صفحة تسجيل الدخول...</p>
          </div>
        )}
      </div>
    </div>
  );
}
