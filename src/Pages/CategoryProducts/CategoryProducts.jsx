import React, { useEffect } from "react";
import { Search } from "lucide-react";
import plant from "../../assets/mandala_1265367 1.png";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function CategoryProducts() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const heroVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const plantVariants = {
    hidden: { opacity: 0, x: -50, rotate: -90 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: { duration: 1.2, ease: "easeOut", delay: 0.3 },
    },
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative">
        <div className="image">
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
                  {t("categoryProducts.title")}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <p className="font-[Montserrat-Arabic] text-white text-[18px] sm:text-[20px] md:text-[24px] text-center">
                    {t("categoryProducts.breadcrumbHome")} /
                    <span className="text-purple-500">
                      {" "}
                      {t("categoryProducts.breadcrumbCurrent")}
                    </span>
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* Plant Decoration */}
            <motion.div
              variants={plantVariants}
              initial="hidden"
              animate="visible"
              className="absolute z-40 -bottom-6 sm:-bottom-8 left-0 transform -translate-x-1/4 sm:-translate-x-1/3 md:-translate-x-1/5 lg:-translate-x-1/3"
            >
              <div className="relative">
                <div className="absolute -top-12 left-2 w-24 h-24 sm:w-32 sm:h-32 sm:-top-16 sm:left-4 md:w-48 md:h-48 md:-top-24 md:left-6 lg:w-64 lg:h-64 lg:-top-32 lg:left-8 xl:w-80 xl:h-80 xl:-top-36 rounded-full">
                  <motion.img
                    src={plant}
                    alt="Moon Plant"
                    className="max-w-full max-h-full object-contain"
                    animate={{
                      rotate: [0, 3, -3, 0],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contact List */}
      <ArabicContactList />

      {/* Footer */}
      <div className="pt-8">
        <Footer />
      </div>
    </div>
  );
}

export function ArabicContactList() {
  const { t } = useTranslation();

  const contacts = Array(9).fill({
    name: t("contactList.trainerName"),
    status: t("contactList.trainerStatus"),
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  });

  const pageNumbers = [1, 2, 3, 4, 5];

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen pt-12 pb-16 px-4 sm:px-6 lg:px-8" dir="rtl">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-[Montserrat-Arabic] font-bold text-[24px] sm:text-[28px] md:text-[32px] text-right text-gray-800"
        >
          {t("contactList.title")}
        </motion.h1>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full max-w-md mx-auto md:mx-0"
        >
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={t("contactList.searchPlaceholder")}
            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white shadow-sm transition-all duration-300"
          />
        </motion.div>
      </div>

      {/* Contact Grid */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {contacts.map((contact, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 hover:scale-[1.02] hover:border-purple-200"
            >
              <div className="flex flex-col items-center text-center">
                <Link
                  to={`/trainer/${index + 1}`}
                  className="mb-4 relative group"
                >
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white group-hover:border-purple-500 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-medium text-lg">
                      {t("contactList.viewProfile")}
                    </span>
                  </div>
                </Link>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {contact.name}
                </h3>
                <p className="text-sm text-purple-500 font-medium">
                  {contact.status}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pagination */}
      <div className="max-w-7xl mx-auto mt-12 flex justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center space-x-2 space-x-reverse"
        >
          <button className="px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            {t("contactList.pagination.next")}
          </button>
          {pageNumbers.map((number, index) => (
            <motion.button
              key={number}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-10 h-10 rounded-full text-sm font-medium flex items-center justify-center ${
                index === 0
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 hover:bg-purple-100"
              } transition-colors duration-200`}
            >
              {number}
            </motion.button>
          ))}
          <button className="px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            {t("contactList.pagination.prev")}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
