import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import plant from "../../assets/mandala_1265367 1.png";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export function ProductCart() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [products, setProducts] = useState(() => {
    // استرجاع المنتجات من localStorage إذا كانت موجودة
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const navigate = useNavigate();

  // حفظ السلة في localStorage عند التحديث
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(products));
  }, [products]);

  const updateQuantity = (id, change) => {
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          const newQuantity = Math.max(0, product.quantity + change);
          return { ...product, quantity: newQuantity };
        }
        return product;
      })
    );
  };

  const removeProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const totalPrice = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div className="pt-24 p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        {/* العنوان */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-[Alexandria] font-bold text-[24px] sm:text-[30px] leading-[39px] text-right mb-6"
        >
          قائمة المنتجات
        </motion.h1>

        {/* المنتجات */}
        <div className="space-y-4">
          <AnimatePresence>
            {products.map((product) => (
              <motion.div
                key={product.id}
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
                    <Link to={`/product-details/${product.id}`}>
                      <img
                        src={product.image}
                        className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] object-contain"
                        alt={product.name}
                      />
                    </Link>
                  </div>

                  {/* تفاصيل المنتج */}
                  <div className="flex-1 min-w-0 text-right">
                    <h3 className="text-lg sm:text-xl font-semibold text-red-600 mb-2">
                      {product.name}
                    </h3>
                    <p className="font-[Montserrat-Arabic] text-[#212529] font-semibold text-[13px] sm:text-[14px] leading-relaxed mb-3">
                      {product.description}
                    </p>
                    <div className="font-[Montserrat-Arabic] font-bold text-[18px] sm:text-[20px] leading-[100%] uppercase text-purple-600">
                      {product.price.toFixed(2)} جنية
                    </div>
                  </div>

                  {/* عناصر التحكم */}
                  <div className={`flex items-center ${isRTL ? 'justify-start' : 'justify-between sm:justify-start'} gap-3 flex-shrink-0`}>
                    <button
                      onClick={() => updateQuantity(product.id, -1)}
                      className="w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-lg font-bold text-red-600"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium text-lg">
                      {product.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, 1)}
                      className="w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-lg font-bold text-green-600"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      إزالة
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* السلة فارغة */}
        {products.length === 0 ? (
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
            <p className="text-gray-500 text-lg">{isRTL ? 'السلة فارغة' : 'Cart is empty'}</p>
          </motion.div>
        ) : (
          // زر اتمام الشراء
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`mt-8 flex ${isRTL ? 'justify-between' : 'justify-end'} items-center`}
          >
            <div className="font-[Montserrat-Arabic] font-bold text-[18px] text-purple-600">
              الإجمالي: {totalPrice.toFixed(2)} جنية
            </div>
            <button
              onClick={handleCheckout}
              className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-2 rounded-full font-medium hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {isRTL ? 'اتمام الشراء' : 'Checkout'}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
