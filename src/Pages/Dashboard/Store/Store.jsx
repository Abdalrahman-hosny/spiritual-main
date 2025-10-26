import React, { useState, useEffect, useCallback } from "react";
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
import styles from "./store.module.css";

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
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    name: { ar: "", en: "" },
    small_desc: { ar: "", en: "" },
    description: { ar: "", en: "" },
    price: "",
    stock: "",
    category_id: "",
    brand_id: "",
    is_active: 1,
    images: [],
  });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [dataLoading, setDataLoading] = useState(true);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = sessionStorage.getItem("token");

        if (!token) {
          setError("No authentication token found");
          return;
        }

        const response = await axios.get(
          "https://spiritual.brmjatech.uk/api/dashboard/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Accept-Language": i18n.language === "ar" ? "ar" : "en",
            },
            params: {
              search: searchTerm || "",
              per_page: 12,
              page: currentPage,
            },
          }
        );

        console.log("Products API Response:", response.data);

        if (response.data.code === 200) {
          const productsData = response.data.data.result || [];
          const paginationData = response.data.data.meta || {};

          console.log("Products data:", productsData);
          console.log("Pagination data:", paginationData);

          setProducts(productsData);
          setPagination(paginationData);
        } else {
          console.error("API returned error:", response.data);
          setError(
            `API Error: ${response.data.message || "Failed to fetch products"}`
          );
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error loading products. Please try again.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, searchTerm, i18n.language]);

  // Function to refresh products list
  const refreshProducts = useCallback(async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");

      if (!token) {
        console.error("No token found for refresh");
        return;
      }

      const response = await axios.get(
        "https://spiritual.brmjatech.uk/api/dashboard/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Accept-Language": i18n.language === "ar" ? "ar" : "en",
          },
          params: {
            search: searchTerm || "",
            per_page: 12,
            page: currentPage,
          },
        }
      );

      if (response.data.code === 200) {
        const productsData = response.data.data.result || [];
        const paginationData = response.data.data.meta || {};
        setProducts(productsData);
        setPagination(paginationData);
        console.log("Products refreshed successfully");
      }
    } catch (error) {
      console.error("Error refreshing products:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentPage, i18n.language]);

  // Listen for focus events to refresh products when returning from add product page
  useEffect(() => {
    const handleFocus = () => {
      console.log("Window focused, refreshing products...");
      refreshProducts();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log("Page became visible, refreshing products...");
        refreshProducts();
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [searchTerm, currentPage, i18n.language, refreshProducts]);

  // Fetch categories and brands for update form
  useEffect(() => {
    const fetchCategoriesAndBrands = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          console.log("No token found");
          return;
        }

        console.log("Starting to fetch categories and brands...");

        const headers = {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Accept-Language": "ar", // Fetch in Arabic
        };

        // Fetch categories
        try {
          console.log("Fetching categories...");
          const categoriesResponse = await axios.get(
            "https://spiritual.brmjatech.uk/api/categories",
            {
              headers,
            }
          );

          if (categoriesResponse.data.code === 200) {
            const responseData = categoriesResponse.data.data;

            let categoriesData = [];

            // Check for data in result array (as shown in the API response)
            if (
              responseData &&
              responseData.result &&
              Array.isArray(responseData.result)
            ) {
              categoriesData = responseData.result;
            } else if (responseData && responseData.items) {
              categoriesData = responseData.items;
            } else if (responseData && Array.isArray(responseData)) {
              categoriesData = responseData;
            } else if (
              responseData &&
              responseData.data &&
              Array.isArray(responseData.data)
            ) {
              categoriesData = responseData.data;
            }

            console.log("Categories data:", categoriesData);
            setCategories(Array.isArray(categoriesData) ? categoriesData : []);
          } else {
            console.error("Categories API error:", categoriesResponse.data);
            setCategories([]);
          }
        } catch (error) {
          console.error("Error fetching categories:", error);
          setCategories([]);
        }

        // Fetch brands
        try {
          console.log("Fetching brands...");
          const brandsResponse = await axios.get(
            "https://spiritual.brmjatech.uk/api/dashboard/brand",
            {
              headers: {
                ...headers,
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (brandsResponse.data.code === 200) {
            const responseData = brandsResponse.data;

            let brandsData = [];

            // Check for data in message array (as shown in Postman)
            if (responseData.message && Array.isArray(responseData.message)) {
              brandsData = responseData.message;
            } else if (
              responseData.data &&
              responseData.data.result &&
              Array.isArray(responseData.data.result)
            ) {
              brandsData = responseData.data.result;
            } else if (responseData.data && responseData.data.items) {
              brandsData = responseData.data.items;
            } else if (responseData.data && Array.isArray(responseData.data)) {
              brandsData = responseData.data;
            } else if (
              responseData.data &&
              responseData.data.data &&
              Array.isArray(responseData.data.data)
            ) {
              brandsData = responseData.data.data;
            }

            console.log("Brands data:", brandsData);
            setBrands(Array.isArray(brandsData) ? brandsData : []);
          } else {
            console.error("Brands API error:", brandsResponse.data);
            setBrands([]);
          }
        } catch (error) {
          console.error("Error fetching brands:", error);
          setBrands([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("خطأ في تحميل البيانات");
        // Set empty arrays as fallback
        setCategories([]);
        setBrands([]);
      } finally {
        console.log("Finished fetching categories and brands");
        setDataLoading(false);
      }
    };

    console.log("useEffect for categories and brands triggered");
    fetchCategoriesAndBrands();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleAddProduct = async () => {
    // Refresh categories and brands before navigating to add product page
    console.log("Refreshing data before adding new product...");
    setDataLoading(true);
    await refreshCategoriesAndBrands();
    setDataLoading(false);
    navigate("/dashboard/store/add");
  };

  // Function to refresh categories and brands
  const refreshCategoriesAndBrands = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.log("No token found for refresh");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Accept-Language": "ar",
      };

      // Fetch categories
      try {
        console.log("Refreshing categories...");
        const categoriesResponse = await axios.get(
          "https://spiritual.brmjatech.uk/api/categories",
          { headers }
        );

        if (categoriesResponse.data.code === 200) {
          const responseData = categoriesResponse.data.data;
          let categoriesData = [];

          if (
            responseData &&
            responseData.result &&
            Array.isArray(responseData.result)
          ) {
            categoriesData = responseData.result;
          } else if (responseData && responseData.items) {
            categoriesData = responseData.items;
          } else if (responseData && Array.isArray(responseData)) {
            categoriesData = responseData;
          } else if (
            responseData &&
            responseData.data &&
            Array.isArray(responseData.data)
          ) {
            categoriesData = responseData.data;
          }

          console.log("Refreshed categories data:", categoriesData);
          setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        }
      } catch (error) {
        console.error("Error refreshing categories:", error);
      }

      // Fetch brands
      try {
        console.log("Refreshing brands...");
        const brandsResponse = await axios.get(
          "https://spiritual.brmjatech.uk/api/dashboard/brand",
          { headers }
        );

        if (brandsResponse.data.code === 200) {
          const responseData = brandsResponse.data;
          let brandsData = [];

          if (responseData.message && Array.isArray(responseData.message)) {
            brandsData = responseData.message;
          } else if (
            responseData.data &&
            responseData.data.result &&
            Array.isArray(responseData.data.result)
          ) {
            brandsData = responseData.data.result;
          } else if (responseData.data && responseData.data.items) {
            brandsData = responseData.data.items;
          } else if (responseData.data && Array.isArray(responseData.data)) {
            brandsData = responseData.data;
          } else if (
            responseData.data &&
            responseData.data.data &&
            Array.isArray(responseData.data.data)
          ) {
            brandsData = responseData.data.data;
          }

          console.log("Refreshed brands data:", brandsData);
          setBrands(Array.isArray(brandsData) ? brandsData : []);
        }
      } catch (error) {
        console.error("Error refreshing brands:", error);
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  const handleEditProduct = async (productId) => {
    try {
      const token = sessionStorage.getItem("token");

      // Refresh categories and brands data when opening edit modal
      console.log("Refreshing categories and brands for edit modal...");
      setDataLoading(true);

      // Fetch product data in both Arabic and English
      const [arabicResponse, englishResponse] = await Promise.all([
        axios.get(`https://spiritual.brmjatech.uk/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Accept-Language": "ar",
          },
        }),
        axios.get(`https://spiritual.brmjatech.uk/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Accept-Language": "en",
          },
        }),
      ]);

      if (
        arabicResponse.data.code === 200 &&
        englishResponse.data.code === 200
      ) {
        const arabicProduct = arabicResponse.data.data;
        const englishProduct = englishResponse.data.data;

        console.log("Arabic Product Data:", arabicProduct);
        console.log("English Product Data:", englishProduct);

        setProductToUpdate(arabicProduct);

        // Populate form with existing data from both languages
        setUpdateForm({
          name: {
            ar: arabicProduct.name || arabicProduct.name_ar || "",
            en: englishProduct.name || arabicProduct.name_en || "",
          },
          small_desc: {
            ar: arabicProduct.small_desc || arabicProduct.small_desc_ar || "",
            en: englishProduct.small_desc || arabicProduct.small_desc_en || "",
          },
          description: {
            ar: arabicProduct.description || arabicProduct.description_ar || "",
            en:
              englishProduct.description || arabicProduct.description_en || "",
          },
          price: arabicProduct.price || "",
          stock: arabicProduct.stock || "",
          category_id: arabicProduct.category_id || "",
          brand_id: arabicProduct.brand_id || "",
          is_active: arabicProduct.is_active || 1,
          images: arabicProduct.images || [],
        });

        setUpdateModalOpen(true);
      } else {
        // Fallback: try to get data from any successful response
        const product =
          arabicResponse.data.code === 200
            ? arabicResponse.data.data
            : englishResponse.data.data;
        setProductToUpdate(product);

        setUpdateForm({
          name: {
            ar: product.name_ar || product.name || "",
            en: product.name_en || product.name || "",
          },
          small_desc: {
            ar: product.small_desc_ar || product.small_desc || "",
            en: product.small_desc_en || product.small_desc || "",
          },
          description: {
            ar: product.description_ar || product.description || "",
            en: product.description_en || product.description || "",
          },
          price: product.price || "",
          stock: product.stock || "",
          category_id: product.category_id || "",
          brand_id: product.brand_id || "",
          is_active: product.is_active || 1,
          images: product.images || [],
        });

        // Refresh categories and brands before opening modal
        await refreshCategoriesAndBrands();

        setUpdateModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching product for update:", error);
      toast.error("خطأ في تحميل بيانات المنتج");
    } finally {
      setDataLoading(false);
    }
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
        `https://spiritual.brmjatech.uk/api/dashboard/products/${productToDelete.id}`,
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
        // Remove product from state
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.id !== productToDelete.id)
        );
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

      console.log(
        "Toggling status for product:",
        product.id,
        "from",
        product.is_active,
        "to",
        newStatus
      );

      const response = await axios.put(
        `https://spiritual.brmjatech.uk/api/dashboard/products/status/${product.id}`,
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

      console.log("Status update response:", response.data);

      // Check for success in different possible response formats
      if (
        response.data.code === 200 ||
        response.data.status === true ||
        response.status === 200
      ) {
        toast.success(
          newStatus === 1
            ? "تم تفعيل المنتج بنجاح!"
            : "تم إلغاء تفعيل المنتج بنجاح!"
        );

        // Get the actual status from API response if available
        const actualStatus = response.data.data?.is_active ?? newStatus;

        // Update product status in state immediately
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === product.id ? { ...p, is_active: actualStatus } : p
          )
        );

        // Update selected product if it's the same product
        if (selectedProduct && selectedProduct.id === product.id) {
          setSelectedProduct((prev) => ({ ...prev, is_active: actualStatus }));
        }

        // Force re-render by updating refresh key
        setRefreshKey((prev) => prev + 1);

        // Refresh the entire products list to ensure consistency
        setTimeout(() => {
          refreshProducts();
        }, 100);
      } else {
        console.error("API returned error:", response.data);
        toast.error(response.data.message || "خطأ في تغيير حالة المنتج");
      }
    } catch (error) {
      console.error("Error toggling product status:", error);

      // Handle different types of errors
      if (error.response) {
        const errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          "خطأ في الخادم";
        toast.error(`خطأ في تغيير حالة المنتج: ${errorMessage}`);
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        toast.error("خطأ في الاتصال بالخادم. تحقق من اتصال الإنترنت.");
        console.error("Network Error:", error.request);
      } else {
        toast.error("خطأ غير متوقع في تغيير حالة المنتج. حاول مرة أخرى.");
        console.error("Unexpected Error:", error.message);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Update form handlers
  const handleUpdateFormChange = (field, value, lang = null) => {
    if (lang) {
      setUpdateForm((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          [lang]: value,
        },
      }));
    } else {
      setUpdateForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setUpdateForm((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeImage = (index) => {
    setUpdateForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!productToUpdate) return;

    try {
      setUpdateLoading(true);
      const token = sessionStorage.getItem("token");

      const formData = new FormData();
      formData.append("name[ar]", updateForm.name.ar);
      formData.append("name[en]", updateForm.name.en);
      formData.append("small_desc[ar]", updateForm.small_desc.ar);
      formData.append("small_desc[en]", updateForm.small_desc.en);
      formData.append("description[ar]", updateForm.description.ar);
      formData.append("description[en]", updateForm.description.en);
      formData.append("price", updateForm.price);
      formData.append("stock", updateForm.stock);
      formData.append("category_id", updateForm.category_id);
      formData.append("brand_id", updateForm.brand_id);
      formData.append("is_active", updateForm.is_active);

      // Add new images
      updateForm.images.forEach((image, index) => {
        if (image instanceof File) {
          formData.append(`images[${index}]`, image);
        }
      });

      const response = await axios.post(
        `https://spiritual.brmjatech.uk/api/dashboard/products/${productToUpdate.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.code === 200) {
        toast.success("تم تحديث المنتج بنجاح!");
        setUpdateModalOpen(false);
        setProductToUpdate(null);
        // Refresh products list by refetching
        window.location.reload(); // Keep reload for update as it might have complex changes
      } else {
        toast.error("خطأ في تحديث المنتج");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("خطأ في تحديث المنتج. حاول مرة أخرى.");
    } finally {
      setUpdateLoading(false);
    }
  };

  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
    setProductToUpdate(null);
    setUpdateForm({
      name: { ar: "", en: "" },
      small_desc: { ar: "", en: "" },
      description: { ar: "", en: "" },
      price: "",
      stock: "",
      category_id: "",
      brand_id: "",
      is_active: 1,
      images: [],
    });
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
        <div className={styles.storePage}>
          {/* Header Section */}
          <div className={styles.storeHeader}>
            <div className={styles.headerLeft}>
              <button
                className={styles.addProductBtn}
                onClick={handleAddProduct}
              >
                <FaPlus />
                {t("store.addNewProduct")}
              </button>
            </div>

            <div className={styles.headerRight}>
              <div className={styles.searchContainer}>
                <FaSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder={t("store.search")}
                  className={styles.searchInput}
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className={styles.tabsSection}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.tabBtn} ${
                  activeTab === tab.id ? styles.active : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className={styles.productsGrid}>
            {loading ? (
              <div className={styles.loadingContainer}>
                <FaSpinner className={styles.spinner} />
                <p>{t("store.loading")}</p>
              </div>
            ) : error ? (
              <div className={styles.errorContainer}>
                <p className={styles.errorMessage}>{error}</p>
                <button
                  className={styles.retryBtn}
                  onClick={() => window.location.reload()}
                >
                  {t("store.retry")}
                </button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className={styles.emptyContainer}>
                <p>{t("store.noProducts")}</p>
                <p className={styles.debugInfo}>
                  Debug: Total products: {products.length}, Filtered:{" "}
                  {filteredProducts.length}
                </p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={`${product.id}-${product.is_active}-${refreshKey}`}
                  className={styles.productCard}
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className={styles.productImageContainer}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.productImage}
                      onError={(e) => {
                        e.target.src = "/api/placeholder/200/150";
                      }}
                    />

                    {/* Action Buttons */}
                    <div className={styles.productActions}>
                      <button
                        className={`${styles.actionBtn} ${styles.editBtn}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditProduct(product.id);
                        }}
                        title={t("store.editProduct")}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className={`${styles.actionBtn} ${styles.statusBtn} ${
                          product.is_active === 1
                            ? styles.active
                            : styles.inactive
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
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProduct(product);
                        }}
                        title={t("store.deleteProduct")}
                      >
                        <FaTrash />
                      </button>
                    </div>

                    <div className={styles.statusBadge}>
                      <span
                        className={`${styles.status} ${
                          product.stock > 0
                            ? styles.available
                            : styles.unavailable
                        }`}
                      >
                        {product.stock > 0
                          ? t("store.available")
                          : t("store.unavailable")}
                      </span>
                    </div>
                  </div>
                  <div className={styles.productInfo}>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <p className={styles.productPrice}>
                      {product.price} {t("store.currency")}
                    </p>
                    <p className={styles.productDescription}>
                      {truncateDescription(product.small_desc)}
                    </p>
                    <div className={styles.productStats}>
                      <div className={styles.statItem}>
                        <FaBoxOpen className={styles.statIcon} />
                        <span>
                          {product.stock} {t("store.inStock")}
                        </span>
                      </div>
                      <div className={styles.statItem}>
                        <span className={styles.brandName}>
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
            <div className={styles.pagination}>
              <button
                className={styles.paginationBtn}
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
                  className={`${styles.paginationNumber} ${
                    pagination.current_page === page ? styles.active : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page.toString().padStart(2, "0")}
                </button>
              ))}

              <button
                className={styles.paginationBtn}
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
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
          >
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleSection}>
                <h2 className={styles.modalTitle}>{selectedProduct.name}</h2>
                <div className={styles.productId}>#{selectedProduct.id}</div>
              </div>
              <button className={styles.modalClose} onClick={closeModal}>
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <div className={styles.modalBody}>
              {/* Image Section */}
              <div className={styles.imageSection}>
                <div className={styles.mainImageContainer}>
                  <img
                    src={getCurrentImage()}
                    alt={selectedProduct.name}
                    className={styles.mainImage}
                    onError={(e) => {
                      e.target.src = "/api/placeholder/500/400";
                    }}
                  />
                  <div className={styles.imageOverlay}>
                    <button className={styles.zoomBtn}>
                      <FaEye />
                    </button>
                  </div>
                </div>

                {/* Image Gallery */}
                <div className={styles.imageGallery}>
                  <div
                    className={`${styles.galleryThumb} ${
                      selectedImageIndex === 0 ? styles.active : ""
                    }`}
                    onClick={() => handleImageClick(0)}
                  >
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      onError={(e) => {
                        e.target.src = "/api/placeholder/80/60";
                      }}
                    />
                  </div>
                  {selectedProduct.images?.map((img, index) => (
                    <div
                      key={img.id}
                      className={`${styles.galleryThumb} ${
                        selectedImageIndex === index + 1 ? styles.active : ""
                      }`}
                      onClick={() => handleImageClick(index + 1)}
                    >
                      <img
                        src={img.image}
                        alt={`${selectedProduct.name} ${index + 1}`}
                        onError={(e) => {
                          e.target.src = "/api/placeholder/80/60";
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className={styles.detailsSection}>
                {/* Price and Rating */}
                <div className={styles.priceRatingRow}>
                  <div className={styles.priceSection}>
                    <div className={styles.priceLabel}>{t("store.price")}</div>
                    <div className={styles.priceValue}>
                      {selectedProduct.price} {t("store.currency")}
                    </div>
                  </div>

                  <div className={styles.ratingSection}>
                    <div className={styles.ratingLabel}>
                      {t("store.rating")}
                    </div>
                    <div className={styles.ratingDisplay}>
                      <div className={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`${styles.star} ${
                              i < Math.floor(selectedProduct.rating_avg || 0)
                                ? styles.filled
                                : styles.empty
                            }`}
                          />
                        ))}
                      </div>
                      <span className={styles.reviewsCount}>
                        {selectedProduct.rating_avg || 0} (
                        {selectedProduct.reviews_count || 0}{" "}
                        {t("store.reviews")})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stock Status */}
                <div className={styles.stockSection}>
                  <div className={styles.stockLabel}>
                    {t("store.stockStatus")}
                  </div>
                  <div
                    className={`${styles.stockValue} ${
                      selectedProduct.stock > 0
                        ? styles.available
                        : styles.unavailable
                    }`}
                  >
                    {selectedProduct.stock > 0
                      ? `${selectedProduct.stock} ${t("store.inStock")}`
                      : t("store.outOfStock")}
                  </div>
                </div>

                {/* Brand */}
                <div className={styles.brandSection}>
                  <div className={styles.brandLabel}>{t("store.brand")}</div>
                  <div className={styles.brandInfo}>
                    <span className={styles.brandName}>
                      {selectedProduct.brand?.name || t("store.noBrand")}
                    </span>
                    {selectedProduct.brand?.description && (
                      <span className={styles.brandDescription}>
                        {selectedProduct.brand.description}
                      </span>
                    )}
                  </div>
                </div>

                {/* Descriptions */}
                <div className={styles.descriptionSection}>
                  <div className={styles.descriptionItem}>
                    <div className={styles.descriptionLabel}>
                      {t("store.shortDescription")}
                    </div>
                    <div className={styles.descriptionText}>
                      {selectedProduct.small_desc || t("store.noDescription")}
                    </div>
                  </div>

                  <div className={styles.descriptionItem}>
                    <div className={styles.descriptionLabel}>
                      {t("store.fullDescription")}
                    </div>
                    <div className={styles.descriptionText}>
                      {selectedProduct.description || t("store.noDescription")}
                    </div>
                  </div>
                </div>

                {/* Product Actions */}
                <div className={styles.productActions}>
                  <button
                    className={styles.actionBtn}
                    onClick={() => handleEditProduct(selectedProduct)}
                  >
                    <FaEdit />
                    {t("store.edit")}
                  </button>
                  <button
                    className={styles.actionBtn}
                    onClick={() => handleDeleteProduct(selectedProduct)}
                  >
                    <FaTrash />
                    {t("store.delete")}
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className={styles.modalFooter}>
              <button className={styles.closeBtn} onClick={closeModal}>
                <FaTimes />
                {t("store.close")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && productToDelete && (
        <div
          className={`${styles.modalOverlay} ${styles.deleteModalOverlay}`}
          onClick={() => setDeleteModalOpen(false)}
        >
          <div
            className={`${styles.modalContent} ${styles.deleteModalContent}`}
            onClick={(e) => e.stopPropagation()}
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
          >
            <div className={styles.modalHeader}>
              <h2>{t("store.deleteProduct")}</h2>
              <button
                className={styles.modalClose}
                onClick={() => setDeleteModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.deleteConfirmation}>
                <div className={styles.warningIcon}>
                  <FaTrash />
                </div>
                <p className={styles.confirmationText}>
                  {t("store.deleteConfirmation")} "
                  <strong>{productToDelete.name}</strong>"؟
                </p>
                <p className={styles.warningText}>{t("store.deleteWarning")}</p>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.modalCancelBtn}
                onClick={() => setDeleteModalOpen(false)}
              >
                {t("store.cancel")}
              </button>
              <button className={styles.modalDeleteBtn} onClick={confirmDelete}>
                <FaTrash />
                {t("store.delete")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Product Modal */}
      {updateModalOpen && productToUpdate && (
        <div className={styles.modalOverlay} onClick={closeUpdateModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
          >
            <div className={styles.modalHeader}>
              <h2>تحديث المنتج</h2>
              <button className={styles.modalClose} onClick={closeUpdateModal}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleUpdateProduct} className={styles.updateForm}>
              <div className={styles.modalBody}>
                {/* Product Name */}
                <div className={styles.formGroup}>
                  <label>اسم المنتج (عربي)</label>
                  <input
                    type="text"
                    value={updateForm.name.ar}
                    onChange={(e) =>
                      handleUpdateFormChange("name", e.target.value, "ar")
                    }
                    placeholder="أدخل اسم المنتج بالعربية"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>اسم المنتج (إنجليزي)</label>
                  <input
                    type="text"
                    value={updateForm.name.en}
                    onChange={(e) =>
                      handleUpdateFormChange("name", e.target.value, "en")
                    }
                    placeholder="Enter product name in English"
                    required
                  />
                </div>

                {/* Small Description */}
                <div className={styles.formGroup}>
                  <label>الوصف القصير (عربي)</label>
                  <textarea
                    value={updateForm.small_desc.ar}
                    onChange={(e) =>
                      handleUpdateFormChange("small_desc", e.target.value, "ar")
                    }
                    placeholder="أدخل الوصف القصير بالعربية"
                    rows="3"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>الوصف القصير (إنجليزي)</label>
                  <textarea
                    value={updateForm.small_desc.en}
                    onChange={(e) =>
                      handleUpdateFormChange("small_desc", e.target.value, "en")
                    }
                    placeholder="Enter short description in English"
                    rows="3"
                    required
                  />
                </div>

                {/* Full Description */}
                <div className={styles.formGroup}>
                  <label>الوصف الكامل (عربي)</label>
                  <textarea
                    value={updateForm.description.ar}
                    onChange={(e) =>
                      handleUpdateFormChange(
                        "description",
                        e.target.value,
                        "ar"
                      )
                    }
                    placeholder="أدخل الوصف الكامل بالعربية"
                    rows="4"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>الوصف الكامل (إنجليزي)</label>
                  <textarea
                    value={updateForm.description.en}
                    onChange={(e) =>
                      handleUpdateFormChange(
                        "description",
                        e.target.value,
                        "en"
                      )
                    }
                    placeholder="Enter full description in English"
                    rows="4"
                    required
                  />
                </div>

                {/* Price and Stock */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>السعر</label>
                    <input
                      type="number"
                      value={updateForm.price}
                      onChange={(e) =>
                        handleUpdateFormChange("price", e.target.value)
                      }
                      placeholder="أدخل السعر"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>الكمية</label>
                    <input
                      type="number"
                      value={updateForm.stock}
                      onChange={(e) =>
                        handleUpdateFormChange("stock", e.target.value)
                      }
                      placeholder="أدخل الكمية"
                      min="0"
                      required
                    />
                  </div>
                </div>

                {/* Category and Brand */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>الفئة</label>
                    <select
                      value={updateForm.category_id}
                      onChange={(e) =>
                        handleUpdateFormChange("category_id", e.target.value)
                      }
                      required
                      disabled={dataLoading}
                    >
                      <option value="">
                        {dataLoading ? "جاري التحميل..." : "اختر الفئة"}
                      </option>
                      {categories &&
                      Array.isArray(categories) &&
                      categories.length > 0 ? (
                        categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          {dataLoading ? "جاري التحميل..." : "لا توجد فئات"}
                        </option>
                      )}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>العلامة التجارية</label>
                    <select
                      value={updateForm.brand_id}
                      onChange={(e) =>
                        handleUpdateFormChange("brand_id", e.target.value)
                      }
                      disabled={dataLoading}
                    >
                      <option value="">
                        {dataLoading
                          ? "جاري التحميل..."
                          : "اختر العلامة التجارية"}
                      </option>
                      {brands && Array.isArray(brands) && brands.length > 0 ? (
                        brands.map((brand) => (
                          <option key={brand.id} value={brand.id}>
                            {brand.name}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          {dataLoading
                            ? "جاري التحميل..."
                            : "لا توجد علامات تجارية"}
                        </option>
                      )}
                    </select>
                  </div>
                </div>

                {/* Status */}
                <div className={styles.formGroup}>
                  <label>الحالة</label>
                  <select
                    value={updateForm.is_active}
                    onChange={(e) =>
                      handleUpdateFormChange(
                        "is_active",
                        parseInt(e.target.value)
                      )
                    }
                  >
                    <option value={1}>نشط</option>
                    <option value={0}>غير نشط</option>
                  </select>
                </div>

                {/* Images */}
                <div className={styles.formGroup}>
                  <label>الصور</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className={styles.fileInput}
                  />

                  {updateForm.images.length > 0 && (
                    <div className={styles.imagePreview}>
                      {updateForm.images.map((image, index) => (
                        <div key={index} className={styles.imageItem}>
                          {image instanceof File ? (
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index + 1}`}
                              className={styles.previewImage}
                            />
                          ) : (
                            <img
                              src={image.image || image}
                              alt={`Existing ${index + 1}`}
                              className={styles.previewImage}
                            />
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className={styles.removeImageBtn}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.modalCancelBtn}
                  onClick={closeUpdateModal}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className={styles.modalSaveBtn}
                  disabled={updateLoading}
                >
                  {updateLoading ? (
                    <>
                      <FaSpinner className={styles.spinner} />
                      جاري الحفظ...
                    </>
                  ) : (
                    "حفظ التغييرات"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;
