import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import plant from "../../assets/mandala_1265367 1.png";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function Wishlist() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [wishlistItems, setWishlistItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    last_page: 1,
    per_page: 10,
    total: 0,
  });
  const navigate = useNavigate();

  const fetchWishlistItems = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        setWishlistItems([]);
        return;
      }
      const response = await axios.get(
        "https://spiritual.brmjatech.uk/api/wishlist",
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          params: {
            page: currentPage, // إرسال رقم الصفحة

          },
        }
      );
     


      const items = response.data.data && response.data.data.result ? response.data.data.result : [];
      setWishlistItems(items);

      // تحديث معلومات الـ Pagination
      if (response.data.data && response.data.data.meta) {
        setPaginationInfo({
          last_page: response.data.data.meta.last_page,
          per_page: response.data.data.meta.per_page,
          total: response.data.data.meta.total,
        });
      }

      
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        return;
      }
      await axios.post(
        "https://spiritual.brmjatech.uk/api/wishlist/remove",
        { product_id: productId },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      fetchWishlistItems();
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  const clearSelectedWishlist = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        return;
      }
      // حذف كل العناصر المختارة
      for (const itemId of selectedItems) {
        await axios.post(
          "https://spiritual.brmjatech.uk/api/wishlist/remove",
          { product_id: itemId },
          {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
        );
      }
      // إعادة جلب القائمة بعد الحذف
      fetchWishlistItems();
      // إعادة تعيين القائمة المختارة
      setSelectedItems([]);
    } catch (error) {
      console.error("Error clearing selected wishlist items:", error);
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === wishlistItems.length) {
      // إذا كانت كل العناصر مختارة، قم بإلغاء اختيارها
      setSelectedItems([]);
    } else {
      // إذا لم تكن كل العناصر مختارة، قم باختيارها
      const allItemIds = wishlistItems.map(item => item.product.id);
      setSelectedItems(allItemIds);
    }
  };

  const toggleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const navigateToProductDetails = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  useEffect(() => {
    fetchWishlistItems();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const pageBackgroundStyle = {
    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
  };

  const contentBackgroundStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(5px)",
    borderRadius: "12px",
    padding: "2rem",
    margin: "2rem auto",
    maxWidth: "1200px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div
      className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      style={pageBackgroundStyle}
    >
      {/* Header مع زخرفة النبات */}
      <div className="relative">
        <div className="image">
          <div
            className="relative bg-cover bg-center h-[40vh] flex items-center justify-center"
            style={{ backgroundImage: "url('https://via.placeholder.com/1920x1080')" }}
          >
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="relative z-10 text-center p-4 md:p-8 max-w-4xl">
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {t("wishlist.title")}
              </h1>
              <p className="text-white text-lg sm:text-xl">
                {t("wishlist.breadcrumb")} / <span className="text-purple-400">{t("wishlist.title")}</span>
              </p>
            </div>
            <div className={`absolute -bottom-6 ${isRTL ? 'right-4' : 'left-4'} z-20`}>
              <img
                src={plant}
                alt="Decorative Plant"
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* محتوى صفحة Wishlist */}
      <div style={contentBackgroundStyle}>
        <div className={`flex flex-col sm:flex-row items-center justify-between mb-8 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          <div className="flex items-center mb-4 sm:mb-0">
            <i className={`fas fa-heart text-red-500 text-3xl ${isRTL ? 'ml-3' : 'mr-3'}`}></i>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {t("wishlist.my_wishlist")}
            </h2>
          </div>
          {/* أزرار Select All و Clear All */}
          {wishlistItems.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleSelectAll}
                className="bg-blue-50 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center"
              >
                <i className={`fas ${selectedItems.length === wishlistItems.length ? 'fa-check-square' : 'fa-square'} mr-2`}></i>
                {selectedItems.length === wishlistItems.length ? t("wishlist.deselect_all") : t("wishlist.select_all")}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearSelectedWishlist}
                disabled={selectedItems.length === 0}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center justify-center ${selectedItems.length === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-red-50 text-red-500 hover:bg-red-100'}`}
              >
                <i className="fas fa-trash-alt mr-2"></i>
                {t("wishlist.clear_selected")}
              </motion.button>
            </div>
          )}
        </div>

        {/* قائمة المنتجات */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">{t("wishlist.loading")}</p>
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-heart-broken text-5xl text-gray-300 mb-4"></i>
            <p className="text-xl text-gray-500">{t("wishlist.empty")}</p>
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {wishlistItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: isRTL ? -300 : 300 }}
                  transition={{ type: "spring", damping: 20 }}
                  className={`bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg flex flex-col md:flex-row items-center ${isRTL ? 'md:flex-row-reverse' : ''}`}
                  style={{
                    cursor: 'pointer',
                    border: selectedItems.includes(item.product.id) ? '2px solid #3b82f6' : 'none'
                  }}
                >
                  {/* مربع اختيار العنصر */}
                  <div className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.product.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleSelectItem(item.product.id);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="h-5 w-5 text-blue-500 rounded"
                    />
                  </div>
                  {/* صورة المنتج */}
                  <div className="w-full md:w-48 h-48 p-4 flex-shrink-0" onClick={() => navigateToProductDetails(item.product.id)}>
                    {item.product && item.product.image ? (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  {/* تفاصيل المنتج */}
                  <div className="p-4 w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4" onClick={() => navigateToProductDetails(item.product.id)}>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">
                        {item.product ? item.product.name : "Unknown Product"}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {item.product ? item.product.price : "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromWishlist(item.product ? item.product.id : item.id);
                        }}
                        className="bg-red-50 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center"
                      >
                        <i className="fas fa-trash-alt mr-2"></i>
                        {t("wishlist.remove")}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Pagination */}
        {wishlistItems.length > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="flex gap-2">
              {/* زر الصفحة السابقة */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`px-3 py-2 rounded-lg text-sm ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                السابق
              </motion.button>

              {/* عرض أرقام الصفحات */}
              {Array.from({ length: paginationInfo.last_page }, (_, i) => i + 1).map((page) => (
                <motion.button
                  key={page}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    currentPage === page
                      ? "bg-purple-600 text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </motion.button>
              ))}

              {/* زر الصفحة التالية */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === paginationInfo.last_page}
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`px-3 py-2 rounded-lg text-sm ${
                  currentPage === paginationInfo.last_page
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                التالي
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
