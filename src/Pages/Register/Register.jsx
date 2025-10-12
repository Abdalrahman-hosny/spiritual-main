import React, { useEffect, useState } from 'react';
import { Lock, Mail, CheckCircle, ChevronDown, User, Users, Star, Shield, Phone, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import image from "../../assets/loginimg.png";

// قائمة أنواع المستخدمين الثابتة
const userTypes = [
  { id: 'client', label: 'دارس عادي', icon: User },
  { id: 'energy_coach', label: 'مدرب طاقة', icon: Star },
  { id: 'healer', label: 'معالج', icon: Shield },
  { id: 'quran_memorizer', label: 'مُحَفِّظ قرآن', icon: Users },
  { id: 'life_coach', label: 'مدرب حياة', icon: CheckCircle },
];

// تعريف Schema للتحقق باستخدام Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required('الاسم الكامل مطلوب'),
  email: Yup.string().email('بريد إلكتروني غير صالح').required('البريد الإلكتروني مطلوب'),
  phone: Yup.string()
    .required('رقم التواصل مطلوب')
    .matches(/^[0-9]{8,15}$/, 'رقم الهاتف غير صالح'),
  password: Yup.string()
    .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
    .required('كلمة المرور مطلوبة'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'كلمة المرور غير متطابقة')
    .required('تأكيد كلمة المرور مطلوب'),
  country: Yup.object().shape({
    value: Yup.string().required('الدولة مطلوبة'),
    label: Yup.string().required('الدولة مطلوبة'),
  }).required('الدولة مطلوبة'),
});

