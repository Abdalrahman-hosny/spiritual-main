import { useEffect, useState, useCallback } from 'react';
import plant from "../../assets/mandala_1265367 1.png";
import { Star } from 'lucide-react';
import ProductDetailsSlider from './ProductDetailsSlider';
import CommentForm from './commentForm';
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Details() {
  const { t } = useTranslation();

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

  const [reviewsUpdated, setReviewsUpdated] = useState(false);

  const handleReviewSubmitted = useCallback(() => {
    setReviewsUpdated(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen">
      <ToastContainer />
      {/* Hero Section */}
      <div className='relative'>
        <div className='image'>
          <div className="relative bg-black/70">
            <div className="relative mt-5 overflow-hidden min-h-[35vh] sm:min-h-[40vh] md:min-h-[45vh] z-10 flex justify-center items-center px-4">
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
                  {t("details.store")}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <p className="font-[Montserrat-Arabic] text-white font-normal text-[24px] text-center">
                    {t("details.breadcrumb_home")} / <span>{t("details.store")}</span> / <span className='text-purple-500'>{t("details.product_details")}</span>
                  </p>
                </motion.div>
              </motion.div>
            </div>
            {/* Plant decoration */}
            <motion.div
              variants={plantVariants}
              initial="hidden"
              animate="visible"
              className="absolute z-40 -bottom-6 sm:-bottom-8 left-0 transform -translate-x-1/4 translate-y-1/4"
            >
              <div className="relative">
                <div className="absolute -top-30 left-2 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-80 xl:h-80 rounded-full">
                  <motion.img
                    src={plant}
                    alt="Plant Decoration"
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
      <div className='pt-24'>
        <ProductDetailsSlider />
      </div>
      <div className='pt-4'>
        <ArabicTestimonials reviewsUpdated={reviewsUpdated} />
      </div>
      <div className='pt-4 pb-8'>
        <CommentForm onReviewSubmitted={handleReviewSubmitted} />
      </div>
    </div>
  );
}

// ---------------------- Testimonials Section ----------------------
function ArabicTestimonials({ reviewsUpdated }) {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('https://spiritual.brmjatech.uk/api/products/1/reviews');
        setTestimonials(response.data.data.result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [reviewsUpdated]);

  const details = [
    t("details.point1"),
    t("details.point2"),
    t("details.point3"),
    t("details.point4"),
    t("details.point5"),
  ];

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <p className="text-lg text-gray-500">جاري تحميل التعليقات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <p className="text-lg text-red-500">حدث خطأ أثناء تحميل التعليقات: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 gap-8">
        {/* Right Column - Details */}
        <div className='border-b pb-6'>
          <div className='flex justify-between items-center'>
            <h3 className="font-semibold text-[24px] mb-4 ">{t("details.about_brand")}</h3>
          </div>
          <p className="text-[14px] text-[#212529]  leading-relaxed">
            {t("details.brand_description")}
          </p>
        </div>
      </div>

      {/* Left Column - Reviews */}
      <div>
        <h2 className="font-semibold text-[24px] mb-6 ">{t("details.reviews")}</h2>
        <div className="space-y-6">
          {testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <div key={testimonial.id} className="rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full ml-3 overflow-hidden">
                      <img
                        src={testimonial.user.image}
                        alt={testimonial.user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[20px] mb-2 ">{testimonial.user.name}</h4>
                      <p className="text-[#212529] text-[14px] ">
                        {testimonial.created_human}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                </div>
                <p className="text-[14px] text-[#212529]  leading-relaxed mb-4">
                  {testimonial.comment}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">{t("details.no_reviews")}</p>
          )}
        </div>
      </div>
    </div>
  );
}
