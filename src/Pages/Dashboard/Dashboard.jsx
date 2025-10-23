import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import "./dashboard.css";
import {
  FaMoneyBillWave,
  FaUsers,
  FaClipboardList,
  FaHandHoldingUsd,
  FaGraduationCap,
  FaEdit,
  FaTrashAlt,
  FaShoppingBag,
  FaSpinner,
  FaEye,
  FaTimes,
} from "react-icons/fa";

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [statistics, setStatistics] = useState({
    total_client: 0,
    total_courses: 0,
    total_products: 0,
    total_orders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Orders state
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(null);

  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Orders handlers
  const handleDeleteOrder = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    setSelectedOrder(order);
    setShowDeleteModal(true);
  };

  const confirmDeleteOrder = async () => {
    if (!selectedOrder) return;

    try {
      setDeleteLoading(true);
      const token = sessionStorage.getItem("token");

      const response = await axios.delete(
        `https://spiritual.brmjatech.uk/api/dashboard/orders/${selectedOrder.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Accept-Language": i18n.language === "ar" ? "ar" : "en",
          },
        }
      );

      if (response.data.code === 200) {
        toast.success(t("orders.deleteSuccess"));
        // Remove order from local state
        setOrders((prev) =>
          prev.filter((order) => order.id !== selectedOrder.id)
        );
        setShowDeleteModal(false);
        setSelectedOrder(null);
      } else {
        toast.error(response.data.message || t("orders.deleteError"));
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error(t("orders.deleteError"));
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleViewImage = (imageUrl) => {
    if (imageUrl && imageUrl !== null) {
      setSelectedImage(imageUrl);
      setShowImageModal(true);
    } else {
      toast.info(t("orders.noImageAvailable"));
    }
  };

  // Fetch statistics from API
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = sessionStorage.getItem("token");

        if (!token) {
          setError("No authentication token found");
          return;
        }

        console.log(
          "Fetching statistics with token:",
          token.substring(0, 20) + "..."
        );

        const response = await axios.get(
          "https://spiritual.brmjatech.uk/api/statics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Accept-Language": i18n.language === "ar" ? "ar" : "en",
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Statistics API Response:", response.data);

        if (response.data.code === 200) {
          setStatistics(response.data.data);
          console.log("Statistics loaded successfully:", response.data.data);
        } else {
          console.error("API returned error:", response.data);
          setError(
            `API Error: ${
              response.data.message || "Failed to fetch statistics"
            }`
          );
        }
      } catch (err) {
        console.error("Error fetching statistics:", err);
        if (err.response) {
          console.error("Response status:", err.response.status);
          console.error("Response data:", err.response.data);
          setError(
            `Server Error: ${err.response.status} - ${
              err.response.data?.message || "Unknown error"
            }`
          );
        } else if (err.request) {
          setError("Network Error: Unable to connect to server");
        } else {
          setError("Error loading statistics");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [i18n.language]);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setOrdersLoading(true);
        setOrdersError(null);

        const token = sessionStorage.getItem("token");
        if (!token) {
          setOrdersError("No authentication token found");
          return;
        }

        const response = await axios.get(
          "https://spiritual.brmjatech.uk/api/dashboard/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Accept-Language": i18n.language === "ar" ? "ar" : "en",
            },
            params: {
              per_page: 5, // Show only 5 recent orders
              page: 1,
            },
          }
        );

        if (response.data.code === 200) {
          const ordersData = response.data.data.result || [];
          setOrders(ordersData);
        } else {
          setOrdersError(
            `API Error: ${response.data.message || "Failed to fetch orders"}`
          );
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrdersError("Error loading orders");
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, [i18n.language]);

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

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1 className="dashboard-title">{t("dashboard.title")}</h1>
            <p className="dashboard-welcome">{t("dashboard.welcome")}</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            {loading ? (
              <div className="loading-container">
                <FaSpinner className="spinner" />
                <p>{t("dashboard.loading")}</p>
              </div>
            ) : error ? (
              <div className="error-container">
                <p className="error-message">{error}</p>
                <button
                  className="retry-btn"
                  onClick={() => window.location.reload()}
                >
                  {t("dashboard.retry")}
                </button>
              </div>
            ) : (
              <>
                <div className="stat-card purple">
                  <div className="stat-icon">
                    <FaUsers />
                  </div>
                  <div className="stat-content">
                    <h3>{t("dashboard.stats.customers")}</h3>
                    <p className="stat-value">{statistics.total_client}</p>
                  </div>
                </div>

                <div className="stat-card dark">
                  <div className="stat-icon">
                    <FaGraduationCap />
                  </div>
                  <div className="stat-content">
                    <h3>{t("dashboard.stats.courses")}</h3>
                    <p className="stat-value">{statistics.total_courses}</p>
                  </div>
                </div>

                <div className="stat-card dark">
                  <div className="stat-icon">
                    <FaShoppingBag />
                  </div>
                  <div className="stat-content">
                    <h3>{t("dashboard.stats.products")}</h3>
                    <p className="stat-value">{statistics.total_products}</p>
                  </div>
                </div>

                <div className="stat-card purple">
                  <div className="stat-icon">
                    <FaClipboardList />
                  </div>
                  <div className="stat-content">
                    <h3>{t("dashboard.stats.orders")}</h3>
                    <p className="stat-value">{statistics.total_orders}</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Orders Table */}
          <div className="orders-section">
            <h3>{t("dashboard.ordersTable.title")}</h3>
            <div className="table-container">
              {ordersLoading ? (
                <div className="loading-container">
                  <FaSpinner className="spinner" />
                  <p>{t("orders.loading")}</p>
                </div>
              ) : ordersError ? (
                <div className="error-container">
                  <p className="error-message">{ordersError}</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="empty-container">
                  <p>{t("orders.noOrders")}</p>
                </div>
              ) : (
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>{t("orders.orderId")}</th>
                      <th>{t("orders.productName")}</th>
                      <th>{t("orders.image")}</th>
                      <th>{t("orders.customers")}</th>
                      <th>{t("orders.price")}</th>
                      <th>{t("orders.payment")}</th>
                      <th>{t("orders.date")}</th>
                      <th>{t("orders.status")}</th>
                      <th>{t("orders.actions")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="order-id-cell">
                          <span className="order-id">#{order.id}</span>
                        </td>
                        <td className="product-name-cell">
                          <span className="product-name">
                            {order.product_name || "N/A"}
                          </span>
                        </td>
                        <td className="image-cell">
                          {order.image && order.image !== null ? (
                            <div className="image-container">
                              <img
                                src={order.image}
                                alt={order.product_name || "Order item"}
                                className="item-image"
                              />
                              <button
                                className="view-image-btn"
                                onClick={() => handleViewImage(order.image)}
                                title={t("orders.viewImage")}
                              >
                                <FaEye />
                              </button>
                            </div>
                          ) : (
                            <div className="no-image-placeholder">
                              <button
                                className="view-image-btn"
                                onClick={() => handleViewImage(null)}
                                title={t("orders.viewImage")}
                              >
                                <FaEye />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="customer-cell">
                          <span className="customer-name">
                            {order.user_id || "N/A"}
                          </span>
                        </td>
                        <td className="price-cell">
                          <span className="price">{order.price || "N/A"}</span>
                        </td>
                        <td className="payment-cell">
                          <span
                            className={`payment-status ${
                              order.status === "Paid" ? "paid" : "unpaid"
                            }`}
                          >
                            {order.status === "Paid"
                              ? t("orders.paid")
                              : t("orders.unpaid")}
                          </span>
                        </td>
                        <td className="date-cell">
                          <span className="date">
                            {order.created_at || "N/A"}
                          </span>
                        </td>
                        <td className="status-cell">
                          <span
                            className={`status ${
                              order.status_order || "pending"
                            }`}
                          >
                            {order.status_order || t("orders.pending")}
                          </span>
                        </td>
                        <td className="action-cell">
                          <div className="action-buttons">
                            <button
                              className="action-btn delete-btn"
                              onClick={() => handleDeleteOrder(order.id)}
                              title={t("orders.deleteOrder")}
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowDeleteModal(false)}
        >
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{t("orders.deleteOrder")}</h3>
              <button
                className="close-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="modal-content">
              <p>
                {i18n.language === "ar"
                  ? `هل أنت متأكد من حذف الطلب رقم #${selectedOrder?.id}؟ لا يمكن التراجع عن هذا الإجراء.`
                  : `Are you sure you want to delete order #${selectedOrder?.id}? This action cannot be undone.`}
              </p>
              <div className="modal-actions">
                <button
                  className="cancel-btn"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleteLoading}
                >
                  {t("orders.cancel")}
                </button>
                <button
                  className="delete-btn"
                  onClick={confirmDeleteOrder}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? (
                    <>
                      <FaSpinner className="spinner" />
                      {t("orders.deleting")}...
                    </>
                  ) : (
                    <>
                      <FaTrashAlt />
                      {t("orders.delete")}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image View Modal */}
      {showImageModal && (
        <div className="modal-overlay" onClick={() => setShowImageModal(false)}>
          <div
            className="image-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="image-modal-header">
              <h3>{t("orders.imagePreview")}</h3>
              <button
                className="close-btn"
                onClick={() => setShowImageModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="image-modal-content">
              <img
                src={selectedImage}
                alt="Order item"
                className="modal-image"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
