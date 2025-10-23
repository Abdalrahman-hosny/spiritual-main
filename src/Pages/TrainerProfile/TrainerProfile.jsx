import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Star,
  MessageCircle,
  BookOpen,
  Package,
  User,
  Clock,
  Users,
  Award,
  CheckCircle,
  ShoppingCart,
  Calendar,
  Heart,
  Eye,
} from "lucide-react";
import plant from "../../assets/mandala_1265367 1.png";
import { AiFillStar } from "react-icons/ai";
import { BiVideo } from "react-icons/bi";
import { LuFile } from "react-icons/lu";
import image1 from "../../assets/bg.png";
import image2 from "../../assets/bg-login.png";
import image3 from "../../assets/hero.png";
import user from "../../assets/user.png";
import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function TrainerProfile() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [trainerData, setTrainerData] = useState(null);
  const [trainerCourses, setTrainerCourses] = useState([]);
  const [trainerProducts, setTrainerProducts] = useState([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // جلب بيانات المدرب
  useEffect(() => {
    const fetchTrainerData = async () => {
      try {
        const response = await axios.get(
          "https://spiritual.brmjatech.uk/api/home/trainers/2"
        );
        if (response.data.code === 200) {
          setTrainerData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching trainer data:", error);
      }
    };

    fetchTrainerData();
  }, []);

  // جلب بيانات الكورسات
  useEffect(() => {
    const fetchTrainerCourses = async () => {
      try {
        const response = await axios.get(
          "https://spiritual.brmjatech.uk/api/home/trainers/1/courses"
        );
        if (response.data.code === 200) {
          setTrainerCourses(response.data.data.result);
        }
      } catch (error) {
        console.error("Error fetching trainer courses:", error);
      }
    };

    fetchTrainerCourses();
  }, []);

  // جلب بيانات المنتجات
  useEffect(() => {
    const fetchTrainerProducts = async () => {
      try {
        const response = await axios.get(
          "https://spiritual.brmjatech.uk/api/home/trainers/1/products"
        );
        if (response.data.code === 200) {
          setTrainerProducts(response.data.data.result);
        }
      } catch (error) {
        console.error("Error fetching trainer products:", error);
      }
    };

    fetchTrainerProducts();
  }, []);

  // Tab configuration
  const tabs = [
    {
      id: "profile",
      label: t("trainerProfile.tabs.profile"),
      icon: User,
      color: "purple",
    },
    {
      id: "courses",
      label: t("trainerProfile.tabs.courses"),
      icon: BookOpen,
      color: "blue",
      badge: trainerCourses.length,
    },
    {
      id: "products",
      label: t("trainerProfile.tabs.products"),
      icon: Package,
      color: "green",
      badge: trainerProducts.length,
    },
  ];

  // Simulate content loading
  const handleTabChange = (tabId) => {
    if (tabId === activeTab) return;

    setIsLoading(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setAnimationKey((prev) => prev + 1);
      setIsLoading(false);
    }, 300);
  };

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
    hidden: { opacity: 0, x: -50, rotate: -90 },
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

  return (
    <div>
      {/* Hero Section */}
      <div className="relative">
        <div className="image">
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
                  {t("trainerProfile.header.title")}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <p className="font-[Montserrat-Arabic] text-white font-normal text-[18px] sm:text-[20px] md:text-[24px] text-center">
                    {t("trainerProfile.header.home")} /
                    <span className=""> {t("trainerProfile.header.cart")}</span>{" "}
                    /
                    <span className="text-purple-500">
                      {" "}
                      {t("trainerProfile.header.profile")}
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
              className="absolute z-40 -bottom-6 sm:-bottom-8 left-0 transform -translate-x-1/4 translate-y-1/4 sm:-translate-x-1/3 sm:translate-y-1/3 md:-translate-x-1/5 md:translate-y-1/5 lg:-translate-x-1/3 lg:translate-y-1/3"
            >
              <div className="relative">
                <div className="absolute -top-12 left-2 w-24 h-24 sm:w-32 sm:h-32 sm:-top-16 sm:left-4 md:w-48 md:h-48 md:-top-24 md:left-6 lg:w-64 lg:h-64 lg:-top-32 lg:left-8 xl:w-80 xl:h-80 xl:-top-36 rounded-full">
                  <motion.img
                    src={plant}
                    alt={t("trainerProfile.plantAlt")}
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
      <div className="md:max-w-6xl mx-auto bg-white px-6 py-24" dir="rtl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0"
          >
            <div className="md:w-[232px] md:h-[232px] w-20 h-20 rounded-full overflow-hidden ring-4 ring-purple-100 relative group">
              <img
                src={
                  trainerData?.image ||
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                }
                alt={t("trainerProfile.trainerAlt")}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-lg">
                  {t("trainerProfile.viewProfile")}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-right"
          >
            <div className="font-[Montserrat-Arabic] text-[#202244] font-light text-[12px] md:text-[16px] leading-relaxed tracking-[0px] flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="">4.2</span>
              <span className="">(215)</span>
            </div>
            <h1 className="font-[Montserrat-Arabic] font-bold text-[14px] md:text-[40px] leading-[1] tracking-[0%]">
              {trainerData?.name || t("trainerProfile.trainerName")}
            </h1>
            <div className="h-[3px] bg-purple-600 my-3 md:my-8"></div>
            <div className="flex items-center gap-2">
              <span className="font-[Montserrat-Arabic] font-normal text-purple-600 text-[14px] md:text-[32px] leading-[1] tracking-[0%]">
                {trainerData?.account_type}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex gap-1 my-8 p-1 md:w-[600px] bg-gray-50 rounded-2xl shadow-sm"
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
                className={`relative flex items-center md:px-4 py-2 font-[Montserrat-Arabic] font-light text-[14px] leading-[32.3px] tracking-[0%] text-center align-middle transition-all duration-300 flex-1 justify-center ${
                  isActive
                    ? `bg-purple-600 text-white shadow-md transform scale-105 ${
                        tab.id === "courses"
                          ? ""
                          : tab.id === "products"
                          ? "rounded-e-2xl"
                          : "rounded-r-2xl"
                      }`
                    : "text-gray-600"
                } ${
                  isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {tab.label}
                {tab.badge && (
                  <span className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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
                  {/* Biography */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6 bg-gray-50 p-6 rounded-xl shadow-sm"
                  >
                    <p className="font-[Montserrat-Arabic] font-light text-[16px] leading-[32.3px] tracking-[0%] text-right text-[#555555]">
                      {t("trainerProfile.bio1")}
                    </p>
                    <p className="font-[Montserrat-Arabic] font-light text-[16px] leading-[32.3px] tracking-[0%] text-right text-[#555555]">
                      {t("trainerProfile.bio2")}
                    </p>
                    <p className="font-[Montserrat-Arabic] font-light text-[16px] leading-[32.3px] tracking-[0%] text-right text-[#555555]">
                      {t("trainerProfile.bio3")}
                    </p>
                  </motion.div>
                </div>
              )}
              {activeTab === "courses" && (
                <div className="space-y-6">
                  <TrainerCourses courses={trainerCourses} />
                </div>
              )}
              {activeTab === "products" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {trainerProducts.map((product, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -5, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100 hover:border-purple-200 overflow-hidden bg-white"
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={product.image || image1}
                            alt={product.name}
                            className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                            <div className="flex justify-center items-center pb-6 gap-3">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="bg-purple-500/90 backdrop-blur-sm hover:bg-white p-2.5 rounded-full text-white hover:text-purple-700 transition-all shadow-lg"
                              >
                                <FaShoppingBag className="w-4 h-4" />
                              </motion.button>
                              <Link
                                to={`/product-details/${product.id}`}
                                className="bg-purple-500/90 backdrop-blur-sm hover:bg-white p-2.5 rounded-full text-white hover:text-purple-700 transition-all shadow-lg"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="bg-purple-500/90 backdrop-blur-sm hover:bg-white p-2.5 rounded-full text-white hover:text-purple-700 transition-all shadow-lg"
                              >
                                <Heart className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 text-center">
                          <h2 className="font-[Montserrat-Arabic] mb-1 font-normal text-[14px] leading-relaxed tracking-[0] text-center align-middle line-clamp-2">
                            {product.name}
                          </h2>
                          <p className="font-[Montserrat-Arabic] my-4 font-normal text-[12px] leading-relaxed text-[#0000004D] tracking-[0] text-center align-middle">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-center font-[Montserrat-Arabic] font-medium text-[16px] leading-[100%] tracking-[0] text-center uppercase gap-1">
                            <span className="text-purple-500">
                              {t("trainerProfile.currency")}
                            </span>
                            <span className="text-purple-600">
                              {product.price}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <style jsx="true">{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

const TrainerCourses = ({ courses }) => {
  const { t } = useTranslation();

  return (
    <div className="py-10 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md overflow-hidden relative border border-gray-100 hover:shadow-lg transition-shadow duration-300"
          >
            <Link to={`/courseDetails/${course.id}`} className="w-full block">
              {/* Price Badge */}
              <div className="absolute top-3 right-3 bg-purple-500 text-white text-sm px-4 py-1 rounded-full">
                {course.price} {t("trainerProfile.currency")}
              </div>
              {/* Course Logo/Image */}
              <div className="flex justify-center items-center bg-gray-100 h-40 overflow-hidden">
                <motion.img
                  src={course.logo || image1}
                  alt={t("trainerProfile.courseLogoAlt")}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  whileHover={{ scale: 1.05 }}
                />
              </div>
              {/* Course Details */}
              <div className="p-4">
                {/* Rating */}
                <div className="flex items-center text-yellow-400 text-sm mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <AiFillStar key={i} />
                  ))}
                  <span className="ml-2 text-gray-600 text-sm">
                    ({course.reviews})
                  </span>
                </div>
                {/* Course Name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {course.name}
                </h3>
                {/* Videos and Files */}
                <div className="flex items-center text-sm text-gray-600 mb-3 space-x-3 rtl:space-x-reverse">
                  <div className="flex items-center">
                    <BiVideo className="ml-1 text-purple-500" /> {course.videos}{" "}
                    {t("trainerProfile.videos")}
                  </div>
                  <div className="flex items-center">
                    <LuFile className="ml-1 text-purple-500" /> {course.files}{" "}
                    {t("trainerProfile.files")}
                  </div>
                </div>
                {/* Instructor */}
                <div className="flex items-center text-gray-700 text-sm font-medium">
                  <img
                    src={user}
                    className="w-[50px] h-[50px] rounded-full"
                    alt={t("trainerProfile.instructorAlt")}
                  />
                  <span className="mr-2">{course.instructor}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
