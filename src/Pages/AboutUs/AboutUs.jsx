import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaQuran, FaPray, FaShoppingBag } from "react-icons/fa";
import Navbar from '../Navbar/Navbar';

export default function AboutUs() {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);

  // تأثيرات الحركة
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  // تأثيرات hover للكرتات
  const cardHover = {
    scale: 1.05,
    boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)",
    transition: { duration: 0.3, ease: "easeInOut" },
  };

  // تأثير انزلاق الصفحة
  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -50 },
  };

  // تأثير الانتقال بين الصفحات
  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.8,
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="hero relative overflow-hidden flex flex-col"
      >
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
                animationName: "shootingStar",
                animationDuration: "3s",
                animationTimingFunction: "linear",
                animationDelay: `${i * 2}s`,
                animationIterationCount: "infinite",
              }}
            />
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* نص "Get to Know Us" في الخلفية */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.h1
            initial={{ opacity: 0.1, scale: 0.9 }}
            animate={{ opacity: 0.3, scale: 1.2 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            className="text-white/20 font-montserratArabic font-bold text-[80px] sm:text-[120px] md:text-[200px] lg:text-[250px] text-center"
          >
            Get to Know Us
          </motion.h1>
        </div>

        {/* المحتوى */}
        <div className="relative z-50 p-8 flex flex-col flex-grow">
          <Navbar />

          {/* عنوان الصفحة */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2
              className={`text-white font-montserratArabic font-bold text-[30px] sm:text-[35px] md:text-[45px] transition-all duration-1000 transform ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "0.4s" }}
            >
              {t("AboutUs.title")}
            </h2>
          </motion.div>

          {/* الأقسام الرئيسية */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {/* كورسات دينية */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-purple-500/30 shadow-lg cursor-pointer"
              whileHover={cardHover}
            >
              <div className="flex justify-center mb-4">
                <FaQuran className="text-purple-400 text-5xl transition-transform duration-300 hover:scale-125" />
              </div>
              <h3 className="text-white font-montserratArabic font-bold text-[20px] sm:text-[24px] mb-3">
                {t("AboutUs.courses.title")}
              </h3>
              <p className="text-purple-100 font-montserratArabic text-[14px] sm:text-[16px]">
                {t("AboutUs.courses.desc")}
              </p>
            </motion.div>

            {/* علاج روحي */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-purple-500/30 shadow-lg cursor-pointer"
              whileHover={cardHover}
            >
              <div className="flex justify-center mb-4">
                <FaPray className="text-purple-400 text-5xl transition-transform duration-300 hover:scale-125" />
              </div>
              <h3 className="text-white font-montserratArabic font-bold text-[20px] sm:text-[24px] mb-3">
                {t("AboutUs.healing.title")}
              </h3>
              <p className="text-purple-100 font-montserratArabic text-[14px] sm:text-[16px]">
                {t("AboutUs.healing.desc")}
              </p>
            </motion.div>

            {/* بيع مستلزمات دينية */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-purple-500/30 shadow-lg cursor-pointer"
              whileHover={cardHover}
            >
              <div className="flex justify-center mb-4">
                <FaShoppingBag className="text-purple-400 text-5xl transition-transform duration-300 hover:scale-125" />
              </div>
              <h3 className="text-white font-montserratArabic font-bold text-[20px] sm:text-[24px] mb-3">
                {t("AboutUs.products.title")}
              </h3>
              <p className="text-purple-100 font-montserratArabic text-[14px] sm:text-[16px]">
                {t("AboutUs.products.desc")}
              </p>
            </motion.div>
          </div>

          {/* قسم إضافي (رسالتنا) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 text-center px-4"
          >
            <h3
              className={`text-white font-montserratArabic font-bold text-[24px] sm:text-[28px] mb-6 transition-all duration-1000 transform ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "1s" }}
            >
              {t("AboutUs.mission.title")}
            </h3>
            <p
              className={`text-purple-100 font-montserratArabic text-[16px] sm:text-[18px] max-w-4xl mx-auto transition-all duration-1000 transform ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "1.2s" }}
            >
              {t("AboutUs.mission.desc")}
            </p>
          </motion.div>
        </div>

        {/* CSS keyframes */}
        <style jsx>{`
          @keyframes shootingStar {
            0% {
              transform: translateX(0) translateY(0);
              opacity: 1;
            }
            70% {
              opacity: 1;
            }
            100% {
              transform: translateX(200px) translateY(100px);
              opacity: 0;
            }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}
