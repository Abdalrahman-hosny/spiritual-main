import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";


export default function OTPPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // التركيز تلقائيًا على الحقل التالي
  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }

      // التحقق إذا تم إدخال جميع الأرقام
      if (newOtp.every((digit) => digit !== "")) {
        const otpCode = newOtp.join("");
        console.log("Verification OTP Code:", otpCode);
      }
    }
  };

  // التركيز على الحقل السابق عند الحذف
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    setIsLoaded(true);
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <div className="hero relative min-h-screen overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 1}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationName: "shootingStar",
              animationDuration: "3s",
              animationTimingFunction: "linear",
              animationDelay: `${i * 2}s`,
              animationIterationCount: "infinite",
            }}
          />
        ))}
      </div>

      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1
          className="text-white/10 font-bold text-[60px] sm:text-[80px] md:text-[120px] lg:text-[150px] xl:text-[200px] text-center"
          style={{ textShadow: "0 2px 10px rgba(255, 255, 255, 0.1)" }}
        >
          VERIFY OTP
        </h1>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* OTP Content */}
      <div className="relative z-50 flex flex-col items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-purple-500/30 shadow-lg"
        >
          <h2 className="text-white text-2xl font-bold text-center mb-6">
            Enter Verification Code
          </h2>

          <div className="flex justify-center gap-4 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-white text-xl font-bold bg-transparent border-b-2 border-purple-400 focus:border-purple-600 focus:outline-none"
              />
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors"
          >
            Verify
          </motion.button>
        </motion.div>
      </div>

      {/* CSS keyframes */}
      <style jsx>{`
        @keyframes shootingStar {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(200px) translateY(100px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
