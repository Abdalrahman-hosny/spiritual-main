import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaBoxOpen,
  FaShoppingCart,
  FaChevronLeft,
  FaChevronRight,
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

  const tabs = [
    { id: "all", label: t("store.allProducts"), count: 60 },
    { id: "outOfStock", label: t("store.outOfStock"), count: 5 },
  ];

  const products = [
    {
      id: 1,
      name: "مسبحة بـ 99 خرزة بتصميم منقوش بأسماء الله الحسنى",
      price: "5,000.00 جم",
      status: "available",
      stock: 12,
      orders: 25,
      image: "/api/placeholder/200/150",
    },
    {
      id: 2,
      name: "مسبحة بـ 99 خرزة بتصميم منقوش بأسماء الله الحسنى",
      price: "5,000.00 جم",
      status: "available",
      stock: 12,
      orders: 25,
      image: "/api/placeholder/200/150",
    },
    {
      id: 3,
      name: "مسبحة بـ 99 خرزة بتصميم منقوش بأسماء الله الحسنى",
      price: "5,000.00 جم",
      status: "available",
      stock: 12,
      orders: 25,
      image: "/api/placeholder/200/150",
    },
    {
      id: 4,
      name: "مسبحة بـ 99 خرزة بتصميم منقوش بأسماء الله الحسنى",
      price: "5,000.00 جم",
      status: "available",
      stock: 12,
      orders: 25,
      image: "/api/placeholder/200/150",
    },
    {
      id: 5,
      name: "مسبحة بـ 99 خرزة بتصميم منقوش بأسماء الله الحسنى",
      price: "5,000.00 جم",
      status: "available",
      stock: 12,
      orders: 25,
      image: "/api/placeholder/200/150",
    },
    {
      id: 6,
      name: "مسبحة بـ 99 خرزة بتصميم منقوش بأسماء الله الحسنى",
      price: "5,000.00 جم",
      status: "available",
      stock: 12,
      orders: 25,
      image: "/api/placeholder/200/150",
    },
    {
      id: 7,
      name: "مسبحة بـ 99 خرزة بتصميم منقوش بأسماء الله الحسنى",
      price: "5,000.00 جم",
      status: "unavailable",
      stock: 0,
      orders: 25,
      image: "/api/placeholder/200/150",
    },
    {
      id: 8,
      name: "مسبحة بـ 99 خرزة بتصميم منقوش بأسماء الله الحسنى",
      price: "5,000.00 جم",
      status: "available",
      stock: 12,
      orders: 25,
      image: "/api/placeholder/200/150",
    },
  ];

  const filteredProducts = products.filter((product) => {
    if (activeTab === "all") return true;
    if (activeTab === "outOfStock") return product.status === "unavailable";
    return true;
  });

  const totalPages = Math.ceil(filteredProducts.length / 8);
  const startIndex = (currentPage - 1) * 8;
  const endIndex = startIndex + 8;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

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
            {currentProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <button
                    className="edit-btn"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    <FaEdit />
                  </button>
                  <div className="status-badge">
                    <span
                      className={`status ${
                        product.status === "available"
                          ? "available"
                          : "unavailable"
                      }`}
                    >
                      {product.status === "available"
                        ? t("store.available")
                        : t("store.unavailable")}
                    </span>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">{product.price}</p>
                  <div className="product-stats">
                    <div className="stat-item">
                      <FaBoxOpen className="stat-icon" />
                      <span>
                        {product.stock} {t("store.inStock")}
                      </span>
                    </div>
                    <div className="stat-item">
                      <FaShoppingCart className="stat-icon" />
                      <span>
                        {product.orders} {t("store.numberOfOrders")}
                      </span>
                    </div>
                  </div>
                </div>
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

export default Store;
