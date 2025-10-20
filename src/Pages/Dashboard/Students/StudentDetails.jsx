import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaPlay,
  FaComment,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import DashboardHeader from "../DashboardHeader";
import DashboardSidebar from "../DashboardSidebar";
import "./studentDetails.css";

const StudentDetails = () => {
  const { t, i18n } = useTranslation();
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("courses");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleBack = () => {
    navigate("/dashboard/students");
  };

  // Mock student data
  const student = {
    id: studentId,
    name: "اسم الطالب",
    courseName: "اسم الكورس",
    profileImage: "/api/placeholder/120/120",
    email: "mahd012552@gmail.com",
    phone: "+20011458752",
    registrationDate: "22-12-2024",
    location: "القاهرة, مصر",
    gender: "ذكر",
    status: "نشط",
  };

  const courses = [
    {
      id: 1,
      title: "اسم الكورس",
      price: "1000 جنيه",
      status: "منتهي",
      logo: "روحاني",
      videoCount: "فيديو شرح",
      commentsCount: "4 علقات",
      enrollmentDate: "22-12-2024",
    },
    {
      id: 2,
      title: "اسم الكورس",
      price: "1000 جنيه",
      status: "نشط",
      logo: "روحاني",
      videoCount: "فيديو شرح",
      commentsCount: "4 علقات",
      enrollmentDate: "22-12-2024",
    },
    {
      id: 3,
      title: "اسم الكورس",
      price: "1000 جنيه",
      status: "نشط",
      logo: "روحاني",
      videoCount: "فيديو شرح",
      commentsCount: "4 علقات",
      enrollmentDate: "22-12-2024",
    },
    {
      id: 4,
      title: "اسم الكورس",
      price: "1000 جنيه",
      status: "نشط",
      logo: "روحاني",
      videoCount: "فيديو شرح",
      commentsCount: "4 علقات",
      enrollmentDate: "22-12-2024",
    },
  ];

  const tabs = [
    { id: "courses", label: t("studentDetails.courses") },
    { id: "personal", label: t("studentDetails.personalInfo") },
  ];

  return (
    <div
      className="dashboard-container"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        currentLanguage={i18n.language}
        onChangeLanguage={changeLanguage}
      />

      {/* Main Content */}
      <div className={`main-content ${!sidebarOpen ? "sidebar-closed" : ""}`}>
        {/* Header */}
        <DashboardHeader
          onToggleSidebar={toggleSidebar}
          currentLanguage={i18n.language}
          onChangeLanguage={changeLanguage}
        />

        {/* Student Details Content */}
        <div className="student-details-page">
          {/* Back Button */}
          <button className="back-btn" onClick={handleBack}>
            <FaChevronLeft />
            {t("studentDetails.backToStudents")}
          </button>

          {/* Student Header */}
          <div className="student-header">
            <div className="student-info">
              <div className="profile-section">
                <img
                  src={student.profileImage}
                  alt={student.name}
                  className="profile-image"
                />
                <div className="profile-details">
                  <h1 className="student-name">{student.name}</h1>
                  <div className="purple-line"></div>
                  <p className="course-name">{student.courseName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs-section">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === "courses" && (
              <div className="courses-content">
                <div className="courses-grid">
                  {courses.map((course) => (
                    <div key={course.id} className="course-card">
                      <div className="status-badge">
                        <span
                          className={`status ${
                            course.status === "نشط" ? "active" : "finished"
                          }`}
                        >
                          {course.status}
                        </span>
                      </div>
                      <div className="course-logo">
                        <div className="logo-text">{course.logo}</div>
                      </div>
                      <h3 className="course-title">{course.title}</h3>
                      <p className="course-price">{course.price}</p>
                      <div className="course-details">
                        <div className="detail-item">
                          <FaPlay className="detail-icon" />
                          <span>{course.videoCount}</span>
                        </div>
                        <div className="detail-item">
                          <FaComment className="detail-icon" />
                          <span>{course.commentsCount}</span>
                        </div>
                      </div>
                      <p className="enrollment-date">
                        {t("studentDetails.enrollmentDate")}{" "}
                        {course.enrollmentDate}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "personal" && (
              <div className="personal-content">
                <div className="personal-info-list">
                  <div className="info-item">
                    <span className="info-label">
                      {t("studentDetails.email")}:
                    </span>
                    <span className="info-value">{student.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      {t("studentDetails.phoneNumber")}:
                    </span>
                    <span className="info-value">{student.phone}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      {t("studentDetails.registrationDate")}:
                    </span>
                    <span className="info-value">
                      {student.registrationDate}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      {t("studentDetails.location")}:
                    </span>
                    <span className="info-value">{student.location}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      {t("studentDetails.gender")}:
                    </span>
                    <span className="info-value">{student.gender}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      {t("studentDetails.status")}:
                    </span>
                    <span className="info-value">{student.status}</span>
                  </div>
                </div>
                <div className="decorative-flower">
                  <div className="flower-icon">🌸</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
