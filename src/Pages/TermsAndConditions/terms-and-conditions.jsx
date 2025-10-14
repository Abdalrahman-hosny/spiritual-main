import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import axios from 'axios'; // تأكد من تثبيت مكتبة axios: npm install axios

const TermsAndConditions = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [termsData, setTermsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // تعيين عنوان الصفحة
  useEffect(() => {
    document.title = t("termsAndConditions.title");
  }, [t]);

  // جلب البيانات من الـ API
  useEffect(() => {
    const fetchTermsData = async () => {
      try {
        const response = await axios.get('https://spiritual.brmjatech.uk/api/pages/terms');
        if (response.data.code === 200) {
          setTermsData(response.data.data);
        } else {
          setError("Failed to fetch terms data.");
        }
      } catch (err) {
        setError("An error occurred while fetching terms data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTermsData();
  }, []);

  if (loading) {
    return (
      
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8  pt-5">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12  px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen bg-gray-50 mt-5 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <h1
            className={`text-3xl font-bold text-gray-900 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            {termsData?.title || t("termsAndConditions.title")}
          </h1>
          <div
            className={`prose max-w-none text-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            {termsData?.image && (
              <img
                src={termsData.image}
                alt="Terms and Conditions"
                className="w-full h-auto mb-6 rounded-lg"
              />
            )}
            <p className="mb-4">{termsData?.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
