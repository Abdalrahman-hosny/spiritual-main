import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardHeader from "../DashboardHeader";
import DashboardSidebar from "../DashboardSidebar";
import {
  FaSearch,
  FaUser,
  FaCalendar,
  FaEye,
  FaGraduationCap,
  FaUsers,
  FaFilter,
  FaSort,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import StudentDetails from "./StudentDetails";
import styles from "./students.module.css";
import "../dashboard.css";

const Students = () => {
  const { i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Fetch students
  const fetchStudents = useCallback(
    async (page = 1, search = "") => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("token");
        const response = await axios.get(
          `https://spiritual.brmjatech.uk/api/teachers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Accept-Language": i18n.language === "ar" ? "ar" : "en",
            },
            params: {
              page,
              search,
            },
          }
        );

        if (response.data.code === 200) {
          setStudents(response.data.data.result);
          setPagination(response.data.data.meta);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        toast.error(
          i18n.language === "ar"
            ? "خطأ في جلب الطلاب"
            : "Error fetching students"
        );
      } finally {
        setLoading(false);
      }
    },
    [i18n.language]
  );

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchStudents(1, searchTerm);
  };

  // Handle view student details
  const handleViewDetails = async (studentId) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        `https://spiritual.brmjatech.uk/api/teachers/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Accept-Language": i18n.language === "ar" ? "ar" : "en",
          },
        }
      );

      if (response.data.code === 200) {
        console.log("Student details response:", response.data);
        console.log("Student data:", response.data.data.result);
        setStudentDetails(response.data.data.result);
        setShowDetailsModal(true);
      } else {
        toast.error(
          i18n.language === "ar"
            ? "خطأ في جلب تفاصيل الطالب"
            : "Error fetching student details"
        );
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
      toast.error(
        i18n.language === "ar"
          ? "خطأ في جلب تفاصيل الطالب"
          : "Error fetching student details"
      );
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    fetchStudents(page, searchTerm);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG");
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
        <div className={styles.studentsContainer}>
          <div className={styles.studentsHeader}>
            <div className={styles.headerContent}>
              <h1 className={styles.pageTitle}>
                {i18n.language === "ar"
                  ? "إدارة الطلاب"
                  : "Students Management"}
              </h1>
              <p className={styles.pageSubtitle}>
                {i18n.language === "ar"
                  ? "قم بإدارة الطلاب والمتدربين"
                  : "Manage students and trainees"}
              </p>
            </div>
            <div className={styles.headerStats}>
              <div className={styles.statItem}>
                <FaUsers className={styles.statIcon} />
                <div className={styles.statContent}>
                  <span className={styles.statNumber}>{pagination.total}</span>
                  <span className={styles.statLabel}>
                    {i18n.language === "ar"
                      ? "إجمالي الطلاب"
                      : "Total Students"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className={styles.studentsFilters}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <div className={styles.searchInputGroup}>
                <FaSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder={
                    i18n.language === "ar"
                      ? "البحث في الطلاب..."
                      : "Search students..."
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              <button type="submit" className={styles.searchBtn}>
                {i18n.language === "ar" ? "بحث" : "Search"}
              </button>
            </form>
          </div>

          {/* Students Grid */}
          {loading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <p>
                {i18n.language === "ar"
                  ? "جاري تحميل الطلاب..."
                  : "Loading students..."}
              </p>
            </div>
          ) : students.length === 0 ? (
            <div className={styles.emptyState}>
              <FaUsers className={styles.emptyIcon} />
              <h3>
                {i18n.language === "ar" ? "لا توجد طلاب" : "No Students Found"}
              </h3>
              <p>
                {i18n.language === "ar"
                  ? "لم يتم العثور على أي طلاب"
                  : "No students found"}
              </p>
            </div>
          ) : (
            <div className={styles.studentsGrid}>
              {students.map((student) => (
                <div
                  key={student.id}
                  className={styles.studentCard}
                  onClick={() => handleViewDetails(student.id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className={styles.studentAvatar}>
                    {student.image ? (
                      <img src={student.image} alt={student.name} />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        {getInitials(student.name)}
                      </div>
                    )}
                  </div>

                  <div className={styles.studentContent}>
                    <h3 className={styles.studentName}>{student.name}</h3>
                    <p className={styles.studentCourse}>
                      {student.course_name ||
                        (i18n.language === "ar" ? "لا يوجد كورس" : "No Course")}
                    </p>
                    <div className={styles.studentMeta}>
                      <div className={styles.metaItem}>
                        <FaCalendar />
                        <span>{formatDate(student.created_at)}</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={styles.studentActions}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className={`${styles.actionBtn} ${styles.viewBtn}`}
                      onClick={() => handleViewDetails(student.id)}
                      title={
                        i18n.language === "ar" ? "عرض التفاصيل" : "View Details"
                      }
                    >
                      <FaEye />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.last_page > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.paginationBtn}
                onClick={() => handlePageChange(pagination.current_page - 1)}
                disabled={pagination.current_page === 1}
              >
                {i18n.language === "ar" ? "السابق" : "Previous"}
              </button>
              <span className={styles.paginationInfo}>
                {i18n.language === "ar"
                  ? `صفحة ${pagination.current_page} من ${pagination.last_page}`
                  : `Page ${pagination.current_page} of ${pagination.last_page}`}
              </span>
              <button
                className={styles.paginationBtn}
                onClick={() => handlePageChange(pagination.current_page + 1)}
                disabled={pagination.current_page === pagination.last_page}
              >
                {i18n.language === "ar" ? "التالي" : "Next"}
              </button>
            </div>
          )}

          {/* Modals */}
          {showDetailsModal && studentDetails && (
            <StudentDetails
              student={studentDetails}
              onClose={() => {
                setShowDetailsModal(false);
                setStudentDetails(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;
