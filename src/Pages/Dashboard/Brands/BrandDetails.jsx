import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaTimes,
  FaImage,
  FaTag,
  FaGlobe,
  FaFileAlt,
  FaCheckCircle,
} from "react-icons/fa";
import "./brandDetails.css";

const BrandDetails = ({ brand, onClose }) => {
  const { i18n } = useTranslation();

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div
        className="modal-container details-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{i18n.language === "ar" ? "تفاصيل البراند" : "Brand Details"}</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="modal-content">
          <div className="brand-details">
            <div className="brand-header">
              <div className="brand-image-large">
                {brand.logo ? (
                  <img src={brand.logo} alt={brand.name} />
                ) : (
                  <div className="brand-placeholder-large">
                    <FaImage />
                  </div>
                )}
              </div>
              <div className="brand-header-info">
                <h3 className="brand-name-large">{brand.name}</h3>
                <p className="brand-slug-large">@{brand.slug}</p>
              </div>
            </div>

            <div className="brand-details-grid">
              <div className="details-section">
                <h5 className="section-title">
                  {i18n.language === "ar"
                    ? "معلومات أساسية"
                    : "Basic Information"}
                </h5>
                <div className="details-row">
                  <div className="detail-item">
                    <FaTag className="detail-icon" />
                    <div className="detail-content">
                      <span className="detail-label">
                        {i18n.language === "ar" ? "الاسم" : "Name"}
                      </span>
                      <span className="detail-value">{brand.name}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FaGlobe className="detail-icon" />
                    <div className="detail-content">
                      <span className="detail-label">
                        {i18n.language === "ar" ? "الرابط" : "Slug"}
                      </span>
                      <span className="detail-value">@{brand.slug}</span>
                    </div>
                  </div>
                </div>
              </div>

              {brand.desc && (
                <div className="details-section">
                  <h5 className="section-title">
                    {i18n.language === "ar" ? "الوصف" : "Description"}
                  </h5>
                  <div className="description-content">
                    <p className="description-text">{brand.desc}</p>
                  </div>
                </div>
              )}

              <div className="details-section">
                <h5 className="section-title">
                  {i18n.language === "ar" ? "حالة البراند" : "Brand Status"}
                </h5>
                <div className="details-row">
                  <div className="detail-item">
                    <FaCheckCircle className="detail-icon" />
                    <div className="detail-content">
                      <span className="detail-label">
                        {i18n.language === "ar" ? "الحالة" : "Status"}
                      </span>
                      <span
                        className={`detail-value ${
                          brand.is_active === 1
                            ? "status-active"
                            : "status-inactive"
                        }`}
                      >
                        {brand.is_active === 1
                          ? i18n.language === "ar"
                            ? "نشط"
                            : "Active"
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
        <div className="modal-actions">
          <button className="close-btn-secondary" onClick={onClose}>
            {i18n.language === "ar" ? "إغلاق" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandDetails;
