import React, { useState, useEffect } from 'react';
import { FaRegCircleUser, FaBars, FaGlobe, FaHeart } from 'react-icons/fa6';
import { FaShoppingBag, FaTimes } from 'react-icons/fa';
import logo from "../../assets/navbarlogo.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Navbar({ bg }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [isRTL, i18n.language]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownMouseEnter = () => {
    setIsDesktopDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsDesktopDropdownOpen(false);
  };

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    setIsLanguageDropdownOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setIsAuthDropdownOpen(false);
    navigate("/login");
  };

  const LanguageDropdown = ({ isMobile = false }) => (
    <div className="relative">
      <button
        onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
        className={`${isMobile ? 'w-7 h-7' : 'w-9 xl:w-10 h-9 xl:h-10'} bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200`}
        aria-label="Select Language"
      >
        <FaGlobe className={`${isMobile ? 'text-[12px]' : 'text-[15px] xl:text-[18px]'} text-purple-500`} />
      </button>
      {isLanguageDropdownOpen && (
        <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-32 bg-white shadow-xl rounded-lg border border-gray-100 transition-all duration-200 z-50`}>
          <div className="py-1">
            <button
              onClick={() => handleLanguageChange('ar')}
              className={`w-full px-3 py-2 text-sm font-montserrat-arabic hover:bg-purple-50 transition-colors duration-150 flex items-center justify-between
                ${i18n.language === 'ar' ? 'bg-purple-100 text-purple-600' : 'text-gray-700'}`}
            >
              <span className="text-xs">🇸🇦</span>
              <span>العربية</span>
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`w-full px-3 py-2 text-sm hover:bg-purple-50 transition-colors duration-150 flex items-center justify-between
                ${i18n.language === 'en' ? 'bg-purple-100 text-purple-600' : 'text-gray-700'}`}
            >
              <span className="text-xs">🇺🇸</span>
              <span>English</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const AuthDropdown = ({ isMobile = false }) => {
    const isLoggedIn = !!sessionStorage.getItem("token");
    return (
      <div className="relative  ">
        <button
          onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
          className={`${isMobile ? 'w-7 h-7' : 'w-9 xl:w-10 h-9 xl:h-10'} bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200`}
          aria-label="User Account"
        >
          <FaRegCircleUser className={`${isMobile ? 'text-[12px]' : 'text-[15px] xl:text-[18px]'} text-purple-500`} />
        </button>
        {isAuthDropdownOpen && (
          <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-48 bg-white shadow-xl rounded-lg border border-gray-100 transition-all duration-200 z-50`}>
            <div className="py-1">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-150 ${isRTL ? 'text-right' : 'text-left'}`}
                    onClick={() => setIsAuthDropdownOpen(false)}
                  >
                    {isRTL ? 'الملف الشخصي' : 'Profile'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`w-full px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-150 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {isRTL ? 'تسجيل الخروج' : 'Logout'}
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-150 ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  {isRTL ? 'تسجيل دخول' : 'Login'}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`fixed mb-3 top-0 left-0 w-full z-[9999] bg-transparent backdrop-blur-sm ${bg ? bg : 'bg-black/70'}`}>
      <nav className="w-[95%] lg:w-[90%] xl:w-[85%] 2xl:w-[80%] mx-auto flex items-center justify-between px-2 sm:px-4 py-3 sm:py-4 h-full">
        {/* قائمة سطح المكتب */}
        <div className={`hidden lg:flex items-center ${isRTL ? 'space-x-reverse gap-3' : 'gap-6'}`}>
          <LanguageDropdown />
          <Link to="/wishlist" className="w-9 cursor-pointer xl:w-10 h-9 xl:h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200 relative">
            <FaHeart className="text-[15px] xl:text-[18px] text-purple-500" />
          </Link>
          <Link to="/cart" className="w-9 cursor-pointer xl:w-10 h-9 xl:h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200 relative">
            <FaShoppingBag className="text-[15px] xl:text-[18px] text-purple-500" />
          </Link>
          <AuthDropdown />
          <div className={`flex mx-3 xl:mx-6 gap-2 lg:gap-3 xl:gap-5 bg-white rounded-full py-2 lg:py-3 px-3 lg:px-6 xl:px-8 text-black shadow-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
            {t('navLinks', { returnObjects: true }).map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  {link.hasDropdown ? <div
                    className={`font-montserrat-arabic font-medium text-[14px] lg:text-[15px] xl:text-[17px] transition-colors duration-200 px-2 py-1 rounded-md`}
                  >
                    {link.label}
                  </div> : <Link
                    to={link.path}
                    className={`font-montserrat-arabic font-medium text-[14px] lg:text-[15px] xl:text-[17px] transition-colors duration-200 px-2 py-1 rounded-md
                      ${location.pathname === link.path
                        ? "text-purple-500"
                        : "hover:text-purple-600 text-black hover:bg-purple-50"
                      }`}
                  >
                    {link.label}
                  </Link>}
                  <div className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-1 w-44 bg-white shadow-xl rounded-lg border border-gray-100 transition-all duration-200 z-50
                    ${isDesktopDropdownOpen
                      ? "opacity-100 visible transform translate-y-0"
                      : "opacity-0 invisible transform -translate-y-2"
                    }`}>
                    <div className="py-2">
                      {t('categoriesSubLinks', { returnObjects: true }).map((sublink, index) => (
                        <Link
                          key={sublink.path}
                          to={sublink.path}
                          className={`block px-4 py-2.5 ${isRTL ? 'text-right' : 'text-left'} text-sm font-montserrat-arabic text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-150
                            ${index !== t('categoriesSubLinks', { returnObjects: true }).length - 1 ? 'border-b border-gray-50' : ''}`}
                        >
                          {sublink.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-montserrat-arabic font-medium text-[14px] lg:text-[15px] xl:text-[17px] transition-colors duration-200 px-2 py-1 rounded-md
                    ${location.pathname === link.path
                      ? "text-purple-500 bg-purple-50"
                      : "hover:text-purple-600 text-black hover:bg-purple-50"
                    }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>

        {/* قائمة الهواتف المتوسطة */}
        <div className={`hidden md:flex lg:hidden items-center ${isRTL ? 'space-x-reverse gap-2' : 'gap-2'}`}>
          <LanguageDropdown />
          <div className="mx-2"></div>
          <Link to="/wishlist" className="w-8 cursor-pointer h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200">
            <FaHeart className="text-[14px] text-purple-500" />
          </Link>
          <div className="mx-2"></div>
          <Link to="/cart" className="w-8 cursor-pointer h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200">
            <FaShoppingBag className="text-[14px] text-purple-500" />
          </Link>
          <div className="mx-2"></div>
          <AuthDropdown isMobile={true} />
          <div className="mx-2"></div>
          <button
            onClick={toggleMobileMenu}
            className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-[14px] text-purple-500" />
            ) : (
              <FaBars className="text-[14px] text-purple-500" />
            )}
          </button>
        </div>

        {/* قائمة الهواتف الصغيرة */}
        <div className={`flex md:hidden items-center ${isRTL ? 'space-x-reverse gap-2' : 'gap-2'}`}>
          <LanguageDropdown isMobile={true} />
          <div className="mx-1"></div>
          <Link to="/wishlist" className="w-7 h-7 cursor-pointer bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200">
            <FaHeart className="text-[12px] text-purple-500" />
          </Link>
          <div className="mx-1"></div>
          <Link to="/cart" className="w-7 h-7 cursor-pointer bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200">
            <FaShoppingBag className="text-[12px] text-purple-500" />
          </Link>
          <div className="mx-1"></div>
          <AuthDropdown isMobile={true} />
          <div className="mx-1"></div>
          <button
            onClick={toggleMobileMenu}
            className="w-7 h-7 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-[12px] text-purple-500" />
            ) : (
              <FaBars className="text-[12px] text-purple-500" />
            )}
          </button>
        </div>

        {/* الشعار */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="h-6 sm:h-8 md:h-10 lg:h-11 xl:h-12 2xl:h-14 w-auto"
            />
          </Link>
        </div>
      </nav>

      {/* القائمة المنسدلة للهواتف */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/40" onClick={toggleMobileMenu}>
          <div
            className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} w-full sm:w-80 bg-white shadow-2xl max-h-screen overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-gray-50">
              <h1>روحاني</h1>
              <button
                onClick={toggleMobileMenu}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors duration-200"
                aria-label="Close mobile menu"
              >
                <FaTimes className="text-[16px] text-gray-600" />
              </button>
            </div>
            <div className="py-2">
              {t('navLinks', { returnObjects: true }).map((link) =>
                link.hasDropdown ? (
                  <div key={link.path}>
                    <button
                      onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                      className={`w-full ${isRTL ? 'text-right' : 'text-left'} px-6 py-4 font-montserrat-arabic font-medium text-[16px] sm:text-[18px] transition-all duration-200 flex items-center justify-between
                        ${isCategoriesOpen
                          ? "text-purple-600 bg-purple-50"
                          : "text-gray-800 hover:text-purple-600 hover:bg-gray-50"
                        }`}
                    >
                      <span className={`transform transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`}>
                        ⌄
                      </span>
                      <span>{link.label}</span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isCategoriesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="bg-gray-50 border-t border-gray-100">
                        {t('categoriesSubLinks', { returnObjects: true }).map((sublink, index) => (
                          <Link
                            key={sublink.path}
                            to={sublink.path}
                            onClick={toggleMobileMenu}
                            className={`block px-8 py-3 font-montserrat-arabic text-[14px] sm:text-[16px] text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 ${isRTL ? 'text-right' : 'text-left'}
                              ${location.pathname === sublink.path ? 'text-purple-600 bg-purple-100' : ''}
                              ${index !== t('categoriesSubLinks', { returnObjects: true }).length - 1 ? 'border-b border-gray-100' : ''}`}
                          >
                            {sublink.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={toggleMobileMenu}
                    className={`block px-6 py-4 font-montserrat-arabic font-medium text-[16px] sm:text-[18px] transition-all duration-200 border-b border-gray-100 ${isRTL ? 'text-right' : 'text-left'}
                      ${location.pathname === link.path
                        ? "text-purple-500 bg-purple-50 border-purple-200"
                        : "hover:text-purple-600 hover:bg-gray-50 text-gray-800"
                      }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className={`text-sm text-gray-500 text-center font-montserrat-arabic`}>
                {t('footerText')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* إغلاق القائمة المنسدلة عند الضغط خارجها */}
      {isLanguageDropdownOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsLanguageDropdownOpen(false)}
        />
      )}
      {isAuthDropdownOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsAuthDropdownOpen(false)}
        />
      )}
    </div>
  );
}
