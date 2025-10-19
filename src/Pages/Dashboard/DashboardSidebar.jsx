import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  FaThLarge,
  FaGraduationCap,
  FaUsers,
  FaShoppingBag,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

const DashboardSidebar = ({
  isOpen,
  onToggle,
  currentLanguage,
  onChangeLanguage,
}) => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const menuItems = [
    {
      path: "/dashboard",
      label: "dashboard.sidebar.home",
      icon: <FaThLarge />,
    },
    {
      path: "/dashboard/courses",
      label: "dashboard.sidebar.courses",
      icon: <FaGraduationCap />,
    },
    {
      path: "/dashboard/students",
      label: "dashboard.sidebar.students",
      icon: <FaUsers />,
    },
    {
      path: "/dashboard/store",
      label: "dashboard.sidebar.store",
      icon: <FaShoppingBag />,
    },
    {
      path: "/dashboard/orders",
      label: "dashboard.sidebar.orders",
      icon: <FaClipboardList />,
    },
    {
      path: "/dashboard/settings",
      label: "dashboard.sidebar.settings",
      icon: <FaCog />,
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div className="sidebar-overlay" onClick={onToggle}></div>
      )}

      {/* Sidebar */}
      <aside
        className={`dashboard-sidebar ${isOpen ? "open" : "closed"} ${
          currentLanguage === "ar" ? "rtl" : "ltr"
        }`}
      >
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <h2>{t("dashboard.sidebar.logo")}</h2>
          </div>
          <button
            className="sidebar-close"
            onClick={onToggle}
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-menu">
            {menuItems.map((item, index) => (
              <li key={index} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link ${
                    window.location.pathname === item.path ? "active" : ""
                  }`}
                  onClick={() => isMobile && onToggle()}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{t(item.label)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          {/* Language Switcher in Sidebar */}
          <div className="sidebar-language-switcher">
            <span className="language-label">
              {currentLanguage === "ar" ? "اللغة" : "Language"}
            </span>
            <div className="language-buttons">
              <button
                className={`lang-btn ${
                  currentLanguage === "ar" ? "active" : ""
                }`}
                onClick={() => onChangeLanguage("ar")}
              >
                ع
              </button>
              <button
                className={`lang-btn ${
                  currentLanguage === "en" ? "active" : ""
                }`}
                onClick={() => onChangeLanguage("en")}
              >
                En
              </button>
            </div>
          </div>

          {/* Logout Button */}
          <button className="logout-btn">
            <FaSignOutAlt className="logout-icon" />
            <span className="logout-text">{t("dashboard.sidebar.logout")}</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
