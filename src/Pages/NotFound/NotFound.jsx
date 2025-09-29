import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center w-[90%] md:w-[40%] rounded-2xl border border-purple-400 bg-white/90 p-8 shadow-xl">
        <h1 className="text-6xl font-bold mb-4 text-purple-700">404</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          عذراً! الصفحة غير موجودة
        </p>
        <Link
          to="/"
          className="p-2 px-6 rounded-md text-white bg-purple-600  hover:from-purple-700 hover:to-red-700 transition-all duration-300"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
