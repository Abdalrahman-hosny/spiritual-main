import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import img1 from "../../assets/Background1.png";
import img2 from "../../assets/Background2.png";
import img3 from "../../assets/Background3.png";
import img4 from "../../assets/Imagelollo.png";

export default function HowWork() {
  const { t } = useTranslation();

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="image relative min-h-screen ">
      {/* Overlay */}
      <div className="bg-black/50 absolute inset-0"></div>

      {/* Content فوق الـ overlay */}
      <div className="relative z-40 p-8">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mb-4 text-purple-700 font-montserratArabic font-semibold text-[20px] leading-[38px] tracking-[0] text-center align-middle"
        >
          {t("howwork.subtitle")}
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-montserratArabic mb-5 font-medium text-[35px] leading-[42px] tracking-[0] text-center align-middle text-white"
        >
          {t("howwork.title")}
        </motion.h2>

        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-4">
            {/* Step 1 */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex flex-col justify-center items-center"
            >
              <img src={img1} alt="" />
              <div>
                <p className="font-montserratArabic font-bold text-[24px] leading-relaxed text-white text-center">
                  {t("howwork.step1.title")}
                </p>
                <p className="font-montserratArabic font-medium text-[14px] leading-relaxed text-center text-white">
                  {t("howwork.step1.desc")}
                </p>
              </div>
            </motion.div>

            {/* Icon between */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center items-center"
            >
              <img src={img4} alt="" />
            </motion.div>

            {/* Step 2 */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col justify-center items-center"
            >
              <img src={img2} alt="" />
              <div>
                <p className="font-montserratArabic font-bold text-[24px] leading-relaxed text-white text-center">
                  {t("howwork.step2.title")}
                </p>
                <p className="font-montserratArabic font-medium text-[14px] leading-relaxed text-center text-white">
                  {t("howwork.step2.desc")}
                </p>
              </div>
            </motion.div>

            {/* Icon between */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex justify-center items-center"
            >
              <img src={img4} alt="" />
            </motion.div>

            {/* Step 3 */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-col justify-center items-center"
            >
              <img src={img3} alt="" />
              <div>
                <p className="font-montserratArabic font-bold text-[24px] leading-relaxed text-white text-center">
                  {t("howwork.step3.title")}
                </p>
                <p className="font-montserratArabic font-medium text-[14px] leading-relaxed text-center text-white">
                  {t("howwork.step3.desc")}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}