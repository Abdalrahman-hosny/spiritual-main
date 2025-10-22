import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Herosection from './Herosection';
import Features from './Features';
import CourseSlider from './CourseSlider';
import HowWork from './HowWork';
import axios from 'axios';

const VideoSection = ({ videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  const handlePlay = () => {
    setIsPlaying(true);
    setShowOverlay(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex justify-center items-center w-full px-4 py-16 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="relative w-[95%] max-w-[1200px] h-[500px] md:h-[600px] rounded-[30px] overflow-hidden shadow-2xl">
        {/* Overlay قبل تشغيل الفيديو */}
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-purple-900 to-indigo-900 flex flex-col justify-center items-center text-white p-8 z-20"
          >
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-center mb-4"
            >
              شاهد فيديوهاتنا الترويجية
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center text-lg md:text-xl mb-8 max-w-lg"
            >
              اكتشف كيف يمكن لمنتجاتنا وخدماتنا أن تغير حياتك نحو الأفضل
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlay}
              className="bg-white text-purple-900 font-bold py-3 px-8 rounded-full flex items-center gap-3 shadow-lg hover:shadow-xl transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              تشغيل الفيديو
            </motion.button>
          </motion.div>
        )}

        {/* الفيديو نفسه */}
        <iframe
          className="w-full h-full"
          src={videoUrl || "https://www.youtube.com/embed/jK75iRv33mI?si=2TR3A2QE7CL4WBCB&autoplay=1&mute=1"}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ display: isPlaying ? 'block' : 'none' }}
        ></iframe>

        {/* زر تشغيل في المنتصف إذا كان الفيديو متوقف */}
        {!isPlaying && !showOverlay && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:bg-gray-100 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // استدعاء الـ API لاسترجاع رابط الفيديو
    const fetchSettings = async () => {
      try {
        const response = await axios.get('https://spiritual.brmjatech.uk/api/settings');
        if (response.data.code === 200 && response.data.data.length > 0) {
          const promotionUrl = response.data.data[0].promotion;

          // تحويل رابط اليوتيوب إلى رابط embed إذا كان رابطًا مباشرًا
          let embedUrl = promotionUrl;
          if (promotionUrl && promotionUrl.includes("youtu.be")) {
            const videoId = promotionUrl.split("youtu.be/")[1];
            embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
          } else if (promotionUrl && promotionUrl.includes("youtube.com/watch")) {
            const videoId = promotionUrl.split("v=")[1].split("&")[0];
            embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
          } else if (promotionUrl && promotionUrl.includes("youtube.com/embed")) {
            embedUrl = `${promotionUrl}?autoplay=1&mute=1`;
          }

          setVideoUrl(embedUrl);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden relative">
      <Herosection />
      <Features />
      <CourseSlider />
      <VideoSection videoUrl={videoUrl} />
      <HowWork />

      {/* زر Scroll to Top */}
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-purple-600 text-white rounded-full flex justify-center items-center shadow-lg hover:bg-purple-700 hover:scale-110 transition-all"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}
    </div>
  );
}
