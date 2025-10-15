import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function PriceFilter() {
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(25524);
  const [isDragging, setIsDragging] = useState(null);
  const trackRef = useRef(null);

  const { t, i18n } = useTranslation("priceFilter");
  const dir = i18n.dir();

  const MIN_VALUE = 500;
  const MAX_VALUE = 50000;

  // حساب النسبة المئوية للقيمة
  const getPercentage = (value) => {
    return ((value - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * 100;
  };

  // حساب القيمة من النسبة المئوية
  const getValueFromPercentage = (percentage) => {
    return Math.round(MIN_VALUE + (percentage / 100) * (MAX_VALUE - MIN_VALUE));
  };

  // التعامل مع النقر على المسار
  const handleTrackClick = (e) => {
    if (!trackRef.current || isDragging) return;

    const rect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;
    const newValue = getValueFromPercentage(percentage);

    const minDistance = Math.abs(newValue - minPrice);
    const maxDistance = Math.abs(newValue - maxPrice);

    if (minDistance < maxDistance) {
      if (newValue <= maxPrice) {
        setMinPrice(Math.max(MIN_VALUE, newValue));
      }
    } else {
      if (newValue >= minPrice) {
        setMaxPrice(Math.min(MAX_VALUE, newValue));
      }
    }
  };

  // التعامل مع السحب
  const handleMouseDown = (type) => (e) => {
    setIsDragging(type);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (mouseX / rect.width) * 100));
    const newValue = getValueFromPercentage(percentage);

    if (isDragging === "min") {
      const clampedValue = Math.max(MIN_VALUE, Math.min(maxPrice, newValue));
      setMinPrice(clampedValue);
    } else if (isDragging === "max") {
      const clampedValue = Math.min(MAX_VALUE, Math.max(minPrice, newValue));
      setMaxPrice(clampedValue);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, minPrice, maxPrice]);

  const minPercentage = getPercentage(minPrice);
  const maxPercentage = getPercentage(maxPrice);

  return (
    <div
      className="bg-[#4F46E50D] p-8 rounded-lg shadow-sm max-w-md mx-auto"
      dir={dir}
    >
      <h3 className="font-[Alexandria] font-semibold text-[16px] leading-[27.2px] tracking-[-0.68px] text-right align-middle mb-6">
        {t("title")}
      </h3>

      <div className="relative mb-8">
        {/* Track */}
        <div
          ref={trackRef}
          className="h-2 bg-gray-200 rounded-full relative cursor-pointer"
          onClick={handleTrackClick}
        >
          {/* Active range */}
          <div
            className="h-2 bg-purple-500 rounded-full absolute"
            style={{
              left: `${minPercentage}%`,
              width: `${maxPercentage - minPercentage}%`,
            }}
          />
        </div>

        {/* Min thumb */}
        <div
          className="absolute top-[155%] w-5 h-5 bg-purple-500 border-2 border-white rounded-full shadow-lg transform -translate-y-1/2 cursor-pointer z-10 hover:scale-110 transition-transform"
          style={{
            left: `${minPercentage}%`,
            transform: "translateX(-50%) translateY(-50%)",
          }}
          onMouseDown={handleMouseDown("min")}
        />

        {/* Max thumb */}
        <div
          className="absolute top-[155%] w-5 h-5 bg-purple-500 border-2 border-white rounded-full shadow-lg transform -translate-y-1/2 cursor-pointer z-10 hover:scale-110 transition-transform"
          style={{
            left: `${maxPercentage}%`,
            transform: "translateX(-50%) translateY(-50%)",
          }}
          onMouseDown={handleMouseDown("max")}
        />
      </div>

      {/* Price Labels */}
      <div className="flex justify-between items-center text-sm">
        <div className="text-center">
          <div className="font-[Alexandria] font-light text-[12px] leading-[21px] text-[#999999] mb-1">
            {t("minLabel")}
          </div>
          <div>
            <span className="font-[Alexandria] font-medium text-[12px] leading-[21px] text-[#000000]">
              {minPrice.toLocaleString()}
            </span>
            <span className="font-[Alexandria] font-medium text-[12px] leading-[21px] text-[#000000] mr-1">
              {t("currency")}
            </span>
          </div>
        </div>

        <div className="text-center">
          <div className="font-[Alexandria] font-medium text-[12px] leading-[21px] mb-1 text-[#999999]">
            {t("maxLabel")}
          </div>
          <div>
            <span className="font-[Alexandria] font-medium text-[12px] leading-[21px] text-red-500">
              {maxPrice.toLocaleString()}
            </span>
            <span className="font-[Alexandria] font-medium text-[12px] leading-[21px] text-red-500 mr-1">
              {t("currency")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}