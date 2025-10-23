import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaBars, FaBell } from "react-icons/fa";
import userDefaultImage from "../../assets/user.png";

const DashboardHeader = ({
  onToggleSidebar,
  currentLanguage,
  onChangeLanguage,
}) => {
  const { t } = useTranslation("global");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from session storage
    const userData = sessionStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Default profile image
  const defaultProfileImage = userDefaultImage;

  // Get user type in Arabic
  const getUserType = (type) => {
    const types = {
      energy_coach: "مدرب طاقة",
      admin: "مدير",
      user: "مستخدم",
      trainer: "مدرب",
    };
    return types[type] || "مستخدم";
  };

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
              src={user?.image || defaultProfileImage}
              alt={`${user?.name || "User"} Avatar`}
              onError={(e) => {
                e.target.src = defaultProfileImage;
              }}
            />
          </div>
          <div className="user-info">
            <span className="user-name">{user?.name || "مستخدم"}</span>
            <span className="user-role">{getUserType(user?.type)}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
