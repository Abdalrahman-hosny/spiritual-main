import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Navbar/Navbar';
import Herosection from './Herosection';
import Features from './Features';
import CourseSlider from './CourseSlider';
import HowWork from './HowWork';
import Footer from '../Footer/Footer';

const VideoSection = () => {
  return (
    <div className="flex justify-center items-center w-full px-4 py-10">
      <div className="w-[1241px] max-w-full h-[600px]">
        <iframe
          className="w-full h-full rounded-[30px]"
          src="https://www.youtube.com/embed/jK75iRv33mI?si=2TR3A2QE7CL4WBCB"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

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
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden relative">
      <Navbar bg={`hero bg-black/90`} />
      <Herosection />
      <Features />
      <CourseSlider />
      <VideoSection />
      <HowWork />
      <Footer />

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
