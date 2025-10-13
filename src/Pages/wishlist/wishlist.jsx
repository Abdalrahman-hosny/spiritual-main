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
  const [loading, setLoading] = useState(true);
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
        }
      );
      // تأكد من أن البيانات هي مصفوفة من `response.data.data.items`
      const items = response.data.data && response.data.data.items ? response.data.data.items : [];
      setWishlistItems(items);
      console.log("Wishlist items:", items); // للتأكد من البيانات
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
      fetchWishlistItems(); // إعادة جلب القائمة بعد الحذف
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  const navigateToProductDetails = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  useEffect(() => {
    fetchWishlistItems();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
        <div className={`flex items-center mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <i className={`fas fa-heart text-red-500 text-3xl ${isRTL ? 'ml-3' : 'mr-3'}`}></i>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {t("wishlist.my_wishlist")}
          </h2>
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
                  onClick={() => navigateToProductDetails(item.product.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="w-full md:w-48 h-48 p-4 flex-shrink-0">
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
                  <div className="p-4 w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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
                          removeFromWishlist(item.product ? item.product.id : item.id)
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
      </div>
    </div>
  );
}
