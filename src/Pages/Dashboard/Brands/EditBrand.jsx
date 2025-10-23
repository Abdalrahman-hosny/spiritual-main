import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaTimes,
  FaUpload,
  FaImage,
  FaTag,
  FaGlobe,
  FaSave,
} from "react-icons/fa";
import styles from "./brandModal.module.css";

const EditBrand = ({ brand, onClose, onBrandUpdated }) => {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    "name[ar]": "",
    "name[en]": "",
    slug: "",
    desc: "",
    logo: null,
  });
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    if (brand) {
      setFormData({
        "name[ar]": brand.name || "",
        "name[en]": brand.name || "",
        slug: brand.slug || "",
        desc: brand.desc || "",
        logo: null,
      });
      if (brand.logo) {
        setLogoPreview(brand.logo);
      }
    }
  }, [brand]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        logo: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setFormData((prev) => ({
      ...prev,
      logo: null,
    }));
    setLogoPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData["name[ar]"] || !formData["name[en]"] || !formData.slug) {
      toast.error(
        i18n.language === "ar"
          ? "يرجى ملء جميع الحقول المطلوبة"
          : "Please fill all required fields"
      );
      return;
    }

    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");

      const submitData = new FormData();
      submitData.append("name[ar]", formData["name[ar]"]);
      submitData.append("name[en]", formData["name[en]"]);
      submitData.append("slug", formData.slug);
      submitData.append("desc", formData.desc);
      if (formData.logo) {
        submitData.append("logo", formData.logo);
      }

      const response = await axios.post(
        `https://spiritual.brmjatech.uk/api/dashboard/brand/${brand.id}`,
        submitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": i18n.language === "ar" ? "ar" : "en",
          },
        }
      );

      if (response.data.code === 200) {
        toast.success(
          i18n.language === "ar"
            ? "تم تحديث البراند بنجاح"
            : "Brand updated successfully"
        );
        onBrandUpdated(response.data.data);
      } else {
        toast.error(
          response.data.message ||
            (i18n.language === "ar"
              ? "خطأ في تحديث البراند"
              : "Error updating brand")
        );
      }
    } catch (error) {
      console.error("Error updating brand:", error);
      toast.error(
        i18n.language === "ar" ? "خطأ في تحديث البراند" : "Error updating brand"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2>{i18n.language === "ar" ? "تعديل البراند" : "Edit Brand"}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className={styles.modalContent}>
          <form onSubmit={handleSubmit} className={styles.brandForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name[ar]">
                  {i18n.language === "ar" ? "الاسم بالعربية" : "Name in Arabic"}
                  <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="name[ar]"
                  name="name[ar]"
                  value={formData["name[ar]"]}
                  onChange={handleInputChange}
                  placeholder={
                    i18n.language === "ar"
                      ? "أدخل الاسم بالعربية"
                      : "Enter name in Arabic"
                  }
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="name[en]">
                  {i18n.language === "ar"
                    ? "الاسم بالإنجليزية"
                    : "Name in English"}
                  <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="name[en]"
                  name="name[en]"
                  value={formData["name[en]"]}
                  onChange={handleInputChange}
                  placeholder={
                    i18n.language === "ar"
                      ? "أدخل الاسم بالإنجليزية"
                      : "Enter name in English"
                  }
                  required
                />
              </div>
            </div>

            <div className={styles.formRowSingle}>
              <div className={styles.formGroup}>
                <label htmlFor="slug">
                  {i18n.language === "ar" ? "الرابط" : "Slug"}
                  <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder={
                    i18n.language === "ar" ? "أدخل الرابط" : "Enter slug"
                  }
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="desc">
                {i18n.language === "ar" ? "الوصف" : "Description"}
              </label>
              <textarea
                id="desc"
                name="desc"
                value={formData.desc}
                onChange={handleInputChange}
                placeholder={
                  i18n.language === "ar"
                    ? "أدخل وصف البراند"
                    : "Enter brand description"
                }
                rows="4"
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                {i18n.language === "ar" ? "شعار البراند" : "Brand Logo"}
              </label>
              <div className={styles.fileInputGroup}>
                <input
                  type="file"
                  id="logo"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className={styles.fileInput}
                />
                <label htmlFor="logo" className={styles.fileInputLabel}>
                  <FaUpload />
                  {i18n.language === "ar" ? "اختر صورة" : "Choose Image"}
                </label>
              </div>

              {logoPreview && (
                <div className={styles.imagePreviewContainer}>
                  <div className={styles.imagePreviewItem}>
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className={styles.previewImage}
                    />
                    <button
                      type="button"
                      className={styles.removeImageBtn}
                      onClick={removeLogo}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={onClose}
                disabled={loading}
              >
                {i18n.language === "ar" ? "إلغاء" : "Cancel"}
              </button>
              <button
                type="submit"
                className={`${styles.saveBtn} ${loading ? styles.loading : ""}`}
                disabled={loading}
              >
                <FaSave />
                {loading
                  ? i18n.language === "ar"
                    ? "جاري الحفظ..."
                    : "Saving..."
                  : i18n.language === "ar"
                  ? "حفظ"
                  : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBrand;
