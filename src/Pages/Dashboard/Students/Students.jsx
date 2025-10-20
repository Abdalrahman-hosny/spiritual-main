import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  FaFilter,
  FaSearch,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import DashboardHeader from "../DashboardHeader";
import DashboardSidebar from "../DashboardSidebar";
import "./students.css";

const Students = () => {
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

  const handleStudentClick = (studentId) => {
    navigate(`/dashboard/students/${studentId}`);
  };

  const tabs = [
    { id: "all", label: t("students.allStudents"), count: 2400 },
    { id: "current", label: t("students.currentSubscribers"), count: 1650 },
    { id: "former", label: t("students.formerStudents"), count: 750 },
  ];

  const students = [
    {
      id: 1,
      name: "اسم الطالب",
      courseName: "اسم الكورس",
      lastLogin: "22-12-2024",
      profileImage: "/api/placeholder/80/80",
    },
    {
      id: 2,
      name: "اسم الطالب",
      courseName: "اسم الكورس",
      lastLogin: "22-12-2024",
      profileImage: "/api/placeholder/80/80",
    },
    {
      id: 3,
      name: "اسم الطالب",
      courseName: "اسم الكورس",
      lastLogin: "22-12-2024",
      profileImage: "/api/placeholder/80/80",
    },
    {
      id: 4,
      name: "اسم الطالب",
      courseName: "اسم الكورس",
      lastLogin: "22-12-2024",
      profileImage: "/api/placeholder/80/80",
    },
    {
      id: 5,
      name: "اسم الطالب",
      courseName: "اسم الكورس",
      lastLogin: "22-12-2024",
      profileImage: "/api/placeholder/80/80",
    },
    {
      id: 6,
      name: "اسم الطالب",
      courseName: "اسم الكورس",
      lastLogin: "22-12-2024",
      profileImage: "/api/placeholder/80/80",
    },
    {
      id: 7,
      name: "اسم الطالب",
      courseName: "اسم الكورس",
      lastLogin: "22-12-2024",
      profileImage: "/api/placeholder/80/80",
    },
    {
      id: 8,
      name: "اسم الطالب",
      courseName: "اسم الكورس",
      lastLogin: "22-12-2024",
      profileImage: "/api/placeholder/80/80",
    },
  ];

  const filteredStudents = students.filter((student) => {
    if (activeTab === "all") return true;
    if (activeTab === "current") return true; // Mock logic
    if (activeTab === "former") return false; // Mock logic
    return true;
  });

  const totalPages = Math.ceil(filteredStudents.length / 8);
  const startIndex = (currentPage - 1) * 8;
  const endIndex = startIndex + 8;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

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

        {/* Students Content */}
        <div className="students-page">
          {/* Header Section */}
          <div className="students-header">
            <div className="header-left">
              <button className="filter-btn">
                <FaFilter />
                {t("students.filter")}
              </button>
            </div>

            <div className="header-right">
              <div className="search-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder={t("students.search")}
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

          {/* Students Grid */}
          <div className="students-grid">
            {currentStudents.map((student) => (
              <div
                key={student.id}
                className="student-card"
                onClick={() => handleStudentClick(student.id)}
              >
                <div className="profile-image-container">
                  <img
                    src={student.profileImage}
                    alt={student.name}
                    className="profile-image"
                  />
                  <div className="add-icon">
                    <FaPlus />
                  </div>
                </div>
                <h3 className="student-name">{student.name}</h3>
                <p className="course-name">{student.courseName}</p>
                <p className="last-login">
                  {t("students.lastLogin")} {student.lastLogin}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <FaChevronLeft />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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

            <button
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
