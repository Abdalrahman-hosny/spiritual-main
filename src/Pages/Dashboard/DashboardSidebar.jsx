import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaThLarge,
  FaGraduationCap,
  FaUsers,
  FaTag,
  FaShoppingBag,
  FaClipboardList,
  FaCog,
  FaUser,
  FaSignOutAlt,
  FaTimes,
  FaTicketAlt,
} from "react-icons/fa";
import logo from "../../assets/navbarlogo.png";
import styles from "./DashboardSidebar.module.css";

const DashboardSidebar = ({
  isOpen,
  onToggle,
  currentLanguage,
  onChangeLanguage,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      const token = sessionStorage.getItem("token");

      if (!token) {
        toast.error("لا يوجد token للخروج");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        "https://spiritual.brmjatech.uk/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.code === 200) {
        // Clear session storage
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        // Show success message
        toast.success(response.data.message || "تم تسجيل الخروج بنجاح");

        // Redirect to login page
        navigate("/login");
      } else {
        toast.error("خطأ في تسجيل الخروج");
      }
    } catch (error) {
      console.error("Logout error:", error);

      // Even if API fails, clear local storage and redirect
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");

      if (error.response?.data?.message) {
        toast.success(error.response.data.message);
      } else {
        toast.success("تم تسجيل الخروج بنجاح");
      }

      navigate("/login");
    } finally {
      setLogoutLoading(false);
    }
  };

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
      path: "/dashboard/brands",
      label: "dashboard.sidebar.brands",
      icon: <FaTag />,
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
      path: "/dashboard/coupons",
      label: "dashboard.sidebar.coupons",
      icon: <FaTicketAlt />,
    },
    {
      path: "/dashboard/settings",
      label: "dashboard.sidebar.settings",
      icon: <FaCog />,
    },
    {
      path: "/dashboard/profile",
      label: "dashboard.sidebar.profile",
      icon: <FaUser />,
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div className={styles.sidebarOverlay} onClick={onToggle}></div>
      )}

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed} ${
          currentLanguage === "ar" ? styles.rtl : styles.ltr
        }`}
      >
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarLogo}>
            <img src={logo} alt="logo" />
          </div>
          <button
            className={styles.sidebarClose}
            onClick={onToggle}
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          <ul className={styles.navMenu}>
            {menuItems.map((item, index) => (
              <li key={index} className={styles.navItem}>
                <Link
                  to={item.path}
                  className={`${styles.navLink} ${
                    window.location.pathname === item.path ? styles.active : ""
                  }`}
                  onClick={() => isMobile && onToggle()}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navText}>{t(item.label)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.sidebarFooter}>
          {/* Language Switcher in Sidebar */}
          <div className={styles.sidebarLanguageSwitcher}>
            <span className={styles.languageLabel}>
              {currentLanguage === "ar" ? "اللغة" : "Language"}
            </span>
            <div className={styles.languageButtons}>
              <button
                className={`${styles.langBtn} ${
                  currentLanguage === "ar" ? styles.active : ""
                }`}
                onClick={() => onChangeLanguage("ar")}
              >
                ع
              </button>
              <button
                className={`${styles.langBtn} ${
                  currentLanguage === "en" ? styles.active : ""
                }`}
                onClick={() => onChangeLanguage("en")}
              >
                En
              </button>
            </div>
          </div>

          {/* Logout Button */}
          <button
            className={styles.logoutBtn}
            onClick={handleLogout}
            disabled={logoutLoading}
          >
            <FaSignOutAlt className={styles.logoutIcon} />
            <span className={styles.logoutText}>
              {logoutLoading
                ? "جاري تسجيل الخروج..."
                : t("dashboard.sidebar.logout")}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
