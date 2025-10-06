import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Lock, Mail, User, LogOut } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  // جلب بيانات المستخدم عند تحميل الصفحة
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setFormData({
        name: storedUser.name || '',
        email: storedUser.email || '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    }
  }, []);

  // التعامل مع رفع الصورة
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

  // تحديث بيانات المستخدم
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.put(
        'https://app.raw7any.com/api/update-profile',
        {
          name: formData.name,
          email: formData.email,
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

  // تغيير كلمة السر
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

  // تسجيل الخروج
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-32 h-32 mb-4">
              <img
                src={imagePreview || (user?.image ? `https://app.raw7any.com${user.image}` : "https://via.placeholder.com/150")}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-purple-100"
              />
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
            <h1 className="text-2xl font-bold text-gray-800">{user?.name || "مستخدم"}</h1>
            <p className="text-gray-500">{user?.email || "example@example.com"}</p>
          </div>

          <div className="space-y-8">
            {/* تحديث البيانات الشخصية */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">تحديث البيانات الشخصية</h2>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">الاسم الكامل</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? "جاري التحديث..." : "تحديث البيانات"}
                </button>
              </form>
            </div>

            {/* تغيير كلمة السر */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">تغيير كلمة السر</h2>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">كلمة السر الحالية</label>
                  <input
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">كلمة السر الجديدة</label>
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">تأكيد كلمة السر الجديدة</label>
                  <input
                    type="password"
                    value={formData.confirmNewPassword}
                    onChange={(e) => setFormData({ ...formData, confirmNewPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? "جاري التغيير..." : "تغيير كلمة السر"}
                </button>
              </form>
            </div>

            {/* تسجيل الخروج */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut size={18} />
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
