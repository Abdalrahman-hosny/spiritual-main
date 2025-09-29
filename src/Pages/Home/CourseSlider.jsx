import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai";
import { BiVideo } from "react-icons/bi";
import { LuFile } from "react-icons/lu";
import image1 from "../../assets/bg.png";
import image2 from "../../assets/bg-login.png";
import image3 from "../../assets/hero.png";
import user from "../../assets/user.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // 👈 استدعاء الترجمة

const CourseSlider = ({ isTrue = true }) => {
  const { t } = useTranslation(); // 👈 نستخدم الترجمة
  const isRTL = true;

  const courses = [
    { id: 1, name: t("courses.items.course1.name"), instructor: t("courses.items.course1.instructor"), logo: image1, rating: 5, reviews: 21, price: 1000, files: 4, videos: 2 },
    { id: 2, name: t("courses.items.course2.name"), instructor: t("courses.items.course2.instructor"), logo: image2, rating: 5, reviews: 21, price: 1000, files: 4, videos: 2 },
    { id: 3, name: t("courses.items.course3.name"), instructor: t("courses.items.course3.instructor"), logo: image3, rating: 5, reviews: 21, price: 1000, files: 4, videos: 2 },
    { id: 4, name: t("courses.items.course4.name"), instructor: t("courses.items.course4.instructor"), logo: image2, rating: 5, reviews: 21, price: 1000, files: 4, videos: 2 },
    { id: 5, name: t("courses.items.course5.name"), instructor: t("courses.items.course5.instructor"), logo: image1, rating: 5, reviews: 21, price: 1000, files: 4, videos: 2 },
  ];

  // باقي الأنيميشن نفس ما هو ...

  return (
    <motion.div className="py-10 bg-white">
      {isTrue && (
        <div className="text-center mb-8">
          <motion.h3 className="text-purple-600 font-montserratArabic font-semibold text-[20px] leading-[38px] cursor-default">
            {t("courses.smallTitle")}
          </motion.h3>
          <motion.h2 className="font-montserratArabic font-medium text-[35px] leading-[42px] text-black cursor-default">
            {t("courses.bigTitle")}
          </motion.h2>
        </div>
      )}

      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        loop={true}
        dir={isRTL ? "rtl" : "ltr"}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 1 },
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {courses.map((course, index) => (
          <SwiperSlide key={course.id}>
            <motion.div className="bg-white rounded-xl shadow-md overflow-hidden relative border border-gray-100 h-full">
              <Link to={`/courseDetails/${course.id}`} className="w-full block h-full">
                <motion.div className="absolute top-3 w-[100px] right-3 bg-purple-500 text-white text-sm px-4 py-1 rounded-full z-10">
                  {course.price} {t("courses.currency")}
                </motion.div>

                <motion.div className="flex justify-center items-center bg-gray-100 overflow-hidden">
                  <img src={course.logo} alt="course logo" className="object-cover w-full h-48" />
                </motion.div>

                <div className="p-4">
                  <motion.div className="flex items-center text-yellow-400 text-sm mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <AiFillStar key={i} />
                    ))}
                    <motion.span className="ml-2 text-gray-600 text-sm">
                      ({course.reviews})
                    </motion.span>
                  </motion.div>

                  <motion.h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {course.name}
                  </motion.h3>

                  <motion.div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <motion.div className="flex items-center">
                      <BiVideo className="ml-1 text-purple-500" /> {course.videos} {t("courses.videos")}
                    </motion.div>
                    <motion.div className="flex items-center">
                      <LuFile className="ml-1 text-purple-500" /> {course.files} {t("courses.files")}
                    </motion.div>
                  </motion.div>

                  <motion.div className="flex items-center text-gray-700 text-sm font-medium">
                    <motion.img src={user} className="w-[50px] h-[50px] rounded-full ml-2" alt="" />
                    {course.instructor}
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default CourseSlider;
