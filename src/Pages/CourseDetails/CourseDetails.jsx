import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import preview from "../../assets/hero.png"; // صورة الفيديو
import plant from "../../assets/mandala_1265367 1.png";
import Navbar from '../Navbar/Navbar';
import { CiFileOn, CiPlay1 } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import { GrFacebookOption } from "react-icons/gr";

import pdf from "../../assets/extentions/pdf-svgrepo-com.svg";
import { motion } from "framer-motion"; // 👈 استدعاء Framer Motion

import CourseSlider from "../Home/CourseSlider";
import Footer from "../Footer/Footer";
const CourseDetails = () => {
 const [activeTab, setActiveTab] = useState('profile');
   const [isLoading, setIsLoading] = useState(false);
     const [animationKey, setAnimationKey] = useState(0);
     const [isOpen, setIsOpen] = useState(false);
   const handleTabChange = (tabId) => {
    if (tabId === activeTab) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setAnimationKey(prev => prev + 1);
      setIsLoading(false);
    }, 300);
  };
     const tabs = [
    {
      id: 'profile',
      label: 'نبذة عن الكورس',
      color: 'purple'
    },
    {
      id: 'courses',
      label: 'الملفات',
      color: 'blue',
      badge: 3
    }
  ];

   useEffect(()=>{
         window.scrollTo({
          top: 0,
          behavior: "smooth", // smooth scrolling
        });
    },[])

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
  return (<div>

   <div className='relative'>
                <div className='image'>
                  <Navbar bg={`bg-black/70`} />
                  {/* <div className="relative bg-black/70">
                    <div className="relative overflow-hidden min-h-[35vh] sm:min-h-[40vh] md:min-h-[45vh] z-10 flex justify-center items-center px-4">
                      <div className="text-center p-4 md:p-8 max-w-4xl">
                        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                          الكورس
                        </h1>
                        <div>
                          
        
        <p className="font-[Montserrat-Arabic] text-white font-normal text-[24px] leading-[100%] tracking-[0] text-center align-middle [font-variant:small-caps]">
          الرئيسية /   <span className=''>الكورسات</span> /  <span className='text-purple-500'>تفاصيل الكورس</span>
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
                  الكورس
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <p className="font-[Montserrat-Arabic] text-white font-normal text-[24px] leading-[100%] tracking-[0] text-center align-middle [font-variant:small-caps]">
                      الرئيسية /   <span className=''>الكورسات</span> /  <span className='text-purple-500'>تفاصيل الكورس</span>
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
    <div className="pt-24 bg-white">
      <div className="w-full md:w-[80%]  mx-auto  grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        
        {/* ✅ الكارت على اليسار */}
        <div className="hidden  bg-white shadow-md rounded-md p-6 border border-gray-100 md:flex flex-col justify-between">
          <div>
            <h3 className="font-montserratArabic text-right font-semibold text-[18px] text-gray-800 mb-4">
              : الكورس تشمل 
            </h3>
            
            {/* عدد المحاضرات */}
            <div className="flex items-center justify-between border-b border-gray-200 py-4 text-gray-600">
              <span className="font-[Montserrat-Arabic] text-[#222222]  font-semibold text-[14px] leading-[32.3px] tracking-[0%] align-middle">الاحد 10:00 صباحا</span>
              <span className=" flex  items-center gap-1 font-[Montserrat-Arabic] font-light text-[16px] leading-[32.3px] tracking-[0%] text-right align-middle"
>المعاد  <IoMdTime className="text-purple-500 font-bold text-md" /></span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-200 py-4 text-gray-600">
              <span className="font-[Montserrat-Arabic] text-[#222222]  font-semibold text-[14px] leading-[32.3px] tracking-[0%] align-middle"> 10 </span>
              <span className="flex  items-center gap-1 font-[Montserrat-Arabic] font-light text-[16px] leading-[32.3px] tracking-[0%] text-right align-middle"
>الملفات  <CiFileOn className="text-purple-500 font-bold text-md" /></span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-200 py-4 text-gray-600">
              <span className="font-[Montserrat-Arabic] text-[#222222]  font-semibold text-[14px] leading-[32.3px] tracking-[0%] align-middle"> 1 Hours </span>
              <span className="flex  items-center gap-1 font-[Montserrat-Arabic] font-light text-[16px] leading-[32.3px] tracking-[0%] text-right align-middle"
>مدة اللايف  <CiPlay1 className="text-purple-500 font-bold text-md" /></span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-200 py-4 text-gray-600">
              <span className="font-[Montserrat-Arabic] text-[#222222]  font-semibold text-[14px] leading-[32.3px] tracking-[0%] align-middle">     4 </span>
              <span className="flex  items-center gap-1 font-[Montserrat-Arabic] font-light text-[16px] leading-[32.3px] tracking-[0%] text-right align-middle"
> عدد المحاضرات  <CiPlay1 className="text-purple-500 font-bold text-md" /></span>
            </div>
       
          </div>

          {/* السعر وزر الاشتراك */}
          <div className="mt-6">
            <p dir="rtl"  className="mb-3 font-[Montserrat-Arabic] font-semibold text-[20px] leading-[38px] tracking-[0%] text-center align-middle"
>
               500 جنيه مصري  
            </p>
            <div className="flex justify-center items-center">
            <button className="w-[60%]   bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-full transition">
              اشتراك
            </button>

            </div>
          </div>

          {/* سوشيال ميديا */}
          <div className="mt-6 flex justify-center items-center space-x-2 rtl:space-x-reverse text-gray-600">
            <div className="flex items-center gap-1" >

            <a href="#"><GrFacebookOption  className="text-blue-950" /></a>
            <a href="#"><FaLinkedinIn className="text-blue-950" /></a>
            <a href="#"><FaYoutube className="text-red-600" /></a>

            </div>
            <p className="text-[#000000] font-[Montserrat-Arabic] font-semibold text-[14px] leading-[32.3px] tracking-[0] text-center align-middle" dir="rtl">مشاركة :  </p>
          </div>
        </div>


        <div className="md:hidden  shadow-md rounded-md border col-span-3 border-gray-100">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center px-4 py-3 font-[Montserrat-Arabic] text-[16px] font-semibold text-gray-800"
        >
          تفاصيل الكورس
          <span className="text-purple-600">{isOpen ? "▲" : "▼"}</span>
        </button>

        {isOpen && (
          <div className="p-4 border-t border-gray-200">
                <div>
            <h3 className="font-montserratArabic text-right font-semibold text-[18px] text-gray-800 mb-4">
              : الكورس تشمل 
            </h3>
            
            {/* عدد المحاضرات */}
            <div className="flex items-center justify-between border-b border-gray-200 py-4 text-gray-600">
              <span className="font-[Montserrat-Arabic] text-[#222222]  font-semibold text-[14px] leading-[32.3px] tracking-[0%] align-middle">الاحد 10:00 صباحا</span>
              <span className=" flex  items-center gap-1 font-[Montserrat-Arabic] font-light text-[16px] leading-[32.3px] tracking-[0%] text-right align-middle"
>المعاد  <IoMdTime className="text-purple-500 font-bold text-md" /></span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-200 py-4 text-gray-600">
              <span className="font-[Montserrat-Arabic] text-[#222222]  font-semibold text-[14px] leading-[32.3px] tracking-[0%] align-middle"> 10 </span>
              <span className="flex  items-center gap-1 font-[Montserrat-Arabic] font-light text-[16px] leading-[32.3px] tracking-[0%] text-right align-middle"
>الملفات  <CiFileOn className="text-purple-500 font-bold text-md" /></span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-200 py-4 text-gray-600">
              <span className="font-[Montserrat-Arabic] text-[#222222]  font-semibold text-[14px] leading-[32.3px] tracking-[0%] align-middle"> 1 Hours </span>
              <span className="flex  items-center gap-1 font-[Montserrat-Arabic] font-light text-[16px] leading-[32.3px] tracking-[0%] text-right align-middle"
>مدة اللايف  <CiPlay1 className="text-purple-500 font-bold text-md" /></span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-200 py-4 text-gray-600">
              <span className="font-[Montserrat-Arabic] text-[#222222]  font-semibold text-[14px] leading-[32.3px] tracking-[0%] align-middle">     4 </span>
              <span className="flex  items-center gap-1 font-[Montserrat-Arabic] font-light text-[16px] leading-[32.3px] tracking-[0%] text-right align-middle"
> عدد المحاضرات  <CiPlay1 className="text-purple-500 font-bold text-md" /></span>
            </div>
       
          </div>

          {/* السعر وزر الاشتراك */}
          <div className="mt-6">
            <p dir="rtl"  className="mb-3 font-[Montserrat-Arabic] font-semibold text-[20px] leading-[38px] tracking-[0%] text-center align-middle"
>
               500 جنيه مصري  
            </p>
            <div className="flex justify-center items-center">
            <button className="w-[60%]   bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-full transition">
              اشتراك
            </button>

            </div>
          </div>

          {/* سوشيال ميديا */}
          <div className="mt-6 flex justify-center items-center space-x-2 rtl:space-x-reverse text-gray-600">
            <div className="flex items-center gap-1" >

            <a href="#"><GrFacebookOption  className="text-blue-950" /></a>
            <a href="#"><FaLinkedinIn className="text-blue-950" /></a>
            <a href="#"><FaYoutube className="text-red-600" /></a>

            </div>
            <p className="text-[#000000] font-[Montserrat-Arabic] font-semibold text-[14px] leading-[32.3px] tracking-[0] text-center align-middle" dir="rtl">مشاركة :  </p>
          </div>
          </div>
        )}
      </div>

        {/* ✅ معاينة الفيديو على اليمين */}
        <div className="col-span-3 lg:col-span-2">
          <div className="bg-white  rounded-md overflow-hidden">
            {/* صورة الفيديو */}
            <div className="relative shadow-md ">
              <img src={preview} alt="course preview" className="w-full h-[450px]  rounded-md object-cover" />
              <div className="absolute inset-0 flex justify-center items-center">
                <button className="w-16 h-16 flex items-center justify-center rounded-full bg-white/80 text-purple-600 text-2xl shadow-lg">
                  ▶
                </button>
              </div>
            </div>

            {/* تفاصيل المدرب */}
            <div dir="rtl" className=" flex items-center gap-6  p-2">
              <div className="flex items-center gap-3 space-x-3 rtl:space-x-reverse">
                <img src={preview} alt="instructor" className="w-[70px] h-[70px] rounded-full" />
                <div>
                  <h4 className="text-[#555555] font-[Montserrat-Arabic] font-normal text-[14px] leading-[30.4px] tracking-[0] text-right align-middle">
                     المدرب
                  </h4>
                  <p className="font-[Montserrat-Arabic] font-semibold text-[16px] leading-[25px] tracking-[0] text-right align-middle text-[#444444]"> اسم المدرب</p>
                </div>
              </div>
              <div className="border-r-2 border-gray-300 ps-6">

              <span className="font-[Montserrat-Arabic] font-normal text-[14px] leading-[30.4px] tracking-[0] text-right align-middle text-[#555555]">القسم</span>
                  <p className="font-[Montserrat-Arabic] font-semibold text-[16px] leading-[25px] tracking-[0] text-right align-middle text-purple-600">روحانيات</p>
              </div>
            </div>
          </div>
        </div>


        <div className="col-span-3 pt-3">

     <p className="font-[Montserrat-Arabic] font-medium text-[36px] leading-[36px] tracking-[0] text-right align-middle">
   اسم الكورس
</p>
<div dir="rtl" className="">
    
      {/* Dynamic Tab Navigation */}
      <div dir="rtl" className="flex justify-start md:w-[600px] my-8 p-1  bg-gray-50 rounded-2xl  ">
        {tabs.map((tab) => {
          
          const isActive = activeTab === tab.id;
          
          return (
            <button 
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              disabled={isLoading}
              className={`relative flex items-center  px-4 py-2  font-[Montserrat-Arabic] font-light text-[14px] leading-[32.3px] tracking-[0%] text-center align-middle transition-all duration-300 flex-1 justify-center ${
                isActive 
                  ?  `bg-purple-600 text-white shadow-md  transform scale-105 ${tab.id =="courses" ?  "rounded-e-2xl" : "rounded-r-2xl"}`
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
             
              
              <TrainerFiles/>
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

<p className=" pt-6 font-[Montserrat-Arabic] font-semibold text-[20px] leading-[38px] tracking-[0] text-right align-middle text-purple-500">كورسات ذات صلة</p>

        </div>
      </div>




    </div>
<CourseSlider isTrue={false}/>

    <Footer/>
  </div>
  );
};

export default CourseDetails;






const TrainerFiles = () => {
  const files = [
    {
      id: 1,
      name: "PDF اسم",
      date: "March 20, 2023 at 2:37 pm",
      size: "15.6MB",
      logo: pdf,
    },
    {
      id: 2,
      name: "PDF اسم",
      date: "March 20, 2023 at 2:37 pm",
      size: "15.6MB",
      logo: pdf,
    },
  ];

  return (
    <div className="py-10 bg-white ">
      <div className="space-y-6">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex gap-4  items-center shadow-md rounded-lg px-4 py-3"
          >
            <img src={file.logo} alt="PDF" className="w-[100px] h-[100px]" />
            {/* النصوص على اليسار */}
            <div className="text-right">
              <h3 dir="ltr" className="font-[Montserrat-Arabic] font-medium text-[20px] leading-[20px] tracking-[0] text-right align-middle mb-3">{file.name}</h3>
              <p className="font-[Montserrat-Arabic] font-light text-[12px] leading-relaxed tracking-[0] text-right align-middle text-[#000000]">{file.date}</p>
              <p className="text-sm text-green-600 font-[Montserrat-Arabic] font-medium text-[10px] leading-[20px] tracking-[0] text-right mt-1">{file.size}</p>
            </div>

            {/* صورة الملف على اليمين */}
          </div>
        ))}
      </div>
    </div>
  );
};


