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
  FaImage,
  FaTag,
  FaGlobe,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import AddBrand from "./AddBrand";
import EditBrand from "./EditBrand";
import BrandDetails from "./BrandDetails";
import styles from "./brands.module.css";
import "../dashboard.css";

const Brands = () => {
  const { i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [brands, setBrands] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandDetails, setBrandDetails] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Fetch brands
  const fetchBrands = useCallback(async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        `https://spiritual.brmjatech.uk/api/dashboard/brand`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Accept-Language": i18n.language === "ar" ? "ar" : "en",
          },
        }
      );

      if (response.data.code === 200) {
        const brandsData = response.data.message || [];
        // Convert boolean is_active to number for consistency
        const normalizedBrands = brandsData.map((brand) => ({
          ...brand,
          is_active: brand.is_active === true ? 1 : 0,
        }));
        setAllBrands(normalizedBrands);
        setBrands(normalizedBrands);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
      toast.error(
        i18n.language === "ar"
          ? "خطأ في جلب البراندات"
          : "Error fetching brands"
      );
    } finally {
      setLoading(false);
    }
  }, [i18n.language]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      setBrands(allBrands);
      return;
    }
    // Filter brands locally since API doesn't support search
    const filtered = allBrands.filter(
      (brand) =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBrands(filtered);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === "") {
      setBrands(allBrands);
    }
  };

  // Handle add brand
  const handleAddBrand = () => {
    setShowAddModal(true);
  };

  const handleBrandAdded = (newBrand) => {
    setShowAddModal(false);
    // Convert boolean is_active to number for consistency
    const normalizedBrand = {
      ...newBrand,
      is_active: newBrand.is_active === true ? 1 : 0,
    };
    setAllBrands((prev) => [...prev, normalizedBrand]);
    setBrands((prev) => [...prev, normalizedBrand]);
  };

  // Handle edit brand
  const handleEditBrand = (brand) => {
    setSelectedBrand(brand);
    setShowEditModal(true);
  };

  const handleBrandUpdated = (updatedBrand) => {
    setShowEditModal(false);
    setSelectedBrand(null);
    // Convert boolean is_active to number for consistency
    const normalizedBrand = {
      ...updatedBrand,
      is_active: updatedBrand.is_active === true ? 1 : 0,
    };
    setAllBrands((prev) =>
      prev.map((brand) =>
        brand.id === normalizedBrand.id ? normalizedBrand : brand
      )
    );
    setBrands((prev) =>
      prev.map((brand) =>
        brand.id === normalizedBrand.id ? normalizedBrand : brand
      )
    );
  };

  // Handle view brand details
  const handleViewDetails = (brand) => {
    setBrandDetails(brand);
    setShowDetailsModal(true);
  };

  // Handle delete brand
  const handleDeleteBrand = (brand) => {
    setSelectedBrand(brand);
    setShowDeleteModal(true);
  };

  const confirmDeleteBrand = async () => {
    if (!selectedBrand) return;

    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(
        `https://spiritual.brmjatech.uk/api/dashboard/brand/${selectedBrand.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      toast.success(
        i18n.language === "ar"
          ? "تم حذف البراند بنجاح"
          : "Brand deleted successfully"
      );
      setShowDeleteModal(false);
      setSelectedBrand(null);

      // Update local state immediately
      setAllBrands((prev) =>
        prev.filter((brand) => brand.id !== selectedBrand.id)
      );
      setBrands((prev) =>
        prev.filter((brand) => brand.id !== selectedBrand.id)
      );
    } catch (error) {
      console.error("Error deleting brand:", error);
      toast.error(
        i18n.language === "ar" ? "خطأ في حذف البراند" : "Error deleting brand"
      );
    }
  };

  // Handle toggle status
  const handleToggleStatus = async (brandId, currentStatus) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(
        `https://spiritual.brmjatech.uk/api/dashboard/brand/status/${brandId}`,
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
          ? "تم تحديث حالة البراند"
          : "Brand status updated"
      );

      // Update local state immediately
      const updatedBrands = brands.map((brand) =>
        brand.id === brandId
          ? { ...brand, is_active: currentStatus === 1 ? 0 : 1 }
          : brand
      );
      setBrands(updatedBrands);
      setAllBrands(updatedBrands);
    } catch (error) {
      console.error("Error updating brand status:", error);
      toast.error(
        i18n.language === "ar"
          ? "خطأ في تحديث حالة البراند"
          : "Error updating brand status"
      );
    }
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

        {/* Brands Content */}
        <div className={styles.brandsContainer}>
          <div className={styles.brandsHeader}>
            <div className={styles.headerContent}>
              <h1 className={styles.pageTitle}>
                {i18n.language === "ar"
                  ? "إدارة البراندات"
                  : "Brands Management"}
              </h1>
              <p className={styles.pageSubtitle}>
                {i18n.language === "ar"
                  ? "قم بإدارة البراندات والعلامات التجارية"
                  : "Manage brands and trademarks"}
              </p>
            </div>
            <div className={styles.headerActions}>
              <button className={styles.addBrandBtn} onClick={handleAddBrand}>
                <FaPlus />
                {i18n.language === "ar" ? "إضافة براند" : "Add Brand"}
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className={styles.brandsFilters}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <div className={styles.searchInputGroup}>
                <FaSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder={
                    i18n.language === "ar"
                      ? "البحث في البراندات..."
                      : "Search brands..."
                  }
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className={styles.searchInput}
                />
              </div>
              <button type="submit" className={styles.searchBtn}>
                {i18n.language === "ar" ? "بحث" : "Search"}
              </button>
            </form>
          </div>

          {/* Brands Grid */}
          {loading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <p>
                {i18n.language === "ar"
                  ? "جاري تحميل البراندات..."
                  : "Loading brands..."}
              </p>
            </div>
          ) : brands.length === 0 ? (
            <div className={styles.emptyState}>
              <FaTag className={styles.emptyIcon} />
              <h3>
                {i18n.language === "ar" ? "لا توجد براندات" : "No Brands Found"}
              </h3>
              <p>
                {i18n.language === "ar"
                  ? "لم يتم العثور على أي براندات"
                  : "No brands found"}
              </p>
            </div>
          ) : (
            <div className={styles.brandsGrid}>
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className={`${styles.brandCard} ${
                    brand.is_active === 0 ? styles.inactive : ""
                  }`}
                >
                  <div className={styles.brandImage}>
                    {brand.logo ? (
                      <img src={brand.logo} alt={brand.name} />
                    ) : (
                      <div className={styles.brandPlaceholder}>
                        <FaImage />
                      </div>
                    )}
                  </div>

                  <div className={styles.brandContent}>
                    <div
                      className={`${styles.brandStatus} ${
                        brand.is_active === 1 ? styles.active : styles.inactive
                      }`}
                    >
                      {brand.is_active === 1
                        ? i18n.language === "ar"
                          ? "نشط"
                          : "Active"
                        : i18n.language === "ar"
                        ? "غير نشط"
                        : "Inactive"}
                    </div>
                    <h3 className={styles.brandName}>{brand.name}</h3>
                    <p className={styles.brandSlug}>@{brand.slug}</p>
                    <p className={styles.brandDesc}>
                      {brand.desc
                        ? brand.desc.length > 100
                          ? `${brand.desc.substring(0, 100)}...`
                          : brand.desc
                        : i18n.language === "ar"
                        ? "لا يوجد وصف"
                        : "No description"}
                    </p>
                  </div>

                  <div className={styles.brandActions}>
                    <button
                      className={`${styles.actionBtn} ${styles.viewBtn}`}
                      onClick={() => handleViewDetails(brand)}
                      title={
                        i18n.language === "ar" ? "عرض التفاصيل" : "View Details"
                      }
                    >
                      <FaEye />
                    </button>
                    <button
                      className={`${styles.actionBtn} ${styles.editBtn}`}
                      onClick={() => handleEditBrand(brand)}
                      title={i18n.language === "ar" ? "تعديل" : "Edit"}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className={`${styles.actionBtn} ${styles.toggleBtn} ${
                        brand.is_active === 1 ? styles.active : styles.inactive
                      }`}
                      onClick={() =>
                        handleToggleStatus(brand.id, brand.is_active)
                      }
                      title={
                        brand.is_active === 1
                          ? i18n.language === "ar"
                            ? "إلغاء التفعيل"
                            : "Deactivate"
                          : i18n.language === "ar"
                          ? "تفعيل"
                          : "Activate"
                      }
                    >
                      {brand.is_active === 1 ? <FaToggleOn /> : <FaToggleOff />}
                    </button>
                    <button
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      onClick={() => handleDeleteBrand(brand)}
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
            <AddBrand
              onClose={() => setShowAddModal(false)}
              onBrandAdded={handleBrandAdded}
            />
          )}

          {showEditModal && selectedBrand && (
            <EditBrand
              brand={selectedBrand}
              onClose={() => {
                setShowEditModal(false);
                setSelectedBrand(null);
              }}
              onBrandUpdated={handleBrandUpdated}
            />
          )}

          {showDetailsModal && brandDetails && (
            <BrandDetails
              brand={brandDetails}
              onClose={() => {
                setShowDetailsModal(false);
                setBrandDetails(null);
              }}
            />
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteModal && selectedBrand && (
            <div
              className={styles.modalOverlay}
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedBrand(null);
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
                      setSelectedBrand(null);
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
                      ? `هل أنت متأكد من حذف البراند "${selectedBrand.name}"؟`
                      : `Are you sure you want to delete the brand "${selectedBrand.name}"?`}
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
                      setSelectedBrand(null);
                    }}
                  >
                    {i18n.language === "ar" ? "إلغاء" : "Cancel"}
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={confirmDeleteBrand}
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

export default Brands;
