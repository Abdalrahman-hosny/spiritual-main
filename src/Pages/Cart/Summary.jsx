import React, { useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { useTranslation } from 'react-i18next';

export default function CheckoutSummary() {
  const { t } = useTranslation();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(false);

  const handlePromoApply = () => {
    if (promoCode.trim()) {
      setAppliedPromo(true);
      // هنا يمكن إضافة منطق تطبيق كود الخصم
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl mb-8 p-6 space-y-6" dir="rtl">
      
      {/* رمز القسيمة */}
      <div className="space-y-4 w-full max-w-full md:w-[500px]">
        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3">
          <h2 className="font-[Montserrat-Arabic] font-bold text-[16px] sm:text-[18px] leading-[27px] text-right text-[#040404] whitespace-nowrap">
            {t("checkout.promoCode")} :
          </h2>

          <input
            type="text"
            placeholder={t("checkout.usePromo")}
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 px-3 py-2 border font-[Montserrat-Arabic] font-medium text-[12px] sm:text-[14px] leading-[27px] text-right border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
          />

          <button
            onClick={handlePromoApply}
            className="px-4 py-2 text-purple-600 rounded-lg hover:text-white hover:bg-purple-700 transition-colors text-sm sm:text-base font-medium whitespace-nowrap"
          >
            {t("checkout.apply")}
          </button>
        </div>
      </div>

      <div className='border border-gray-200 rounded-md p-8 space-y-4'>
        {/* المجموع الفرعي */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
            <span className="font-[Montserrat-Arabic] font-bold text-[16px] leading-[100%] text-right text-[#777777]">
              {t("checkout.subtotal")}
            </span>
            <span className="text-purple-600 font-[Montserrat-Arabic] font-bold text-[20px] leading-[24px]">
              200.00 {t("checkout.currency")}
            </span>
          </div>
        </div>

        {/* الشحن */}
        <div className="space-y-4">
          <h3 className="font-[Montserrat-Arabic] font-bold text-[14px] leading-[24px] text-right text-[#040404]">
            {t("checkout.shipping")}
          </h3>
          
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="shipping"
                className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                defaultChecked
              />
              <div className="flex items-center gap-3 text-[#777777]">
                <span className="font-[Montserrat-Arabic] font-normal text-[14px] text-right">{t("checkout.shippingBy")}</span>
                <span className="text-purple-600 font-[Montserrat-Arabic] font-normal text-[14px] text-right">60 {t("checkout.currency")}</span>
              </div>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="shipping"
                className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
              />
              <span className="font-[Montserrat-Arabic] font-normal text-[14px] text-right text-[#777777]">{t("checkout.storePickup")}</span>
            </label>
          </div>

          <div className="flex justify-end items-center pt-2">
            <div className="flex items-center gap-8">
              <span className="font-[Montserrat-Arabic] font-bold text-[14px] text-right cursor-pointer">
                {t("checkout.shipTo")} <span className='text-purple-500 hover:underline'>{t("checkout.city")}</span>
              </span>
              <span className="flex gap-1 items-center font-[Montserrat-Arabic] font-bold text-[14px] text-right hover:underline">
                <CiLocationOn className='text-orange-500 text-lg' /> {t("checkout.changeAddress")}
              </span>
            </div>
          </div>
        </div>

        {/* الإجمالي */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="font-[Montserrat-Arabic] font-bold text-[16px] text-right text-[#777777]">{t("checkout.total")}</span>
            <span className="text-purple-600 font-[Montserrat-Arabic] font-bold text-[20px] leading-[24px]">{t("checkout.totalAmount")}</span>
          </div>
        </div>
      </div>

      {/* زر متابعة الدفع */}
      <div className='flex justify-center items-center'>
        <button className="w-full md:w-[50%] font-[Montserrat-Arabic] text-[14px] text-center mx-auto bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-full font-semibold text-lg transition-colors shadow-lg hover:shadow-xl">
          {t("checkout.proceedPayment")}
        </button>
      </div>
    </div>
  );
}
