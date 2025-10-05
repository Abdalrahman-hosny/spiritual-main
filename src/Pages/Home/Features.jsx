import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import logo from "../../assets/featurelogo.png";

export default function Features() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // تحديث اتجاه الصفحة عند تغيير اللغة
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [isRTL, i18n.language]);

  return (
    <div className="pt-24" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="text-center">
        <h1 className="text-purple-500 font-[Montserrat-Arabic] font-semibold text-[20px] leading-[38px] tracking-[0] text-center align-middle">
          {t("features.title")}
        </h1>
        <p className="font-[Montserrat-Arabic] font-medium text-[35px] leading-[42px] tracking-[0] text-center align-middle">
          {t("features.subtitle")}
        </p>
      </div>
      <CardsGrid />
    </div>
  );
}

const cards = [
  { key: "features.cards.session" },
  { key: "features.cards.courses" },
  { key: "features.cards.store" },
  { key: "features.cards.live" },
  { key: "features.cards.verify" },
  { key: "features.cards.safe" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
  hover: {
    scale: 1.03,
    borderColor: "#8B5CF6",
    boxShadow: "0 10px 20px rgba(139, 92, 246, 0.2)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const CardsGrid = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="w-[80%] mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            whileHover="hover"
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 text-center shadow-sm"
          >
            <motion.img
              src={logo}
              alt="logo"
              className="w-16 h-16 mb-4"
              whileHover={{ opacity: 0.8 }}
            />
            <p className="font-[Montserrat-Arabic] font-bold text-[20px] leading-[28.8px] tracking-[0] text-center align-middle">
              {t(card.key)}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
