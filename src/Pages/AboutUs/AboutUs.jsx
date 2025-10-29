import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function AboutUs() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [aboutData, setAboutData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // جلب البيانات من الـ API
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get(
          "https://spiritual.brmjatech.uk/api/pages/about"
        );
        setAboutData(response.data.data);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };
    fetchAboutData();
  }, []);

  // تأثيرات الحركة
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  // تأثيرات hover
  const cardHover = {
    scale: 1.03,
    transition: { duration: 0.3, ease: "easeInOut" },
  };

  // تأثيرات الصفحة
  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -50 },
  };

  // تأثيرات الانتقال
  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.8,
  };

  return (
    <AnimatePresence>
      {aboutData && (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden"
        >
          {/* خلفية النجوم */}
          <div className="absolute inset-0">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 2 + 1}s`,
                  opacity: Math.random() * 0.6 + 0.2,
                }}
              />
            ))}
          </div>

          {/* صورة الخلفية */}
          <div className="absolute inset-0 bg-black/70">
            <img
              src={aboutData.image}
              alt={aboutData.title}
              className="w-full h-full object-cover opacity-30"
            />
          </div>

          {/* المحتوى */}
          <div className="relative z-10 container mx-auto px-4 mt-4 py-20">
            {/* عنوان الصفحة */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-400">
                {isRTL ? "من نحن" : aboutData.title}
              </h1>
              <div className="w-24 h-1 bg-purple-500 mx-auto mb-6"></div>
              <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
                {isRTL
                  ? "منصة روحي تهدف إلى نشر الوعي وتقديم دورات وخدمات روحية ومنتجات دينية."
                  : aboutData.content}
              </p>
            </motion.div>

            {/* بطاقة معلومات إضافية */}

            {/* قسم "لماذا نحن؟" */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
