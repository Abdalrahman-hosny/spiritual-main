import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaFilter,
  FaSearch,
  FaTrash,
  FaEdit,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaEye,
  FaSpinner,
} from "react-icons/fa";
import DashboardHeader from "../DashboardHeader";
import DashboardSidebar from "../DashboardSidebar";
import "./orders.css";

const Orders = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("inProgress");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

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

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = sessionStorage.getItem("token");
        if (!token) {
          setError("No authentication token found");
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
              per_page: 10,
              page: currentPage,
            },
          }
        );

        console.log("Orders API Response:", response.data);

        if (response.data.code === 200) {
          const ordersData = response.data.data.result || [];
          const paginationData = response.data.data.meta || {};

          console.log("Orders data:", ordersData);
          console.log("Pagination data:", paginationData);

          setOrders(ordersData);
          setPagination(paginationData);
        } else {
          console.error("API returned error:", response.data);
          setError(
            `API Error: ${response.data.message || "Failed to fetch orders"}`
          );
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        if (err.response) {
          setError(
            `Server Error: ${err.response.status} - ${
              err.response.data?.message || "Unknown error"
            }`
          );
        } else if (err.request) {
          setError("Network Error: Unable to connect to server");
        } else {
          setError("Error loading orders");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage, i18n.language]);

  const tabs = [
    { id: "all", label: t("orders.allOrders"), count: pagination.total || 0 },
    { id: "pending", label: t("orders.pending"), count: 0 },
    { id: "completed", label: t("orders.completed"), count: 0 },
    { id: "cancelled", label: t("orders.cancelled"), count: 0 },
  ];

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending")
      return order.status_order === null || order.status_order === "pending";
    if (activeTab === "completed")
      return (
        order.status_order === "completed" || order.status_order === "delivered"
      );
    if (activeTab === "cancelled") return order.status_order === "cancelled";
    return true;
  });

  const currentOrders = filteredOrders;

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedOrders(currentOrders.map((order) => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId, checked) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    }
  };

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
      // Show message for no image
      toast.info(t("orders.noImageAvailable"));
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

        {/* Orders Content */}
        <div className="orders-page">
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

          {/* Orders Table */}
          <div className="orders-table-container">
            {loading ? (
              <div className="loading-container">
                <FaSpinner className="spinner" />
                <p>{t("orders.loading")}</p>
              </div>
            ) : error ? (
              <div className="error-container">
                <p className="error-message">{error}</p>
                <button
                  className="retry-btn"
                  onClick={() => window.location.reload()}
                >
                  {t("orders.retry")}
                </button>
              </div>
            ) : currentOrders.length === 0 ? (
              <div className="empty-container">
                <p>{t("orders.noOrders")}</p>
              </div>
            ) : (
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={
                          selectedOrders.length === currentOrders.length &&
                          currentOrders.length > 0
                        }
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="checkbox"
                      />
                    </th>
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
                  {currentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={(e) =>
                            handleSelectOrder(order.id, e.target.checked)
                          }
                          className="checkbox"
                        />
                      </td>
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
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {pagination.last_page > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <FaChevronLeft />
              </button>

              {Array.from(
                { length: pagination.last_page || 1 },
                (_, i) => i + 1
              ).map((page) => (
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
                disabled={currentPage === pagination.last_page}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
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
                      <FaTrash />
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

export default Orders;
