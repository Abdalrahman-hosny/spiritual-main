import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import preview from "../../assets/hero.png";
import plant from "../../assets/mandala_1265367 1.png";
import { useTranslation } from "react-i18next";
import { CiFileOn, CiPlay1 } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { FaLinkedinIn, FaYoutube, FaStar } from "react-icons/fa6";
import { GrFacebookOption } from "react-icons/gr";
import pdf from "../../assets/extentions/pdf-svgrepo-com.svg";
import { motion, AnimatePresence } from "framer-motion";
import CourseSlider from "../Home/CourseSlider";
import axios from "axios";

const CourseDetails = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [course, setCourse] = useState(null);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [isRTL, i18n.language]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get("https://spiritual.brmjatech.uk/api/courses");
        if (response.data.code === 200) {
          setCourse(response.data.data.result[0]);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    fetchCourse();
  }, []);

  const handleTabChange = (tabId) => {
    if (tabId === activeTab) return;
    setIsLoading(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setAnimationKey((prev) => prev + 1);
      setIsLoading(false);
      window.scrollTo({ top: 400, behavior: "smooth" });
    }, 300);
  };

  const tabs = [
    {
      id: "profile",
      label: t("course.aboutCourse"),
      color: "purple",
    },
    {
      id: "courses",
      label: t("course.files"),
      color: "blue",
      badge: course?.files_count || 0,
    },
  ];

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
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const plantVariants = {
    hidden: { opacity: 0, x: isRTL ? 50 : -50, rotate: -90 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
 <div className="relative">
        <div className="image">
          
          <div className="relative bg-black/70">
            <div className="relative overflow-hidden mt-5 min-h-[35vh] sm:min-h-[40vh] md:min-h-[45vh] z-10 flex justify-center items-center px-4">
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
                  {t("course.title")}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <p className="font-[Montserrat-Arabic] text-white font-normal text-[18px] sm:text-[20px] md:text-[24px] text-center">
                    {t("course.breadcrumb")}
                  </p>
                </motion.div>
              </motion.div>
            </div>
            {/* Plant Decoration */}
            <motion.div
              variants={plantVariants}
              initial="hidden"
              animate="visible"
              className={`absolute z-40 -bottom-6 sm:-bottom-8 ${isRTL ? 'right-0 transform translate-x-1/4 translate-y-1/4' : 'left-0 transform -translate-x-1/4 translate-y-1/4'} sm:-translate-x-1/3 sm:translate-y-1/3 md:-translate-x-1/5 md:translate-y-1/5 lg:-translate-x-1/3 lg:translate-y-1/3`}
            >
              <div className="relative">
                <div className="absolute -top-12 left-2 w-24 h-24 sm:w-32 sm:h-32 sm:-top-16 sm:left-4 md:w-48 md:h-48 md:-top-24 md:left-6 lg:w-64 lg:h-64 lg:-top-32 lg:left-8 xl:w-80 xl:h-80 xl:-top-36 rounded-full">
                  <motion.img
                    src={plant}
                    alt={t("course.plantAlt")}
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

      {/* Main Content */}
      <div className="pt-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Course Info Card */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden bg-white shadow-md rounded-md p-6 border border-gray-100 md:flex flex-col justify-between"
          >
            <div>
              <h3 className="font-[Montserrat-Arabic] text-right font-semibold text-[18px] text-gray-800 mb-4">
                {t("course.includes")}
              </h3>
              {/* Course Schedule */}
              <div className="flex items-center justify-between border-b border-gray-200 py-4 text-gray-600">
                <span className="font-[Montserrat-Arabic] text-[#222222] font-semibold text-[14px]">
                  {course.schedule}
                </span>
                <span className="flex items-center gap-1 font-[Montserrat-Arabic] font-light text-[16px]">
                  {t("course.time")}
                  {isRTL ? <IoMdTime className="mr-1 text-purple-500 font-bold text-md" /> : <IoMdTime className="ml-1 text-purple-500 font-bold text-md" />}
                </span>
              </div>
              {/* Files */}
              <div className="flex items-center justify-between border-b border-gray-200 py-4 text-gray-600">
                <span className="font-[Montserrat-Arabic] text-[#222222] font-semibold text-[14px]">
                  {course.files_count}
                </span>
                <span className="flex items-center gap-1 font-[Montserrat-Arabic] font-light text-[16px]">
                  {t("course.files")}
                  {isRTL ? <CiFileOn className="mr-1 text-purple-500 font-bold text-md" /> : <CiFileOn className="ml-1 text-purple-500 font-bold text-md" />}
                </span>
              </div>
              {/* Duration */}
              <div className="flex items-center justify-between border-b border-gray-200 py-4 text-gray-600">
                <span className="font-[Montserrat-Arabic] text-[#222222] font-semibold text-[14px]">
                  {course.duration}
                </span>
                <span className="flex items-center gap-1 font-[Montserrat-Arabic] font-light text-[16px]">
                  {t("course.duration")}
                  {isRTL ? <CiPlay1 className="mr-1 text-purple-500 font-bold text-md" /> : <CiPlay1 className="ml-1 text-purple-500 font-bold text-md" />}
                </span>
              </div>
              {/* Lectures */}
              <div className="flex items-center justify-between border-b border-gray-200 py-4 text-gray-600">
                <span className="font-[Montserrat-Arabic] text-[#222222] font-semibold text-[14px]">
                  {course.lectures_count}
                </span>
                <span className="flex items-center gap-1 font-[Montserrat-Arabic] font-light text-[16px]">
                  {t("course.lectures")}
                  {isRTL ? <CiPlay1 className="mr-1 text-purple-500 font-bold text-md" /> : <CiPlay1 className="ml-1 text-purple-500 font-bold text-md" />}
                </span>
              </div>
              {/* Reviews */}
              <div className="flex items-center justify-between border-b border-gray-200 py-4 text-gray-600">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <span className="flex items-center gap-1 font-[Montserrat-Arabic] font-light text-[16px]">
                  {t("course.reviews")}
                </span>
              </div>
            </div>
            {/* Price and Subscription */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6"
            >
              <p className="font-[Montserrat-Arabic] font-semibold text-[20px] text-center mb-3">
                {course.price} {t("course.currency")}
              </p>
              <div className="flex justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-[60%] bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-full transition-colors duration-300"
                >
                  {t("course.subscribe")}
                </motion.button>
              </div>
            </motion.div>
            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 flex justify-center items-center space-x-2 rtl:space-x-reverse text-gray-600"
            >
              <div className="flex items-center gap-1">
                <a href="#" className="hover:text-blue-600 transition-colors">
                  <GrFacebookOption />
                </a>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  <FaLinkedinIn />
                </a>
                <a href="#" className="hover:text-red-600 transition-colors">
                  <FaYoutube />
                </a>
              </div>
              <p className="text-[#000000] font-[Montserrat-Arabic] font-semibold text-[14px]">
                {t("course.share")}:
              </p>
            </motion.div>
          </motion.div>

          {/* Video Preview and Trainer Info */}
          <div className="col-span-3 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-md overflow-hidden shadow-md"
            >
              {/* Video Preview */}
              <div className="relative">
                <img
                  src={course.image || preview}
                  alt={t("course.previewAlt")}
                  className="w-full h-[450px] rounded-md object-cover"
                />
                <div className="absolute inset-0 flex justify-center items-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 flex items-center justify-center rounded-full bg-white/80 text-purple-600 text-2xl shadow-lg"
                  >
                    ▶
                  </motion.button>
                </div>
              </div>
              {/* Trainer Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-6 p-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={preview}
                    alt={t("course.instructorAlt")}
                    className="w-[70px] h-[70px] rounded-full"
                  />
                  <div>
                    <h4 className="text-[#555555] font-[Montserrat-Arabic] font-normal text-[14px]">
                      {t("course.instructor")}
                    </h4>
                    <p className="font-[Montserrat-Arabic] font-semibold text-[16px] text-[#444444]">
                      {course.trainer?.name}
                    </p>
                  </div>
                </div>
                <div className={`border-${isRTL ? 'l' : 'r'}-2 border-gray-300 ${isRTL ? 'pe-6' : 'ps-6'}`}>
                  <span className="font-[Montserrat-Arabic] font-normal text-[14px] text-[#555555]">
                    {t("course.category")}
                  </span>
                  <p className="font-[Montserrat-Arabic] font-semibold text-[16px] text-purple-600">
                    {course.category}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Course Title and Tabs */}
          <div className="col-span-3 pt-3">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-[Montserrat-Arabic] font-medium text-[24px] sm:text-[36px] leading-[36px] text-right"
            >
              {course.title}
            </motion.h2>
            {/* Dynamic Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-start md:w-[600px] my-8 p-1 bg-gray-50 rounded-2xl"
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    disabled={isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex items-center px-4 py-2 font-[Montserrat-Arabic] font-light text-[14px] leading-[32.3px] text-center align-middle transition-all duration-300 flex-1 justify-center ${
                      isActive
                        ? `bg-purple-600 text-white shadow-md transform scale-105 ${
                            tab.id === "courses" ? "rounded-s-2xl rtl:rounded-s-none rtl:rounded-e-2xl" : "rounded-e-2xl rtl:rounded-e-none rtl:rounded-s-2xl"
                          }`
                        : "text-gray-600"
                    } ${
                      isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span className={`absolute top-0 ${isRTL ? 'left-1/2 transform -translate-x-1/2' : 'right-1/2 transform translate-x-1/2'} -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center`}>
                        {tab.badge}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="rounded-full h-12 w-12 border-b-2 border-purple-500"
                ></motion.div>
              </div>
            )}
            {/* Dynamic Tab Content */}
            {!isLoading && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={animationKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="animate-fadeIn"
                >
                  {activeTab === "profile" && (
                    <div className="space-y-8">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6 bg-gray-50 p-6 rounded-xl shadow-sm"
                      >
                        <p className="font-[Montserrat-Arabic] font-light text-[16px] leading-[32.3px] text-right text-[#555555]">
                          {course.description}
                        </p>
                      </motion.div>
                    </div>
                  )}
                  {activeTab === "courses" && (
                    <div className="space-y-6">
                      <TrainerFiles files={course.files} />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Related Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-6"
        >
          <h3 className="font-[Montserrat-Arabic] font-semibold text-[20px] leading-[38px] text-right text-purple-500">
            {t("course.relatedCourses")}
          </h3>
          <CourseSlider isTrue={false} />
        </motion.div>
      </div>
    </div>
  );
};

const TrainerFiles = ({ files }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="py-10 bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="space-y-6">
        {files.map((file) => (
          <motion.div
            key={file.id}
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="flex gap-4 items-center shadow-md rounded-lg px-4 py-3 bg-white border border-gray-100 hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={pdf}
              alt={t("course.pdfAlt")}
              className="w-[80px] h-[80px]"
            />
            <div className="text-right flex-1">
              <h3 className="font-[Montserrat-Arabic] font-medium text-[20px] leading-[20px] text-right mb-3">
                {file.name}
              </h3>
              <p className="font-[Montserrat-Arabic] font-light text-[12px] text-[#000000]">
                {file.created_at || "N/A"}
              </p>
              <p className="text-sm text-green-600 font-[Montserrat-Arabic] font-medium text-[10px] leading-[20px] mt-1">
                {file.size}
              </p>
            </div>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={file.file}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-500/90 hover:bg-purple-600 text-white p-2 rounded-lg transition-colors duration-300"
            >
              {t("course.download")}
            </motion.a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetails;
