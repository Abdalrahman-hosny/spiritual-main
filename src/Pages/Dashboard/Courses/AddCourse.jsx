import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaUpload, FaFilePdf, FaImage, FaVideo } from "react-icons/fa";
import DashboardHeader from "../DashboardHeader";
import DashboardSidebar from "../DashboardSidebar";
import "./addCourse.css";

const AddCourse = () => {
  const { t, i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [courseData, setCourseData] = useState({
    name: "",
    description: "",
    section: "",
    liveDuration: "",
    date: "",
    price: "",
    lectures: "",
    status: "published",
  });
  const [mainImage, setMainImage] = useState(null);
  const [pdfFiles, setPdfFiles] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
    }
  };

  const handlePdfUpload = (e) => {
    const files = Array.from(e.target.files);
    setPdfFiles((prev) => [...prev, ...files]);
  };

  const removePdf = (index) => {
    setPdfFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Course Data:", courseData);
    console.log("Main Image:", mainImage);
    console.log("PDF Files:", pdfFiles);
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

        {/* Add Course Content */}
        <div className="add-course-page">
          <div className="add-course-container">
            <div className="course-form">
              {/* Right Column - Course Details */}
              <div className="course-details-column">
                <div className="section-header">
                  <h2>{t("addCourse.courseDetails")}</h2>
                  <p>{t("addCourse.courseDetailsDesc")}</p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Course Name */}
                  <div className="form-group">
                    <label htmlFor="name">{t("addCourse.courseName")}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={courseData.name}
                      onChange={handleInputChange}
                      placeholder={t("addCourse.courseName")}
                      className="form-input"
                    />
                  </div>

                  {/* Course Description */}
                  <div className="form-group">
                    <label htmlFor="description">
                      {t("addCourse.courseDescription")}
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={courseData.description}
                      onChange={handleInputChange}
                      placeholder={t("addCourse.courseDescription")}
                      className="form-textarea"
                      rows="4"
                    />
                  </div>

                  {/* Section */}
                  <div className="form-group">
                    <label htmlFor="section">{t("addCourse.section")}</label>
                    <select
                      id="section"
                      name="section"
                      value={courseData.section}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">{t("addCourse.chooseSection")}</option>
                      <option value="spiritual">روحانيات</option>
                      <option value="energy">طاقة</option>
                      <option value="healing">علاج روحاني</option>
                      <option value="life-coach">لايف كوتش</option>
                      <option value="quran">تحفيظ القرآن</option>
                    </select>
                  </div>

                  {/* Live Duration and Date */}
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="liveDuration">
                        {t("addCourse.liveDuration")}
                      </label>
                      <input
                        type="text"
                        id="liveDuration"
                        name="liveDuration"
                        value={courseData.liveDuration}
                        onChange={handleInputChange}
                        placeholder={t("addCourse.liveDuration")}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="date">{t("addCourse.date")}</label>
                      <input
                        type="text"
                        id="date"
                        name="date"
                        value={courseData.date}
                        onChange={handleInputChange}
                        placeholder={t("addCourse.date")}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Price and Lectures */}
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="price">{t("addCourse.price")}</label>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        value={courseData.price}
                        onChange={handleInputChange}
                        placeholder={t("addCourse.price")}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lectures">
                        {t("addCourse.numberOfLectures")}
                      </label>
                      <input
                        type="text"
                        id="lectures"
                        name="lectures"
                        value={courseData.lectures}
                        onChange={handleInputChange}
                        placeholder={t("addCourse.numberOfLectures")}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div className="form-group">
                    <label htmlFor="status">{t("addCourse.status")}</label>
                    <select
                      id="status"
                      name="status"
                      value={courseData.status}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="published">
                        {t("addCourse.published")}
                      </option>
                      <option value="draft">{t("addCourse.draft")}</option>
                      <option value="stopped">{t("addCourse.stopped")}</option>
                    </select>
                  </div>
                </form>
              </div>

              {/* Left Column - File Uploads */}
              <div className="file-upload-column">
                {/* Main Image/Video Upload */}
                <div className="upload-section">
                  <h3>{t("addCourse.mainImageVideo")}</h3>
                  <p className="upload-note">{t("addCourse.imageVideoNote")}</p>
                  <div className="upload-area">
                    <input
                      type="file"
                      id="mainImage"
                      accept="image/*,video/*"
                      onChange={handleImageUpload}
                      className="file-input"
                    />
                    <label htmlFor="mainImage" className="upload-label">
                      <FaImage className="upload-icon" />
                      <span>{t("addCourse.image1")}</span>
                    </label>
                  </div>
                </div>

                {/* PDF Upload */}
                <div className="upload-section">
                  <h3>{t("addCourse.pdfName")}</h3>
                  <p className="upload-note">{t("addCourse.pdfNote")}</p>
                  <div className="pdf-upload-area">
                    <input
                      type="file"
                      id="pdfFiles"
                      accept=".pdf"
                      multiple
                      onChange={handlePdfUpload}
                      className="file-input"
                    />
                    <label htmlFor="pdfFiles" className="pdf-upload-label">
                      <FaFilePdf className="pdf-icon" />
                      <span>{t("addCourse.uploadPdf")}</span>
                    </label>
                  </div>

                  {/* Display uploaded PDFs */}
                  <div className="pdf-files-list">
                    {pdfFiles.map((file, index) => (
                      <div key={index} className="pdf-file-item">
                        <FaFilePdf className="pdf-icon-small" />
                        <span className="pdf-name">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removePdf(index)}
                          className="remove-pdf-btn"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save Course Button */}
                <button
                  type="submit"
                  className="save-course-btn"
                  onClick={handleSubmit}
                >
                  {t("addCourse.saveCourse")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
