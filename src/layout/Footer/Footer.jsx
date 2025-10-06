import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import { FaBehance, FaFacebook } from "react-icons/fa6";
import logo from "../../assets/loginimg.png";
import { useTranslation } from 'react-i18next';
import phone  from "../../assets/telephone-call2.svg fill.png";
import chat  from "../../assets/bubble-chat2.svg fill.png";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative register text-white">
      <div className="bg-black/90 absolute inset-0"></div>
      <div dir="rtl" className="container relative z-50 mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* العمود 1 */}
        <div className="space-y-4">
          <img src={logo} alt="Logo" className="w-32" />
          <p className="text-sm leading-6">
            {t("footer.description")}
          </p>
        </div>

        {/* العمود 2 */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-purple-500">{t("footer.quickLinks.title")}</h3>
          <ul className="space-y-2 text-sm">
            {t("footer.quickLinks.links", { returnObjects: true }).map((item, idx) => (
              <li key={idx}><a href="#">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* العمود 3 */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-purple-500">{t("footer.myAccount.title")}</h3>
          <ul className="space-y-2 text-sm">
            {t("footer.myAccount.links", { returnObjects: true }).map((item, idx) => (
              <li key={idx}><a href="#">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* العمود 4 */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-purple-500">{t("footer.socialMedia.title")}</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"> <FaFacebook className="w-3 h-3 text-purple-500" />  {t("footer.socialMedia.platforms.0")}</li>
            <li className="flex items-center gap-2"><Linkedin className="w-3 h-3 text-purple-500" /> {t("footer.socialMedia.platforms.1")}</li>
            <li className="flex items-center gap-2"><Twitter  className="w-3 h-3 text-purple-500"/> {t("footer.socialMedia.platforms.2")}</li>
            <li className="flex items-center gap-2"><FaBehance  className="w-3 h-3 text-purple-500"/> {t("footer.socialMedia.platforms.3")}</li>
            <li className="flex items-center gap-2"><Youtube  className="w-3 h-3 text-purple-500"/> {t("footer.socialMedia.platforms.4")}</li>
          </ul>
        </div>
      </div>

      {/* أسفل الفوتر */}
      <div className="border-t relative z-50  border-white/20 mt-8 py-4 text-center text-sm flex flex-col md:flex-row items-center justify-between px-6">
        <p className="font-montserratArabic font-normal text-[15px] leading-[25px] tracking-[0] text-center align-middle">
          {t("footer.copyright")}
          <span className="text-orange-500 font-semibold"> {t("footer.poweredBy")}</span>
        </p>
        <div className="flex items-center gap-6 mt-2 md:mt-0">
          <div className="flex items-center gap-2">
            <div className="text-end">
              <p className="font-montserratArabic font-normal text-[14px] leading-[20px] tracking-[0] text-right align-middle">
                {t("footer.support.title")}
              </p>
              <a href={`mailto:${t("footer.support.email")}`} className="text-purple-500 font-montserratArabic font-normal text-[14px] leading-[20px] tracking-[0] text-right align-middle">
                {t("footer.support.email")}
              </a>
            </div>
            <img src={chat} alt="" />
          </div>

          <div className="flex  gap-2">
            <div className="text-end">
              <p className="font-montserratArabic font-normal text-[14px] leading-[20px] tracking-[0] text-right align-middle">
                {t("footer.contact.title")}
              </p>
              <span className="text-purple-500 font-montserratArabic font-normal text-[14px] leading-[20px] tracking-[0] text-right align-middle">
                {t("footer.contact.phone")}
              </span>
            </div>
            <img src={phone} alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;