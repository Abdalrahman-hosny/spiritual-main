import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaUpload, FaImage, FaPlus } from "react-icons/fa";
import DashboardHeader from "../DashboardHeader";
import DashboardSidebar from "../DashboardSidebar";
import "./addProduct.css";

const AddProduct = () => {
  const { t, i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    brandName: "",
    brandDescription: "",
    section: "",
    price: "",
    inventory: "",
  });
  const [images, setImages] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data:", productData);
    console.log("Images:", images);
    // Handle form submission here
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

        {/* Add Product Content */}
        <div className="add-product-page">
          <div className="add-product-container">
            <div className="product-form">
              {/* Right Column - Product Details */}
              <div className="product-details-column">
                <div className="section-header">
                  <h2>{t("addProduct.productDetails")}</h2>
                  <p>{t("addProduct.productDetailsDesc")}</p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Product Name */}
                  <div className="form-group">
                    <label htmlFor="name">{t("addProduct.productName")}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={productData.name}
                      onChange={handleInputChange}
                      placeholder={t("addProduct.productName")}
                      className="form-input"
                    />
                  </div>

                  {/* Product Description */}
                  <div className="form-group">
                    <label htmlFor="description">
                      {t("addProduct.productDescription")}
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={productData.description}
                      onChange={handleInputChange}
                      placeholder="-"
                      className="form-textarea"
                      rows="4"
                    />
                  </div>

                  {/* Brand Name */}
                  <div className="form-group">
                    <label htmlFor="brandName">
                      {t("addProduct.brandName")}
                    </label>
                    <input
                      type="text"
                      id="brandName"
                      name="brandName"
                      value={productData.brandName}
                      onChange={handleInputChange}
                      placeholder={t("addProduct.brandName")}
                      className="form-input"
                    />
                  </div>

                  {/* Brand Description */}
                  <div className="form-group">
                    <label htmlFor="brandDescription">
                      {t("addProduct.brandDescription")}
                    </label>
                    <textarea
                      id="brandDescription"
                      name="brandDescription"
                      value={productData.brandDescription}
                      onChange={handleInputChange}
                      placeholder="-"
                      className="form-textarea"
                      rows="4"
                    />
                  </div>

                  {/* Section */}
                  <div className="form-group">
                    <label htmlFor="section">{t("addProduct.section")}</label>
                    <select
                      id="section"
                      name="section"
                      value={productData.section}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">{t("addProduct.chooseSection")}</option>
                      <option value="spiritual">روحانيات</option>
                      <option value="prayer">أدوات الصلاة</option>
                      <option value="books">كتب دينية</option>
                      <option value="accessories">إكسسوارات</option>
                      <option value="gifts">هدايا</option>
                    </select>
                  </div>

                  {/* Price and Inventory */}
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="price">{t("addProduct.price")}</label>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        value={productData.price}
                        onChange={handleInputChange}
                        placeholder="-"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="inventory">
                        {t("addProduct.inventory")}
                      </label>
                      <input
                        type="text"
                        id="inventory"
                        name="inventory"
                        value={productData.inventory}
                        onChange={handleInputChange}
                        placeholder="20 قطعه"
                        className="form-input"
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* Left Column - Image Uploads */}
              <div className="image-upload-column">
                {/* Main Images Upload */}
                <div className="upload-section">
                  <h3>{t("addProduct.mainImageVideo")}</h3>
                  <p className="upload-note">
                    {t("addProduct.imageVideoNote")}
                  </p>
                  <div className="images-grid">
                    {[1, 2, 3, 4].map((num) => (
                      <div key={num} className="image-upload-box">
                        <input
                          type="file"
                          id={`image${num}`}
                          accept="image/*,video/*"
                          onChange={handleImageUpload}
                          className="file-input"
                        />
                        <label
                          htmlFor={`image${num}`}
                          className="image-upload-label"
                        >
                          <FaImage className="upload-icon" />
                          <span>
                            {t("addProduct.image")} {num}
                          </span>
                        </label>
                        {images[num - 1] && (
                          <button
                            type="button"
                            onClick={() => removeImage(num - 1)}
                            className="remove-image-btn"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save Product Button */}
                <button
                  type="submit"
                  className="save-product-btn"
                  onClick={handleSubmit}
                >
                  {t("addProduct.saveProduct")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
