import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaUpload,
  FaImage,
  FaPlus,
  FaTimes,
  FaSpinner,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";
import DashboardHeader from "../DashboardHeader";
import DashboardSidebar from "../DashboardSidebar";
import "./addProduct.css";

const AddProduct = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [productData, setProductData] = useState({
    name: {
      ar: "",
      en: "",
    },
    small_desc: {
      ar: "",
      en: "",
    },
    description: {
      ar: "",
      en: "",
    },
    price: "",
    stock: "",
    category_id: "",
    brand_name: "",
    is_active: 1,
  });

  const [images, setImages] = useState([]);

  // Fetch categories and brands
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Accept-Language": i18n.language === "ar" ? "ar" : "en",
        };

        // Fetch categories
        const categoriesResponse = await axios.get(
          "https://spiritual.brmjatech.uk/api/categories",
          { headers }
        );

        if (categoriesResponse.data.code === 200) {
          setCategories(
            categoriesResponse.data.data.items || categoriesResponse.data.data
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("خطأ في تحميل البيانات");
      }
    };

    fetchData();
  }, [i18n.language]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("[") && name.includes("]")) {
      // Handle multilingual fields like name[ar], name[en]
      const [fieldName, lang] = name.split("[");
      const language = lang.replace("]", "");

      setProductData((prev) => ({
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          [language]: value,
        },
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = sessionStorage.getItem("token");

      // Create FormData for multipart/form-data
      const formData = new FormData();

      // Add multilingual fields
      formData.append("name[ar]", productData.name.ar);
      formData.append("name[en]", productData.name.en);
      formData.append("small_desc[ar]", productData.small_desc.ar);
      formData.append("small_desc[en]", productData.small_desc.en);
      formData.append("description[ar]", productData.description.ar);
      formData.append("description[en]", productData.description.en);

      // Add other fields
      formData.append("price", productData.price);
      formData.append("stock", productData.stock);
      formData.append("category_id", productData.category_id);
      formData.append("brand_name", productData.brand_name);
      formData.append("is_active", productData.is_active);

      // Add images
      images.forEach((image) => {
        formData.append("images[]", image);
      });

      const response = await axios.post(
        "https://spiritual.brmjatech.uk/api/dashboard/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Accept-Language": i18n.language === "ar" ? "ar" : "en",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.code === 200) {
        toast.success("تم إضافة المنتج بنجاح!");
        navigate("/dashboard/store");
      } else {
        toast.error("خطأ في إضافة المنتج");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("خطأ في إضافة المنتج. حاول مرة أخرى.");
    } finally {
      setLoading(false);
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

        {/* Add Product Content */}
        <div className="add-product-page">
          <div className="add-product-container">
            <div className="page-header">
              <button
                className="back-btn"
                onClick={() => navigate("/dashboard/store")}
              >
                <FaArrowLeft />
                {t("store.backToStore")}
              </button>
              <h1>{t("store.addNewProduct")}</h1>
            </div>

            <div className="product-form">
              <form onSubmit={handleSubmit}>
                <div className="form-sections">
                  {/* Product Name - Multilingual */}
                  <div className="form-section">
                    <h3>{t("store.productName")}</h3>
                    <div className="multilingual-inputs">
                      <div className="form-group">
                        <label htmlFor="name_ar">{t("store.nameAr")}</label>
                        <input
                          type="text"
                          id="name_ar"
                          name="name[ar]"
                          value={productData.name.ar}
                          onChange={handleInputChange}
                          placeholder={t("store.enterNameAr")}
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name_en">{t("store.nameEn")}</label>
                        <input
                          type="text"
                          id="name_en"
                          name="name[en]"
                          value={productData.name.en}
                          onChange={handleInputChange}
                          placeholder={t("store.enterNameEn")}
                          className="form-input"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Short Description - Multilingual */}
                  <div className="form-section">
                    <h3>{t("store.shortDescription")}</h3>
                    <div className="multilingual-inputs">
                      <div className="form-group">
                        <label htmlFor="small_desc_ar">
                          {t("store.descAr")}
                        </label>
                        <textarea
                          id="small_desc_ar"
                          name="small_desc[ar]"
                          value={productData.small_desc.ar}
                          onChange={handleInputChange}
                          placeholder={t("store.enterShortDescAr")}
                          className="form-textarea"
                          rows="3"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="small_desc_en">
                          {t("store.descEn")}
                        </label>
                        <textarea
                          id="small_desc_en"
                          name="small_desc[en]"
                          value={productData.small_desc.en}
                          onChange={handleInputChange}
                          placeholder={t("store.enterShortDescEn")}
                          className="form-textarea"
                          rows="3"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Full Description - Multilingual */}
                  <div className="form-section">
                    <h3>{t("store.fullDescription")}</h3>
                    <div className="multilingual-inputs">
                      <div className="form-group">
                        <label htmlFor="description_ar">
                          {t("store.fullDescAr")}
                        </label>
                        <textarea
                          id="description_ar"
                          name="description[ar]"
                          value={productData.description.ar}
                          onChange={handleInputChange}
                          placeholder={t("store.enterFullDescAr")}
                          className="form-textarea"
                          rows="5"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="description_en">
                          {t("store.fullDescEn")}
                        </label>
                        <textarea
                          id="description_en"
                          name="description[en]"
                          value={productData.description.en}
                          onChange={handleInputChange}
                          placeholder={t("store.enterFullDescEn")}
                          className="form-textarea"
                          rows="5"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Price and Stock */}
                  <div className="form-section">
                    <h3>{t("store.priceAndStock")}</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="price">
                          {t("store.price")} ({t("store.currency")})
                        </label>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          value={productData.price}
                          onChange={handleInputChange}
                          placeholder={t("store.enterPrice")}
                          className="form-input"
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="stock">{t("store.stock")}</label>
                        <input
                          type="number"
                          id="stock"
                          name="stock"
                          value={productData.stock}
                          onChange={handleInputChange}
                          placeholder={t("store.enterStock")}
                          className="form-input"
                          min="0"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Category and Brand */}
                  <div className="form-section">
                    <h3>{t("store.categoryAndBrand")}</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="category_id">
                          {t("store.category")}
                        </label>
                        <select
                          id="category_id"
                          name="category_id"
                          value={productData.category_id}
                          onChange={handleInputChange}
                          className="form-select"
                          required
                        >
                          <option value="">{t("store.selectCategory")}</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="brand_name">{t("store.brand")}</label>
                        <input
                          type="text"
                          id="brand_name"
                          name="brand_name"
                          value={productData.brand_name}
                          onChange={handleInputChange}
                          placeholder={t("store.enterBrand")}
                          className="form-input"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Product Images */}
                  <div className="form-section">
                    <h3>{t("store.productImages")}</h3>
                    <div className="image-upload-section">
                      <div className="upload-area">
                        <input
                          type="file"
                          id="images"
                          name="images"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="file-input"
                        />
                        <label htmlFor="images" className="upload-label">
                          <FaUpload className="upload-icon" />
                          <span>{t("store.selectImages")}</span>
                          <small>{t("store.maxImages")}</small>
                        </label>
                      </div>

                      {images.length > 0 && (
                        <div className="images-preview">
                          <h4>
                            {t("store.selectedImages")} ({images.length})
                          </h4>
                          <div className="images-grid">
                            {images.map((image, index) => (
                              <div key={index} className="image-preview-item">
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt={`Preview ${index + 1}`}
                                  className="preview-image"
                                />
                                <button
                                  type="button"
                                  className="remove-image-btn"
                                  onClick={() => removeImage(index)}
                                >
                                  <FaTimes />
                                </button>
                                <div className="image-info">
                                  <span className="image-name">
                                    {image.name}
                                  </span>
                                  <span className="image-size">
                                    {(image.size / 1024 / 1024).toFixed(2)} MB
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="form-actions">
                    <button
                      type="submit"
                      className="submit-btn"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <FaSpinner className="spinner" />
                          {t("store.adding")}...
                        </>
                      ) : (
                        <>
                          <FaSave />
                          {t("store.addProduct")}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
