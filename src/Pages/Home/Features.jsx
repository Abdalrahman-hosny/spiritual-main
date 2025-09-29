import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; //  استدعاء الترجمة
import logo from "../../assets/featurelogo.png";

export default function Features() {
  const { t } = useTranslation(); // 

  return (
    <div className="pt-24">
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

// بيانات الكروت (المفاتيح بدل النصوص)
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
};

const CardsGrid = () => {
  const { t } = useTranslation(); // 👈 برضه هنا

  return (
    <div className="w-[80%] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 text-center shadow-md"
          >
            <img src={logo} alt="logo" className="w-16 h-16 mb-4" />
            <p className="font-[Montserrat-Arabic] font-bold text-[20px] leading-[28.8px] tracking-[0] text-center align-middle">
              {t(card.key)}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
