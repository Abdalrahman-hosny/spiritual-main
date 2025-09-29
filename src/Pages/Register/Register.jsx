


import React, { useEffect, useState } from 'react';
import { Lock, Mail, Eye, EyeOff, CheckCircle, ChevronDown, User, Users, Star, Shield, Phone, MapPin } from 'lucide-react';
import image from "../../assets/loginimg.png"
import { Link } from 'react-router-dom';
export default function Register() {
  const [currentTab, setCurrentTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form states
  const [selectedUserType, setSelectedUserType] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    password: '',
    confirmPassword: ''
  });
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({ code: '+20', flag: '🇪🇬', name: 'مصر' });
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const countries = [
    { code: '+20', name: 'مصر', flag: '🇪🇬' },
    { code: '+966', name: 'السعودية', flag: '🇸🇦' },
    { code: '+971', name: 'الإمارات', flag: '🇦🇪' },
    { code: '+965', name: 'الكويت', flag: '🇰🇼' },
    { code: '+973', name: 'البحرين', flag: '🇧🇭' },
    { code: '+974', name: 'قطر', flag: '🇶🇦' },
  ];

  const userTypes = [
    { id: 'regular', label: 'دارس عادي', icon: User },
    { id: 'premium', label: "مدرب طاقة", icon: Star },
    { id: 'expert', label: "شيخ معالج", icon: Shield },
    { id: 'professional', label: "محفظ قران", icon: Users },
    { id: 'consultant', label:"لايف كوتش", icon: CheckCircle }
  ];

  const steps = [
    { id: 0, title: 'اختيار نوع الحساب', icon: User },
    { id: 1, title: 'البيانات الشخصية', icon: Mail },
    { id: 2, title: 'تم بنجاح', icon: CheckCircle }
  ];

    useEffect(()=>{
           window.scrollTo({
            top: 0,
            behavior: "smooth", // smooth scrolling
          });
      },[])

  const handleUserTypeSelect = (type) => {
    setSelectedUserType(type);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNextStep = () => {
    if (currentTab === 0 && selectedUserType) {
      setCurrentTab(1);
    } else if (currentTab === 1) {
      // Validate form and proceed
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setCurrentTab(2);
      }, 2000);
    }
  };

  const renderProgressIndicator = () => (
    <div className="mb-6 sm:mb-8" dir="rtl">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute w-[300px] top-1/2 left-0 right-18 h-0.5 bg-gray-200 transform -translate-y-1/2 z-0"></div>
        <div 
          className="absolute w-[200px] top-1/2  right-18 h-0.5 bg-gradient-to-l from-purple-600 to-purple-700 transform -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${(currentTab / (steps.length )) * 100}%` }}
        ></div>

        {/* Steps */}
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = index === currentTab;
          const isCompleted = index < currentTab;
          
          return (
            <div key={step.id} className="flex flex-col items-center w-[300px] relative z-10">
              {/* Circle */}
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-purple-600 border-purple-600 text-white' 
                    : isActive 
                      ? 'bg-white border-purple-600 text-purple-600 shadow-lg ring-4 ring-purple-100' 
                      : 'bg-white border-gray-300 text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" fill="currentColor" />
                ) : (
                  <StepIcon className="w-4 h-4" />
                )}
              </div>
              
              {/* Label */}
              <span 
                className={`mt-2 text-xs sm:text-sm font-medium text-center max-w-[80px] leading-tight ${
                  isActive ? 'text-purple-600' : isCompleted ? 'text-purple-600' : 'text-gray-500'
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderUserTypeSelection = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2" dir="rtl">
          من أنت ؟
        </h2>
        <p className="text-gray-600 text-sm lg:text-base" dir="rtl">
          اختر نوع حسابك لبدء استخدام المنصة
        </p>
      </div>

      <div className="space-y-3">
        {userTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <label
              key={type.id}
              className={`flex items-center justify-between p-3 sm:p-4 border-2 rounded-[20px] cursor-pointer transition-all duration-200 ${
                selectedUserType === type.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
              dir="rtl"
            >
              <div className="flex items-center gap-3">
                <IconComponent className="w-5 h-5 text-purple-600" />
                <span className={`${selectedUserType === type.id ? "text-purple-600" :"text-gray-700"}  font-medium`}>{type.label}</span>
              </div>
              <input
                type="radio"
                name="userType"
                value={type.id}
                checked={selectedUserType === type.id}
                onChange={() => handleUserTypeSelect(type.id)}
                className="w-5 h-5 accent-purple-500 text-purple-600 border-gray-300 focus:ring-purple-500"
              />
            </label>
          );
        })}
      </div>

      <button
        onClick={handleNextStep}
        disabled={!selectedUserType}
        className={`w-full py-3 sm:py-4 rounded-lg font-semibold text-white transition-all duration-200 ${
          selectedUserType
            ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        التالي
      </button>
    </div>
  );

  const renderRegistrationForm = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2" dir="rtl">
          إنشاء حساب جديد
        </h2>
        <p className="text-gray-600 text-sm lg:text-base" dir="rtl">
          أدخل بياناتك الشخصية للحصول على 5 سنوات ومررت مع خبراء
          عالم فريح المعرفية والتجارب المختلفة
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="block text-right text-gray-700 font-medium" dir="rtl">
            الاسم الكامل
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            placeholder="احمد محمد حسن"
            className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right"
            dir="rtl"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-right text-gray-700 font-medium" dir="rtl">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="AAAA11??22333@gmail.com"
            className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right"
            dir="ltr"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label className="block text-right text-gray-700 font-medium" dir="rtl">
            رقم التواصل
          </label>
          <div className="relative flex" dir="rtl">
            <div className="relative">
              <button
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="flex items-center gap-2 px-3 py-3 bg-gray-50 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-w-[80px]"
              >
                <span>{selectedCountry.flag}</span>
                <span className="text-gray-700 font-medium text-sm">{selectedCountry.code}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              
              {showCountryDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-30 max-h-40 overflow-y-auto">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => {
                        setSelectedCountry(country);
                        setShowCountryDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors"
                    >
                      <span>{country.flag}</span>
                      <span className="text-gray-700 text-sm">{country.code}</span>
                      <span className="text-gray-500 text-sm">{country.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+966508584585"
              className="flex-1 px-3 py-3 bg-gray-50 border border-gray-300 border-r-0 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right"
              dir="ltr"
            />
          </div>
        </div>

        {/* Country */}
        <div className="space-y-2">
          <label className="block text-right text-gray-700 font-medium" dir="rtl">
            البلد
          </label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            placeholder="مصر"
            className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right"
            dir="rtl"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="block text-right text-gray-700 font-medium" dir="rtl">
            كلمة المرور
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder="********"
            className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right"
            dir="rtl"
          />
        </div>
      </div>

      <div className="flex gap-3" dir="rtl">
        <button
          onClick={() => setCurrentTab(0)}
          className="flex-1 py-3 sm:py-4 rounded-lg font-semibold text-purple-600 bg-white border-2 border-purple-600 hover:bg-purple-50 transition-all duration-200"
        >
          السابق
        </button>
        <button
          onClick={handleNextStep}
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3 sm:py-4 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>جاري الإنشاء...</span>
            </div>
          ) : (
            'إنشاء'
          )}
        </button>
      </div>

      <div className="text-center space-y-2 pt-4">
        <p className="text-gray-600 text-sm" dir="rtl">
          لديك حساب ؟ 
          <Link to={"/login"} className="text-purple-600 hover:text-purple-700 font-medium mr-1">
            تسجيل دخول
          </Link>
        </p>
        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
          الصفحة الرئيسية
        </button>
      </div>
    </div>
  );

  const renderSuccessScreen = () => (
    <div className="text-center space-y-6">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-purple-600" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" fill="currentColor" />
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="absolute -bottom-2 -left-6 w-2 h-2 bg-red-400 rounded-full"></div>
          <div className="absolute -top-6 right-8 w-2 h-2 bg-green-400 rounded-full"></div>
          <div className="absolute -bottom-4 right-2 w-4 h-4 bg-blue-400 rounded-full"></div>
          <div className="absolute top-8 -right-8 w-3 h-3 bg-purple-400 rounded-full"></div>
          <div className="absolute -bottom-8 left-4 w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-green-400"></div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800" dir="rtl">
          مبروك
        </h2>
        <p className="text-gray-600 leading-relaxed max-w-sm mx-auto" dir="rtl">
          حسابك جاهز للاستخدام. سيتم إعادة توجيهك
          إلى الصفحة الرئيسية في لحظات قريبة.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen register font-montserratArabic flex items-center justify-center lg:justify-around p-2 sm:p-4 lg:p-6 relative overflow-hidden">
   <div className='bg-[linear-gradient(to_left,rgba(0,0,0,0.6),rgba(0,0,0,0.1))] fixed inset-0'></div>
      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full max-w-7xl relative z-10 gap-4 lg:gap-8">
        
        {/* Mobile Brand Section */}
        <div className='block lg:hidden text-center mb-4 sm:mb-6 px-4'>
          {/* <div className="flex justify-center mb-4">
            <img src={image} className='w-[80px] h-[80px]' alt="" />
          </div> */}
          <h1 className="font-bold font-montserratArabic text-xl xs:text-2xl sm:text-3xl text-white mb-2" dir="rtl">
            منصة روحاني
          </h1>
          <p className='text-white font-montserratArabic text-xs xs:text-sm sm:text-base leading-relaxed text-center max-w-sm mx-auto' dir="rtl">
            منصة إلكترونية متكاملة للتعليم والعلاج الروحاني والطاقي
          </p>
        </div>

        {/* Form Card */}
        <div className="relative bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 w-full max-w-[320px] xs:max-w-[360px] sm:max-w-md lg:max-w-lg shadow-2xl order-2 lg:order-1">
          {/* Progress Indicator */}
          {renderProgressIndicator()}
          
          {/* Tab Content */}
          {currentTab === 0 && renderUserTypeSelection()}
          {currentTab === 1 && renderRegistrationForm()}
          {currentTab === 2 && renderSuccessScreen()}
        </div>
        
        {/* Desktop Brand Section */}
         <div className='hidden font-montserratArabic lg:block w-full max-w-[450px] xl:max-w-[550px] 2xl:max-w-[650px] order-1 lg:order-2'>
          <div className='flex justify-end items-center mb-4 lg:mb-6'>
            <img 
              src={image} 
              alt="" 
              className='w-full h-auto max-w-[300px] xl:max-w-[400px] 2xl:max-w-[500px]' 
            />
          </div>
          <h1 className="font-[Montserrat-Arabic] font-extrabold leading-tight xl:leading-relaxed text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl tracking-[0px] text-right text-white mb-4">
            منصة روحاني
          </h1>
          <p className='font-[Montserrat-Arabic] text-white font-bold text-sm lg:text-base xl:text-lg 2xl:text-xl leading-relaxed tracking-[0px] text-right'>
            منصة إلكترونية متكاملة للتعليم والعالج الروحاني والطاقي، تجمع بين الكورسات، الجلسات، المتجر، التحفيظ، والاستشارات المباشرة .
          </p>
        </div>
      </div>
    </div>
  );
}