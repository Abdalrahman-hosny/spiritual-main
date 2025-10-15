import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import plant from "../../assets/mandala_1265367 1.png";
import { Eye, Heart, Filter, X, Search } from 'lucide-react';
import { FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export default function Shop() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  // جلب قائمة الرغبات من الـ API
  const fetchWishlist = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.get("https://spiritual.brmjatech.uk/api/wishlist", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const wishlistData = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.data)
          ? response.data.data
          : [];
      setWishlist(wishlistData);
    } catch (error) {
      console.error("Error fetching wishlist:", error.response ? error.response.data : error.message);
      setWishlist([]);
    }
  };

  // إضافة منتج إلى قائمة الرغبات
  const addToWishlist = async (productId) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        toast.error(t("please_login_first"), {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          rtl: true,
        });
        return;
      }
      const response = await axios.post(
        "https://spiritual.brmjatech.uk/api/wishlist",
        { product_id: productId },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.data) {
        toast.success(t("product_added_to_wishlist"), {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          rtl: true,
        });
        fetchWishlist();
      } else {
        console.error("API response not successful:", response.data);
        toast.error(t("failed_to_add_to_wishlist"), {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          rtl: true,
        });
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error.response ? error.response.data : error.message);
      toast.error(t("failed_to_add_to_wishlist"), {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        rtl: true,
      });
    }
  };

  // إزالة منتج من قائمة الرغبات
  const removeFromWishlist = async (productId) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        toast.error(t("please_login_first"), {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          rtl: true,
        });
        return;
      }
      const response = await axios.post(
        "https://spiritual.brmjatech.uk/api/wishlist/remove",
        { product_id: productId },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data && response.data.success) {
        toast.success(t("product_removed_from_wishlist"), {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          rtl: true,
        });
        fetchWishlist();
      } else {
        console.error("API response not successful:", response.data);
        toast.error(t("failed_to_remove_from_wishlist"), {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          rtl: true,
        });
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error.response ? error.response.data : error.message);
      toast.error(t("failed_to_remove_from_wishlist"), {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        rtl: true,
      });
    }
  };

  // تبديل حالة المنتج في قائمة الرغبات
  const toggleWishlist = async (productId) => {
    const isInWishlist = Array.isArray(wishlist) && wishlist.some((item) => item.id === productId);
    if (isInWishlist) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  };

  // إضافة منتج إلى السلة باستخدام API
  const addToCart = async (product) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        toast.error(t("please_login_first"), {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          rtl: true,
        });
        return;
      }

      const response = await axios.post(
        "https://spiritual.brmjatech.uk/api/cart/add",
        {
          product_id: product.id,
          quantity: 1,
        },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.data.items ) {
        toast.success(`${product.name} ${t("product_added_to_cart")}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          rtl: true,
        });
      } else {
        console.error("API response not successful:", response.data);
        toast.error(t("failed_to_add_to_cart"), {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          rtl: true,
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error.response ? error.response.data : error.message);
      toast.error(t("failed_to_add_to_cart"), {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        rtl: true,
      });
    }
  };

  // استرجاع المنتجات من API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://spiritual.brmjatech.uk/api/products");
        const items = response?.data?.data?.result;
        if (Array.isArray(items)) {
          setProducts(items);
        } else {
          console.error("Products not array:", items);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("فشل في جلب المنتجات. حاول مرة أخرى لاحقًا.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    fetchWishlist();
  }, []);

  // فلترة المنتجات بناءً على البحث
  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
        const name = product?.name?.toLowerCase() || "";
        const desc = product?.small_desc?.toLowerCase() || "";
        const query = searchQuery.toLowerCase();
        return name.includes(query) || desc.includes(query);
      })
    : [];

  // Animation variants
  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const plantVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { y: -5, transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.1, color: "#8B5CF6" },
  };

  // إذا كانت البيانات لا تزال تُسترجع
  if (loading) {
    return <div className="text-center py-12">جاري تحميل المنتجات...</div>;
  }

  // إذا حدث خطأ
  if (error) {
    return <div className="text-center py-12 text-red-500">حدث خطأ: {error}</div>;
  }

  // إذا لم توجد منتجات
  if (filteredProducts.length === 0) {
    return <div className="text-center py-12">لا توجد منتجات مطابقة للبحث.</div>;
  }

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gray-50 overflow-hidden">
        {/* Hero Section */}
        <div className='relative'>
          <div className='image'>
            <div className="relative bg-black/70">
              <div className="pt-[80px]"></div>
              <div className="relative overflow-hidden min-h-[35vh] sm:min-h-[40vh] md:min-h-[45vh] z-10 flex justify-center items-center px-4">
                <motion.div
                  variants={heroVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-center p-4 md:p-8 max-w-4xl"
                >
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight"
                  >
                    {t("shop")}
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <p className="font-[Montserrat-Arabic] text-white font-normal text-[24px] leading-[100%] tracking-[0] text-center align-middle [font-variant:small-caps]">
                      {t("home")} / <span className='text-purple-500'>{t("shop")}</span>
                    </p>
                  </motion.div>
                </motion.div>
              </div>
              {/* زخرفة النبات */}
              <motion.div
                variants={plantVariants}
                initial="hidden"
                animate="visible"
                className="absolute z-40 -bottom-6 sm:-bottom-8 left-0 transform -translate-x-1/4 translate-y-1/4 sm:-translate-x-1/3 sm:translate-y-1/3 md:-translate-x-1/5 md:translate-y/1/5 lg:-translate-x-1/3 lg:translate-y-1/3"
              >
                <div className="relative">
                  <div className="absolute -top-12 left-2 w-24 h-24 sm:w-32 sm:h-32 sm:-top-16 sm:left-4 md:w-48 md:h-48 md:-top-24 md:left-6 lg:w-64 lg:h-64 lg:-top-32 lg:left-8 xl:w-80 xl:h-80 xl:-top-36 rounded-full">
                    <motion.img
                      src={plant}
                      alt="Moon Planet"
                      className="max-w-full max-h-full object-contain"
                      animate={{
                        rotate: [0, 3, -3, 0],
                        scale: [1, 1.02, 1]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="container mx-auto p-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Products Grid */}
            <div className="w-full lg:flex-1">
              {/* شريط البحث تحت العنوان */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8 w-full max-w-md mx-auto"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t("search_placeholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-3 px-5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </motion.div>
              {/* Results count */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="mb-6 text-right"
              >
                <p className="text-gray-600 text-sm">
                  {t("show_products", { count: filteredProducts.length })}
                </p>
              </motion.div>
              {/* Products Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
              >
                {filteredProducts.map((product) => {
                  const isInWishlist = Array.isArray(wishlist) && wishlist.some((item) => item.id === product.id);
                  return (
                    <motion.div
                      key={product.id}
                      variants={cardVariants}
                      whileHover="hover"
                      className="rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-purple-200 overflow-hidden bg-white"
                    >
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 sm:h-56 md:h-64 object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-black/40 flex items-end justify-center"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            className="flex justify-center items-center pb-6 gap-3"
                            initial="hidden"
                            whileHover="visible"
                            variants={{
                              hidden: {},
                              visible: {
                                transition: {
                                  staggerChildren: 0.1
                                }
                              }
                            }}
                          >
                            <motion.button
                              variants={buttonVariants}
                              whileHover="hover"
                              onClick={() => addToCart(product)}
                              className="bg-purple-500/90 backdrop-blur-sm hover:bg-white p-2.5 rounded-full text-white hover:text-purple-700 transition-all shadow-lg"
                            >
                              <FaShoppingBag className="w-4 h-4" />
                            </motion.button>
                            <Link to={`/product-details/${product.id}`}>
                              <motion.div
                                variants={buttonVariants}
                                whileHover="hover"
                                className="bg-purple-500/90 backdrop-blur-sm hover:bg-white p-2.5 rounded-full text-white hover:text-purple-700 transition-all shadow-lg"
                              >
                                <Eye className="w-4 h-4" />
                              </motion.div>
                            </Link>
                            <motion.button
                              variants={buttonVariants}
                              whileHover="hover"
                              onClick={() => toggleWishlist(product.id)}
                              className={`backdrop-blur-sm p-2.5 rounded-full transition-all shadow-lg ${
                                isInWishlist
                                  ? "bg-red-500/90 hover:bg-white text-white hover:text-red-500"
                                  : "bg-purple-500/90 hover:bg-white text-white hover:text-purple-700"
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${isInWishlist ? "fill-current" : ""}`} />
                            </motion.button>
                          </motion.div>
                        </motion.div>
                      </div>
                      <motion.div
                        className="p-4 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.h2
                          className="font-[Montserrat-Arabic] mb-1 font-normal text-[14px] leading-relaxed tracking-[0] text-center align-middle line-clamp-2"
                          whileHover={{ color: "#8B5CF6" }}
                          transition={{ duration: 0.2 }}
                        >
                          {product.name}
                        </motion.h2>
                        <p className="font-[Montserrat-Arabic] my-4 font-normal text-[12px] leading-relaxed text-[#0000004D] tracking-[0] text-center align-middle">
                          {product.small_desc}
                        </p>
                        <motion.div
                          className="flex items-center justify-center font-[Montserrat-Arabic] font-medium text-[16px] leading-[100%] tracking-[0] text-center uppercase gap-1"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="text-purple-500">{t("currency")}</span>
                          <span className="text-purple-600">{product.price?.toFixed(2)}</span>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
              {/* Pagination */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-8 flex justify-center"
              >
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-2 rounded-lg bg-purple-600 text-white text-sm"
                  >
                    1
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm hover:bg-gray-50"
                  >
                    2
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm hover:bg-gray-50"
                  >
                    3
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}