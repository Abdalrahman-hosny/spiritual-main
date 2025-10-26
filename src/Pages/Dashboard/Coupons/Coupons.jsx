import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardHeader from "../DashboardHeader";
import DashboardSidebar from "../DashboardSidebar";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaTimes,
  FaTag,
  FaCalendar,
  FaToggleOn,
  FaToggleOff,
  FaPercentage,
  FaUsers,
  FaClock,
} from "react-icons/fa";
import AddCoupon from "./AddCoupon";
import EditCoupon from "./EditCoupon";
import CouponDetails from "./CouponDetails";
import styles from "./coupons.module.css";

const Coupons = () => {
  const { i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [coupons, setCoupons] = useState([]);
  const [expiredCoupons, setExpiredCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("active");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [couponDetails, setCouponDetails] = useState(null);
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

  // Fetch active coupons
  const fetchCoupons = useCallback(async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        `https://spiritual.brmjatech.uk/api/dashboard/coupon`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Accept-Language": i18n.language === "ar" ? "ar" : "en",
          },
        }
      );

      if (response.data.code === 200) {
        setCoupons(response.data.data.result || []);
        setPagination(response.data.data.meta || {});
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
      toast.error(
        i18n.language === "ar"
          ? "خطأ في جلب الكوبونات"
          : "Error fetching coupons"
      );
    } finally {
      setLoading(false);
    }
  }, [i18n.language]);

  // Fetch expired coupons
  const fetchExpiredCoupons = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        `https://spiritual.brmjatech.uk/api/dashboard/coupon/expired`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Accept-Language": i18n.language === "ar" ? "ar" : "en",
          },
        }
      );

      if (response.data.code === 200) {
        setExpiredCoupons(response.data.data.result || []);
      }
    } catch (error) {
      console.error("Error fetching expired coupons:", error);
    }
  }, [i18n.language]);

  useEffect(() => {
    fetchCoupons();
    fetchExpiredCoupons();
  }, [fetchCoupons, fetchExpiredCoupons]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // Filter coupons locally since API doesn't support search
    const allCoupons = activeTab === "active" ? coupons : expiredCoupons;
    const filtered = allCoupons.filter((coupon) =>
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // This is just for demonstration - in real app you'd update state
  };

  // Handle add coupon
  const handleAddCoupon = () => {
    setShowAddModal(true);
  };

  const handleCouponAdded = () => {
    setShowAddModal(false);
    fetchCoupons();
    fetchExpiredCoupons();
  };

  // Handle edit coupon
  const handleEditCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setShowEditModal(true);
  };

  const handleCouponUpdated = () => {
    setShowEditModal(false);
    setSelectedCoupon(null);
    fetchCoupons();
    fetchExpiredCoupons();
  };

  // Handle view coupon details
  const handleViewDetails = (coupon) => {
    setCouponDetails(coupon);
    setShowDetailsModal(true);
  };

  // Handle delete coupon
  const handleDeleteCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setShowDeleteModal(true);
  };

  const confirmDeleteCoupon = async () => {
    if (!selectedCoupon) return;

    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(
        `https://spiritual.brmjatech.uk/api/dashboard/coupon/${selectedCoupon.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      toast.success(
        i18n.language === "ar"
          ? "تم حذف الكوبون بنجاح"
          : "Coupon deleted successfully"
      );
      setShowDeleteModal(false);
      setSelectedCoupon(null);
      fetchCoupons();
      fetchExpiredCoupons();
    } catch (error) {
      console.error("Error deleting coupon:", error);
      toast.error(
        i18n.language === "ar" ? "خطأ في حذف الكوبون" : "Error deleting coupon"
      );
    }
  };

  // Handle toggle status
  const handleToggleStatus = async (couponId, currentStatus) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(
        `https://spiritual.brmjatech.uk/api/dashboard/coupon/status/${couponId}`,
        {
          is_active: currentStatus === 1 ? 0 : 1,
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
        i18n.language === "ar"
          ? "تم تحديث حالة الكوبون"
          : "Coupon status updated"
      );
      fetchCoupons();
      fetchExpiredCoupons();
    } catch (error) {
      console.error("Error updating coupon status:", error);
      toast.error(
        i18n.language === "ar"
          ? "خطأ في تحديث حالة الكوبون"
          : "Error updating coupon status"
      );
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(i18n.language === "ar" ? "ar-EG" : "en-US");
  };

  // Get current coupons based on active tab
  const getCurrentCoupons = () => {
    return activeTab === "active" ? coupons : expiredCoupons;
  };

  // Calculate usage percentage
  const getUsagePercentage = (used, limit) => {
    if (limit === 0) return 0;
    return Math.round((used / limit) * 100);
  };

  return (
    <div
      className={styles.dashboardContainer}
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
      <div
        className={`${styles.mainContent} ${
          !sidebarOpen ? styles.sidebarClosed : ""
        }`}
      >
        {/* Header */}
        <DashboardHeader
          onToggleSidebar={toggleSidebar}
          currentLanguage={i18n.language}
          onChangeLanguage={changeLanguage}
        />

        {/* Coupons Content */}
        <div className={styles.couponsContainer}>
          <div className={styles.couponsHeader}>
            <div className={styles.headerContent}>
              <h1 className={styles.pageTitle}>
                {i18n.language === "ar"
                  ? "إدارة الكوبونات"
                  : "Coupons Management"}
              </h1>
              <p className={styles.pageSubtitle}>
                {i18n.language === "ar"
                  ? "قم بإدارة كوبونات الخصم والعروض"
                  : "Manage discount coupons and offers"}
              </p>
            </div>
            <div className={styles.headerActions}>
              <button className={styles.addCouponBtn} onClick={handleAddCoupon}>
                <FaPlus />
                {i18n.language === "ar" ? "إضافة كوبون" : "Add Coupon"}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className={styles.tabsSection}>
            <button
              className={`${styles.tabBtn} ${
                activeTab === "active" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("active")}
            >
              <FaTag />
              {i18n.language === "ar" ? "الكوبونات النشطة" : "Active Coupons"} (
              {coupons.length})
            </button>
            <button
              className={`${styles.tabBtn} ${
                activeTab === "expired" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("expired")}
            >
              <FaClock />
              {i18n.language === "ar"
                ? "الكوبونات المنتهية"
                : "Expired Coupons"}{" "}
              ({expiredCoupons.length})
            </button>
          </div>

          {/* Search and Filters */}
          <div className={styles.couponsFilters}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <div className={styles.searchInputGroup}>
                <FaSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder={
                    i18n.language === "ar"
                      ? "البحث في الكوبونات..."
                      : "Search coupons..."
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

          {/* Coupons Grid */}
          {loading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <p>
                {i18n.language === "ar"
                  ? "جاري تحميل الكوبونات..."
                  : "Loading coupons..."}
              </p>
            </div>
          ) : getCurrentCoupons().length === 0 ? (
            <div className={styles.emptyState}>
              <FaTag className={styles.emptyIcon} />
              <h3>
                {i18n.language === "ar"
                  ? "لا توجد كوبونات"
                  : "No Coupons Found"}
              </h3>
              <p>
                {i18n.language === "ar"
                  ? "لم يتم العثور على أي كوبونات"
                  : "No coupons found"}
              </p>
            </div>
          ) : (
            <div className={styles.couponsGrid}>
              {getCurrentCoupons().map((coupon) => (
                <div key={coupon.id} className={styles.couponCard}>
                  <div className={styles.couponHeader}>
                    <div className={styles.couponCode}>
                      <FaTag className={styles.codeIcon} />
                      <span className={styles.codeText}>{coupon.code}</span>
                    </div>
                    <div className={styles.couponStatus}>
                      <span
                        className={`${styles.statusBadge} ${
                          coupon.is_active == 1
                            ? styles.active
                            : styles.inactive
                        }`}
                      >
                        {coupon.is_active == 1
                          ? i18n.language === "ar"
                            ? "نشط"
                            : "Active"
                          : i18n.language === "ar"
                          ? "غير نشط"
                          : "Inactive"}
                      </span>
                    </div>
                  </div>

                  <div className={styles.couponContent}>
                    <div className={styles.discountInfo}>
                      <div className={styles.discountValue}>
                        <span className={styles.discountText}>
                          {coupon.discount_precentage}%
                        </span>
                      </div>
                      <div className={styles.discountType}>
                        {coupon.discount_type === "percentage"
                          ? i18n.language === "ar"
                            ? "نسبة مئوية"
                            : "Percentage"
                          : i18n.language === "ar"
                          ? "مبلغ ثابت"
                          : "Fixed Amount"}
                      </div>
                    </div>

                    <div className={styles.couponDates}>
                      <div className={styles.dateItem}>
                        <FaCalendar className={styles.dateIcon} />
                        <div className={styles.dateInfo}>
                          <span className={styles.dateLabel}>
                            {i18n.language === "ar"
                              ? "تاريخ البداية"
                              : "Start Date"}
                          </span>
                          <span className={styles.dateValue}>
                            {formatDate(coupon.start_date)}
                          </span>
                        </div>
                      </div>
                      <div className={styles.dateItem}>
                        <FaCalendar className={styles.dateIcon} />
                        <div className={styles.dateInfo}>
                          <span className={styles.dateLabel}>
                            {i18n.language === "ar"
                              ? "تاريخ النهاية"
                              : "End Date"}
                          </span>
                          <span className={styles.dateValue}>
                            {formatDate(coupon.end_date)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.usageInfo}>
                      <div className={styles.usageStats}>
                        <FaUsers className={styles.usageIcon} />
                        <div className={styles.usageDetails}>
                          <span className={styles.usageText}>
                            {coupon.time_used} / {coupon.limit}
                          </span>
                          <span className={styles.usageLabel}>
                            {i18n.language === "ar"
                              ? "مرات الاستخدام"
                              : "Times Used"}
                          </span>
                        </div>
                      </div>
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

                  <div className={styles.couponActions}>
                    <button
                      className={`${styles.actionBtn} ${styles.viewBtn}`}
                      onClick={() => handleViewDetails(coupon)}
                      title={
                        i18n.language === "ar" ? "عرض التفاصيل" : "View Details"
                      }
                    >
                      <FaEye />
                    </button>
                    <button
                      className={`${styles.actionBtn} ${styles.editBtn}`}
                      onClick={() => handleEditCoupon(coupon)}
                      title={i18n.language === "ar" ? "تعديل" : "Edit"}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className={`${styles.actionBtn} ${styles.toggleBtn}`}
                      onClick={() =>
                        handleToggleStatus(coupon.id, coupon.is_active)
                      }
                      title={
                        coupon.is_active == 1
                          ? i18n.language === "ar"
                            ? "إلغاء التفعيل"
                            : "Deactivate"
                          : i18n.language === "ar"
                          ? "تفعيل"
                          : "Activate"
                      }
                    >
                      {coupon.is_active == 1 ? <FaToggleOn /> : <FaToggleOff />}
                    </button>
                    <button
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      onClick={() => handleDeleteCoupon(coupon)}
                      title={i18n.language === "ar" ? "حذف" : "Delete"}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modals */}
          {showAddModal && (
            <AddCoupon
              onClose={() => setShowAddModal(false)}
              onCouponAdded={handleCouponAdded}
            />
          )}

          {showEditModal && selectedCoupon && (
            <EditCoupon
              coupon={selectedCoupon}
              onClose={() => {
                setShowEditModal(false);
                setSelectedCoupon(null);
              }}
              onCouponUpdated={handleCouponUpdated}
            />
          )}

          {showDetailsModal && couponDetails && (
            <CouponDetails
              coupon={couponDetails}
              onClose={() => {
                setShowDetailsModal(false);
                setCouponDetails(null);
              }}
            />
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteModal && selectedCoupon && (
            <div
              className={styles.modalOverlay}
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedCoupon(null);
              }}
            >
              <div
                className={`${styles.modalContainer} ${styles.deleteModal}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.modalHeader}>
                  <h2>
                    {i18n.language === "ar" ? "تأكيد الحذف" : "Confirm Delete"}
                  </h2>
                  <button
                    className={styles.closeBtn}
                    onClick={() => {
                      setShowDeleteModal(false);
                      setSelectedCoupon(null);
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
                      ? `هل أنت متأكد من حذف الكوبون "${selectedCoupon.code}"؟`
                      : `Are you sure you want to delete the coupon "${selectedCoupon.code}"?`}
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
                      setSelectedCoupon(null);
                    }}
                  >
                    {i18n.language === "ar" ? "إلغاء" : "Cancel"}
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={confirmDeleteCoupon}
                  >
                    {i18n.language === "ar" ? "حذف" : "Delete"}
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

export default Coupons;
