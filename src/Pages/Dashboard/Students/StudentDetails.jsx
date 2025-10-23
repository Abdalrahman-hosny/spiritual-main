import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaTimes,
  FaUser,
  FaCalendar,
  FaGraduationCap,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaCheckCircle,
} from "react-icons/fa";
import "./studentDetails.css";

const StudentDetails = ({ student, onClose }) => {
  const { i18n } = useTranslation();

  console.log("StudentDetails - student prop:", student);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 9999 }} onClick={onClose}>
      <div
        className="modal-container details-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>
            {i18n.language === "ar" ? "تفاصيل الطالب" : "Student Details"}
          </h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="modal-content">
          <div className="student-details">
            <div className="student-header">
              <div className="student-avatar-large">
                {student.image &&
                student.image !== "https://spiritual.brmjatech.uk/" ? (
                  <img src={student.image} alt={student.name} />
                ) : (
                  <div className="avatar-placeholder-large">
                    {getInitials(student.name)}
                  </div>
                )}
              </div>
              <div className="student-header-info">
                <h3 className="student-name-large">{student.name}</h3>
                <p className="student-id">
                  {i18n.language === "ar" ? "رقم الطالب" : "Student ID"}: #
                  {student.id}
                </p>
              </div>
            </div>

            <div className="student-details-grid">
              <div className="details-section">
                <h5 className="section-title">
                  {i18n.language === "ar"
                    ? "معلومات أساسية"
                    : "Basic Information"}
                </h5>
                <div className="details-row">
                  <div className="detail-item">
                    <FaUser className="detail-icon" />
                    <div className="detail-content">
                      <span className="detail-label">
                        {i18n.language === "ar" ? "الاسم" : "Name"}
                      </span>
                      <span className="detail-value">{student.name}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FaCalendar className="detail-icon" />
                    <div className="detail-content">
                      <span className="detail-label">
                        {i18n.language === "ar"
                          ? "تاريخ التسجيل"
                          : "Registration Date"}
                      </span>
                      <span className="detail-value">
                        {formatDate(student.created_at)}
                      </span>
                </div>
              </div>
            </div>
          </div>

              <div className="details-section">
                <h5 className="section-title">
                  {i18n.language === "ar"
                    ? "معلومات الكورس"
                    : "Course Information"}
                </h5>
                <div className="details-row">
                  <div className="detail-item">
                    <FaGraduationCap className="detail-icon" />
                    <div className="detail-content">
                      <span className="detail-label">
                        {i18n.language === "ar" ? "الكورس" : "Course"}
                      </span>
                      <span className="detail-value">
                        {student.course_name ||
                          (i18n.language === "ar"
                            ? "لا يوجد كورس"
                            : "No Course")}
                        </span>
                      </div>
                        </div>
                        </div>
                      </div>

              <div className="details-section">
                <h5 className="section-title">
                  {i18n.language === "ar"
                    ? "معلومات الاتصال"
                    : "Contact Information"}
                </h5>
                <div className="details-row">
                  {student.email && (
                    <div className="detail-item">
                      <FaEnvelope className="detail-icon" />
                      <div className="detail-content">
                        <span className="detail-label">
                          {i18n.language === "ar"
                            ? "البريد الإلكتروني"
                            : "Email"}
                        </span>
                        <span className="detail-value">{student.email}</span>
                </div>
              </div>
            )}
                  {student.phone && (
                    <div className="detail-item">
                      <FaPhone className="detail-icon" />
                      <div className="detail-content">
                        <span className="detail-label">
                          {i18n.language === "ar" ? "رقم الهاتف" : "Phone"}
                    </span>
                        <span className="detail-value">{student.phone}</span>
                  </div>
                  </div>
                  )}
                  {student.country_id && (
                    <div className="detail-item">
                      <FaGlobe className="detail-icon" />
                      <div className="detail-content">
                        <span className="detail-label">
                          {i18n.language === "ar" ? "البلد" : "Country"}
                    </span>
                        <span className="detail-value">
                          {student.country_id}
                    </span>
                  </div>
                    </div>
                  )}
                </div>
                  </div>

              <div className="details-section">
                <h5 className="section-title">
                  {i18n.language === "ar" ? "حالة الحساب" : "Account Status"}
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
                          student.status === 1
                            ? "status-active"
                            : "status-inactive"
                        }`}
                      >
                        {student.status === 1
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

export default StudentDetails;
