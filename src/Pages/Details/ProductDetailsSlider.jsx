import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Plus, Minus, Facebook, Twitter, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from "react-i18next"; // 👈 استدعاء الترجمة
import image from "../../assets/bg.png";
import image2 from "../../assets/register.png";
import hero from "../../assets/hero.png";

export default function ProductDetailsSlider() {
  const { t } = useTranslation(); // 👈 هو اللي هيجيب النصوص من ملف الترجمة

  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  // Sample images
  const images = [
    "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&h=500&fit=crop",
    image2,
    image,
    hero,
  ];

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => setCurrentImage(prev => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage(prev => (prev - 1 + images.length) % images.length);
  const goToImage = (index) => setCurrentImage(index);

  return (
    <div className=" p-4 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto bg-white rounded-lg  overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Product Image Section */}
          <div className="lg:w-1/2 p-6">
            <div className="relative">
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="bg-gray-100 rounded-lg h-[400px] flex items-center justify-center overflow-hidden">
                <img 
                  src={images[currentImage]} 
                  className='w-full h-[400px] object-cover transition-opacity duration-500' 
                  alt={t("product.alt")} 
                />
              </div>

              <div className="flex justify-center mt-4 gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentImage 
                        ? 'bg-purple-600 scale-110' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="lg:w-1/2 p-6 flex flex-col justify-start">
            {/* Rating */}
            <div className="flex items-center mb-4">
              <span className="font-sans text-[12px] text-[#000]">
                {t("product.rating")}
              </span>
              <div className="flex text-yellow-400 mx-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">★</span>
                ))}
              </div>
            </div>

            <h1 className="font-sans font-semibold text-[24px] mb-2 text-[#212529]">
              {t("product.title")}
            </h1>

            {/* Price */}
            <div className="my-6">
              <div className="flex justify-center items-center gap-2 bg-white p-3 rounded-full w-[200px] shadow">
                <p className="font-sans text-purple-600 font-bold text-[20px]">
                  {t("product.price")}
                </p>
              </div>
              <div className='flex justify-between items-center border-b border-gray-200 py-8 my-4'>
                <p className="text-purple-500 font-sans font-bold text-[16px]">
                  {t("product.tax")}
                </p>
                <span className="font-sans text-red-600 font-semibold text-[24px]">
                  {t("product.brand")}
                </span>
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-gray-200 pb-8">
              {/* Quantity Selector */}
              <div className="flex items-center gap-2 rounded-lg">
                <button onClick={increaseQuantity} className="p-2 shadow-md border rounded-full">
                  <Plus className="w-4 h-4 text-green-500" />
                </button>
                <span className="p-2 shadow-md border rounded-full">
                  {quantity}
                </span>
                <button onClick={decreaseQuantity} className="p-2 shadow-md border rounded-full">
                  <Minus className="w-4 h-4 text-red-500" />
                </button>
              </div>

              {/* Add to cart button */}
              <button className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                {t("product.addToCart")}
              </button>

              {/* Social buttons */}
              <div className="flex items-center gap-2">
                <button className="text-gray-600 hover:bg-gray-600 p-2 rounded-full hover:text-white">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="text-gray-600 hover:bg-gray-600 p-2 rounded-full hover:text-white">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="text-gray-600 hover:bg-gray-600 p-2 rounded-full hover:text-white">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="text-gray-600 hover:bg-gray-600 p-2 rounded-full hover:text-white">
                  <Facebook className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
