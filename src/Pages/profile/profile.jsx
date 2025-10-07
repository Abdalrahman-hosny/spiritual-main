import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Lock, Mail, User, Phone, Trash2, Check, X } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import plant from '../../assets/Moon.png';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setFormData({
        name: storedUser.name || '',
        email: storedUser.email || '',
        phone: storedUser.phone || '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.put(
        'https://app.raw7any.com/api/update-profile',
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      toast.success("تم تحديث البيانات بنجاح!", {
        position: "top-right",
      });
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user);
    } catch (error) {
      toast.error(error.response?.data?.message || "حدث خطأ أثناء التحديث", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("كلمة السر الجديدة غير متطابقة", {
        position: "top-right",
      });
      return;
    }
    setIsLoading(true);
    try {
      await axios.put(
        'https://app.raw7any.com/api/change-password',
        {
          current_password: formData.currentPassword,
          new_password: formData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      toast.success("تم تغيير كلمة السر بنجاح!", {
        position: "top-right",
      });
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "حدث خطأ أثناء تغيير كلمة السر", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      await axios.delete('https://app.raw7any.com/api/delete-account', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      toast.success("تم حذف الحساب بنجاح!", {
        position: "top-right",
      });
      sessionStorage.clear();
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || "حدث خطأ أثناء حذف الحساب", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
      setShowDeleteAccount(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    if (password.length < 4) return { strength: 1, label: 'ضعيفة', color: 'bg-red-500' };
    if (password.length < 8) return { strength: 2, label: 'متوسطة', color: 'bg-yellow-500' };
    return { strength: 3, label: 'قوية', color: 'bg-green-500' };
  };

  return (
    <div className="hero relative min-h-screen overflow-hidden">
      <div className="to-black p-8">
        {/* Stars background */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 1}s`,
                opacity: Math.random() * 0.8 + 0.2,
              }}
            />
          ))}
        </div>

        {/* Shooting stars */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={`shooting-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                animationName: 'shootingStar',
                animationDuration: '3s',
                animationTimingFunction: 'linear',
                animationDelay: `${i * 2}s`,
                animationIterationCount: 'infinite',
              }}
            />
          ))}
        </div>

        

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-purple-400/60 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationName: 'floatParticle',
                animationDuration: `${3 + Math.random() * 4}s`,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="pt-[80px]"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-white/90 rounded-xl shadow-lg overflow-hidden backdrop-blur-sm"
        >
          <div className="p-6 sm:p-8">
            {/* معلومات المستخدم */}
            <motion.div
              className="flex flex-col md:flex-row items-center md:items-start mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative w-32 h-32 mb-4 md:mr-8 md:mb-0">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-32 h-32 rounded-full bg-purple-100 flex items-center justify-center border-4 border-purple-200 overflow-hidden"
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <img
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      alt="Default Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  )}
                </motion.div>
                <label
                  htmlFor="profile-image"
                  className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 transition-colors"
                >
                  <Camera size={18} />
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex-1"
              >
                <h1 className="text-2xl font-bold text-gray-800">{user?.name || "مستخدم"}</h1>
                <p className="text-gray-500">{user?.email || "example@example.com"}</p>
                {user?.phone && <p className="text-gray-500">{user?.phone}</p>}
              </motion.div>
            </motion.div>

            {/* تحديث البيانات الشخصية */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/80 p-6 rounded-lg shadow-sm backdrop-blur-sm"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">تحديث البيانات الشخصية</h2>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">الاسم الكامل</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">رقم الهاتف</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                    />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "جاري التحديث..." : "تحديث البيانات"}
                  </motion.button>
                </form>
              </motion.div>

              {/* زر تغيير كلمة السر */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/80 p-6 rounded-lg shadow-sm backdrop-blur-sm"
              >
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className={`w-full py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    showPasswordForm
                      ? "bg-purple-700 text-white border-2 border-purple-500"
                      : "bg-white/90 text-purple-700 border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-500"
                  }`}
                >
                  <Lock size={18} />
                  تغيير كلمة السر
                </motion.button>

                {/* نموذج تغيير كلمة السر */}
                <AnimatePresence>
                  {showPasswordForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <motion.form
                        onSubmit={handleChangePassword}
                        className="space-y-4 pt-4"
                      >
                        <div>
                          <label className="block text-gray-700 font-medium mb-1">كلمة السر الحالية</label>
                          <input
                            type="password"
                            value={formData.currentPassword}
                            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium mb-1">كلمة السر الجديدة</label>
                          <input
                            type="password"
                            value={formData.newPassword}
                            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                            required
                          />
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className={`h-2.5 rounded-full ${getPasswordStrength(formData.newPassword).color}`}
                                style={{ width: `${(getPasswordStrength(formData.newPassword).strength / 3) * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-xs mt-1 text-gray-500">
                              {getPasswordStrength(formData.newPassword).label}
                            </p>
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium mb-1">تأكيد كلمة السر الجديدة</label>
                          <input
                            type="password"
                            value={formData.confirmNewPassword}
                            onChange={(e) => setFormData({ ...formData, confirmNewPassword: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                            required
                          />
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                        >
                          {isLoading ? "جاري التغيير..." : "تغيير كلمة السر"}
                        </motion.button>
                      </motion.form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* زر حذف الحساب */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/80 p-6 rounded-lg shadow-sm backdrop-blur-sm"
              >
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowDeleteAccount(true)}
                  className="w-full bg-red-100 text-red-700 py-3 px-4 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  حذف الحساب
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* نافذة تأكيد حذف الحساب */}
        <AnimatePresence>
          {showDeleteAccount && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-lg p-6 max-w-md w-full"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <Trash2 className="text-red-600" size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">حذف الحساب</h3>
                <p className="text-gray-600 text-center mb-6">هل أنت متأكد من أنك تريد حذف حسابك؟ لن يمكنك استرجاع بياناتك بعد الحذف.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDeleteAccount}
                    disabled={isLoading}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? "جاري الحذف..." : "حذف الحساب"}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowDeleteAccount(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <X size={18} />
                    إلغاء
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      
      </div>
      <ToastContainer rtl />
    </div>
  );
}
