import React, { useEffect } from "react";
import plant from "../../assets/mandala_1265367 1.png";
import { ProductCart } from "./ProductCart";
import CheckoutSummary from "./Summary";

import { useTranslation } from "react-i18next"; // 👈 استدعاء i18n

export default function Cart() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scrolling
    });
  }, []);

  return (
    <div>
      <div className="relative">
        <div className="image">
          
          
          <div className="relative bg-black/70">
          <div className="pt-[80px]"></div>
            <div className="relative overflow-hidden min-h-[35vh] sm:min-h-[40vh] md:min-h-[45vh] z-10 flex justify-center items-center px-4">
              <div className="text-center p-4 md:p-8 max-w-4xl">
                <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                  {t("cart.title")}
                </h1>
                <div>
                  <p className="font-[Montserrat-Arabic] text-white font-normal text-[24px] leading-[100%] tracking-[0] text-center align-middle [font-variant:small-caps]">
                    {t("cart.breadcrumb")} /{" "}
                    <span className="text-purple-500">{t("cart.title")}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Plant decoration */}
            <div className="absolute z-40 -bottom-6 sm:-bottom-8 left-0 transform -translate-x-1/4 translate-y-1/4 sm:-translate-x-1/3 sm:translate-y-1/3 md:-translate-x-1/5 md:translate-y-1/5 lg:-translate-x-1/3 lg:translate-y-1/3">
              <div className="relative">
                <div className="absolute -top-12 left-2 w-24 h-24 sm:w-32 sm:h-32 sm:-top-16 sm:left-4 md:w-48 md:h-48 md:-top-24 md:left-6 lg:w-64 lg:h-64 lg:-top-32 lg:left-8 xl:w-80 xl:h-80 xl:-top-36 rounded-full">
                  <img
                    src={plant}
                    alt="Moon Planet"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductCart />
      <CheckoutSummary />
      
    </div>
  );
}
