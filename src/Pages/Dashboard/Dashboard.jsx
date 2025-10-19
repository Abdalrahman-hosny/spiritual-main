import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
} from "react-icons/fa";

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
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

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1 className="dashboard-title">{t("dashboard.title")}</h1>
            <p className="dashboard-welcome">{t("dashboard.welcome")}</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card purple">
              <div className="stat-icon">
                <FaMoneyBillWave />
              </div>
              <div className="stat-content">
                <h3>{t("dashboard.stats.totalSales")}</h3>
                <p className="stat-value">
                  25,000 {t("dashboard.stats.currency")}
                </p>
              </div>
            </div>

            <div className="stat-card dark">
              <div className="stat-icon">
                <FaUsers />
              </div>
              <div className="stat-content">
                <h3>{t("dashboard.stats.customers")}</h3>
                <p className="stat-value">1,250</p>
              </div>
            </div>

            <div className="stat-card dark">
              <div className="stat-icon">
                <FaClipboardList />
              </div>
              <div className="stat-content">
                <h3>{t("dashboard.stats.orders")}</h3>
                <p className="stat-value">3,450</p>
              </div>
            </div>

            <div className="stat-card purple">
              <div className="stat-icon">
                <FaHandHoldingUsd />
              </div>
              <div className="stat-content">
                <h3>{t("dashboard.stats.courseRevenue")}</h3>
                <p className="stat-value">
                  15,000 {t("dashboard.stats.currency")}
                </p>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="charts-section">
            <div className="chart-card">
              <h3>{t("dashboard.charts.totalIncome")}</h3>
              <div className="chart-placeholder">
                <div className="line-chart-data">
                  <span>
                    <span className="color-box purple"></span>
                    {t("dashboard.charts.courseRevenue")}
                  </span>
                  <span>
                    <span className="color-box black"></span>
                    {t("dashboard.charts.salesRevenue")}
                  </span>
                </div>
                <span className="line-chart-value">
                  {t("dashboard.stats.currency")} 956000
                </span>
              </div>
            </div>

            <div className="chart-card">
              <h3>{t("dashboard.charts.mostRequestedSections")}</h3>
              <div className="chart-placeholder">
                <span className="line-chart-value">460</span>
                <div className="donut-chart-legend">
                  <div className="donut-chart-legend-item">
                    <span className="color-box purple"></span>
                    <span>{t("dashboard.charts.courses")}: 280 (62.5%)</span>
                  </div>
                  <div className="donut-chart-legend-item">
                    <span className="color-box black"></span>
                    <span>{t("dashboard.charts.products")}: 60 (37.5%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="orders-section">
            <h3>{t("dashboard.ordersTable.title")}</h3>
            <div className="table-container">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>{t("dashboard.ordersTable.orders")}</th>
                    <th>{t("dashboard.ordersTable.customers")}</th>
                    <th>{t("dashboard.ordersTable.price")}</th>
                    <th>{t("dashboard.ordersTable.payment")}</th>
                    <th>{t("dashboard.ordersTable.date")}</th>
                    <th>{t("dashboard.ordersTable.status")}</th>
                    <th>{t("dashboard.ordersTable.action")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#001</td>
                    <td>أحمد محمد</td>
                    <td>500 {t("dashboard.stats.currency")}</td>
                    <td>{t("dashboard.ordersTable.paid")}</td>
                    <td>2025-01-15</td>
                    <td>
                      <span className="status delivered">
                        {t("dashboard.ordersTable.delivered")}
                      </span>
                    </td>
                    <td>
                      <button className="btn-edit">
                        <FaEdit />
                      </button>
                      <button className="btn-delete">
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>#002</td>
                    <td>فاطمة علي</td>
                    <td>750 {t("dashboard.stats.currency")}</td>
                    <td>{t("dashboard.ordersTable.unpaid")}</td>
                    <td>2025-01-14</td>
                    <td>
                      <span className="status pending">
                        {t("dashboard.ordersTable.pending")}
                      </span>
                    </td>
                    <td>
                      <button className="btn-edit">
                        <FaEdit />
                      </button>
                      <button className="btn-delete">
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
