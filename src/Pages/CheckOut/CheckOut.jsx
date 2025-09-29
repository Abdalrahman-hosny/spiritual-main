// import React, { useState } from 'react';
// import { Check, ChevronDown } from 'lucide-react';
// import plant from "../../assets/mandala_1265367 1.png";
// import image from "../../assets/hero.png"
// import Navbar from '../Navbar/Navbar';
// export default function CheckOut() {
//   const [selectedCountry, setSelectedCountry] = useState('مصر');
//   const [selectedCity, setSelectedCity] = useState('الجيزة');
//   const [paymentMethod, setPaymentMethod] = useState('فيزا');
//  const [formData, setFormData] = useState({
//     mobile: '',
//     secondaryMobile: '',
//     country: '',
//     firstName: '',
//     lastName: '',
//     address: '',
//     paymentMethod: 'cash',
//     paymentService: ''
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handlePaymentMethodChange = (method) => {
//     setFormData(prev => ({
//       ...prev,
//       paymentMethod: method
//     }));
//   };
//   return (
//     <div className="  bg-white p-6 " >
//        <div className='relative'>
//                      <div className='image'>
//                        <Navbar bg={`bg-black/70`} />
//                        <div className="relative bg-black/70">
//                          <div className="relative overflow-hidden min-h-[35vh] sm:min-h-[40vh] md:min-h-[45vh] z-10 flex justify-center items-center px-4">
//                            <div className="text-center p-4 md:p-8 max-w-4xl">
//                              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
//                                السلة
//                              </h1>
//                              <div>
                               
             
//              <p className="font-[Montserrat-Arabic] text-white font-normal text-[24px] leading-[100%] tracking-[0] text-center align-middle [font-variant:small-caps]">
//                الرئيسية /   <span className='text-purple-500'>السلة</span>
//              </p>
             
             
             
//                              </div>
//                            </div>
//                          </div>
                         
//                          {/* Plant decoration - محسن للشاشات المختلفة */}
//                          <div className="absolute z-40 -bottom-6 sm:-bottom-8 left-0 transform -translate-x-1/4 translate-y-1/4 sm:-translate-x-1/3 sm:translate-y-1/3 md:-translate-x-1/5 md:translate-y-1/5 lg:-translate-x-1/3 lg:translate-y-1/3">
//                            <div className="relative">
//                              <div className="absolute -top-12 left-2 w-24 h-24 sm:w-32 sm:h-32 sm:-top-16 sm:left-4 md:w-48 md:h-48 md:-top-24 md:left-6 lg:w-64 lg:h-64 lg:-top-32 lg:left-8 xl:w-80 xl:h-80 xl:-top-36 rounded-full">
//                                <img src={plant} alt="Moon Planet" className="max-w-full max-h-full object-contain" />
//                              </div>
//                            </div>
//                          </div>
//                        </div>
//                      </div>
//                    </div>
// <div className='grid grid-cols-12  pt-24 gap-8 mt-2'>

//     <div className='col-span-3'>

//       {/* Order Summary Section */}
//       <div className="mb-8 bg-[#F9F9F9] p-4 rounded-lg">
//         <h2 className="font-[Alexandria] font-semibold text-[20px] leading-[26px] tracking-[0em] text-right align-middle mb-4">ملخص الطلب</h2>
        
//         <div dir='rtl' className="space-y-3">
//           {/* Product Items */}
//          <div className="flex justify-between items-center p-3 bg-white rounded-lg">
//             <div className="flex items-center">
//               <div className="w-14 h-14  rounded-full flex items-center justify-center ml-3">
//                <img src={image} className='w-full h-full rounded-md' alt="" />
//               </div>
//               <div className='flex flex-col'>

//               <span className="font-[Alexandria] mb-2 font-normal text-[12px] leading-[15px] tracking-[0em] text-right align-middle text-[#040404]">منتج رقم 4 مع خصم تجريبي يصل لـ 99%</span>
//               <span className='font-[Alexandria] font-medium text-[11px] leading-[15px] tracking-[0em] text-right align-middle text-purple-600'>120.00 جنيه مصري</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-between items-center p-3 bg-white rounded-lg">
//             <div className="flex items-center">
//               <div className="w-14 h-14  rounded-full flex items-center justify-center ml-3">
//                <img src={image} className='w-full h-full rounded-md' alt="" />
//               </div>
//               <div className='flex flex-col'>

//               <span className="font-[Alexandria] mb-2 font-normal text-[12px] leading-[15px] tracking-[0em] text-right align-middle text-[#040404]">منتج رقم 4 مع خصم تجريبي يصل لـ 99%</span>
//               <span className='font-[Alexandria] font-medium text-[11px] leading-[15px] tracking-[0em] text-right align-middle text-purple-600'>120.00 جنيه مصري</span>
//               </div>
//             </div>
//           </div>

//          <div className="flex justify-between items-center p-3 bg-white rounded-lg">
//             <div className="flex items-center">
//               <div className="w-14 h-14  rounded-full flex items-center justify-center ml-3">
//                <img src={image} className='w-full h-full rounded-md' alt="" />
//               </div>
//               <div className='flex flex-col'>

//               <span className="font-[Alexandria] mb-2 font-normal text-[12px] leading-[15px] tracking-[0em] text-right align-middle text-[#040404]">منتج رقم 4 مع خصم تجريبي يصل لـ 99%</span>
//               <span className='font-[Alexandria] font-medium text-[11px] leading-[15px] tracking-[0em] text-right align-middle text-purple-600'>120.00 جنيه مصري</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-between items-center p-3 bg-white rounded-lg">
//             <div className="flex items-center">
//               <div className="w-14 h-14  rounded-full flex items-center justify-center ml-3">
//                <img src={image} className='w-full h-full rounded-md' alt="" />
//               </div>
//               <div className='flex flex-col'>

//               <span className="font-[Alexandria] mb-2 font-normal text-[12px] leading-[15px] tracking-[0em] text-right align-middle text-[#040404]">منتج رقم 4 مع خصم تجريبي يصل لـ 99%</span>
//               <span className='font-[Alexandria] font-medium text-[11px] leading-[15px] tracking-[0em] text-right align-middle text-purple-600'>120.00 جنيه مصري</span>
//               </div>
//             </div>
//           </div>

//           {/* Pricing */}
        //   <div className="border-t border-gray-200 pt-4 space-y-2">
        //     <div className="flex justify-between text-purple-600">
        //       <span className='font-[Alexandria] text-[#999999] font-bold text-[14px] leading-[26px] tracking-[0em] text-right align-middle'>المجموع </span>
        //       <span className='font-[Alexandria] font-normal text-[14px] leading-[26px] tracking-[0em] align-middle'>  800.00 جنيه مصري</span>
        //     </div>
        //     <div className="flex items-center justify-between text-gray-600">
        //       <p className="font-[Alexandria] font-medium text-[14px] text-[#999999] leading-[26px] tracking-[0em]  text-right align-middle">التسليم</p>
              
        //       <input  type="text" className='ring-0 font-[Alexandria] font-normal text-[14px] leading-[26px] tracking-[0em] align-middle outline-none w-[100px]' placeholder='ادخل العنوان'  />
        //     </div>
        //     <div className="flex justify-between border-t border-gray-200 pt-3 font-bold text-purple-600 text-lg">
        //       <span className='font-[Alexandria] text-[#999999] font-bold text-[14px] leading-[26px] tracking-[0em] text-right align-middle'>الإجمالي</span>
        //       <span className='font-[Alexandria] font-normal text-[16px] leading-[26px] tracking-[0em] align-middle'>650.00 جنيه مصري</span>
        //     </div>
        //   </div>
//         </div>
//       </div>

     
//       {/* Confirm Button */}
//       <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300">
//         تأكيد
//       </button>
// </div>
//       {/* Shipping Address Section */}
//       <div className="col-span-9">
        
        
      

//        <div className=" mx-auto p-6 bg-white" dir="rtl">
//       <h2 className="font-[Alexandria] font-bold text-[24px] leading-[39px] tracking-[0em] text-[#040404] align-middle text-right mb-8">
//         معلومات جهات الاتصال
//       </h2>
      
//       <div className="space-y-6">
//         {/* Mobile Numbers Row */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <input
//               type="tel"
//               name="mobile"
//               value={formData.mobile}
//               onChange={handleInputChange}
//               placeholder="رقم الموبايل"
//               className="w-full font-[Alexandria] font-normal text-[16px] leading-[100%] tracking-[0em] text-[#757575] align-middle px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             />
//           </div>
//           <div>
//             <input
//               type="tel"
//               name="secondaryMobile"
//               value={formData.secondaryMobile}
//               onChange={handleInputChange}
//               placeholder="رقم موبايل ثاني"
//               className="w-full px-4 py-3 border font-[Alexandria] font-normal text-[16px] leading-[100%] tracking-[0em] text-[#757575] align-middle border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {/* Shipping Address Section */}
//         <div className="space-y-4">
//           <h3 className="font-[Alexandria] font-bold text-[20px] leading-[39px] tracking-[0em] text-[#000000] align-middle text-right">
//             عنوان الشحن
//           </h3>
          
//           <div>
//             <input
//               type="text"
//               name="country"
//               value={formData.country}
//               onChange={handleInputChange}
//               placeholder="البلد"
//               className="w-full px-4 py-3 border font-[Alexandria] font-normal text-[16px] leading-[100%] tracking-[0em] text-[#757575] align-middle border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 placeholder="الاسم الأول"
//                 className="w-full px-4 py-3 border font-[Alexandria] font-normal text-[16px] leading-[100%] tracking-[0em] text-[#757575] align-middle border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               />
//             </div>
//             <div>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//                 placeholder="الاسم الأخير"
//                 className="w-full px-4 py-3 border font-[Alexandria] font-normal text-[16px] leading-[100%] tracking-[0em] text-[#757575] align-middle border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               />
//             </div>
//           </div>

//           <div>
//             <textarea
//               name="address"
//               value={formData.address}
//               onChange={handleInputChange}
//               placeholder="العنوان"
//               rows="4"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-purple-500 font-[Alexandria] font-normal text-[16px] leading-[100%] tracking-[0em] text-[#757575] align-middle focus:border-transparent resize-none"
//             />
//           </div>
//         </div>

//         {/* Payment Options Section */}
//         <div className="space-y-4">
//           <h3 className="font-[Alexandria] font-bold text-[20px] leading-[39px] tracking-[0em] text-[#000000] align-middle text-right">
//             خيارات الدفع
//           </h3>
          
//           <div className="space-y-3">
//             <div className="flex items-center justify-start">
//              <label className="flex items-center cursor-pointer space-x-3">

//     <input
//       type="checkbox"
//       name="paymentMethod"
//       value="cash"
//       checked={formData.paymentMethod === 'cash'}
//       onChange={() => handlePaymentMethodChange('cash')}
//         className="accent-purple-500"
//     />
   
  
//   <span className="text-gray-700 text-sm font-medium select-none">
//     الدفع نقداً عند الاستلام
//   </span>
// </label>

//             </div>

//             <div className="flex items-center justify-start">
//               <label className="flex items-center cursor-pointer">
              
//                   <input
//                     type="checkbox"
//                     name="paymentMethod"
//                     value="visa"
//                     checked={formData.paymentMethod === 'visa'}
//                     onChange={() => handlePaymentMethodChange('visa')}
//                      className="accent-purple-500"
//                   />
//                 <span className="text-gray-700 mr-3">Visa</span>
                 
                
//               </label>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//       </div>



// </div>


//     </div>

    
//   );
// }


import React, { useEffect, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import plant from "../../assets/mandala_1265367 1.png";
import image from "../../assets/hero.png";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function CheckOut() {
  const [formData, setFormData] = useState({
    mobile: '',
    secondaryMobile: '',
    country: '',
    firstName: '',
    lastName: '',
    address: '',
    paymentMethod: 'cash',
    paymentService: ''
  });

  useEffect(()=>{
       window.scrollTo({
        top: 0,
        behavior: "smooth", // smooth scrolling
      });
  },[])
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: method
    }));
  };

  return (
    <div className="bg-white ">
      {/* Hero Section */}
       <div className='relative'>
                     <div className='image'>
                       <Navbar bg={`bg-black/70`} />
                       <div className="relative bg-black/70">
                         <div className="relative overflow-hidden min-h-[35vh] sm:min-h-[40vh] md:min-h-[45vh] z-10 flex justify-center items-center px-4">
                           <div className="text-center p-4 md:p-8 max-w-4xl">
                             <h1 className="text-white  text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                               الدفع
                             </h1>
                             <div>
                               
             
             <p className="font-[Montserrat-Arabic] text-white font-normal text-[24px] leading-[100%] tracking-[0] text-center align-middle [font-variant:small-caps]">
               الرئيسية /   <span className='text-purple-500'>الدفع</span>
             </p>
             
             
             
                             </div>
                           </div>
                         </div>
                         
                         {/* Plant decoration - محسن للشاشات المختلفة */}
                         <div className="absolute z-40 -bottom-6 sm:-bottom-8 left-0 transform -translate-x-1/4 translate-y-1/4 sm:-translate-x-1/3 sm:translate-y-1/3 md:-translate-x-1/5 md:translate-y-1/5 lg:-translate-x-1/3 lg:translate-y-1/3">
                           <div className="relative">
                             <div className="absolute -top-12 left-2 w-24 h-24 sm:w-32 sm:h-32 sm:-top-16 sm:left-4 md:w-48 md:h-48 md:-top-24 md:left-6 lg:w-64 lg:h-64 lg:-top-32 lg:left-8 xl:w-80 xl:h-80 xl:-top-36 rounded-full">
                               <img src={plant} alt="Moon Planet" className="max-w-full max-h-full object-contain" />
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 py-24 gap-6 md:gap-8  p-6 mt-4">
        
        {/* Order Summary */}
        <div className="col-span-12 lg:col-span-3 order-2 lg:order-1">
          <div className="mb-8 bg-[#F9F9F9] p-4 rounded-lg">
            <h2 className="font-[Alexandria] font-semibold text-xl text-right mb-4">ملخص الطلب</h2>

            <div dir="rtl" className="space-y-3">
              {[1, 2, 3].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <div className="flex items-center">
                    <div className="w-14 h-14 rounded-md flex items-center justify-center ml-3">
                      <img src={image} className="w-full h-full rounded-md" alt="" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-[Alexandria] mb-2 text-xs text-[#040404]">
                        منتج رقم {item} مع خصم تجريبي يصل لـ 99%
                      </span>
                      <span className="font-[Alexandria] text-sm font-medium text-purple-600">
                        120.00 جنيه مصري
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pricing */}
            
               <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between text-purple-600">
              <span className='font-[Alexandria] text-[#999999] font-bold text-[14px] leading-[26px] tracking-[0em] text-right align-middle'>المجموع </span>
              <span className='font-[Alexandria] font-normal text-[14px] leading-[26px] tracking-[0em] align-middle'>  800.00 جنيه مصري</span>
            </div>
            <div className="flex items-center justify-between text-gray-600">
              <p className="font-[Alexandria] font-medium text-[14px] text-[#999999] leading-[26px] tracking-[0em]  text-right align-middle">التسليم</p>
              
              <input  type="text" className='ring-0 font-[Alexandria] font-normal text-[14px] leading-[26px] tracking-[0em] align-middle outline-none w-[100px]' placeholder='ادخل العنوان'  />
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-3 font-bold text-purple-600 text-lg">
              <span className='font-[Alexandria] text-[#999999] font-bold text-[14px] leading-[26px] tracking-[0em] text-right align-middle'>الإجمالي</span>
              <span className='font-[Alexandria] font-normal text-[16px] leading-[26px] tracking-[0em] align-middle'>650.00 جنيه مصري</span>
            </div>
          </div>
            </div>
          </div>

          {/* Confirm Button */}
          <button  className="w-full font-[Alexandria]   leading-[24px] tracking-[0em] text-center align-middle bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-full font-normal text-md hover:from-purple-700 hover:to-purple-800 transition-all duration-300">
            تأكيد
          </button>
        </div>

        {/* Shipping Address */}
        <div className="col-span-12 lg:col-span-9 order-1 lg:order-2">
          <div className="mx-auto p-6 bg-white" dir="rtl">
            <h2 className="font-[Alexandria] font-bold text-2xl text-[#040404] text-right mb-8">
              معلومات جهات الاتصال
            </h2>

            <div className="space-y-6">
              {/* Mobile Numbers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="رقم الموبايل"
                  className="w-full font-[Alexandria] text-base text-[#757575] px-4 py-3 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="tel"
                  name="secondaryMobile"
                  value={formData.secondaryMobile}
                  onChange={handleInputChange}
                  placeholder="رقم موبايل ثاني"
                  className="w-full font-[Alexandria] text-base text-[#757575] px-4 py-3 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Address */}
              <div className="space-y-4">
                <h3 className="font-[Alexandria] font-bold text-xl text-[#000000] text-right">عنوان الشحن</h3>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="البلد"
                  className="w-full font-[Alexandria] text-base text-[#757575] px-4 py-3 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-purple-500"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="الاسم الأول"
                    className="w-full font-[Alexandria] text-base text-[#757575] px-4 py-3 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="الاسم الأخير"
                    className="w-full font-[Alexandria] text-base text-[#757575] px-4 py-3 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="العنوان"
                  rows="4"
                  className="w-full font-[Alexandria] text-base text-[#757575] px-4 py-3 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              {/* Payment Options */}
              <div className="space-y-4">
                <h3 className="font-[Alexandria] font-bold text-xl text-[#000000] text-right">خيارات الدفع</h3>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer space-x-3">
                    <input
                      type="checkbox"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={() => handlePaymentMethodChange('cash')}
                      className="accent-purple-500"
                    />
                    <span className="text-gray-700 text-sm font-medium">الدفع نقداً عند الاستلام</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="paymentMethod"
                      value="visa"
                      checked={formData.paymentMethod === 'visa'}
                      onChange={() => handlePaymentMethodChange('visa')}
                      className="accent-purple-500"
                    />
                    <span className="text-gray-700 mr-3">Visa</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer/>
    </div>
  );
}
