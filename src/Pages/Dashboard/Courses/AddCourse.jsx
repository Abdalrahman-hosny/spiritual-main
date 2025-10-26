import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaTimes,
  FaUpload,
  FaImage,
  FaVideo,
  FaFileAlt,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import "./addcourse.css";

const AddCourse = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [formData, setFormData] = useState({
    category_id: "",
    "title[ar]": "",
    "title[en]": "",
    "description[ar]": "",
    "description[en]": "",
    image: null,
    video: "",
    schedule: "",
    duration: "",
    lectures_count: "",
    price: "",
    files: [],
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const token = sessionStorage.getItem("token");
        const response = await axios.get(
          "https://spiritual.brmjatech.uk/api/categories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Accept-Language": "ar",
            },
          }
        );

        if (response.data.code === 200) {
          setCategories(response.data.data.result || []);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("خطأ في جلب التصنيفات");
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  // Handle files upload
  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...files],
    }));
  };

  // Remove file
  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category_id) {
      toast.error("يرجى اختيار التصنيف");
      return;
    }

    if (!formData["title[ar]"] || !formData["title[en]"]) {
      toast.error("يرجى إدخال عنوان الكورس باللغتين");
      return;
    }

    if (!formData.price) {
      toast.error("يرجى إدخال سعر الكورس");
      return;
    }

    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");

      const submitData = new FormData();
      submitData.append("category_id", formData.category_id);
      submitData.append("title[ar]", formData["title[ar]"]);
      submitData.append("title[en]", formData["title[en]"]);
      submitData.append("description[ar]", formData["description[ar]"]);
      submitData.append("description[en]", formData["description[en]"]);
      submitData.append("video", formData.video);
      submitData.append("schedule", formData.schedule);
      submitData.append("duration", formData.duration);
      submitData.append("lectures_count", formData.lectures_count);
      submitData.append("price", formData.price);

      if (formData.image) {
        submitData.append("image", formData.image);
      }

      formData.files.forEach((file) => {
        submitData.append("files[]", file);
      });

      const response = await axios.post(
        "https://spiritual.brmjatech.uk/api/dashboard_courses",
        submitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status) {
        toast.success(response.data.message || "تم إنشاء الكورس بنجاح");
        // إعادة تعيين النموذج
        setFormData({
          category_id: "",
          "title[ar]": "",
          "title[en]": "",
          "description[ar]": "",
          "description[en]": "",
          image: null,
          video: "",
          schedule: "",
          duration: "",
          lectures_count: "",
          price: "",
          files: [],
        });
        onSuccess();
      } else {
        toast.error(response.data.message || "خطأ في إنشاء الكورس");
      }
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("خطأ في إنشاء الكورس");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>إضافة كورس جديد</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="course-form">
          <div className="form-row-single">
            <div className="form-group">
              <label>التصنيف *</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                required
                disabled={categoriesLoading}
              >
                <option value="">
                  {categoriesLoading
                    ? "جاري تحميل التصنيفات..."
                    : "اختر التصنيف"}
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.slug})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>عنوان الكورس (عربي) *</label>
              <input
                type="text"
                name="title[ar]"
                value={formData["title[ar]"]}
                onChange={handleInputChange}
                placeholder="أدخل عنوان الكورس بالعربية"
                required
              />
            </div>
            <div className="form-group">
              <label>عنوان الكورس (إنجليزي) *</label>
              <input
                type="text"
                name="title[en]"
                value={formData["title[en]"]}
                onChange={handleInputChange}
                placeholder="Enter course title in English"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>وصف الكورس (عربي)</label>
              <textarea
                name="description[ar]"
                value={formData["description[ar]"]}
                onChange={handleInputChange}
                placeholder="أدخل وصف الكورس بالعربية"
                rows="4"
              />
            </div>
            <div className="form-group">
              <label>وصف الكورس (إنجليزي)</label>
              <textarea
                name="description[en]"
                value={formData["description[en]"]}
                onChange={handleInputChange}
                placeholder="Enter course description in English"
                rows="4"
              />
            </div>
          </div>

          <div className="form-row-triple">
            <div className="form-group">
              <label>سعر الكورس *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label>مدة الكورس</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="مثال: 3 ساعات"
              />
            </div>
            <div className="form-group">
              <label>عدد المحاضرات</label>
              <input
                type="number"
                name="lectures_count"
                value={formData.lectures_count}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>جدول الكورس</label>
              <input
                type="text"
                name="schedule"
                value={formData.schedule}
                onChange={handleInputChange}
                placeholder="مثال: كل يوم سبت الساعة 7 مساءً"
              />
            </div>
            <div className="form-group">
              <label>رابط الفيديو</label>
              <input
                type="url"
                name="video"
                value={formData.video}
                onChange={handleInputChange}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
          </div>

          <div className="form-group">
            <label>صورة الكورس</label>
            <div className="file-upload">
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <label htmlFor="image-upload" className="file-upload-btn">
                <FaUpload />
                {formData.image ? formData.image.name : "اختر صورة"}
              </label>
              {formData.image && (
                <div className="file-preview">
                  <FaImage />
                  <span>{formData.image.name}</span>
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>ملفات الكورس</label>
            <div className="file-upload">
              <input
                type="file"
                id="files-upload"
                multiple
                onChange={handleFilesChange}
                style={{ display: "none" }}
              />
              <label htmlFor="files-upload" className="file-upload-btn">
                <FaPlus />
                إضافة ملفات
              </label>
            </div>
            {formData.files.length > 0 && (
              <div className="files-list">
                {formData.files.map((file, index) => (
                  <div key={index} className="file-item">
                    <FaFileAlt />
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="remove-file-btn"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              إلغاء
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "جاري الحفظ..." : "حفظ الكورس"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
