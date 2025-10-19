import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaFileAlt,
  FaPlay,
  FaUsers,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import DashboardHeader from "../DashboardHeader";
import DashboardSidebar from "../DashboardSidebar";
import "./courses.css";

const Courses = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleAddCourse = () => {
    navigate("/dashboard/courses/add");
  };

  const courses = [
    {
      id: 1,
      name: "اسم الكورس",
      price: "1000",
      status: "published",
      files: 4,
      videos: "فيديو شير",
      students: 24,
    },
    {
      id: 2,
      name: "اسم الكورس",
      price: "1500",
      status: "stopped",
      files: 6,
      videos: "فيديو شير",
      students: 18,
    },
    {
      id: 3,
      name: "اسم الكورس",
      price: "800",
      status: "published",
      files: 3,
      videos: "فيديو شير",
      students: 32,
    },
    {
      id: 4,
      name: "اسم الكورس",
      price: "2000",
      status: "stopped",
      files: 8,
      videos: "فيديو شير",
      students: 15,
    },
    {
      id: 5,
      name: "اسم الكورس",
      price: "1200",
      status: "published",
      files: 5,
      videos: "فيديو شير",
      students: 28,
    },
    {
      id: 6,
      name: "اسم الكورس",
      price: "900",
      status: "published",
      files: 2,
      videos: "فيديو شير",
      students: 41,
    },
    {
      id: 7,
      name: "اسم الكورس",
      price: "1800",
      status: "stopped",
      files: 7,
      videos: "فيديو شير",
      students: 12,
    },
    {
      id: 8,
      name: "اسم الكورس",
      price: "1100",
      status: "published",
      files: 4,
      videos: "فيديو شير",
      students: 35,
    },
  ];

  const tabs = [
    { id: "stopped", label: "موقوف", count: 4 },
    { id: "published", label: "منشور", count: 20 },
    { id: "all", label: "كل الكورسات", count: 24 },
  ];

  const filteredCourses = courses.filter((course) => {
    if (activeTab === "all") return true;
    return course.status === activeTab;
  });

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

        {/* Courses Content */}
        <div className="courses-page">
          {/* Header Section */}
          <div className="courses-header">
            <div className="header-left">
              <button className="add-course-btn" onClick={handleAddCourse}>
                <FaPlus />
                {t("courses.addNewCourse")}
              </button>
            </div>

            <div className="header-right">
              <div className="search-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder={t("courses.search")}
                  className="search-input"
                />
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="tabs-section">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Courses Grid */}
          <div className="courses-grid">
            {filteredCourses.map((course) => (
              <div key={course.id} className="course-card">
                <div className={`status-tag ${course.status}`}>
                  {course.status === "published" ? "منشور" : "موقوف"}
                </div>

                <div className="course-logo">
                  <div className="logo-text">روحاني</div>
                  <div className="logo-leaf">🍃</div>
                </div>

                <h3 className="course-name">{course.name}</h3>
                <p className="course-price">
                  {course.price} {t("courses.currency")}
                </p>

                <div className="course-details">
                  <div className="detail-item">
                    <FaFileAlt className="detail-icon" />
                    <span>{course.files} ملفات</span>
                  </div>
                  <div className="detail-item">
                    <FaPlay className="detail-icon" />
                    <span>{course.videos}</span>
                  </div>
                  <div className="detail-item">
                    <FaUsers className="detail-icon" />
                    <span>{course.students} طالب</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button className="pagination-btn">
              <FaChevronLeft />
            </button>

            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`pagination-number ${
                  currentPage === page ? "active" : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page.toString().padStart(2, "0")}
              </button>
            ))}

            <button className="pagination-btn">
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
