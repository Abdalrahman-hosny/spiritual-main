import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode"; // تأكد من تثبيت مكتبة `jwt-decode`

export default function CommentForm({ onReviewSubmitted }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({ name: "", email: "", image: "" });
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // استخراج بيانات المستخدم من token
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserData({
          name: decodedToken.name || "",
          email: decodedToken.email || "",
          image: decodedToken.image || "",
        });
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post(
        "https://spiritual.brmjatech.uk/api/products/1/reviews",
        {
          rating,
          comment,
          name: userData.name,
          email: userData.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 201) {
        setComment("");
        setRating(5);

        toast.success(
          isRTL ? "تم إضافة تعليقك بنجاح!" : "Your review has been added successfully!",
          {
            position: isRTL ? "top-left" : "top-right",
            autoClose: 3000,
          }
        );

        onReviewSubmitted();
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);

      toast.error(
        isRTL ? `حدث خطأ: ${errorMessage}` : `Error: ${errorMessage}`,
        {
          position: isRTL ? "top-left" : "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <h2 className="font-[Montserrat-Arabic] font-semibold text-[24px] leading-[28.8px] text-right align-middle mb-6">
        {t("commentForm.title")}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t("commentForm.comment")}
          rows="4"
          className="w-full border font-[Montserrat-Arabic] font-light text-[16px] p-3 leading-[100%] align-middle text-[#757575] border-gray-300 rounded-md text-right focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        ></textarea>

        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => {
              const starValue = i + 1;
              return (
                <FaStar
                  key={i}
                  size={20}
                  className={`cursor-pointer ${
                    starValue <= rating ? "text-orange-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(starValue)}
                />
              );
            })}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-2 font-[Montserrat-Arabic] font-medium text-[14px] leading-[19.5px] text-center bg-purple-600 text-white rounded-full hover:bg-purple-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t("commentForm.submitting") : t("commentForm.submit")}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-right mt-2">{error}</p>
        )}
      </form>
    </div>
  );
}
