import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Clock, User } from 'lucide-react';
import plant from "../../assets/mandala_1265367 1.png";
import { useTranslation } from 'react-i18next';


import { FaMapMarkerAlt, FaEnvelope, FaClock } from "react-icons/fa";
import map from "../../assets/location.png"
import message1 from "../../assets/message.png"
import { motion } from "framer-motion"; // 👈 استدعاء Framer Motion
const ContactUs = () => {
  const { t } = useTranslation();

   const [selectedLocation, setSelectedLocation] = useState("30.0444,31.2357");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
const cards = [
    {
      id: 1,
      title: "العنوان",
      icon: map,
    },
    {
      id: 2,
      title: "البريد الالكتروني",
      icon: message1,
    },
    {
      id: 3,
      title: "عدد ساعات العمل",
      icon: message1,
    },
  ];

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


    useEffect(()=>{
           window.scrollTo({
            top: 0,
            behavior: "smooth", // smooth scrolling
          });
      },[])
  return (
    <div className="min-h-screen bg-gray-50" >
          <div className='relative'>
                        <div className='image'>
                          
                          {/* <div className="relative bg-black/70">
                            <div className="relative overflow-hidden min-h-[35vh] sm:min-h-[40vh] md:min-h-[45vh] z-10 flex justify-center items-center px-4">
                              <div className="text-center p-4 md:p-8 max-w-4xl">
                                <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                                  اتصل بنا
                                </h1>
                                <div>
                                  
                
                <p className="font-[Montserrat-Arabic] text-white font-normal text-[24px] leading-[100%] tracking-[0] text-center align-middle [font-variant:small-caps]">
                  الرئيسية /   <span className='text-purple-500'>اتصل بنا</span>
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
                 {t('ContactUs.title')}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <p className="font-[Montserrat-Arabic] text-white font-normal text-[24px] leading-[100%] tracking-[0] text-center align-middle [font-variant:small-caps]">
                   {t('ContactUs.breadcrumb')} / <span className='text-purple-500'>{t('ContactUs.current')}</span>
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
      {/* Header with tabs */}
      <div dir='ltr' className="bg-white shadow-sm pt-24 pb-12">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
      {cards.map((card) => (
        <div
          key={card.id}
          className="flex items-center justify-between bg-[#f9f7ff] rounded-xl p-6 shadow-sm"
        >
          {/* النص */}
          <div className="text-right flex-1 mr-4">
            <h3 className="font-[Montserrat-Arabic] font-semibold text-[16px] leading-[20px] tracking-[0] text-right align-middle mb-2">{t('ContactUs.address')}</h3>
            <p className="text-gray-400 tracking-widest">-------------------</p>
            <p className="text-gray-400 tracking-widest">-------------------</p>
          </div>

          {/* الأيقونة */}
          <div className="flex items-center justify-center bg-white rounded-lg p-3 shadow">
          <img src={card.icon} className='w-[40px] h-[40px]' alt="" />  
          </div>
        </div>
      ))}
    </div>
      </div>




      {/* Map Container */}
      <div className="relative">
        <div className="h-screen  relative overflow-hidden">
         <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
      {selectedLocation ? (
        <iframe
          title="map"
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            selectedLocation
          )}&output=embed`}
        ></iframe>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">
          أدخل العنوان لعرضه على الخريطة
        </div>
      )}
    </div>
       
        </div>

        {/* Location Form Overlay */}
        <div className="absolute -bottom-50 left-0 w-[95%] md:w-[80%] mx-auto right-0 bg-white rounded-t-3xl shadow-lg p-6">
  <div className="text-center mb-6">
    <h2 className="text-xl font-bold text-gray-800 mb-2">{t('ContactUs.customRequest')}</h2>
  </div>

  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* الاسم الكامل */}
    <input
      type="text"
      placeholder={t('ContactUs.fullName')}
      value={customerName}
      onChange={(e) => setCustomerName(e.target.value)}
      className="w-full p-4 font-[Montserrat-Arabic] font-light text-[16px] border border-gray-200 rounded-[20px] text-right focus:outline-none focus:ring-2 focus:ring-purple-500"
    />

    {/* البريد الإلكتروني */}
    <input
      type="email"
      placeholder={t('ContactUs.emailAddress')}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full p-4 font-[Montserrat-Arabic] font-light text-[16px] border border-gray-200 rounded-[20px] text-right focus:outline-none focus:ring-2 focus:ring-purple-500"
    />

    {/* رقم الهاتف */}
    <input
      type="tel"
      placeholder={t('ContactUs.phone')}
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
      className="w-full p-4 font-[Montserrat-Arabic] font-light text-[16px] border border-gray-200 rounded-[20px] text-right focus:outline-none focus:ring-2 focus:ring-purple-500"
    />

    {/* الموضوع */}
    <input
      type="text"
      placeholder={t('ContactUs.subject')}
      value={subject}
      onChange={(e) => setSubject(e.target.value)}
      className="w-full p-4 font-[Montserrat-Arabic] font-light text-[16px] border border-gray-200 rounded-[20px] text-right focus:outline-none focus:ring-2 focus:ring-purple-500"
    />

    {/* الرسالة (تاخد عمودين) */}
    <textarea
      placeholder={t('ContactUs.message')}
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="md:col-span-2 w-full p-4 font-[Montserrat-Arabic] font-light text-[16px] border border-gray-200 rounded-[20px] text-right h-32 focus:outline-none focus:ring-2 focus:ring-purple-500"
    ></textarea>

    {/* زر الإرسال (ياخد عمودين برضو) */}
    <button
      type="submit"
      className="md:col-span-2 w-full p-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-[30px] font-semibold text-lg shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 transform hover:scale-[1.02]"
    >
      {t('ContactUs.sendRequest')}
    </button>
  </form>

  {/* Bottom indicator */}
  <div className="flex justify-center mt-4">
    <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
  </div>
</div>

      
      <div className="absolute top-80 left-6 right-6 bg-white rounded-lg shadow-lg p-4 opacity-0 pointer-events-none">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 space-x-reverse p-2 hover:bg-gray-50 rounded">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">الموقع الحالي</span>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse p-2 hover:bg-gray-50 rounded">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">العنوان المحفوظ</span>
          </div>
        </div>
      </div>
      </div>
<div className='w-full pt-84'>

      

</div>

    </div>
  );
};

export default ContactUs;