export default function Register() {
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState('');
  const [countries, setCountries] = useState([]);
  const [otpToken, setOtpToken] = useState('');
  const navigate = useNavigate();

  // جلب قائمة الدول من API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://spiritual.brmjatech.uk/api/countries');
        if (response.data && response.data.data) {
          const formattedCountries = response.data.data.map(country => ({
            value: country.id,
            label: country.name, // استخدام `country.name` بدلاً من `country.name.ar`
          }));
          setCountries(formattedCountries);
        } else {
          toast.error("لم يتم العثور على بيانات الدول");
        }
      } catch (error) {
        console.error("خطأ في جلب قائمة الدول:", error);
        toast.error("خطأ في جلب قائمة الدول، حاول مرة أخرى");
      }
    };
    fetchCountries();
  }, []);

  // خطوات التسجيل
  const steps = [
    { id: 0, title: 'اختيار نوع الحساب', icon: User },
    { id: 1, title: 'البيانات الشخصية', icon: Mail },
    { id: 2, title: 'تم بنجاح', icon: CheckCircle }
  ];

  // استخدام Formik لإدارة البيانات والتحقق
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
      country: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.post('https://spiritual.brmjatech.uk/api/register', {
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values.password,
          password_confirmation: values.password_confirmation,
          country_id: values.country.value,
          account_type: selectedUserType,
        });
        if (response.data.token || response.data.otp_code) {
          setOtpToken(response.data.token || response.data.otp_code);
        }
        setCurrentTab(2);
        setTimeout(() => {
          navigate('/verify-otp', {
            state: {
              phone: values.phone,
              otpToken: otpToken || response.data.token || response.data.otp_code
            }
          });
        }, 3000);
      } catch (error) {
        console.error("خطأ في إرسال البيانات:", error);
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("حدث خطأ أثناء التسجيل، حاول مرة أخرى");
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  // التمرير إلى الأعلى عند تحميل الصفحة
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // اختيار نوع المستخدم
  const handleUserTypeSelect = (typeId) => {
    setSelectedUserType(typeId);
  };

  // الانتقال إلى الخطوة التالية
  const handleNextStep = () => {
    if (currentTab === 0 && selectedUserType) {
      setCurrentTab(1);
    } else if (currentTab === 1) {
      formik.handleSubmit();
    }
  };

  // عرض مؤشر التقدم
  const renderProgressIndicator = () => (
    <div className="mb-6 sm:mb-8" dir="rtl">
      <div className="flex items-center justify-between relative">
        <div className="absolute w-[300px] top-1/2 left-0 right-18 h-0.5 bg-gray-200 transform -translate-y-1/2 z-0"></div>
        <div
          className="absolute w-[200px] top-1/2 right-18 h-0.5 bg-gradient-to-l from-purple-600 to-purple-700 transform -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${(currentTab / (steps.length - 1)) * 100}%` }}
        ></div>
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = index === currentTab;
          const isCompleted = index < currentTab;
          return (
            <div key={step.id} className="flex flex-col items-center w-[300px] relative z-10">
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

  // عرض اختيار نوع المستخدم
  const renderUserTypeSelection = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2" dir="rtl">
          من أنت؟
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
                <span className={`${selectedUserType === type.id ? "text-purple-600" : "text-gray-700"} font-medium`}>
                  {type.label}
                </span>
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

  // عرض نموذج التسجيل
  const renderRegistrationForm = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2" dir="rtl">
          إنشاء حساب جديد
        </h2>
        <p className="text-gray-600 text-sm lg:text-base" dir="rtl">
          أدخل بياناتك الشخصية للحصول على 5 سنوات ومررت مع خبراء عالم فريح المعرفية والتجارب المختلفة
        </p>
      </div>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* الاسم الكامل */}
        <div className="space-y-2">
          <label className="block text-right text-gray-700 font-medium" dir="rtl">
            الاسم الكامل
          </label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="احمد محمد حسن"
            className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right"
            dir="rtl"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
          )}
        </div>
        {/* البريد الإلكتروني */}
        <div className="space-y-2">
          <label className="block text-right text-gray-700 font-medium" dir="rtl">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="example@example.com"
            className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right"
            dir="ltr"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
          )}
        </div>
        {/* رقم التواصل */}
        <div className="space-y-2">
          <label className="block text-right text-gray-700 font-medium" dir="rtl">
            رقم التواصل
          </label>
          <input
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="1010700700"
            className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right"
            dir="ltr"
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
          )}
        </div>
        {/* الدولة */}
        <div className="space-y-2">
          <label className="block text-right text-gray-700 font-medium" dir="rtl">
            الدولة
          </label>
          {countries.length > 0 ? (
            <Select
              name="country"
              options={countries}
              value={formik.values.country}
              onChange={(selectedOption) => formik.setFieldValue('country', selectedOption)}
              onBlur={formik.handleBlur}
              placeholder="اختر الدولة"
              className="text-right"
              classNamePrefix="react-select"
              isSearchable={true}
              styles={{
                control: (base) => ({
                  ...base,
                  textAlign: 'right',
                  direction: 'rtl',
                  borderColor: formik.touched.country && formik.errors.country ? '#ef4444' : '#d1d5db',
                  minHeight: '48px',
                }),
                menu: (base) => ({
                  ...base,
                  textAlign: 'right',
                  direction: 'rtl',
                }),
                option: (base) => ({
                  ...base,
                  textAlign: 'right',
                  direction: 'rtl',
                }),
                placeholder: (base) => ({
                  ...base,
                  textAlign: 'right',
                }),
              }}
            />
          ) : (
            <p className="text-red-500 text-xs mt-1">لا توجد دول متاحة، حاول مرة أخرى لاحقًا.</p>
          )}
          {formik.touched.country && formik.errors.country && (
            <p className="text-red-500 text-xs mt-1">
              {typeof formik.errors.country === 'string' ? formik.errors.country : 'الدولة مطلوبة'}
            </p>
          )}
        </div>
        {/* كلمة المرور */}
        <div className="space-y-2">
          <label className="block text-right text-gray-700 font-medium" dir="rtl">
            كلمة المرور
          </label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="********"
            className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right"
            dir="rtl"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
          )}
        </div>
        {/* تأكيد كلمة المرور */}
        <div className="space-y-2">
          <label className="block text-right text-gray-700 font-medium" dir="rtl">
            تأكيد كلمة المرور
          </label>
          <input
            type="password"
            name="password_confirmation"
            value={formik.values.password_confirmation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="********"
            className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right"
            dir="rtl"
          />
          {formik.touched.password_confirmation && formik.errors.password_confirmation && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.password_confirmation}</p>
          )}
        </div>
        {/* أزرار التنقل */}
        <div className="flex gap-3" dir="rtl">
          <button
            type="button"
            onClick={() => setCurrentTab(0)}
            className="flex-1 py-3 sm:py-4 rounded-lg font-semibold text-purple-600 bg-white border-2 border-purple-600 hover:bg-purple-50 transition-all duration-200"
          >
            السابق
          </button>
          <button
            type="submit"
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
      </form>
      {/* رابط تسجيل الدخول */}
      <div className="text-center space-y-2 pt-4">
        <p className="text-gray-600 text-sm" dir="rtl">
          لديك حساب؟
          <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium mr-1">
            تسجيل دخول
          </Link>
        </p>
      </div>
    </div>
  );

  // عرض شاشة النجاح
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
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800" dir="rtl">
          مبروك
        </h2>
        <p className="text-gray-600 leading-relaxed max-w-sm mx-auto" dir="rtl">
          حسابك جاهز للاستخدام. سيتم إعادة توجيهك إلى صفحة OTP.
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
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full max-w-7xl relative z-10 gap-4 lg:gap-8">
        <div className='block lg:hidden text-center mb-4 sm:mb-6 px-4'>
          <h1 className="font-bold font-montserratArabic text-xl xs:text-2xl sm:text-3xl text-white mb-2" dir="rtl">
            منصة روحاني
          </h1>
          <p className='text-white font-montserratArabic text-xs xs:text-sm sm:text-base leading-relaxed text-center max-w-sm mx-auto' dir="rtl">
            منصة إلكترونية متكاملة للتعليم والعلاج الروحاني والطاقي
          </p>
        </div>
        <div className="relative bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 w-full max-w-[320px] xs:max-w-[360px] sm:max-w-md lg:max-w-lg shadow-2xl order-2 lg:order-1">
          {renderProgressIndicator()}
          {currentTab === 0 && renderUserTypeSelection()}
          {currentTab === 1 && renderRegistrationForm()}
          {currentTab === 2 && renderSuccessScreen()}
        </div>
        <div className='hidden font-montserratArabic lg:block w-full max-w-[450px] xl:max-w-[550px] 2xl:max-w-[650px] order-1 lg:order-2'>
          <div className='flex justify-end items-center mb-4 lg:mb-6'>
            <img
              src={image}
              alt="منصة روحاني"
              className='w-full h-auto max-w-[300px] xl:max-w-[400px] 2xl:max-w-[500px]'
            />
          </div>
          <h1 className="font-[Montserrat-Arabic] font-extrabold leading-tight xl:leading-relaxed text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl tracking-[0px] text-right text-white mb-4">
            منصة روحاني
          </h1>
          <p className='font-[Montserrat-Arabic] text-white font-bold text-sm lg:text-base xl:text-lg 2xl:text-xl leading-relaxed tracking-[0px] text-right'>
            منصة إلكترونية متكاملة للتعليم والعالج الروحاني والطاقي، تجمع بين الكورسات، الجلسات، المتجر، التحفيظ، والاستشارات المباشرة.
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
