import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Plus, Minus, Facebook, Twitter, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';
import image from "../../assets/bg.png";
import image2 from "../../assets/register.png";
import hero from "../../assets/hero.png";
import { useTranslation } from "react-i18next";

export default function ProductDetailsSlider() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  // Sample images - replace with your actual images
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
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImage(prev => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage(prev => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImage(index);
  };

  return (
    <div className="p-4 font-sans" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto bg-white rounded-lg overflow-hidden">
        <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-col lg:flex-row'}`}>
          {/* Product Image Section */}
          <div className="lg:w-1/2 p-6">
            <div className="relative">
              {/* Navigation arrows */}
              <button
                onClick={prevImage}
                className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow`}
              >
                {isRTL ? <ChevronRight className="w-5 h-5 text-gray-600" /> : <ChevronLeft className="w-5 h-5 text-gray-600" />}
              </button>
              <button
                onClick={nextImage}
                className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow`}
              >
                {isRTL ? <ChevronLeft className="w-5 h-5 text-gray-600" /> : <ChevronRight className="w-5 h-5 text-gray-600" />}
              </button>

              {/* Main product image */}
              <div className="bg-gray-100 rounded-lg h-[400px] flex items-center justify-center overflow-hidden">
                <img
                  src={images[currentImage]}
                  className='w-full h-[400px] object-cover transition-opacity duration-500'
                  alt="Product image"
                />
              </div>

              {/* Image indicators */}
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
              <span className="font-sans font-normal text-[12px] leading-[19.5px] text-[#000000]">
                {isRTL ? '(تقييمان من العملاء)' : '(Customer Reviews)'}
              </span>
              <div className={`flex text-yellow-400 ${isRTL ? 'order-first mx-2' : 'mx-2'}`}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">★</span>
                ))}
              </div>
            </div>

            <h1 className="font-sans font-semibold text-[24px] leading-[28px] mb-2 text-[#212529] text-right">
              {isRTL ? 'مسبحة بـ 99 خرزة بتصميم منقوش باسماء الله الحسنى وسيدنا محمد ص اسلامية' : 'Islamic Prayer Beads with 99 Beads'}
            </h1>

            {/* Price */}
            <div className="my-6">
              <div className="flex justify-center items-center gap-2 bg-white p-3 rounded-full w-[200px] shadow-[0px_0px_8px_3px_#0000000D]">
                <p className="font-sans text-purple-600 font-bold text-[20px] leading-relaxed text-center uppercase">
                  5,000.00 {isRTL ? 'جنية' : 'EGP'}
                </p>
              </div>
              <div className='flex justify-between items-center border-b border-gray-200 py-8 my-4'>
                <p className="text-purple-500 font-sans font-bold text-[16px] leading-[28px] text-right">
                  {isRTL ? 'الأسعار تشمل ضريبة القيمة المضافة' : 'Prices include VAT'}
                </p>
                <span className="font-sans text-red-600 font-semibold text-[24px] leading-[28.8px] align-middle">
                  فيزدل
                </span>
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-col md:flex-row'} justify-between items-center gap-8 md:gap-4 border-b border-gray-200 pb-8`}>
              {/* Quantity Selector */}
              <div className="flex items-center gap-2 rounded-lg">
                <button
                  onClick={increaseQuantity}
                  className="p-2 hover:bg-gray-100 flex justify-center items-center shadow-md border border-gray-200 transition-colors w-[40px] h-[40px] rounded-full"
                >
                  <Plus className="w-4 h-4 text-green-500" />
                </button>
                <span className="p-2 hover:bg-gray-100 flex justify-center items-center shadow-md border border-gray-200 transition-colors w-[40px] h-[40px] rounded-full">
                  {quantity}
                </span>
                <button
                  onClick={decreaseQuantity}
                  className="p-2 hover:bg-gray-100 flex justify-center items-center shadow-md border border-gray-200 transition-colors w-[40px] h-[40px] rounded-full"
                >
                  <Minus className="w-4 h-4 text-red-500" />
                </button>
              </div>

              {/* Add to cart button */}
              <button className="bg-purple-600 text-white font-sans font-medium text-[14px] leading-[100%] text-right align-middle uppercase px-6 py-3 rounded-full hover:bg-purple-700 transition-colors flex items-center gap-2">
                {isRTL ? (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    إضافة إلى السلة
                  </>
                ) : (
                  <>
                    Add to Cart
                    <ShoppingCart className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Social buttons */}
              <div className="flex items-center gap-2">
                <button className="text-gray-600 hover:bg-gray-600 p-2 rounded-full hover:text-white transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="text-gray-600 hover:bg-gray-600 p-2 rounded-full hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="text-gray-600 hover:bg-gray-600 p-2 rounded-full hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="text-gray-600 hover:bg-gray-600 p-2 rounded-full hover:text-white transition-colors">
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
