import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai";
import { BiVideo } from "react-icons/bi";
import { LuFile } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

const CourseSlider = ({ isTrue = true }) => {
  const { t } = useTranslation();
  const isRTL = true;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // تأثيرات حركية للكارت
  const cardVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.2,
      },
    },
  };

  // تأثيرات حركية للنجوم
  const starVariants = {
    initial: { scale: 1, color: "#fbbf24" },
    hover: {
      scale: 1.2,
      color: "#8B5CF6",
      transition: {
        duration: 0.2,
        yoyo: Infinity,
      },
    },
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("https://spiritual.brmjatech.uk/api/courses");
        if (response.data.code === 200) {
          const formattedCourses = response.data.data.result.map((course) => ({
            id: course.id,
            name: course.title,
            instructor: course.trainer.name,
            logo: course.image,
            rating: course.rating_avg,
            reviews: course.reviews_count,
            price: course.price,
            files: course.files_count,
            videos: course.lectures_count,
            trainerImage: course.trainer.image,
          }));
          setCourses(formattedCourses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full"
        ></motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-10 bg-gradient-to-b from-gray-50 to-white"
    >
      {isTrue && (
        <div className="text-center mb-12 px-4">
          <motion.h3
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-purple-600 font-montserratArabic font-semibold text-[20px] leading-[38px] cursor-default"
          >
            {t("courses.smallTitle")}
          </motion.h3>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-montserratArabic font-bold text-[35px] leading-[42px] text-gray-900 cursor-default"
          >
            {t("courses.bigTitle")}
          </motion.h2>
        </div>
      )}
      <div className="relative px-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={25}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="!pb-12"
        >
          {courses.map((course) => (
            <SwiperSlide key={course.id} className="h-auto">
              <motion.div
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                className="bg-white rounded-xl overflow-hidden border border-gray-100 h-full flex flex-col shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <Link to={`/courseDetails/${course.id}`} className="block h-full">
                  <div className="relative">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="absolute top-3 right-3 bg-purple-600 text-white text-sm px-4 py-1 rounded-full z-10 font-medium"
                    >
                      {course.price} {t("courses.currency")}
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      className="flex justify-center items-center bg-gray-100 overflow-hidden h-48"
                    >
                      <img
                        src={course.logo}
                        alt={course.name}
                        className="object-cover w-full h-full"
                      />
                    </motion.div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center text-yellow-400 text-sm mb-3"
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.span
                          key={i}
                          variants={starVariants}
                          initial="initial"
                          whileHover="hover"
                        >
                          <AiFillStar className="mx-px" />
                        </motion.span>
                      ))}
                      <motion.span
                        className={`text-gray-600 text-sm ${isRTL ? "mr-2" : "ml-2"}`}
                        whileHover={{ color: "#8B5CF6" }}
                      >
                        ({course.reviews})
                      </motion.span>
                    </motion.div>
                    <motion.h3
                      whileHover={{ x: isRTL ? -5 : 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-xl font-bold text-gray-900 mb-3 line-clamp-2"
                    >
                      {course.name}
                    </motion.h3>
                    <motion.div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center"
                      >
                        <BiVideo className={`text-purple-600 ${isRTL ? "mr-1" : "ml-1"}`} />
                        {course.videos} {t("courses.videos")}
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center"
                      >
                        <LuFile className={`text-purple-600 ${isRTL ? "mr-1" : "ml-1"}`} />
                        {course.files} {t("courses.files")}
                      </motion.div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center mt-auto pt-3 border-t border-gray-100"
                    >
                      {course.trainerImage ? (
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          src={course.trainerImage}
                          className="w-10 h-10 rounded-full object-cover"
                          alt={course.instructor}
                        />
                      ) : (
                        <FaUserCircle className="w-10 h-10 text-gray-400" />
                      )}
                      <motion.span
                        whileHover={{ color: "#8B5CF6" }}
                        className={`text-gray-700 text-sm font-medium ${isRTL ? "mr-2" : "ml-2"}`}
                      >
                        {course.instructor}
                      </motion.span>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.div>
  );
};

export default CourseSlider;
