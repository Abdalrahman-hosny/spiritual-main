import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEdit,
  FaSave,
  FaTimes,
  FaSpinner,
  FaCamera,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaUserTag,
} from "react-icons/fa";
import DashboardHeader from "../DashboardHeader";
import DashboardSidebar from "../DashboardSidebar";
import styles from "./profile.module.css";

const Profile = () => {
  const { t, i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("view");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Profile data
  const [profile, setProfile] = useState({
    id: null,
    image: null,
    name: "",
    email: "",
    phone: "",
    type: "",
    bio: "",
  });

  // Form data for editing
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bio: "",
    password: "",
    password_confirmation: "",
    country_id: 1,
    image: null,
  });

  // Image preview
  const [imagePreview, setImagePreview] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = sessionStorage.getItem("token");
        if (!token) {
          setError("No authentication token found");
          return;
        }

        const response = await axios.get(
          "https://spiritual.brmjatech.uk/api/profile_vendor",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Accept-Language": i18n.language === "ar" ? "ar" : "en",
            },
          }
        );

        if (response.data.code === 200) {
          const profileData = response.data.data;
          setProfile(profileData);
          setFormData({
            name: profileData.name || "",
            phone: profileData.phone || "",
            bio: profileData.bio || "",
            password: "",
            password_confirmation: "",
            country_id: 1,
            image: null,
          });
          setImagePreview(profileData.image);
        } else {
          setError(
            `API Error: ${response.data.message || "Failed to fetch profile"}`
          );
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        if (err.response) {
          setError(
            `Server Error: ${err.response.status} - ${
              err.response.data?.message || "Unknown error"
            }`
          );
        } else if (err.request) {
          setError("Network Error: Unable to connect to server");
        } else {
          setError("Error loading profile");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [i18n.language]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      const token = sessionStorage.getItem("token");

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("country_id", formData.country_id);

      if (formData.password) {
        formDataToSend.append("password", formData.password);
        formDataToSend.append(
          "password_confirmation",
          formData.password_confirmation
        );
      }

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await axios.post(
        "https://spiritual.brmjatech.uk/api/profile_vendor/update",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Accept-Language": i18n.language === "ar" ? "ar" : "en",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.code === 200) {
        toast.success(t("profile.updateSuccess"));
        // Update profile state
        setProfile((prev) => ({
          ...prev,
          name: formData.name,
          phone: formData.phone,
          bio: formData.bio,
          image: imagePreview,
        }));
        setActiveTab("view");
        // Reset password fields
        setFormData((prev) => ({
          ...prev,
          password: "",
          password_confirmation: "",
        }));
      } else {
        toast.error(response.data.message || t("profile.updateError"));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(t("profile.updateError"));
    } finally {
      setSaving(false);
    }
  };

  // Get type display name
  const getTypeDisplayName = (type) => {
    const typeMap = {
      energy_coach: t("profile.types.energyCoach"),
      spiritual_healer: t("profile.types.spiritualHealer"),
      life_coach: t("profile.types.lifeCoach"),
      quran_teacher: t("profile.types.quranTeacher"),
    };
    return typeMap[type] || type;
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
            <p>{t("profile.loading")}</p>
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
              {t("profile.retry")}
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

        <div className={styles.profilePage}>
          <div className={styles.profileHeader}>
            <h1 className={styles.profileTitle}>{t("profile.title")}</h1>
            <p className={styles.profileSubtitle}>{t("profile.subtitle")}</p>
          </div>

          {/* Tabs */}
          <div className={styles.tabsContainer}>
            <button
              className={`${styles.tabBtn} ${
                activeTab === "view" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("view")}
            >
              <FaUser />
              {t("profile.viewProfile")}
            </button>
            <button
              className={`${styles.tabBtn} ${
                activeTab === "edit" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("edit")}
            >
              <FaEdit />
              {t("profile.editProfile")}
            </button>
          </div>

          {/* View Profile Tab */}
          {activeTab === "view" && (
            <div className={styles.profileCard}>
              <div className={styles.profileImageContainer}>
                {profile.image ? (
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className={styles.profileImage}
                  />
                ) : (
                  <div className={styles.profileImagePlaceholder}>
                    <FaUser />
                  </div>
                )}
              </div>

              <div className={styles.profileInfo}>
                <h2 className={styles.profileName}>{profile.name}</h2>
                <p className={styles.profileType}>
                  {getTypeDisplayName(profile.type)}
                </p>

                <div className={styles.profileDetails}>
                  <div className={styles.detailItem}>
                    <FaEnvelope className={styles.detailIcon} />
                    <span className={styles.detailLabel}>
                      {t("profile.email")}:
                    </span>
                    <span className={styles.detailValue}>{profile.email}</span>
                  </div>

                  <div className={styles.detailItem}>
                    <FaPhone className={styles.detailIcon} />
                    <span className={styles.detailLabel}>
                      {t("profile.phone")}:
                    </span>
                    <span className={styles.detailValue}>{profile.phone}</span>
                  </div>

                  <div className={styles.detailItem}>
                    <FaUserTag className={styles.detailIcon} />
                    <span className={styles.detailLabel}>
                      {t("profile.type")}:
                    </span>
                    <span className={styles.detailValue}>
                      {getTypeDisplayName(profile.type)}
                    </span>
                  </div>

                  {profile.bio && (
                    <div className={styles.detailItem}>
                      <FaGlobe className={styles.detailIcon} />
                      <span className={styles.detailLabel}>
                        {t("profile.bio")}:
                      </span>
                      <span className={styles.detailValue}>{profile.bio}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Edit Profile Tab */}
          {activeTab === "edit" && (
            <div className={styles.editProfileCard}>
              <form onSubmit={handleSubmit} className={styles.profileForm}>
                <div className={styles.formSection}>
                  <h3 className={styles.sectionTitle}>
                    {t("profile.personalInfo")}
                  </h3>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      <FaUser className={styles.inputIcon} />
                      {t("profile.name")}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      <FaPhone className={styles.inputIcon} />
                      {t("profile.phone")}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      <FaGlobe className={styles.inputIcon} />
                      {t("profile.bio")}
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className={styles.formTextarea}
                      rows="4"
                      placeholder={t("profile.bioPlaceholder")}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      <FaCamera className={styles.inputIcon} />
                      {t("profile.profileImage")}
                    </label>
                    <div className={styles.imageUploadContainer}>
                      <input
                        type="file"
                        name="image"
                        onChange={handleInputChange}
                        accept="image/*"
                        className={styles.fileInput}
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className={styles.fileInputLabel}
                      >
                        <FaCamera />
                        {t("profile.chooseImage")}
                      </label>
                      {imagePreview && (
                        <div className={styles.imagePreview}>
                          <img src={imagePreview} alt="Preview" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.formSection}>
                  <h3 className={styles.sectionTitle}>
                    {t("profile.changePassword")}
                  </h3>
                  <p className={styles.sectionNote}>
                    {t("profile.passwordNote")}
                  </p>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      {t("profile.newPassword")}
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      {t("profile.confirmPassword")}
                    </label>
                    <input
                      type="password"
                      name="password_confirmation"
                      value={formData.password_confirmation}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => setActiveTab("view")}
                    disabled={saving}
                  >
                    <FaTimes />
                    {t("profile.cancel")}
                  </button>
                  <button
                    type="submit"
                    className={styles.saveBtn}
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <FaSpinner className={styles.spinner} />
                        {t("profile.saving")}...
                      </>
                    ) : (
                      <>
                        <FaSave />
                        {t("profile.save")}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
