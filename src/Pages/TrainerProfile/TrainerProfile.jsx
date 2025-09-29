import  { useEffect, useState } from 'react';
import { Star, MessageCircle, BookOpen, Package, User, Clock, Users, Award, CheckCircle, ShoppingCart, Calendar, Heart, Eye } from 'lucide-react';
import Navbar from '../Navbar/Navbar';
import plant from "../../assets/mandala_1265367 1.png";
import { AiFillStar } from "react-icons/ai";
import { BiVideo } from "react-icons/bi";
import { LuFile } from "react-icons/lu";
import image1 from "../../assets/bg.png";
import image2 from "../../assets/bg-login.png";
import image3 from "../../assets/hero.png";
import user from "../../assets/user.png";
import { Link } from "react-router-dom";
import Footer from '../Footer/Footer';
import { FaShoppingBag } from 'react-icons/fa';
import { motion } from "framer-motion"; // 👈 استدعاء Framer Motion
export default function TrainerProfile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
 useEffect(()=>{
       window.scrollTo({
        top: 0,
        behavior: "smooth", // smooth scrolling
      });
  },[])
  // Tab configuration
  const tabs = [
    {
      id: 'profile',
      label: 'نبذة شخصية',
      icon: User,
      color: 'purple'
    },
    {
      id: 'courses',
      label: 'كورسات',
      icon: BookOpen,
      color: 'blue',
      badge: 3
    },
    {
      id: 'products',
      label: 'منتجات خاصة',
      icon: Package,
      color: 'green',
      badge: 6
    }
  ];

  // Simulate content loading
  const handleTabChange = (tabId) => {
    if (tabId === activeTab) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setAnimationKey(prev => prev + 1);
      setIsLoading(false);
    }, 300);
  };

  const heroVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const plantVariants = {
    hidden: { opacity: 0, x: -50, rotate: -90 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };


    const products = new Array(9).fill({
      id: 1,
      name: "مسبحة و 99 خرزة بتصميم منقوش بأسماء الله الحسنى",
      description: "الفاز ومواد لتشكيل الخرز",
      price: "5000.00",
      image: image1,
    });

  return (
    <div>
          <div className='relative'>
                        <div className='image'>
                          <Navbar bg={`bg-black/70`} />
                          {/* <div className="relative bg-black/70">
                            <div className="relative overflow-hidden min-h-[35vh] sm:min-h-[40vh] md:min-h-[45vh] z-10 flex justify-center items-center px-4">
                              <div className="text-center p-4 md:p-8 max-w-4xl">
                                <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                                  تفاصيل المدرب
                                </h1>
                                <div>
                                  
                
                <p className="font-[Montserrat-Arabic] text-white font-normal text-[24px] leading-[100%] tracking-[0] text-center align-middle [font-variant:small-caps]">
                  الرئيسية /   <span className=''>السلة</span> / <span className='text-purple-500'>تفاصيل المدرب</span>
                </p>
                
                
                
                                </div>
                              </div>
                            </div>
                            
                           
                            <div className="absolute z-40 -bottom-6 sm:-bottom-8 left-0 transform -translate-x-1/4 translate-y-1/4 sm:-translate-x-1/3 sm:translate-y-1/3 md:-translate-x-1/5 md:translate-y-1/5 lg:-translate-x-1/3 lg:translate-y-1/3">
                              <div className="relative">
                                <div className="absolute -top-12 left-2 w-24 h-24 sm:w-32 sm:h-32 sm:-top-16 sm:left-4 md:w-48 md:h-48 md:-top-24 md:left-6 lg:w-64 lg:h-64 lg:-top-32 lg:left-8 xl:w-80 xl:h-80 xl:-top-36 rounded-full">
                                  <img src={plant} alt="Moon Planet" className="max-w-full max-h-full object-contain" />
                                </div>
                              </div>
                            </div>
                          </div> */}

                            <div className="relative bg-black/70">
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
                     تفاصيل المدرب
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <p className="font-[Montserrat-Arabic] text-white font-normal text-[24px] leading-[100%] tracking-[0] text-center align-middle [font-variant:small-caps]">
                  الرئيسية /   <span className=''>السلة</span> / <span className='text-purple-500'>تفاصيل المدرب</span>
                  </p>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Plant decoration with animation */}
            <motion.div
              variants={plantVariants}
              initial="hidden"
              animate="visible"
              className="absolute z-40 -bottom-6 sm:-bottom-8 left-0 transform -translate-x-1/4 translate-y-1/4 sm:-translate-x-1/3 sm:translate-y-1/3 md:-translate-x-1/5 md:translate-y-1/5 lg:-translate-x-1/3 lg:translate-y-1/3"
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

    <div className="md:max-w-6xl mx-auto bg-white px-6 py-24" dir="rtl">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="">
            <div className="md:w-[232px] md:h-[232px] w-20 h-20 rounded-full overflow-hidden ring-4 ring-purple-100">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                alt="المدرب أحمد" 
                className="w-full h-full object-cover"
              />
            </div>
          
          </div>
          <div>
             <div className="font-[Montserrat-Arabic] text-[#202244] font-light text-[12px] md:text-[16px] leading-relaxed tracking-[0px] text-right flex items-center gap-2  mb-4">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="">4.2</span>
            <span className="">(215 )</span>
          </div>
            <h1 className="font-[Montserrat-Arabic] font-bold text-[14px] md:text-[40px] leading-[1] tracking-[0%] text-right align-middle">اسم المدرب   </h1>
            <div className='h-[3px] bg-purple-600 my-3 md:my-8'></div>
            <div className="flex items-center gap-2">
              <span className="font-[Montserrat-Arabic] font-normal text-purple-600 text-[14px] md:text-[32px] leading-[1] tracking-[0%] text-right align-middle">روحانيات</span>

            </div>
          </div>
        </div>
     
      </div>

      {/* Dynamic Tab Navigation */}
      <div className="flex gap- my-8 p-1 md:w-[600px] bg-gray-50 rounded-2xl  ">
        {tabs.map((tab) => {
          
          const isActive = activeTab === tab.id;
          
          return (
            <button 
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              disabled={isLoading}
              className={`relative flex items-center  md:px-4 py-2  font-[Montserrat-Arabic] font-light text-[14px] leading-[32.3px] tracking-[0%] text-center align-middle transition-all duration-300 flex-1 justify-center ${
                isActive 
                  ?  `bg-purple-600 text-white shadow-md  transform scale-105 ${tab.id =="courses" ? "" :tab.id =="products"? "rounded-e-2xl" : "rounded-r-2xl"}`
                  : 'text-gray-600 '
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span>{tab.label}</span>
            
            
            </button>
          );
        })}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      )}

      {/* Dynamic Tab Content */}
      {!isLoading && (
        <div key={animationKey} className="animate-fadeIn">
          {activeTab === 'profile' && (
            <div className="space-y-8">
              {/* Biography */}
              <div  className="space-y-6 ">
                <p className="font-[Montserrat-Arabic] font-light text-[16px] leading-[32.3px] tracking-[0%] text-right text-[#555555]"
>
                  المدرب أحمد الروحاني، هو مدرب ومستشار في مجال الحالة والروحية أدرك في وقت مبكر من سنوات في مساعدة الأفراد على تحسين نوعياتهم
                  والوصول إلى مستويات أعمق من السلام الداخلي.
                </p>

                <p className="font-[Montserrat-Arabic] font-light text-[16px] leading-[32.3px] tracking-[0%] text-right text-[#555555]"
>
                  بدأ رحلته بالبحث في علوم الروحانية والتأمل، قد حصل على دبلومات متخصصة في تقنيات التنفس الواعي، التأمل الذهني (Mindfulness) وإدارة الطاقة الداخلية.
                  خلال مسيرته هذه، العديد من الدورات ودورات التدريب التي جعلته خبيراً في مساعدة الأشخاص على التخلص من الضغط والتوتر ولتحقيق
                  التوازن الذهني والنفسي بين الحياة الشخصية والمهنية.
                </p>

                <p className="font-[Montserrat-Arabic] font-light text-[16px] leading-[32.3px] tracking-[0%] text-right text-[#555555]"
>
                  يؤمن أحمد بأن الروح الإنسانية تحتاج طاقة علاجية مدى، وتتطلبها الكثير الرضا وتفعيل قدرة الذات الداخلي.
                </p>
              </div>
              
           
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="space-y-6">
             
              
              <TrainerCourses/>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {products.map((product, idx) => (
                <div key={idx} className=" rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100 hover:border-purple-200 overflow-hidden">
                  <div className="relative overflow-hidden">
                   
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    
                   
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                      <div className="flex justify-center items-center pb-6 gap-3">
                        <button className="bg-purple-500/90 backdrop-blur-sm hover:bg-white p-2.5 rounded-full text-white hover:text-purple-700 transition-all shadow-lg transform hover:scale-110">
                          <FaShoppingBag className="w-4 h-4" />
                        </button>
                        <Link to={`/product-details/1`} className="bg-purple-500/90 backdrop-blur-sm hover:bg-white p-2.5 rounded-full text-white hover:text-purple-700 transition-all shadow-lg transform hover:scale-110">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button className="bg-purple-500/90 backdrop-blur-sm hover:bg-white p-2.5 rounded-full text-white hover:text-purple-700 transition-all shadow-lg transform hover:scale-110">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 text-center ">
                    <h2 className="font-[Montserrat-Arabic] mb-1 font-normal text-[14px] leading-relaxed tracking-[0] text-center align-middle line-clamp-2">
                      {product.name}
                    </h2>
                    <p className="font-[Montserrat-Arabic] my-4 font-normal text-[12px] leading-relaxed text-[#0000004D] tracking-[0] text-center align-middle">
                      {product.description}
                    </p>
                    <div className="flex items-center  justify-center font-[Montserrat-Arabic] font-medium text-[16px] leading-[100%] tracking-[0] text-center uppercase gap-1">
                      <span className="text-purple-500 ">ج.م</span>
                      <span className="text-purple-600 ">{product.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </div>
          )}
        </div>
      )}

      {/* Contact Button */}
    

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
    <Footer/>
    </div>
  );
}





const TrainerCourses = () => {
  const courses = [
    { id: 1, name: "اسم الكورس", instructor: "احمد ابراهيم", logo: image1, rating: 5, reviews: 21, price: 1000, files: 4, videos: 2 },
    { id: 2, name: "اسم الكورس", instructor: "محمود جلال", logo: image2, rating: 5, reviews: 21, price: 1000, files: 4, videos: 2 },
    { id: 3, name: "اسم الكورس", instructor: "شافعي", logo: image3, rating: 5, reviews: 21, price: 1000, files: 4, videos: 2 },
    { id: 4, name: "اسم الكورس", instructor: "ابراهيم مصطفي", logo: image2, rating: 5, reviews: 21, price: 1000, files: 4, videos: 2 },
    { id: 5, name: "اسم الكورس", instructor: "ضياء علي", logo: image1, rating: 5, reviews: 21, price: 1000, files: 4, videos: 2 },
  ];

  return (
    <div className="py-10 bg-white">
  
       

      {/* ✅ Static Grid instead of Swiper */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-md overflow-hidden relative border border-gray-100"
          >
            <Link to={"/courseDetails/1"} className="w-full">
              {/* Badge السعر */}
              <div className="absolute top-3 w-[100px] right-3 bg-purple-500 text-white text-sm px-4 py-1 rounded-full">
                {course.price} جنيه
              </div>

              {/* صورة أو لوجو */}
              <div className="flex justify-center items-center bg-gray-100 ">
                <img src={course.logo} alt="course logo" className="object-cover" />
              </div>

              {/* التفاصيل */}
              <div className="p-4">
                {/* التقييم */}
                <div className="flex items-center text-yellow-400 text-sm mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <AiFillStar key={i} />
                  ))}
                  <span className="ml-2 text-gray-600 text-sm">({course.reviews})</span>
                </div>

                {/* اسم الكورس */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.name}</h3>

                {/* عدد الفيديوهات والملفات */}
                <div className="flex items-center لشح-8 text-sm text-gray-600 mb-3 space-x-3 rtl:space-x-reverse">
                  <div className="flex items-center">
                    <BiVideo className="ml-1 text-purple-500" /> {course.videos} فيديو شرح
                  </div>
                  <div className="flex items-center">
                    <LuFile className="ml-1 text-purple-500" /> {course.files} ملفات
                  </div>
                </div>

                {/* اسم المعالج */}
                <div className="flex items-center text-gray-700 text-sm font-medium">
                  <img src={user} className="w-[50px] h-[50px] rounded-full" alt="" /> {course.instructor}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};


