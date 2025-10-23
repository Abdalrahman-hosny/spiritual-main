import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaTimes,
  FaTag,
  FaPercentage,
  FaCalendar,
  FaUsers,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import styles from "./couponDetails.module.css";

const CouponDetails = ({ coupon, onClose }) => {
  const { i18n } = useTranslation();

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(i18n.language === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate usage percentage
  const getUsagePercentage = (used, limit) => {
    if (limit === 0) return 0;
    return Math.round((used / limit) * 100);
  };

  // Check if coupon is expired
  const isExpired = () => {
    const endDate = new Date(coupon.end_date);
    const now = new Date();
    return endDate < now;
  };

  // Check if coupon is active
  const isActive = () => {
    return coupon.is_active == 1 && !isExpired();
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      style={{ zIndex: 9999 }}
    >
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2>
            {i18n.language === "ar" ? "تفاصيل الكوبون" : "Coupon Details"}
          </h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.couponDetails}>
            <div className={styles.couponHeader}>
              <div className={styles.couponCodeLarge}>
                <FaTag className={styles.codeIconLarge} />
                <span className={styles.codeTextLarge}>{coupon.code}</span>
              </div>
              <div className={styles.couponStatusLarge}>
                <span
                  className={`${styles.statusBadgeLarge} ${
                    isActive() ? styles.active : styles.inactive
                  }`}
                >
                  {isActive()
                    ? i18n.language === "ar"
                      ? "نشط"
                      : "Active"
                    : isExpired()
                    ? i18n.language === "ar"
                      ? "منتهي الصلاحية"
                      : "Expired"
                    : i18n.language === "ar"
                    ? "غير نشط"
                    : "Inactive"}
                </span>
              </div>
            </div>

            <div className={styles.couponDetailsGrid}>
              <div className={styles.detailsSection}>
                <h5 className={styles.sectionTitle}>
                  {i18n.language === "ar"
                    ? "معلومات الخصم"
                    : "Discount Information"}
                </h5>
                <div className={styles.detailsRow}>
                  <div className={styles.detailItem}>
                    <FaPercentage className={styles.detailIcon} />
                    <div className={styles.detailContent}>
                      <span className={styles.detailLabel}>
                        {i18n.language === "ar"
                          ? "نسبة الخصم"
                          : "Discount Percentage"}
                      </span>
                      <span className={styles.detailValue}>
                        {coupon.discount_precentage}%
                      </span>
                    </div>
                  </div>
                  <div className={styles.detailItem}>
                    <FaTag className={styles.detailIcon} />
                    <div className={styles.detailContent}>
                      <span className={styles.detailLabel}>
                        {i18n.language === "ar" ? "نوع الخصم" : "Discount Type"}
                      </span>
                      <span className={styles.detailValue}>
                        {coupon.discount_type === "percentage"
                          ? i18n.language === "ar"
                            ? "نسبة مئوية"
                            : "Percentage"
                          : i18n.language === "ar"
                          ? "مبلغ ثابت"
                          : "Fixed Amount"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.detailsSection}>
                <h5 className={styles.sectionTitle}>
                  {i18n.language === "ar" ? "التواريخ" : "Dates"}
                </h5>
                <div className={styles.detailsRow}>
                  <div className={styles.detailItem}>
                    <FaCalendar className={styles.detailIcon} />
                    <div className={styles.detailContent}>
                      <span className={styles.detailLabel}>
                        {i18n.language === "ar"
                          ? "تاريخ البداية"
                          : "Start Date"}
                      </span>
                      <span className={styles.detailValue}>
                        {formatDate(coupon.start_date)}
                      </span>
                    </div>
                  </div>
                  <div className={styles.detailItem}>
                    <FaCalendar className={styles.detailIcon} />
                    <div className={styles.detailContent}>
                      <span className={styles.detailLabel}>
                        {i18n.language === "ar" ? "تاريخ النهاية" : "End Date"}
                      </span>
                      <span className={styles.detailValue}>
                        {formatDate(coupon.end_date)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.detailsSection}>
                <h5 className={styles.sectionTitle}>
                  {i18n.language === "ar"
                    ? "إحصائيات الاستخدام"
                    : "Usage Statistics"}
                </h5>
                <div className={styles.detailsRow}>
                  <div className={styles.detailItem}>
                    <FaUsers className={styles.detailIcon} />
                    <div className={styles.detailContent}>
                      <span className={styles.detailLabel}>
                        {i18n.language === "ar"
                          ? "مرات الاستخدام"
                          : "Times Used"}
                      </span>
                      <span className={styles.detailValue}>
                        {coupon.time_used} / {coupon.limit}
                      </span>
                    </div>
                  </div>
                  <div className={styles.detailItem}>
                    <FaCheckCircle className={styles.detailIcon} />
                    <div className={styles.detailContent}>
                      <span className={styles.detailLabel}>
                        {i18n.language === "ar"
                          ? "نسبة الاستخدام"
                          : "Usage Percentage"}
                      </span>
                      <span className={styles.detailValue}>
                        {getUsagePercentage(coupon.time_used, coupon.limit)}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.usageProgressContainer}>
                  <div className={styles.usageProgress}>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{
                          width: `${getUsagePercentage(
                            coupon.time_used,
                            coupon.limit
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <span className={styles.progressText}>
                      {getUsagePercentage(coupon.time_used, coupon.limit)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.detailsSection}>
                <h5 className={styles.sectionTitle}>
                  {i18n.language === "ar" ? "حالة الكوبون" : "Coupon Status"}
                </h5>
                <div className={styles.detailsRow}>
                  <div className={styles.detailItem}>
                    <FaClock className={styles.detailIcon} />
                    <div className={styles.detailContent}>
                      <span className={styles.detailLabel}>
                        {i18n.language === "ar" ? "الحالة" : "Status"}
                      </span>
                      <span
                        className={`${styles.detailValue} ${
                          isActive()
                            ? styles.statusActive
                            : styles.statusInactive
                        }`}
                      >
                        {isActive()
                          ? i18n.language === "ar"
                            ? "نشط"
                            : "Active"
                          : isExpired()
                          ? i18n.language === "ar"
                            ? "منتهي الصلاحية"
                            : "Expired"
                          : i18n.language === "ar"
                          ? "غير نشط"
                          : "Inactive"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.modalActions}>
          <button className={styles.closeBtnSecondary} onClick={onClose}>
            {i18n.language === "ar" ? "إغلاق" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponDetails;
