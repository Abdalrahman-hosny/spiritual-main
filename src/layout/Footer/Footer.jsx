import React, { useEffect, useState } from "react";
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import { FaBehance, FaFacebook } from "react-icons/fa6";
import logo from "../../assets/loginimg.png";
import { useTranslation } from "react-i18next";
import phone from "../../assets/telephone-call2.svg fill.png";
import chat from "../../assets/bubble-chat2.svg fill.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Footer = () => {
  const { t } = useTranslation();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(
          "https://spiritual.brmjatech.uk/api/settings"
        );
        if (response.data.code === 200 && response.data.data.length > 0) {
          setSettings(response.data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <footer className="relative register text-white">
      <div className="bg-black/90 absolute inset-0"></div>
      <div
        dir="rtl"
        className="container relative z-50 mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8"
      >
        {/* العمود 1 */}
        <div className="space-y-4">
          <img src={settings?.logo || logo} alt="Logo" className="w-32" />
          <p className="text-sm leading-6">
            {settings?.desc || t("footer.description")}
          </p>
        </div>

        {/* العمود 2 */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-purple-500">
            {t("footer.quickLinks.title")}
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-purple-500 transition-colors">
                {t("footer.legal.home")}
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                className="hover:text-purple-500 transition-colors"
              >
                {t("footer.legal.aboutus")}
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                className="hover:text-purple-500 transition-colors"
              >
                {t("footer.legal.ContactUs")}
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                className="hover:text-purple-500 transition-colors"
              >
                {t("footer.legal.shop")}
              </Link>
            </li>
          </ul>
        </div>

        {/* العمود 3 */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-purple-500">
            {t("footer.legal.title")}
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/about-us"
                className="hover:text-purple-500 transition-colors"
              >
                {t("footer.legal.aboutus")}
              </Link>
            </li>
            <li>
              <Link
                to="/terms-and-conditions"
                className="hover:text-purple-500 transition-colors"
              >
                {t("footer.legal.terms")}
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-purple-500 transition-colors"
              >
                {t("footer.legal.privacy")}
              </Link>
            </li>
            <li>
              <Link
                to="/faqs"
                className="hover:text-purple-500 transition-colors"
              >
                {t("footer.legal.faqs")}
              </Link>
            </li>
          </ul>
        </div>

        {/* العمود 4 */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-purple-500">
            {t("footer.socialMedia.title")}
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaFacebook className="w-3 h-3 text-purple-500" />
              <a
                href={settings?.facebook || "#"}
                className="hover:text-purple-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("footer.socialMedia.platforms.0")}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Linkedin className="w-3 h-3 text-purple-500" />
              <a
                href={settings?.linkedin || "#"}
                className="hover:text-purple-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("footer.socialMedia.platforms.1")}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Twitter className="w-3 h-3 text-purple-500" />
              <a
                href={settings?.xUrl || "#"}
                className="hover:text-purple-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("footer.socialMedia.platforms.2")}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaBehance className="w-3 h-3 text-purple-500" />
              <a href="#" className="hover:text-purple-500 transition-colors">
                {t("footer.socialMedia.platforms.3")}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Youtube className="w-3 h-3 text-purple-500" />
              <a
                href={settings?.youtube || "#"}
                className="hover:text-purple-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("footer.socialMedia.platforms.4")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* أسفل الفوتر */}
      <div className="border-t relative z-50 border-white/20 mt-8 py-4 text-center text-sm flex flex-col md:flex-row items-center justify-between px-6">
        <p className="font-montserratArabic font-normal text-[15px] leading-[25px] tracking-[0] text-center align-middle">
          {settings?.copyright || t("footer.copyright")}
          <span className="text-orange-500 font-semibold">
            {" "}
            {t("footer.poweredBy")}
          </span>
        </p>
        <div className="flex items-center gap-6 mt-2 md:mt-0">
          <div className="flex items-center gap-2">
            <div className="text-end">
              <p className="font-montserratArabic font-normal text-[14px] leading-[20px] tracking-[0] text-right align-middle">
                {t("footer.support.title")}
              </p>
              <a
                href={`mailto:${
                  settings?.support || t("footer.support.email")
                }`}
                className="text-purple-500 font-montserratArabic font-normal text-[14px] leading-[20px] tracking-[0] text-right align-middle"
              >
                {settings?.support || t("footer.support.email")}
              </a>
            </div>
            <img src={chat} alt="Chat" />
          </div>
          <div className="flex gap-2">
            <div className="text-end">
              <p className="font-montserratArabic font-normal text-[14px] leading-[20px] tracking-[0] text-right align-middle">
                {t("footer.contact.title")}
              </p>
              <a
                href={`tel:${settings?.phone || t("footer.contact.phone")}`}
                className="text-purple-500 font-montserratArabic font-normal text-[14px] leading-[20px] tracking-[0] text-right align-middle"
              >
                {settings?.phone || t("footer.contact.phone")}
              </a>
            </div>
            <img src={phone} alt="Phone" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
