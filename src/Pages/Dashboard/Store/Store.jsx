import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaBoxOpen,
  FaShoppingCart,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
  FaTimes,
  FaStar,
  FaHeart,
  FaShare,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import DashboardHeader from "../DashboardHeader";
import DashboardSidebar from "../DashboardSidebar";
import "./store.css";

const Store = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("token");

        if (!token) {
          setError("No authentication token found");
          return;
        }

        const response = await axios.get(
          "https://spiritual.brmjatech.uk/api/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Accept-Language": i18n.language === "ar" ? "ar" : "en",
            },
            params: {
              search: searchTerm || "Spiritual",
              per_page: 12,
              page: currentPage,
            },
          }
        );

        if (response.data.code === 200) {
          setProducts(response.data.data.result);
          setPagination(response.data.data.meta);
        } else {
          setError("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error loading products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, searchTerm, i18n.language]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleAddProduct = () => {
    navigate("/dashboard/store/add");
  };

  const handleEditProduct = (productId) => {
    navigate(`/dashboard/store/edit/${productId}`);
  };

  const handleProductClick = async (productId) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        `https://spiritual.brmjatech.uk/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Accept-Language": i18n.language === "ar" ? "ar" : "en",
          },
        }
      );

      if (response.data.code === 200) {
        setSelectedProduct(response.data.data);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setSelectedImageIndex(0);
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const getCurrentImage = () => {
    if (!selectedProduct) return "";
    if (selectedImageIndex === 0) {
      return selectedProduct.image;
    }
    return (
      selectedProduct.images?.[selectedImageIndex - 1]?.image ||
      selectedProduct.image
    );
  };

  const handleDeleteProduct = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.delete(
        `https://spiritual.brmjatech.uk/api/products/${productToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Accept-Language": i18n.language === "ar" ? "ar" : "en",
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        toast.success("تم حذف المنتج بنجاح!");
        // Refresh products list
        window.location.reload();
      } else {
        toast.error("خطأ في حذف المنتج");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("خطأ في حذف المنتج. حاول مرة أخرى.");
    } finally {
      setDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  const handleToggleStatus = async (product) => {
    try {
      const token = sessionStorage.getItem("token");
      const newStatus = product.is_active === 1 ? 0 : 1;

      const response = await axios.put(
        `https://spiritual.brmjatech.uk/api/products/status/${product.id}`,
        { is_active: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Accept-Language": i18n.language === "ar" ? "ar" : "en",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.code === 200) {
        toast.success(
          newStatus === 1
            ? "تم تفعيل المنتج بنجاح!"
            : "تم إلغاء تفعيل المنتج بنجاح!"
        );
        // Refresh products list
        window.location.reload();
      } else {
        toast.error("خطأ في تغيير حالة المنتج");
      }
    } catch (error) {
      console.error("Error toggling product status:", error);
      toast.error("خطأ في تغيير حالة المنتج. حاول مرة أخرى.");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to truncate description to 4-5 words
  const truncateDescription = (text, maxWords = 5) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  // Calculate tab counts
  const outOfStockCount = products.filter(
    (product) => product.stock === 0
  ).length;
  const allProductsCount = products.length;

  const tabs = [
    { id: "all", label: t("store.allProducts"), count: allProductsCount },
    { id: "outOfStock", label: t("store.outOfStock"), count: outOfStockCount },
  ];

  // Filter products based on active tab
  const filteredProducts = products.filter((product) => {
    if (activeTab === "all") return true;
    if (activeTab === "outOfStock") return product.stock === 0;
    return true;
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

        {/* Store Content */}
        <div className="store-page">
          {/* Header Section */}
          <div className="store-header">
            <div className="header-left">
              <button className="add-product-btn" onClick={handleAddProduct}>
                <FaPlus />
                {t("store.addNewProduct")}
              </button>
            </div>

            <div className="header-right">
              <div className="search-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder={t("store.search")}
                  className="search-input"
                  value={searchTerm}
                  onChange={handleSearch}
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

          {/* Products Grid */}
          <div className="products-grid">
            {loading ? (
              <div className="loading-container">
                <FaSpinner className="spinner" />
                <p>{t("store.loading")}</p>
              </div>
            ) : error ? (
              <div className="error-container">
                <p className="error-message">{error}</p>
                <button
                  className="retry-btn"
                  onClick={() => window.location.reload()}
                >
                  {t("store.retry")}
                </button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="empty-container">
                <p>{t("store.noProducts")}</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-card"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="product-image-container">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/200/150";
                      }}
                    />

                    {/* Action Buttons */}
                    <div className="product-actions">
                      <button
                        className="action-btn edit-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditProduct(product.id);
                        }}
                        title={t("store.editProduct")}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className={`action-btn status-btn ${
                          product.is_active === 1 ? "active" : "inactive"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStatus(product);
                        }}
                        title={
                          product.is_active === 1
                            ? t("store.deactivate")
                            : t("store.activate")
                        }
                      >
                        {product.is_active === 1 ? <FaEye /> : <FaEyeSlash />}
                      </button>

                      <button
                        className="action-btn delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProduct(product);
                        }}
                        title={t("store.deleteProduct")}
                      >
                        <FaTrash />
                      </button>
                    </div>

                    <div className="status-badge">
                      <span
                        className={`status ${
                          product.stock > 0 ? "available" : "unavailable"
                        }`}
                      >
                        {product.stock > 0
                          ? t("store.available")
                          : t("store.unavailable")}
                      </span>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">
                      {product.price} {t("store.currency")}
                    </p>
                    <p className="product-description">
                      {truncateDescription(product.small_desc)}
                    </p>
                    <div className="product-stats">
                      <div className="stat-item">
                        <FaBoxOpen className="stat-icon" />
                        <span>
                          {product.stock} {t("store.inStock")}
                        </span>
                      </div>
                      <div className="stat-item">
                        <span className="brand-name">
                          {product.brand?.name || "No Brand"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {!loading && !error && pagination.last_page > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                disabled={pagination.current_page === 1}
                onClick={() => handlePageChange(pagination.current_page - 1)}
              >
                <FaChevronLeft />
              </button>

              {Array.from(
                { length: pagination.last_page },
                (_, i) => i + 1
              ).map((page) => (
                <button
                  key={page}
                  className={`pagination-number ${
                    pagination.current_page === page ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page.toString().padStart(2, "0")}
                </button>
              ))}

              <button
                className="pagination-btn"
                disabled={pagination.current_page === pagination.last_page}
                onClick={() => handlePageChange(pagination.current_page + 1)}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Details Modal */}
      {isModalOpen && selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
          >
            <div className="modal-header">
              <h2 className="modal-title">{selectedProduct.name}</h2>
              <button className="modal-close" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-image-section">
                <div className="main-image">
                  <img
                    src={getCurrentImage()}
                    alt={selectedProduct.name}
                    className="product-main-image"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/300";
                    }}
                  />
                </div>
                <div className="image-gallery">
                  {/* الصورة الرئيسية */}
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className={`gallery-thumb ${
                      selectedImageIndex === 0 ? "active" : ""
                    }`}
                    onClick={() => handleImageClick(0)}
                    onError={(e) => {
                      e.target.src = "/api/placeholder/100/75";
                    }}
                  />
                  {/* الصور الإضافية */}
                  {selectedProduct.images?.map((img, index) => (
                    <img
                      key={img.id}
                      src={img.image}
                      alt={`${selectedProduct.name} ${index + 1}`}
                      className={`gallery-thumb ${
                        selectedImageIndex === index + 1 ? "active" : ""
                      }`}
                      onClick={() => handleImageClick(index + 1)}
                      onError={(e) => {
                        e.target.src = "/api/placeholder/100/75";
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="modal-details-section">
                {/* معلومات المنتج الأساسية */}
                <div className="product-basic-info">
                  <div className="price-rating-row">
                    <div className="price-section">
                      <span className="detail-label">{t("store.price")}</span>
                      <span className="detail-value price-value">
                        {selectedProduct.price} {t("store.currency")}
                      </span>
                    </div>

                    <div className="rating-section">
                      <span className="detail-label">{t("store.rating")}</span>
                      <div className="rating-display">
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`star ${
                                i < Math.floor(selectedProduct.rating_avg || 0)
                                  ? "filled"
                                  : "empty"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="reviews-count">
                          {selectedProduct.rating_avg || 0} (
                          {selectedProduct.reviews_count || 0}{" "}
                          {t("store.reviews")})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="stock-section">
                    <span className="detail-label">
                      {t("store.stockStatus")}
                    </span>
                    <span
                      className={`detail-value stock-value ${
                        selectedProduct.stock > 0 ? "available" : "unavailable"
                      }`}
                    >
                      {selectedProduct.stock > 0
                        ? `${selectedProduct.stock} ${t("store.inStock")}`
                        : t("store.outOfStock")}
                    </span>
                  </div>
                </div>

                {/* الوصف */}
                <div className="description-section">
                  <div className="detail-item">
                    <span className="detail-label">
                      {t("store.shortDescription")}
                    </span>
                    <p className="detail-value description-text">
                      {selectedProduct.small_desc}
                    </p>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">
                      {t("store.fullDescription")}
                    </span>
                    <p className="detail-value description-text full-description">
                      {selectedProduct.description}
                    </p>
                  </div>
                </div>

                {/* العلامة التجارية */}
                <div className="brand-section">
                  <div className="detail-item">
                    <span className="detail-label">{t("store.brand")}</span>
                    <div className="brand-info">
                      <span className="brand-name-large">
                        {selectedProduct.brand?.name || t("store.noBrand")}
                      </span>
                      {selectedProduct.brand?.description && (
                        <span className="brand-description">
                          {selectedProduct.brand.description}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="modal-close-btn" onClick={closeModal}>
                {t("store.close")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && productToDelete && (
        <div
          className="modal-overlay"
          onClick={() => setDeleteModalOpen(false)}
        >
          <div
            className="modal-content delete-modal"
            onClick={(e) => e.stopPropagation()}
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
          >
            <div className="modal-header">
              <h2>{t("store.deleteProduct")}</h2>
              <button
                className="modal-close"
                onClick={() => setDeleteModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="delete-confirmation">
                <div className="warning-icon">
                  <FaTrash />
                </div>
                <p className="confirmation-text">
                  {t("store.deleteConfirmation")} "
                  <strong>{productToDelete.name}</strong>"؟
                </p>
                <p className="warning-text">{t("store.deleteWarning")}</p>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="modal-cancel-btn"
                onClick={() => setDeleteModalOpen(false)}
              >
                {t("store.cancel")}
              </button>
              <button className="modal-delete-btn" onClick={confirmDelete}>
                <FaTrash />
                {t("store.delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;
