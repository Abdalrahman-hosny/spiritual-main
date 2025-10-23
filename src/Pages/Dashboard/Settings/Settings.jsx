import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  FaCog,
  FaSpinner,
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaLinkedin,
  FaWhatsapp,
  FaCopyright,
  FaImage,
  FaLink,
} from "react-icons/fa";
import DashboardHeader from "../DashboardHeader";
import DashboardSidebar from "../DashboardSidebar";
import styles from "./settings.module.css";

const Settings = () => {
  const { t, i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Settings data
  const [settings, setSettings] = useState({
    name: "",
    title: "",
    desc: "",
    address: "",
    metaKey: "",
    metaDesc: "",
    phone: "",
    whatsapp: "",
    email: "",
    support: "",
    facebook: "",
    xUrl: "",
    youtube: "",
    instagram: "",
    tiktok: "",
    linkedin: "",
    logo: "",
    favicon: "",
    copyright: "",
    promotion: "",
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Fetch settings data
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = sessionStorage.getItem("token");
        if (!token) {
          setError("No authentication token found");
          return;
        }

        const response = await axios.get(
          "https://spiritual.brmjatech.uk/api/settings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Accept-Language": i18n.language === "ar" ? "ar" : "en",
            },
          }
        );

        if (response.data.code === 200) {
          const settingsData = response.data.data[0] || {};
          setSettings(settingsData);
        } else {
          setError(
            `API Error: ${response.data.message || "Failed to fetch settings"}`
          );
        }
      } catch (err) {
        console.error("Error fetching settings:", err);
        if (err.response) {
          setError(
            `Server Error: ${err.response.status} - ${
              err.response.data?.message || "Unknown error"
            }`
          );
        } else if (err.request) {
          setError("Network Error: Unable to connect to server");
        } else {
          setError("Error loading settings");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [i18n.language]);

  // Handle WhatsApp click
  const handleWhatsAppClick = () => {
    if (settings.whatsapp) {
      const phoneNumber = settings.whatsapp.replace(/[^0-9]/g, "");
      window.open(`https://wa.me/${phoneNumber}`, "_blank");
    }
  };

  // Social media icons mapping
  const socialIcons = {
    facebook: FaFacebook,
    xUrl: FaTwitter,
    youtube: FaYoutube,
    instagram: FaInstagram,
    tiktok: FaTiktok,
    linkedin: FaLinkedin,
    whatsapp: FaWhatsapp,
  };

  if (loading) {
    return (
      <div
        className={styles.dashboardContainer}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
      >
        <DashboardSidebar
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
          currentLanguage={i18n.language}
          onChangeLanguage={changeLanguage}
        />
        <div
          className={`${styles.mainContent} ${
            !sidebarOpen ? styles.sidebarClosed : ""
          }`}
        >
          <DashboardHeader
            onToggleSidebar={toggleSidebar}
            currentLanguage={i18n.language}
            onChangeLanguage={changeLanguage}
          />
          <div className={styles.loadingContainer}>
            <FaSpinner className={styles.spinner} />
            <p>{t("settings.loading")}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={styles.dashboardContainer}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
      >
        <DashboardSidebar
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
          currentLanguage={i18n.language}
          onChangeLanguage={changeLanguage}
        />
        <div
          className={`${styles.mainContent} ${
            !sidebarOpen ? styles.sidebarClosed : ""
          }`}
        >
          <DashboardHeader
            onToggleSidebar={toggleSidebar}
            currentLanguage={i18n.language}
            onChangeLanguage={changeLanguage}
          />
          <div className={styles.errorContainer}>
            <p className={styles.errorMessage}>{error}</p>
            <button
              className={styles.retryBtn}
              onClick={() => window.location.reload()}
            >
              {t("settings.retry")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.dashboardContainer}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <DashboardSidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        currentLanguage={i18n.language}
        onChangeLanguage={changeLanguage}
      />

      <div
        className={`${styles.mainContent} ${
          !sidebarOpen ? styles.sidebarClosed : ""
        }`}
      >
        <DashboardHeader
          onToggleSidebar={toggleSidebar}
          currentLanguage={i18n.language}
          onChangeLanguage={changeLanguage}
        />

        <div className={styles.settingsPage}>
          <div className={styles.settingsHeader}>
            <div className={styles.headerContent}>
              <div className={styles.headerIcon}>
                <FaCog />
              </div>
              <div>
                <h1 className={styles.settingsTitle}>{t("settings.title")}</h1>
                <p className={styles.settingsSubtitle}>
                  {t("settings.subtitle")}
                </p>
              </div>
            </div>
          </div>

          <div className={styles.settingsContent}>
            {/* Company Information */}
            <div className={styles.settingsCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>
                  <FaGlobe />
                  {t("settings.companyInfo")}
                </h3>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      {t("settings.companyName")}
                    </label>
                    <div className={styles.displayValue}>{settings.name}</div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      {t("settings.title")}
                    </label>
                    <div className={styles.displayValue}>{settings.title}</div>
                  </div>

                  <div className={styles.formGroupFull}>
                    <label className={styles.formLabel}>
                      {t("settings.description")}
                    </label>
                    <div className={styles.displayValue}>{settings.desc}</div>
                  </div>

                  <div className={styles.formGroupFull}>
                    <label className={styles.formLabel}>
                      {t("settings.address")}
                    </label>
                    <div className={styles.displayValue}>
                      <FaMapMarkerAlt className={styles.valueIcon} />
                      {settings.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className={styles.settingsCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>
                  <FaEnvelope />
                  {t("settings.contactInfo")}
                </h3>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      {t("settings.email")}
                    </label>
                    <div className={styles.displayValue}>
                      <FaEnvelope className={styles.valueIcon} />
                      {settings.email}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      {t("settings.supportEmail")}
                    </label>
                    <div className={styles.displayValue}>
                      <FaEnvelope className={styles.valueIcon} />
                      {settings.support}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      {t("settings.phone")}
                    </label>
                    <div className={styles.displayValue}>
                      <FaPhone className={styles.valueIcon} />
                      {settings.phone}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      {t("settings.whatsapp")}
                    </label>
                    <div
                      className={styles.displayValue}
                      onClick={handleWhatsAppClick}
                      style={{ cursor: "pointer" }}
                    >
                      <FaWhatsapp className={styles.valueIcon} />
                      {settings.whatsapp}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className={styles.settingsCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>
                  <FaLink />
                  {t("settings.socialMedia")}
                </h3>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.socialGrid}>
                  {Object.entries(socialIcons).map(([key, Icon]) => {
                    const IconComponent = Icon;
                    return (
                      <div key={key} className={styles.socialItem}>
                        <div className={styles.socialIcon}>
                          <IconComponent />
                        </div>
                        <div className={styles.socialContent}>
                          <label className={styles.socialLabel}>
                            {t(`settings.social.${key}`)}
                          </label>
                          <div className={styles.displayValue}>
                            {settings[key] ? (
                              <span className={styles.socialName}>
                                {t(`settings.social.${key}`)}
                              </span>
                            ) : (
                              <span className={styles.noValue}>
                                {t("settings.notSet")}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SEO & Meta */}
            <div className={styles.settingsCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>
                  <FaLink />
                  {t("settings.seoMeta")}
                </h3>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroupFull}>
                    <label className={styles.formLabel}>
                      {t("settings.metaKeywords")}
                    </label>
                    <div className={styles.displayValue}>
                      {settings.metaKey}
                    </div>
                  </div>

                  <div className={styles.formGroupFull}>
                    <label className={styles.formLabel}>
                      {t("settings.metaDescription")}
                    </label>
                    <div className={styles.displayValue}>
                      {settings.metaDesc}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Branding */}
            <div className={styles.settingsCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>
                  <FaImage />
                  {t("settings.branding")}
                </h3>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      {t("settings.logo")}
                    </label>
                    <div className={styles.displayValue}>
                      {settings.logo ? (
                        <div className={styles.imagePreview}>
                          <img src={settings.logo} alt="Logo" />
                        </div>
                      ) : (
                        <span className={styles.noValue}>
                          {t("settings.notSet")}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      {t("settings.favicon")}
                    </label>
                    <div className={styles.displayValue}>
                      {settings.favicon ? (
                        <div className={styles.imagePreview}>
                          <img src={settings.favicon} alt="Favicon" />
                        </div>
                      ) : (
                        <span className={styles.noValue}>
                          {t("settings.notSet")}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.formGroupFull}>
                    <label className={styles.formLabel}>
                      {t("settings.copyright")}
                    </label>
                    <div className={styles.displayValue}>
                      <FaCopyright className={styles.valueIcon} />
                      {settings.copyright}
                    </div>
                  </div>

                  <div className={styles.formGroupFull}>
                    <label className={styles.formLabel}>
                      {t("settings.promotion")}
                    </label>
                    <div className={styles.displayValue}>
                      {settings.promotion ? (
                        <span className={styles.socialName}>
                          {settings.promotion}
                        </span>
                      ) : (
                        <span className={styles.noValue}>
                          {t("settings.notSet")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
