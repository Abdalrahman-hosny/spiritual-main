import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaFilter,
  FaSearch,
  FaTrash,
  FaEdit,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const tabs = [
    { id: "myFiles", label: t("orders.myFiles"), count: 10 },
    { id: "underReview", label: t("orders.underReview"), count: 120 },
    { id: "completed", label: t("orders.completed"), count: 30 },
    { id: "inProgress", label: t("orders.inProgress"), count: 160 },
  ];

  const orders = [
    {
      id: "021231",
      itemName: "مسبحة بـ 99 خرزة",
      itemType: "product",
      image: "/api/placeholder/40/40",
      customer: "مصطفي السيد",
      price: "5,000.00 ج.م",
      paymentStatus: "paid",
      date: "2:14 Pm 04/17/23",
      status: "delivered",
    },
    {
      id: "021232",
      itemName: "اسم الكورس",
      itemType: "course",
      image: "/api/placeholder/40/40",
      customer: "مصطفي السيد",
      price: "1000 ج.م",
      paymentStatus: "unpaid",
      date: "2:14 Pm 04/17/23",
      status: "inDelivery",
    },
    {
      id: "021233",
      itemName: "مسبحة بـ 99 خرزة",
      itemType: "product",
      image: "/api/placeholder/40/40",
      customer: "مصطفي السيد",
      price: "5,000.00 ج.م",
      paymentStatus: "paid",
      date: "2:14 Pm 04/17/23",
      status: "inDelivery",
    },
    {
      id: "021234",
      itemName: "اسم الكورس",
      itemType: "course",
      image: "/api/placeholder/40/40",
      customer: "مصطفي السيد",
      price: "1000 ج.م",
      paymentStatus: "unpaid",
      date: "2:14 Pm 04/17/23",
      status: "delivered",
    },
    {
      id: "021235",
      itemName: "مسبحة بـ 99 خرزة",
      itemType: "product",
      image: "/api/placeholder/40/40",
      customer: "مصطفي السيد",
      price: "5,000.00 ج.م",
      paymentStatus: "paid",
      date: "2:14 Pm 04/17/23",
      status: "inDelivery",
    },
    {
      id: "021236",
      itemName: "اسم الكورس",
      itemType: "course",
      image: "/api/placeholder/40/40",
      customer: "مصطفي السيد",
      price: "1000 ج.م",
      paymentStatus: "unpaid",
      date: "2:14 Pm 04/17/23",
      status: "delivered",
    },
    {
      id: "021237",
      itemName: "مسبحة بـ 99 خرزة",
      itemType: "product",
      image: "/api/placeholder/40/40",
      customer: "مصطفي السيد",
      price: "5,000.00 ج.م",
      paymentStatus: "paid",
      date: "2:14 Pm 04/17/23",
      status: "inDelivery",
    },
    {
      id: "021238",
      itemName: "اسم الكورس",
      itemType: "course",
      image: "/api/placeholder/40/40",
      customer: "مصطفي السيد",
      price: "1000 ج.م",
      paymentStatus: "unpaid",
      date: "2:14 Pm 04/17/23",
      status: "delivered",
    },
    {
      id: "021239",
      itemName: "مسبحة بـ 99 خرزة",
      itemType: "product",
      image: "/api/placeholder/40/40",
      customer: "مصطفي السيد",
      price: "5,000.00 ج.م",
      paymentStatus: "paid",
      date: "2:14 Pm 04/17/23",
      status: "inDelivery",
    },
  ];

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "myFiles") return true;
    if (activeTab === "underReview") return true;
    if (activeTab === "completed") return order.status === "delivered";
    if (activeTab === "inProgress") return order.status === "inDelivery";
    return true;
  });

  const totalPages = Math.ceil(filteredOrders.length / 9);
  const startIndex = (currentPage - 1) * 9;
  const endIndex = startIndex + 9;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

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

  const handleEditOrder = (orderId) => {
    console.log("Edit order:", orderId);
  };

  const handleDeleteOrder = (orderId) => {
    console.log("Delete order:", orderId);
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
          {/* Header Section */}
          <div className="orders-header">
            <div className="header-left">
              <button className="filter-btn">
                <FaFilter />
                {t("orders.filter")}
              </button>
            </div>

            <div className="header-right">
              <div className="search-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder={t("orders.searchPlaceholder")}
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

          {/* Orders Table */}
          <div className="orders-table-container">
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
                  <th>{t("orders.orders")}</th>
                  <th>{t("orders.customers")}</th>
                  <th>{t("orders.price")}</th>
                  <th>{t("orders.payment")}</th>
                  <th>{t("orders.date")}</th>
                  <th>{t("orders.status")}</th>
                  <th>
                    {t("orders.action")}
                    <FaChevronDown className="dropdown-icon" />
                  </th>
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
                    <td className="order-cell">
                      <div className="order-info">
                        <span className="order-id">{order.id}</span>
                        <div className="item-details">
                          <img
                            src={order.image}
                            alt={order.itemName}
                            className="item-image"
                          />
                          <span className="item-name">{order.itemName}</span>
                        </div>
                      </div>
                    </td>
                    <td className="customer-cell">
                      <span className="customer-name">{order.customer}</span>
                    </td>
                    <td className="price-cell">
                      <span className="price">{order.price}</span>
                    </td>
                    <td className="payment-cell">
                      <span
                        className={`payment-status ${
                          order.paymentStatus === "paid" ? "paid" : "unpaid"
                        }`}
                      >
                        {order.paymentStatus === "paid"
                          ? t("orders.paid")
                          : t("orders.unpaid")}
                      </span>
                    </td>
                    <td className="date-cell">
                      <span className="date">{order.date}</span>
                    </td>
                    <td className="status-cell">
                      <span
                        className={`status ${
                          order.status === "delivered"
                            ? "delivered"
                            : "inDelivery"
                        }`}
                      >
                        {order.status === "delivered"
                          ? t("orders.delivered")
                          : t("orders.inDelivery")}
                      </span>
                    </td>
                    <td className="action-cell">
                      <div className="action-buttons">
                        <button
                          className="action-btn edit-btn"
                          onClick={() => handleEditOrder(order.id)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDeleteOrder(order.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default Orders;
