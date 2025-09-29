import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function CommentForm() {
  const [rating, setRating] = useState(5);
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* العنوان */}
      <h2 className="font-[Montserrat-Arabic] font-semibold text-[24px] leading-[28.8px] text-right align-middle mb-6">
        {t("commentForm.title")}
      </h2>

      {/* الفورم */}
      <form className="space-y-4">
        {/* الاسم والايميل */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="email"
            placeholder={t("commentForm.email")}
            className="w-full border font-[Montserrat-Arabic] font-light text-[16px] p-3 leading-[100%] align-middle text-[#757575] border-gray-300 rounded-md text-right focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder={t("commentForm.name")}
            className="w-full font-[Montserrat-Arabic] font-light text-[16px] p-3 leading-[100%] align-middle text-[#757575] border border-gray-300 rounded-md text-right focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* التعليق */}
        <textarea
          placeholder={t("commentForm.comment")}
          rows="4"
          className="w-full border font-[Montserrat-Arabic] font-light text-[16px] p-3 leading-[100%] align-middle text-[#757575] border-gray-300 rounded-md text-right focus:outline-none focus:ring-2 focus:ring-purple-500"
        ></textarea>

        {/* التقييم + زر الإرسال */}
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
            className="px-8 py-2 font-[Montserrat-Arabic] font-medium text-[14px] leading-[19.5px] text-center bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
          >
            {t("commentForm.submit")}
          </button>
        </div>
      </form>
    </div>
  );
}
