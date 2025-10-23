import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Clock, User } from 'lucide-react';
import plant from "../../assets/mandala_1265367 1.png";
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaEnvelope, FaClock } from "react-icons/fa";
import map from "../../assets/location.png";
import message1 from "../../assets/message.png";
import { motion } from "framer-motion";
import axios from 'axios';

const ContactUs = () => {
  const { t } = useTranslation();
  const [selectedLocation, setSelectedLocation] = useState("30.0444,31.2357");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [settings, setSettings] = useState(null);

  const cards = [
    {
      id: 1,
      title: "العنوان",
      icon: map,
      value: settings?.address || "-------------------"
    },
    {
      id: 2,
      title: "البريد الالكتروني",
      icon: message1,
      value: settings?.email || "-------------------"
    },
    {
      id: 3,
      title: "عدد ساعات العمل",
      icon: message1,
      value: "9 AM - 5 PM" // يمكنك استبدال هذا بقيمة من الـ API إذا كانت متاحة
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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // استدعاء الـ API لاسترجاع الإعدادات
    const fetchSettings = async () => {
      try {
        const response = await axios.get('https://spiritual.brmjatech.uk/api/settings');
        if (response.data.code === 200 && response.data.data.length > 0) {
          setSettings(response.data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await axios.post(
        'https://spiritual.brmjatech.uk/api/contact',
        {
          name: customerName,
          email: email,
          phone: phoneNumber,
          subject: subject,
          message: message,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.code === 201) {
        setSubmitStatus({ success: true, message: response.data.message });
        setCustomerName('');
        setEmail('');
        setPhoneNumber('');
        setSubject('');
        setMessage('');
      } else {
        setSubmitStatus({ success: false, message: response.data.message || 'حدث خطأ أثناء الإرسال.' });
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: 'حدث خطأ أثناء الإرسال. حاول مرة أخرى.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div dir='ltr' className="bg-white shadow-sm pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex items-center justify-between bg-[#f9f7ff] rounded-xl p-6 shadow-sm"
            >
              <div className="text-right flex-1 mr-4">
                <h3 className="font-[Montserrat-Arabic] font-semibold text-[16px] leading-[20px] tracking-[0] text-right align-middle mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-400 tracking-widest">{card.value}</p>
              </div>
              <div className="flex items-center justify-center bg-white rounded-lg p-3 shadow">
                <img src={card.icon} className='w-[40px] h-[40px]' alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="h-screen relative overflow-hidden">
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

        <div className="absolute -bottom-50 left-0 w-[95%] md:w-[80%] mx-auto right-0 bg-white rounded-t-3xl shadow-lg p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{t('ContactUs.customRequest')}</h2>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={t('ContactUs.fullName')}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full p-4 font-[Montserrat-Arabic] font-light text-[16px] border border-gray-200 rounded-[20px] text-right focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="email"
              placeholder={t('ContactUs.emailAddress')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 font-[Montserrat-Arabic] font-light text-[16px] border border-gray-200 rounded-[20px] text-right focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="tel"
              placeholder={t('ContactUs.phone')}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-4 font-[Montserrat-Arabic] font-light text-[16px] border border-gray-200 rounded-[20px] text-right focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="text"
              placeholder={t('ContactUs.subject')}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-4 font-[Montserrat-Arabic] font-light text-[16px] border border-gray-200 rounded-[20px] text-right focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <textarea
              placeholder={t('ContactUs.message')}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="md:col-span-2 w-full p-4 font-[Montserrat-Arabic] font-light text-[16px] border border-gray-200 rounded-[20px] text-right h-32 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            ></textarea>
            <button
              type="submit"
              disabled={isSubmitting}
              className="md:col-span-2 w-full p-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-[30px] font-semibold text-lg shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'جاري الإرسال...' : t('ContactUs.sendRequest')}
            </button>
          </form>
          {submitStatus && (
            <div className={`mt-4 p-3 rounded-lg text-center ${submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {submitStatus.message}
            </div>
          )}
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
      <div className='w-full pt-84'></div>
    </div>
  );
};

export default ContactUs;
