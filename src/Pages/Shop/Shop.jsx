import React, { useEffect, useState } from 'react';
import plant from "../../assets/mandala_1265367 1.png";
import image from "../../assets/bg.png";
import { Eye, Heart, Filter, X } from 'lucide-react';
import { FaShoppingBag } from 'react-icons/fa';
import PriceFilter from './PriceFilter';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // ✅ i18n hook

export default function Shop() {
  const { t, i18n } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const products = new Array(9).fill({
    id: 1,
    name: t("product_name"),
    description: t("product_desc"),
    price: "5000.00",
    image: image,
  });

  // ...existing code...
// filepath: e:\tasks\spiritual-main\src\Pages\Shop\Shop.jsx

// Animation Variants
const heroVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const plantVariants = {
  hidden: { opacity: 0, x: -50, rotate: -90 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 1.2, ease: "easeOut", delay: 0.3 }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  hover: {
    scale: 1.03,
    y: -5,
    transition: { duration: 0.3 }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  hover: {
    scale: 1.2,
    transition: { duration: 0.2 }
  }
};
// ...existing code...

  // ...variants (نفس الكود السابق)...

  return (
    
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      
      {/* Hero Section */}
      <div className='relative'>
        <div className='image'>
          
          <div className="relative bg-black/70">
          <div className="pt-[80px]"></div>
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
                  {t("shop")}
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
            {/* ...plant decoration... */}
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
                    alt="Moon Planet"
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
      <div className="container mx-auto p-4 py-24">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Products Grid */}
          <div className="w-full lg:flex-1">
            {/* Results count */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="mb-6 text-right"
            >
              <p className="text-gray-600 text-sm">{t("show_products", { count: products.length })}</p>
            </motion.div>
            {/* ...products grid... */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
            >
              {products.map((product, idx) => (
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
                      className="absolute inset-0 bg-black/40 flex items-end justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="flex justify-center items-center pb-6 gap-3"
                        initial="hidden"
                        whileHover="visible"
                        variants={{
                          hidden: {},
                          visible: {
                            transition: {
                              staggerChildren: 0.1
                            }
                          }
                        }}
                      >
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          className="bg-purple-500/90 backdrop-blur-sm hover:bg-white p-2.5 rounded-full text-white hover:text-purple-700 transition-all shadow-lg"
                        >
                          <FaShoppingBag className="w-4 h-4" />
                        </motion.button>
                        <Link to={`/product-details/1`}>
                          <motion.div
                            variants={buttonVariants}
                            whileHover="hover"
                            className="bg-purple-500/90 backdrop-blur-sm hover:bg-white p-2.5 rounded-full text-white hover:text-purple-700 transition-all shadow-lg"
                          >
                            <Eye className="w-4 h-4" />
                          </motion.div>
                        </Link>
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          className="bg-purple-500/90 backdrop-blur-sm hover:bg-white p-2.5 rounded-full text-white hover:text-purple-700 transition-all shadow-lg"
                        >
                          <Heart className="w-4 h-4" />
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </div>
                  <motion.div
                    className="p-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 + 0.3 }}
                  >
                    <motion.h2
                      className="font-[Montserrat-Arabic] mb-1 font-normal text-[14px] leading-relaxed tracking-[0] text-center align-middle line-clamp-2"
                      whileHover={{ color: "#8B5CF6" }}
                      transition={{ duration: 0.2 }}
                    >
                      {product.name}
                    </motion.h2>
                    <p className="font-[Montserrat-Arabic] my-4 font-normal text-[12px] leading-relaxed text-[#0000004D] tracking-[0] text-center align-middle">
                      {product.description}
                    </p>
                    <motion.div
                      className="flex items-center justify-center font-[Montserrat-Arabic] font-medium text-[16px] leading-[100%] tracking-[0] text-center uppercase gap-1"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-purple-500">{t("currency")}</span>
                      <span className="text-purple-600">{product.price}</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
            {/* ...pagination... */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex justify-center"
            >
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 rounded-lg bg-purple-600 text-white text-sm"
                >
                  1
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm hover:bg-gray-50"
                >
                  2
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm hover:bg-gray-50"
                >
                  3
                </motion.button>
              </div>
            </motion.div>
          </div>
          {/* ...sidebar and mobile sidebar, replace all النصوص بـ t("key") ... */}
        </div>
      </div>
      {/* ...rest of the code, replace all النصوص بـ t("key") ... */}
    </div>
  );
}