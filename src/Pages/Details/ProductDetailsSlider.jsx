import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Plus, Minus, Facebook, Twitter, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductDetailsSlider({ productId = 5 }) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://spiritual.brmjatech.uk/api/products/${productId}`);
        setProduct(response.data.data);
        checkIfInWishlist(response.data.data.id);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const checkIfInWishlist = async (productId) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        return;
      }
      const response = await axios.get(
        `https://spiritual.brmjatech.uk/api/wishlist/check?product_id=${productId}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      setInWishlist(response.data.is_in_wishlist);
    } catch (error) {
      console.error("Error checking if product is in wishlist:", error);
    }
  };

  const toggleWishlist = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        toast.error(isRTL ? 'الرجاء تسجيل الدخول أولا' : 'Please login first', {
          position: isRTL ? "top-left" : "top-right"
        });
        return;
      }

      if (inWishlist) {
        await axios.post(
          "https://spiritual.brmjatech.uk/api/wishlist/remove",
          { product_id: product.id },
          {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        toast.success(isRTL ? 'تمت إزالة المنتج من قائمة الرغبات' : 'Product removed from wishlist', {
          position: isRTL ? "top-left" : "top-right"
        });
      } else {
        await axios.post(
          "https://spiritual.brmjatech.uk/api/wishlist",
          { product_id: product.id },
          {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        toast.success(isRTL ? 'تمت إضافة المنتج إلى قائمة الرغبات' : 'Product added to wishlist', {
          position: isRTL ? "top-left" : "top-right"
        });
      }
      setInWishlist(!inWishlist);
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      toast.error(isRTL ? 'حدث خطأ أثناء إضافة المنتج إلى قائمة الرغبات' : 'Error adding product to wishlist', {
        position: isRTL ? "top-left" : "top-right"
      });
    }
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    if (!product || !product.images) return;
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % product.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [product]);

  const nextImage = () => {
    if (!product || !product.images) return;
    setCurrentImage(prev => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    if (!product || !product.images) return;
    setCurrentImage(prev => (prev - 1 + product.images.length) % product.images.length);
  };

  const goToImage = (index) => {
    setCurrentImage(index);
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.images[0].image,
        description: product.description,
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success(
      isRTL ? 'تمت إضافة المنتج للسلة!' : 'Product added to cart!',
      { position: isRTL ? "top-left" : "top-right" }
    );
  };

  if (loading) {
    return <div className="text-center py-12">{isRTL ? 'جاري تحميل تفاصيل المنتج...' : 'Loading product details...'}</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{isRTL ? 'حدث خطأ:' : 'Error:'} {error}</div>;
  }

  if (!product) {
    return <div className="text-center py-12">{isRTL ? 'لا يوجد تفاصيل للمنتج.' : 'No product details available.'}</div>;
  }

  const images = product.images.map(img => img.image);

  return (
    <div className="p-4 font-sans" dir={isRTL ? 'rtl' : 'ltr'}>
      <ToastContainer />
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
                  alt={product.name}
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
            {/* Product Name */}
            <h1 className="font-sans font-semibold text-[24px] leading-[28px] mb-2 text-[#212529] text-right">
              {product.name}
            </h1>
            {/* Price */}
            <div className="my-6">
              <div className="flex justify-center items-center gap-2 bg-white p-3 rounded-full w-[200px] shadow-[0px_0px_8px_3px_#0000000D]">
                <p className="font-sans text-purple-600 font-bold text-[20px] leading-relaxed text-center uppercase">
                  {product.price.toFixed(2)} {isRTL ? 'جنية' : 'EGP'}
                </p>
              </div>
              <div className='flex justify-between items-center border-b border-gray-200 py-8 my-4'>
                <p className="text-purple-500 font-sans font-bold text-[16px] leading-[28px] text-right">
                  {isRTL ? 'الأسعار تشمل ضريبة القيمة المضافة' : 'Prices include VAT'}
                </p>
                <span className="font-sans text-red-600 font-semibold text-[24px] leading-[28.8px] align-middle">
                  {product.brand.name}
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
              <button
                onClick={addToCart}
                className="bg-purple-600 text-white font-sans font-medium text-[14px] leading-[100%] text-right align-middle uppercase px-6 py-3 rounded-full hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
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
                <button
                  onClick={toggleWishlist}
                  className={`p-2 rounded-full transition-colors ${inWishlist ? 'text-red-500' : 'text-gray-600'} hover:bg-gray-100`}
                >
                  <Heart className="w-5 h-5" fill={inWishlist ? 'red' : 'none'} />
                </button>
                <button className="text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors">
                  <Facebook className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* Product Description */}
            <div className="mt-6">
              <h3 className="font-sans font-semibold text-[18px] mb-2 text-right">
                {isRTL ? 'وصف المنتج' : 'Product Description'}
              </h3>
              <p className="font-sans text-[14px] text-[#212529] text-right leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
