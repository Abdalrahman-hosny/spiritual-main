import React from "react";
import { useTranslation } from "react-i18next";
import { FaBars, FaSearch, FaBell, FaUser, FaGlobe } from "react-icons/fa";

const DashboardHeader = ({
  onToggleSidebar,
  currentLanguage,
  onChangeLanguage,
}) => {
  const { t } = useTranslation();

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button
          className="sidebar-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>

        <div className="search-container">
          <input
            type="text"
            placeholder={t("dashboard.search")}
            className="search-input"
          />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>
      </div>

      <div className="header-right">
        {/* Language Switcher */}
        <div className="language-switcher">
          <button
            className={`lang-btn ${currentLanguage === "ar" ? "active" : ""}`}
            onClick={() => onChangeLanguage("ar")}
          >
            ع
          </button>
          <button
            className={`lang-btn ${currentLanguage === "en" ? "active" : ""}`}
            onClick={() => onChangeLanguage("en")}
          >
            En
          </button>
        </div>

        {/* Notifications */}
        <button className="notification-btn">
          <FaBell />
          <span className="notification-badge">3</span>
        </button>

        {/* User Profile */}
        <div className="user-profile">
          <div className="user-avatar">
            <img
              src="https://via.placeholder.com/40x40/4F46E5/FFFFFF?text=M"
              alt="User Avatar"
            />
          </div>
          <div className="user-info">
            <span className="user-name">محمد أحمد</span>
            <span className="user-role">مدير</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
