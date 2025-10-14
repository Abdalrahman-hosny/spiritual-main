import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export function ProductCart() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // جلب منتجات الكارت من API
  const fetchCartItems = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        setProducts([]);
        return;
      }
      const response = await axios.get(
        "https://spiritual.brmjatech.uk/api/cart",
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      const items = response.data.data && response.data.data.items ? response.data.data.items : [];
      setProducts(items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // إضافة/تحديث منتج في الكارت
  const updateCartItem = async (productId, newQuantity) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        return false;
      }
      await axios.post(
        "https://spiritual.brmjatech.uk/api/cart/add",
        { product_id: productId, quantity: newQuantity },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      return true;
    } catch (error) {
      console.error("Error updating cart item:", error);
      return false;
    }
  };

  // زيادة/إنقاص الكمية
  const handleQuantityChange = async (productId, change) => {
    const productIndex = products.findIndex(p => p.product.id === productId);
    if (productIndex === -1) return;

    const product = products[productIndex];
    const newQuantity = Math.max(1, product.quantity + change);

    // تحديث الكمية محليًا (Optimistic UI)
    const updatedProducts = [...products];
    updatedProducts[productIndex] = { ...product, quantity: newQuantity };
    setProducts(updatedProducts);

    // إرسال الطلب إلى API
    const success = await updateCartItem(productId, newQuantity);
    if (!success) {
      // إذا فشل الطلب، نعيد الكمية إلى حالتها الأصلية
      setProducts(products);
    }
  };

  // إزالة منتج من الكارت
  const removeFromCart = async (productId) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        return;
      }
      await axios.post(
        "https://spiritual.brmjatech.uk/api/cart/remove",
        { product_id: productId },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      await fetchCartItems(); // إعادة جلب القائمة بعد الحذف
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // تفريغ الكارت
  const clearCart = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        return;
      }
      await axios.post(
        "https://spiritual.brmjatech.uk/api/cart/clear",
        {},
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      await fetchCartItems(); // إعادة جلب القائمة بعد التفريغ
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // حساب السعر الإجمالي
  const totalPrice = products.reduce(
    (sum, product) => sum + (product.product.price * product.quantity),
    0
  );

  // الانتقال إلى صفحة الدفع
  const handleCheckout = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    fetchCartItems();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="pt-24 p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        {/* العنوان */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-bold text-2xl sm:text-3xl mb-6 text-center"
        >
          {t("cart.title")}
        </motion.h1>
        {/* المنتجات */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">{t("cart.loading")}</p>
            </div>
          ) : products.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">
                {t("cart.empty")}
              </p>
            </motion.div>
          ) : (
            <>
              <AnimatePresence>
                {products.map((product) => (
                  <motion.div
                    key={product.product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg p-4 sm:p-6 shadow-sm md:shadow-none"
                  >
                    <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-col sm:flex-row'} sm:items-center sm:gap-6 gap-4`}>
                      {/* صورة المنتج */}
                      <div className="flex-shrink-0 flex justify-center sm:block">
                        <img
                          src={product.product.image}
                          className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] object-contain"
                          alt={product.product.name}
                        />
                      </div>
                      {/* تفاصيل المنتج */}
                      <div className="flex-1 min-w-0 text-right">
                        <h3 className="text-lg sm:text-xl font-semibold text-red-600 mb-2">
                          {product.product.name}
                        </h3>
                        <p className="font-semibold text-[13px] sm:text-[14px] leading-relaxed mb-3">
                          {product.product.description}
                        </p>
                        <div className="font-bold text-[18px] sm:text-[20px] leading-[100%] uppercase text-purple-600">
                          {product.product.price.toFixed(2)} {t("currency")}
                        </div>
                      </div>
                      {/* عناصر التحكم */}
                      <div className={`flex items-center ${isRTL ? 'justify-start' : 'justify-between sm:justify-start'} gap-3 flex-shrink-0`}>
                        <button
                          onClick={() => handleQuantityChange(product.product.id, -1)}
                          disabled={product.quantity <= 1}
                          className="w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-lg font-bold text-red-600 disabled:opacity-50"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium text-lg">
                          {product.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(product.product.id, 1)}
                          className="w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-lg font-bold text-green-600"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(product.product.id)}
                          className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          {t("remove")}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {/* زر اتمام الشراء */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`mt-8 flex ${isRTL ? 'justify-between' : 'justify-end'} items-center`}
              >
                <button
                  onClick={clearCart}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors"
                >
                  {t("cart.clear")}
                </button>
                <div className="font-bold text-[18px] text-purple-600 mx-4">
                  {t("cart.total")}: {totalPrice.toFixed(2)} {t("currency")}
                </div>
                <button
                  onClick={handleCheckout}
                  className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-2 rounded-full font-medium hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {t("cart.checkout")}
                </button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
