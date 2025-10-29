import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
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
  const { id } = useParams();

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

  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [testimonialsError, setTestimonialsError] = useState(null);

  const handleReviewSubmitted = useCallback((newReview) => {
    // If caller provided the created review object, prepend it to the list for instant feedback.
    if (newReview) {
      setTestimonials(prev => [newReview, ...prev]);
    } else {
      setReviewsUpdated(prev => !prev);
    }
  }, []);

  // Fetch testimonials for this product
  useEffect(() => {
    let cancelled = false;
    if (!id) return;
    setTestimonialsLoading(true);
    setTestimonialsError(null);

    axios.get(`/api/products/${id}/reviews`)
      .then((res) => {
        if (cancelled) return;
        // API may return array or { data: [...] }
        const payload = res.data && (Array.isArray(res.data) ? res.data : res.data.data ? res.data.data : res.data);
        setTestimonials(Array.isArray(payload) ? payload : []);
        setTestimonialsLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setTestimonialsError(err?.message || 'Error loading reviews');
        setTestimonialsLoading(false);
      });

    return () => { cancelled = true; };
  }, [id, reviewsUpdated]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className='pt-24'>
        <ProductDetailsSlider productId={id ? id : undefined} />
      </div>

      <div className='pt-4'>
        <ArabicTestimonials testimonials={testimonials} loading={testimonialsLoading} error={testimonialsError} />
      </div>

      <div className='pt-4 pb-8'>
        <CommentForm productId={id} onReviewSubmitted={handleReviewSubmitted} />
      </div>
      <ToastContainer />
    </div>
  );
}

// ---------------------- Testimonials Section ----------------------
function ArabicTestimonials({ testimonials = [], loading = true, error = null }) {
  const { t } = useTranslation();

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
