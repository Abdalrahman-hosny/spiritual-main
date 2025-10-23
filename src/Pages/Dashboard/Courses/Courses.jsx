import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardHeader from "../DashboardHeader";
import DashboardSidebar from "../DashboardSidebar";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaSearch,
  FaFilter,
  FaPlay,
  FaClock,
  FaUser,
  FaCalendar,
  FaFileAlt,
  FaImage,
  FaVideo,
  FaTimes,
} from "react-icons/fa";
import AddCourse from "./AddCourse";
import EditCourse from "./EditCourse";
import styles from "./courses.module.css";
import "../dashboard.css";

const Courses = () => {
  const { i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseDetails, setCourseDetails] = useState(null);

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

  // Fetch courses
  const fetchCourses = useCallback(
    async (page = 1, search = "") => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("token");
        const response = await axios.get(
          `https://spiritual.brmjatech.uk/api/dashboard_courses`,
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
          setCourses(response.data.data.result);
          setPagination(response.data.data.meta);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("خطأ في جلب الكورسات");
      } finally {
        setLoading(false);
      }
    },
    [i18n.language]
  );

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchCourses(1, searchTerm);
  };

  // Handle edit course
  const handleEditCourse = async (courseId) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        `https://spiritual.brmjatech.uk/api/dashboard_courses/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Accept-Language": "en",
          },
        }
      );

      if (response.data.code === 200) {
        setSelectedCourse(response.data.data);
        setShowEditModal(true);
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
      toast.error("خطأ في جلب تفاصيل الكورس");
    }
  };

  // Handle delete course
  const handleDeleteCourse = (course) => {
    setSelectedCourse(course);
    setShowDeleteModal(true);
  };

  const confirmDeleteCourse = async () => {
    if (!selectedCourse) return;

    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(
        `https://spiritual.brmjatech.uk/api/dashboard_courses/${selectedCourse.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      toast.success(
        i18n.language === "ar"
          ? "تم حذف الكورس بنجاح"
          : "Course deleted successfully"
      );
      setShowDeleteModal(false);
      setSelectedCourse(null);
      fetchCourses(pagination.current_page, searchTerm);
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error(
        i18n.language === "ar" ? "خطأ في حذف الكورس" : "Error deleting course"
      );
    }
  };

  // Handle view course details
  const handleViewDetails = async (courseId) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        `https://spiritual.brmjatech.uk/api/dashboard_courses/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Accept-Language": i18n.language === "ar" ? "ar" : "en",
          },
        }
      );

      if (response.data.code === 200) {
        setCourseDetails(response.data.data);
        setShowDetailsModal(true);
      } else {
        toast.error(
          i18n.language === "ar"
            ? "خطأ في جلب تفاصيل الكورس"
            : "Error fetching course details"
        );
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
      toast.error(
        i18n.language === "ar"
          ? "خطأ في جلب تفاصيل الكورس"
          : "Error fetching course details"
      );
    }
  };

  // Handle toggle publish status
  const handleTogglePublish = async (courseId, currentStatus) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(
        `https://spiritual.brmjatech.uk/api/dashboard_courses/is_published/${courseId}`,
        {
          is_published: currentStatus ? 0 : 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(
        currentStatus ? "تم إلغاء نشر الكورس" : "تم نشر الكورس بنجاح"
      );
      fetchCourses(pagination.current_page, searchTerm);
    } catch (error) {
      console.error("Error toggling publish status:", error);
      toast.error("خطأ في تغيير حالة النشر");
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    fetchCourses(page, searchTerm);
  };

  // Format price
  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG");
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

        {/* Courses Content */}
        <div className={styles.coursesContainer}>
          <div className={styles.coursesHeader}>
            <div className={styles.headerContent}>
              <h1 className={styles.pageTitle}>
                {i18n.language === "ar"
                  ? "إدارة الكورسات"
                  : "Courses Management"}
              </h1>
              <p className={styles.pageSubtitle}>
                {i18n.language === "ar"
                  ? "قم بإدارة الكورسات والتدريبات"
                  : "Manage courses and training programs"}
              </p>
            </div>
            <button
              className={styles.addCourseBtn}
              onClick={() => setShowAddModal(true)}
            >
              <FaPlus />
              {i18n.language === "ar" ? "إضافة كورس جديد" : "Add New Course"}
            </button>
          </div>

          {/* Search and Filters */}
          <div className={styles.coursesFilters}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <div className={styles.searchInputGroup}>
                <FaSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder={
                    i18n.language === "ar"
                      ? "البحث في الكورسات..."
                      : "Search courses..."
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

          {/* Courses Grid */}
          {loading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <p>
                {i18n.language === "ar"
                  ? "جاري تحميل الكورسات..."
                  : "Loading courses..."}
              </p>
            </div>
          ) : courses.length === 0 ? (
            <div className={styles.emptyState}>
              <FaPlay className={styles.emptyIcon} />
              <h3>
                {i18n.language === "ar" ? "لا توجد كورسات" : "No Courses Found"}
              </h3>
              <p>
                {i18n.language === "ar"
                  ? "ابدأ بإضافة كورس جديد"
                  : "Start by adding a new course"}
              </p>
            </div>
          ) : (
            <div className={styles.coursesGrid}>
              {courses.map((course) => (
                <div
                  key={course.id}
                  className={styles.courseCard}
                  onClick={() => handleViewDetails(course.id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className={styles.courseImage}>
                    {course.image ? (
                      <img src={course.image} alt={course.title} />
                    ) : (
                      <div className={styles.coursePlaceholder}>
                        <FaPlay />
                      </div>
                    )}
                    <div className={styles.courseStatus}>
                      <span
                        className={`${styles.statusBadge} ${
                          course.is_published ? styles.published : styles.draft
                        }`}
                      >
                        {course.is_published
                          ? i18n.language === "ar"
                            ? "منشور"
                            : "Published"
                          : i18n.language === "ar"
                          ? "مسودة"
                          : "Draft"}
                      </span>
                    </div>
                  </div>

                  <div className={styles.courseContent}>
                    <h3 className={styles.courseTitle}>{course.title}</h3>
                    <p className={styles.coursePrice}>
                      {formatPrice(course.price)}
                    </p>

                    <div className={styles.courseMeta}>
                      <div className={styles.metaItem}>
                        <FaFileAlt />
                        <span>
                          {i18n.language === "ar" ? "الملفات: " : "Files: "}
                          {course.files_count || 0}
                        </span>
                      </div>
                      <div className={styles.metaItem}>
                        <FaCalendar />
                        <span>{formatDate(course.created_at)}</span>
                      </div>
                      {course.duration && (
                        <div className={styles.metaItem}>
                          <FaClock />
                          <span>
                            {i18n.language === "ar" ? "المدة: " : "Duration: "}
                            {course.duration}
                          </span>
                        </div>
                      )}
                      {course.lectures_count && (
                        <div className={styles.metaItem}>
                          <FaFileAlt />
                          <span>
                            {i18n.language === "ar"
                              ? "المحاضرات: "
                              : "Lectures: "}
                            {course.lectures_count}
                          </span>
                        </div>
                      )}
                      {course.trainer && (
                        <div className={styles.metaItem}>
                          <FaUser />
                          <span>
                            {i18n.language === "ar" ? "المدرب: " : "Trainer: "}
                            {course.trainer.name}
                          </span>
                        </div>
                      )}
                      {course.category && (
                        <div className={styles.metaItem}>
                          <FaFileAlt />
                          <span>
                            {i18n.language === "ar"
                              ? "التصنيف: "
                              : "Category: "}
                            {course.category}
                          </span>
                        </div>
                      )}
                      {course.schedule && (
                        <div className={styles.metaItem}>
                          <FaCalendar />
                          <span>
                            {i18n.language === "ar" ? "الجدول: " : "Schedule: "}
                            {course.schedule}
                          </span>
                        </div>
                      )}
                      {course.video && (
                        <div className={styles.metaItem}>
                          <FaVideo />
                          <span>
                            {i18n.language === "ar"
                              ? "فيديو متاح"
                              : "Video Available"}
                          </span>
                        </div>
                      )}
                    </div>

                    <div
                      className={styles.courseActions}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className={`${styles.actionBtn} ${styles.editBtn}`}
                        onClick={() => handleEditCourse(course.id)}
                        title={i18n.language === "ar" ? "تعديل" : "Edit"}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.toggleBtn}`}
                        onClick={() =>
                          handleTogglePublish(course.id, course.is_published)
                        }
                        title={
                          course.is_published
                            ? i18n.language === "ar"
                              ? "إلغاء النشر"
                              : "Unpublish"
                            : i18n.language === "ar"
                            ? "نشر"
                            : "Publish"
                        }
                      >
                        {course.is_published ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                        onClick={() => handleDeleteCourse(course)}
                        title={i18n.language === "ar" ? "حذف" : "Delete"}
                      >
                        <FaTrash />
                      </button>
                    </div>
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
          {showAddModal && (
            <AddCourse
              onClose={() => setShowAddModal(false)}
              onSuccess={() => {
                setShowAddModal(false);
                fetchCourses(pagination.current_page, searchTerm);
              }}
            />
          )}

          {showEditModal && selectedCourse && (
            <EditCourse
              course={selectedCourse}
              onClose={() => {
                setShowEditModal(false);
                setSelectedCourse(null);
              }}
              onSuccess={() => {
                setShowEditModal(false);
                setSelectedCourse(null);
                fetchCourses(pagination.current_page, searchTerm);
              }}
            />
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteModal && selectedCourse && (
            <div className={styles.modalOverlay}>
              <div className={`${styles.modalContainer} ${styles.deleteModal}`}>
                <div className={styles.modalHeader}>
                  <h2>
                    {i18n.language === "ar" ? "تأكيد الحذف" : "Confirm Delete"}
                  </h2>
                  <button
                    className={styles.closeBtn}
                    onClick={() => {
                      setShowDeleteModal(false);
                      setSelectedCourse(null);
                    }}
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className={styles.modalContent}>
                  <div className={styles.warningIcon}>
                    <FaTrash />
                  </div>
                  <p>
                    {i18n.language === "ar"
                      ? `هل أنت متأكد من حذف الكورس "${selectedCourse.title}"؟`
                      : `Are you sure you want to delete the course "${selectedCourse.title}"?`}
                  </p>
                  <p className={styles.warningText}>
                    {i18n.language === "ar"
                      ? "هذا الإجراء لا يمكن التراجع عنه."
                      : "This action cannot be undone."}
                  </p>
                </div>
                <div className={styles.modalActions}>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => {
                      setShowDeleteModal(false);
                      setSelectedCourse(null);
                    }}
                  >
                    {i18n.language === "ar" ? "إلغاء" : "Cancel"}
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={confirmDeleteCourse}
                  >
                    {i18n.language === "ar" ? "حذف" : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Course Details Modal */}
          {showDetailsModal && courseDetails && (
            <div className={styles.modalOverlay} style={{ zIndex: 9999 }}>
              <div
                className={`${styles.modalContainer} ${styles.detailsModal}`}
              >
                <div className={styles.modalHeader}>
                  <h2>
                    {i18n.language === "ar"
                      ? "تفاصيل الكورس"
                      : "Course Details"}
                  </h2>
                  <button
                    className={styles.closeBtn}
                    onClick={() => {
                      setShowDetailsModal(false);
                      setCourseDetails(null);
                    }}
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className={styles.modalContent}>
                  <div className={styles.courseDetails}>
                    {/* Course Header */}
                    <div className={styles.courseHeader}>
                      <div className={styles.courseImageLarge}>
                        {courseDetails.image ? (
                          <img
                            src={courseDetails.image}
                            alt={courseDetails.title}
                          />
                        ) : (
                          <div className={styles.coursePlaceholderLarge}>
                            <FaPlay />
                          </div>
                        )}
                      </div>
                      <div className={styles.courseHeaderInfo}>
                        <h3 className={styles.courseTitleLarge}>
                          {courseDetails.title}
                        </h3>
                        <p className={styles.coursePriceLarge}>
                          {formatPrice(courseDetails.price)}
                        </p>
                        <div className={styles.courseStatusLarge}>
                          <span
                            className={`${styles.statusBadgeLarge} ${
                              courseDetails.is_published
                                ? styles.published
                                : styles.draft
                            }`}
                          >
                            {courseDetails.is_published
                              ? i18n.language === "ar"
                                ? "منشور"
                                : "Published"
                              : i18n.language === "ar"
                              ? "مسودة"
                              : "Draft"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Course Description */}
                    {courseDetails.description && (
                      <div className={styles.infoSection}>
                        <h4>
                          {i18n.language === "ar" ? "الوصف" : "Description"}
                        </h4>
                        <p className={styles.descriptionText}>
                          {courseDetails.description}
                        </p>
                      </div>
                    )}

                    {/* Course Details Grid */}
                    <div className={styles.courseDetailsGrid}>
                      <div className={styles.detailsSection}>
                        <h5 className={styles.sectionTitle}>
                          {i18n.language === "ar"
                            ? "معلومات أساسية"
                            : "Basic Information"}
                        </h5>
                        <div className={styles.detailsRow}>
                          <div className={styles.detailItem}>
                            <FaCalendar className={styles.detailIcon} />
                            <div className={styles.detailContent}>
                              <span className={styles.detailLabel}>
                                {i18n.language === "ar"
                                  ? "تاريخ الإنشاء"
                                  : "Created Date"}
                              </span>
                              <span className={styles.detailValue}>
                                {formatDate(courseDetails.created_at)}
                              </span>
                            </div>
                          </div>

                          <div className={styles.detailItem}>
                            <FaFileAlt className={styles.detailIcon} />
                            <div className={styles.detailContent}>
                              <span className={styles.detailLabel}>
                                {i18n.language === "ar"
                                  ? "عدد الملفات"
                                  : "Files Count"}
                              </span>
                              <span className={styles.detailValue}>
                                {courseDetails.files
                                  ? courseDetails.files.length
                                  : 0}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={styles.detailsSection}>
                        <h5 className={styles.sectionTitle}>
                          {i18n.language === "ar"
                            ? "تفاصيل الكورس"
                            : "Course Details"}
                        </h5>
                        <div className={styles.detailsRow}>
                          {courseDetails.duration && (
                            <div className={styles.detailItem}>
                              <FaClock className={styles.detailIcon} />
                              <div className={styles.detailContent}>
                                <span className={styles.detailLabel}>
                                  {i18n.language === "ar"
                                    ? "المدة"
                                    : "Duration"}
                                </span>
                                <span className={styles.detailValue}>
                                  {courseDetails.duration}
                                </span>
                              </div>
                            </div>
                          )}

                          {courseDetails.lectures_count && (
                            <div className={styles.detailItem}>
                              <FaFileAlt className={styles.detailIcon} />
                              <div className={styles.detailContent}>
                                <span className={styles.detailLabel}>
                                  {i18n.language === "ar"
                                    ? "المحاضرات"
                                    : "Lectures"}
                                </span>
                                <span className={styles.detailValue}>
                                  {courseDetails.lectures_count}
                                </span>
                              </div>
                            </div>
                          )}

                          {courseDetails.category && (
                            <div className={styles.detailItem}>
                              <FaFileAlt className={styles.detailIcon} />
                              <div className={styles.detailContent}>
                                <span className={styles.detailLabel}>
                                  {i18n.language === "ar"
                                    ? "التصنيف"
                                    : "Category"}
                                </span>
                                <span className={styles.detailValue}>
                                  {courseDetails.category}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className={styles.detailsSection}>
                        <h5 className={styles.sectionTitle}>
                          {i18n.language === "ar"
                            ? "المدرب والجدول"
                            : "Trainer & Schedule"}
                        </h5>
                        <div className={styles.detailsRow}>
                          {courseDetails.trainer && (
                            <div className={styles.detailItem}>
                              <FaUser className={styles.detailIcon} />
                              <div className={styles.detailContent}>
                                <span className={styles.detailLabel}>
                                  {i18n.language === "ar"
                                    ? "المدرب"
                                    : "Trainer"}
                                </span>
                                <span className={styles.detailValue}>
                                  {courseDetails.trainer.name}
                                </span>
                              </div>
                            </div>
                          )}

                          {courseDetails.schedule && (
                            <div className={styles.detailItem}>
                              <FaCalendar className={styles.detailIcon} />
                              <div className={styles.detailContent}>
                                <span className={styles.detailLabel}>
                                  {i18n.language === "ar"
                                    ? "الجدول"
                                    : "Schedule"}
                                </span>
                                <span className={styles.detailValue}>
                                  {courseDetails.schedule}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {courseDetails.video && (
                        <div className={styles.detailsSection}>
                          <h5 className={styles.sectionTitle}>
                            {i18n.language === "ar" ? "الفيديو" : "Video"}
                          </h5>
                          <div className={styles.videoSection}>
                            <FaVideo className={styles.videoIcon} />
                            <a
                              href={courseDetails.video}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.videoLink}
                            >
                              {i18n.language === "ar"
                                ? "مشاهدة الفيديو"
                                : "Watch Video"}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.modalActions}>
                  <button
                    className={styles.editBtnModal}
                    onClick={() => {
                      setShowDetailsModal(false);
                      setCourseDetails(null);
                      handleEditCourse(courseDetails.id);
                    }}
                  >
                    <FaEdit />
                    {i18n.language === "ar" ? "تعديل" : "Edit"}
                  </button>
                  <button
                    className={styles.closeBtnSecondary}
                    onClick={() => {
                      setShowDetailsModal(false);
                      setCourseDetails(null);
                    }}
                  >
                    {i18n.language === "ar" ? "إغلاق" : "Close"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
