import React, { useEffect } from 'react';
import { Search } from 'lucide-react';
import plant from "../../assets/mandala_1265367 1.png";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function CategoryProducts() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

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

  return (
    <div>
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
                  {t("categoryProducts.title")}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <p className="font-[Montserrat-Arabic] text-white text-[24px] text-center">
                    {t("categoryProducts.breadcrumbHome")} /
                    <span className='text-purple-500'> {t("categoryProducts.breadcrumbCurrent")}</span>
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* Plant decoration */}
            <motion.div
              variants={plantVariants}
              initial="hidden"
              animate="visible"
              className="absolute z-40 -bottom-6 sm:-bottom-8 left-0"
            >
              <div className="relative">
                <div className="absolute -top-12 left-2 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-80 xl:h-80 rounded-full">
                  <motion.img
                    src={plant}
                    alt="Moon Planet"
                    className="max-w-full max-h-full object-contain"
                    animate={{ rotate: [0, 3, -3, 0], scale: [1, 1.02, 1] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <ArabicContactList />

      <div className='pt-8'>
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
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen pt-24" dir="rtl">
      {/* Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="font-[Montserrat-Arabic] font-bold text-[30px] text-right text-gray-800">
            {t("contactList.title")}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative w-full">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t("contactList.searchPlaceholder")}
              className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 bg-white"
            />
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {contacts.map((contact, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border"
            >
              <div className="flex flex-col items-center text-center">
                <Link to={`/trainer/${index + 1}`} className="mb-4">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-32 h-32 rounded-full object-cover border-2"
                  />
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
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-2 space-x-reverse">
            <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
              {t("contactList.pagination.next")}
            </button>
            {pageNumbers.map((number, index) => (
              <button
                key={number}
                className={`w-8 h-8 rounded-full text-sm font-medium ${
                  index === 0
                    ? "bg-purple-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {number}
              </button>
            ))}
            <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
              {t("contactList.pagination.prev")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
