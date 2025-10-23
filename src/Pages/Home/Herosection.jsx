import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import plant from "../../assets/Moon.png";
import "./home.css";

export default function Herosection() {
  const { t, i18n } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="hero relative">
      <div className="to-black p-8 overflow-hidden">
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

        {/* Main content */}
        <div className="pt-[80px]"></div>

        <div className="overflow-hidden min-h-[80vh] z-10 flex justify-center items-center px-4">
          <div
            className={`${
              i18n.language === "ar" ? "text-right" : "text-left"
            } p-4 md:p-8 md:w-[90%] overflow-hidden`}
          >
            <h1
              className={`text-white text-4xl md:text-6xl font-[Montserrat-Arabic] font-bold mb-6 leading-tight transition-all duration-1000 transform ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "0.2s" }}
            >
              <span
                className={`block transition-all duration-800 transform ${
                  isLoaded
                    ? "translate-x-0 opacity-100"
                    : "translate-x-10 opacity-0"
                }`}
                style={{ transitionDelay: "0.4s" }}
              >
                {t("hero.title1")}
              </span>
              <span
                className={`block transition-all duration-800 transform ${
                  isLoaded
                    ? "translate-x-0 opacity-100"
                    : "translate-x-10 opacity-0"
                }`}
                style={{ transitionDelay: "0.6s" }}
              >
                {t("hero.title2")}
              </span>
            </h1>
            <p
              className={`text-gray-300 text-lg md:text-xl font-[Montserrat-Arabic] lg:text-2xl mb-8 leading-relaxed transition-all duration-1000 transform ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "0.8s" }}
            >
              {t("hero.description")}
            </p>
            <div
             
            >
              <button
                onClick={() => navigate("/about-us")}
                className={`bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-500 transform hover:scale-105 hover:bg-purple-700 shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden group ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: "1s" }}
              >
                <div className="absolute inset-0 -top-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform group-hover:animate-[shimmer_0.8s_ease-in-out] pointer-events-none" />
                {t("hero.button")}
              </button>
            </div>
          </div>
        </div>

        {/* Planet */}
        <div
          className={`absolute -bottom-4 left-0 transform -translate-x-1/3 translate-y-1/3 sm:-translate-x-1/4 sm:translate-y-1/4 md:-translate-x-1/5 md:translate-y-1/5 lg:-translate-x-1/3 lg:translate-y-1/3 transition-all duration-1500 ease-out ${
            isLoaded
              ? "translate-x-[-33.333333%] opacity-100"
              : "translate-x-[-50%] opacity-0"
          }`}
          style={{ transitionDelay: "1.2s" }}
        >
          <div className="relative">
            <div className="absolute -top-16 left-4 w-32 h-32 sm:w-40 sm:h-40 sm:-top-20 sm:left-6 md:w-56 md:h-56 md:-top-28 md:left-6 lg:w-72 lg:h-72 lg:-top-36 lg:left-8 xl:w-96 xl:h-96 xl:-top-40 rounded-full bg-purple-500/10 animate-pulse" />
            <div className="absolute z-50 -top-16 left-4 w-32 h-32 sm:w-40 sm:h-40 sm:-top-20 sm:left-6 md:w-56 md:h-56 md:-top-28 md:left-6 lg:w-72 lg:h-72 lg:-top-36 lg:left-8 xl:w-96 xl:h-96 xl:-top-40 rounded-full overflow-hidden animate-[float_6s_ease-in-out_infinite] hover:animate-[float_3s_ease-in-out_infinite] transition-all duration-300 hover:scale-105">
              <img
                src={plant}
                alt="Moon Planet"
                className="w-full h-full object-cover animate-[slowSpin_20s_linear_infinite]"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-transparent to-blue-400/20 rounded-full" />
            </div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-purple-400/60 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationName: "floatParticle",
                animationDuration: `${3 + Math.random() * 4}s`,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* CSS keyframes */}
      <style jsx="true">{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes slowSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
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
        @keyframes floatParticle {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.4;
          }
          33% {
            transform: translateY(-15px) translateX(10px);
            opacity: 0.8;
          }
          66% {
            transform: translateY(-5px) translateX(-5px);
            opacity: 0.6;
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(200%) translateY(200%) rotate(45deg);
          }
        }
      `}</style>
    </div>
  );
}
