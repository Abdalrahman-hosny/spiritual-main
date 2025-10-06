import React, { useEffect, useState } from 'react';
import { Eye, Heart, Filter, X, SlidersHorizontal, Search } from 'lucide-react';
import { FaShoppingBag } from 'react-icons/fa';
import Navbar from '../Navbar/Navbar';
import image from "../../assets/bg.png";
import plant from "../../assets/mandala_1265367 1.png";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// مكون فلتر السعر
const PriceFilter = ({ minPrice, maxPrice, onPriceChange }) => {
  const { t } = useTranslation();
  const [min, setMin] = useState(minPrice);
  const [max, setMax] = useState(maxPrice);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), max - 1);
    setMin(value);
    onPriceChange(value, max);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), min + 1);
    setMax(value);
    onPriceChange(min, value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-5 rounded-xl shadow-md border border-gray-100"
    >
      <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center gap-2">
        <SlidersHorizontal className="text-purple-600" />
        {t("price_range")}
      </h3>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">{t("min_price")}:</label>
          <input
            type="number"
            value={min}
            onChange={handleMinChange}
            min="0"
            className="w-20 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">{t("max_price")}:</label>
          <input
            type="number"
            value={max}
            onChange={handleMaxChange}
            min="0"
            className="w-20 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <motion.div
          className="w-full h-2 bg-gray-200 rounded-full mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full"
            style={{ width: `${((max - min) / maxPrice) * 100}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${((max - min) / maxPrice) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

// مكون فلتر الفئات
const CategoryFilter = ({ onCategoryChange }) => {
  const { t } = useTranslation();
  const categories = [
    { id: 1, name: t("category_all"), value: "all" },
    { id: 2, name: t("category_books"), value: "books" },
    { id: 3, name: t("category_courses"), value: "courses" },
    { id: 4, name: t("category_accessories"), value: "accessories" },
    { id: 5, name: t("category_sessions"), value: "sessions" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white p-5 rounded-xl shadow-md border border-gray-100"
    >
      <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center gap-2">
        <Filter className="text-purple-600" />
        {t("categories")}
      </h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category.value}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="accent-purple-600"
              />
              <span className="text-sm text-gray-700">{category.name}</span>
            </label>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default function Shop() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // بيانات المنتجات
  const allProducts = [
    { id: 1, name: t("product_name_1"), description: t("product_desc_1"), price: 5000.00, image: image, category: "books" },
    { id: 2, name: t("product_name_2"), description: t("product_desc_2"), price: 3000.00, image: image, category: "courses" },
    { id: 3, name: t("product_name_3"), description: t("product_desc_3"), price: 7000.00, image: image, category: "accessories" },
    { id: 4, name: t("product_name_4"), description: t("product_desc_4"), price: 2000.00, image: image, category: "sessions" },
    { id: 5, name: t("product_name_5"), description: t("product_desc_5"), price: 9000.00, image: image, category: "books" },
    { id: 6, name: t("product_name_6"), description: t("product_desc_6"), price: 4000.00, image: image, category: "courses" },
    { id: 7, name: t("product_name_7"), description: t("product_desc_7"), price: 6000.00, image: image, category: "accessories" },
    { id: 8, name: t("product_name_8"), description: t("product_desc_8"), price: 1000.00, image: image, category: "sessions" },
    { id: 9, name: t("product_name_9"), description: t("product_desc_9"), price: 8000.00, image: image, category: "books" },
  ];

  // فلترة المنتجات
  useEffect(() => {
    let filtered = allProducts;

    // فلترة حسب السعر
    filtered = filtered.filter(product =>
      product.price >= minPrice && product.price <= maxPrice
    );

    // فلترة حسب الفئة
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category === selectedCategory
      );
    }

    // فلترة حسب البحث
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [minPrice, maxPrice, selectedCategory, searchQuery, allProducts]);

  // Animation Variants
  const heroVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const plantVariants = {
    hidden: { opacity: 0, x: -50, rotate: -90 },
    visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 1.2, ease: "easeOut", delay: 0.3 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.03, y: -5, transition: { duration: 0.3 } }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    hover: { scale: 1.2, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className='relative'>
        <div className='image'>
          <Navbar bg={`bg-black/70`} />
          <div className="relative bg-black/70">
            <div className="relative overflow-hidden min-h-[35vh] sm:min-h-[40vh] md:min-h-[45vh] z-10 flex justify-center items-center px-4">
              <motion.div
                variants={heroVariants}
                initial="hidden"
                animate="visible"
                className="text-center p-4 md:p-8 max-w-4xl"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight"
                >
                  {t("shop_title")}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <p className="font-[Montserrat-Arabic] text-white font-normal text-[24px] leading-[100%] tracking-[0] text-center align-middle [font-variant:small-caps]">
                    {t("home")} / <span className='text-purple-500'>{t("shop")}</span>
                  </p>
                </motion.div>
              </motion.div>
            </div>
            <motion.div
              variants={plantVariants}
              initial="hidden"
              animate="visible"
              className="absolute z-40 -bottom-6 sm:-bottom-8 left-0 transform -translate-x-1/4 translate-y-1/4 sm:-translate-x-1/3 sm:translate-y-1/3 md:-translate-x-1/5 md:translate-y-1/5 lg:-translate-x-1/3 lg:translate-y-1/3"
            >
              <div className="relative">
                <div className="absolute -top-12 left-2 w-24 h-24 sm:w-32 sm:h-32 sm:-top-16 sm:left-4 md:w-48 md:h-48 md:-top-24 md:left-6 lg:w-64 lg:h-64 lg:-top-32 lg:left-8 xl:w-80 xl:h-80 xl:-top-36 rounded-full">
                  <motion.img
                    src={plant}
                    alt="Moon Plant"
                    className="max-w-full max-h-full object-contain"
                    animate={{
                      rotate: [0, 3, -3, 0],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4 py-12 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 mb-6 hidden lg:block">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg text-gray-800">{t("filters")}</h2>
                <button className="text-purple-600 text-sm font-medium flex items-center gap-1">
                  <X className="w-4 h-4" />
                  {t("clear_all")}
                </button>
              </div>
              <PriceFilter
                minPrice={minPrice}
                maxPrice={maxPrice}
                onPriceChange={(min, max) => {
                  setMinPrice(min);
                  setMaxPrice(max);
                }}
              />
              <CategoryFilter
                onCategoryChange={(category) => setSelectedCategory(category)}
              />
            </div>

            {/* Mobile Filter Button */}
            <motion.button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden fixed bottom-20 right-4 z-40 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Filter className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Products Grid */}
          <div className="w-full lg:flex-1">
            {/* Search and Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4"
            >
              <motion.div
                className="relative w-full sm:w-64"
                whileHover={{ scale: 1.02 }}
              >
                <input
                  type="text"
                  placeholder={t("search_placeholder")}
                  className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-gray-500" />
                </div>
              </motion.div>
              <div className="text-right">
                <p className="text-gray-600 text-sm">
                  {t("show_products", { count: filteredProducts.length })}
                </p>
              </div>
            </motion.div>

            {/* Products Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    whileHover="hover"
                    className="rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-purple-200 overflow-hidden bg-white"
                  >
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 sm:h-56 md:h-64 object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-4"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="flex justify-center items-center gap-3 w-full"
                          initial="hidden"
                          whileHover="visible"
                          variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.1 } }
                          }}
                        >
                          <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            className="bg-purple-600/90 backdrop-blur-sm hover:bg-white p-2.5 rounded-full text-white hover:text-purple-700 transition-all shadow-lg"
                          >
                            <FaShoppingBag className="w-4 h-4" />
                          </motion.button>
                          <Link to={`/product-details/${product.id}`}>
                            <motion.div
                              variants={buttonVariants}
                              whileHover="hover"
                              className="bg-purple-600/90 backdrop-blur-sm hover:bg-white p-2.5 rounded-full text-white hover:text-purple-700 transition-all shadow-lg"
                            >
                              <Eye className="w-4 h-4" />
                            </motion.div>
                          </Link>
                          <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            className="bg-purple-600/90 backdrop-blur-sm hover:bg-white p-2.5 rounded-full text-white hover:text-purple-700 transition-all shadow-lg"
                          >
                            <Heart className="w-4 h-4" />
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    </div>
                    <motion.div
                      className="p-4 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 + 0.3 }}
                    >
                      <motion.h2
                        className="font-[Montserrat-Arabic] mb-1 font-semibold text-[16px] leading-relaxed tracking-[0] text-center align-middle line-clamp-2"
                        whileHover={{ color: "#8B5CF6" }}
                        transition={{ duration: 0.2 }}
                      >
                        {product.name}
                      </motion.h2>
                      <p className="font-[Montserrat-Arabic] my-2 font-normal text-[14px] leading-relaxed text-gray-500 tracking-[0] text-center align-middle line-clamp-2">
                        {product.description}
                      </p>
                      <motion.div
                        className="flex items-center justify-center font-[Montserrat-Arabic] font-medium text-[18px] leading-[100%] tracking-[0] text-center uppercase gap-1"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-purple-500">{t("currency")}</span>
                        <span className="text-purple-600">{product.price.toFixed(2)}</span>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="inline-block"
                  >
                    <div className="bg-gray-100 p-8 rounded-xl shadow-md">
                      <X className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">{t("no_products_found")}</h3>
                      <p className="text-gray-500">{t("try_different_filters")}</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>

            {/* Pagination */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex justify-center"
            >
              <div className="flex gap-2">
                {[1, 2, 3].map((page) => (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg text-sm ${page === 1 ? 'bg-purple-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-0 z-50 bg-white w-64 p-4 shadow-lg lg:hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-lg">{t("filters")}</h2>
                <motion.button
                  onClick={() => setIsSidebarOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              <PriceFilter
                minPrice={minPrice}
                maxPrice={maxPrice}
                onPriceChange={(min, max) => {
                  setMinPrice(min);
                  setMaxPrice(max);
                }}
              />
              <CategoryFilter
                onCategoryChange={(category) => setSelectedCategory(category)}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
