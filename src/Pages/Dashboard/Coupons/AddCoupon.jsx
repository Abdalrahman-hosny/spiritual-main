import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaTimes,
  FaTag,
  FaPercentage,
  FaCalendar,
  FaUsers,
  FaSave,
} from "react-icons/fa";
import styles from "./addCoupon.module.css";

const AddCoupon = ({ onClose, onCouponAdded }) => {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    discount_precentage: "",
    discount_type: "percentage",
    start_date: "",
    end_date: "",
    limit: "",
    time_used: "0",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.code ||
      !formData.discount_precentage ||
      !formData.start_date ||
      !formData.end_date ||
      !formData.limit
    ) {
      toast.error(
        i18n.language === "ar"
          ? "يرجى ملء جميع الحقول المطلوبة"
          : "Please fill all required fields"
      );
      return;
    }

    // Validate dates
    const startDate = new Date(formData.start_date);
    const endDate = new Date(formData.end_date);

    if (endDate <= startDate) {
      toast.error(
        i18n.language === "ar"
          ? "تاريخ النهاية يجب أن يكون بعد تاريخ البداية"
          : "End date must be after start date"
      );
      return;
    }

    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");

      const submitData = new FormData();
      submitData.append("code", formData.code);
      submitData.append("discount_precentage", formData.discount_precentage);
      submitData.append("discount_type", formData.discount_type);
      submitData.append("start_date", formData.start_date);
      submitData.append("end_date", formData.end_date);
      submitData.append("limit", formData.limit);
      submitData.append("time_used", formData.time_used);

      const response = await axios.post(
        "https://spiritual.brmjatech.uk/api/dashboard/coupon",
        submitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": i18n.language === "ar" ? "ar" : "en",
          },
        }
      );

      if (response.data.code === 201) {
        toast.success(
          i18n.language === "ar"
            ? "تم إضافة الكوبون بنجاح"
            : "Coupon added successfully"
        );
        onCouponAdded();
      } else {
        toast.error(
          response.data.message ||
            (i18n.language === "ar"
              ? "خطأ في إضافة الكوبون"
              : "Error adding coupon")
        );
      }
    } catch (error) {
      console.error("Error adding coupon:", error);
      toast.error(
        i18n.language === "ar" ? "خطأ في إضافة الكوبون" : "Error adding coupon"
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
          <h2>
            {i18n.language === "ar" ? "إضافة كوبون جديد" : "Add New Coupon"}
          </h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className={styles.modalContent}>
          <form onSubmit={handleSubmit} className={styles.couponForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="code">
                  <FaTag className={styles.labelIcon} />
                  {i18n.language === "ar" ? "كود الكوبون" : "Coupon Code"} *
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder={
                    i18n.language === "ar"
                      ? "أدخل كود الكوبون"
                      : "Enter coupon code"
                  }
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="discount_precentage">
                  <FaPercentage className={styles.labelIcon} />
                  {i18n.language === "ar"
                    ? "نسبة الخصم"
                    : "Discount Percentage"}{" "}
                  *
                </label>
                <input
                  type="number"
                  id="discount_precentage"
                  name="discount_precentage"
                  value={formData.discount_precentage}
                  onChange={handleInputChange}
                  placeholder={
                    i18n.language === "ar"
                      ? "أدخل نسبة الخصم"
                      : "Enter discount percentage"
                  }
                  min="1"
                  max="100"
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="discount_type">
                  <FaTag className={styles.labelIcon} />
                  {i18n.language === "ar" ? "نوع الخصم" : "Discount Type"} *
                </label>
                <select
                  id="discount_type"
                  name="discount_type"
                  value={formData.discount_type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="percentage">
                    {i18n.language === "ar" ? "نسبة مئوية" : "Percentage"}
                  </option>
                  <option value="fixed">
                    {i18n.language === "ar" ? "مبلغ ثابت" : "Fixed Amount"}
                  </option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="limit">
                  <FaUsers className={styles.labelIcon} />
                  {i18n.language === "ar" ? "حد الاستخدام" : "Usage Limit"} *
                </label>
                <input
                  type="number"
                  id="limit"
                  name="limit"
                  value={formData.limit}
                  onChange={handleInputChange}
                  placeholder={
                    i18n.language === "ar"
                      ? "أدخل حد الاستخدام"
                      : "Enter usage limit"
                  }
                  min="1"
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="start_date">
                  <FaCalendar className={styles.labelIcon} />
                  {i18n.language === "ar" ? "تاريخ البداية" : "Start Date"} *
                </label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="end_date">
                  <FaCalendar className={styles.labelIcon} />
                  {i18n.language === "ar" ? "تاريخ النهاية" : "End Date"} *
                </label>
                <input
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  required
                />
              </div>
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
                className={styles.saveBtn}
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

export default AddCoupon;
