import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [privacyData, setPrivacyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب البيانات من API
  useEffect(() => {
    const fetchPrivacyData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://spiritual.brmjatech.uk/api/pages/privacy');
        setPrivacyData(response.data.data);
        document.title = response.data.data.title;
      } catch (err) {
        setError(err.message);
        document.title = t("privacyPolicy.title");
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyData();
  }, [t]);

  // أنيميشن العناصر
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-semibold text-red-600 mb-4">{t("error")}</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      dir={isRTL ? 'rtl' : 'ltr'}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 mt-5 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={sectionVariants}
          className="bg-white rounded-xl shadow-xl overflow-hidden mb-8 p-8 border border-gray-100"
        >
          <motion.h1
            variants={itemVariants}
            className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent`}
          >
            {privacyData?.title || t("privacyPolicy.title")}
          </motion.h1>

          {privacyData?.image && (
            <motion.div
              variants={itemVariants}
              className="mb-6 flex justify-center"
            >
              <img
                src={privacyData.image}
                alt={privacyData.title}
                className="w-full max-w-2xl h-auto rounded-lg shadow-md"
              />
            </motion.div>
          )}

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 text-center mb-8 leading-relaxed"
          >
            {t("privacyPolicy.lastUpdated")}
          </motion.p>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100"
        >
          <motion.div
            variants={itemVariants}
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: privacyData?.content || t("privacyPolicy.introductionText") }}
          />
        </motion.div>

        <motion.div
          variants={sectionVariants}
          className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
        >
          <motion.h2
            variants={itemVariants}
            className={`text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b border-purple-200 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            {t("privacyPolicy.contactUsTitle")}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-700 leading-relaxed mb-6"
          >
            {t("privacyPolicy.contactUsText")}
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-gray-700 leading-relaxed mb-6 font-medium"
          >
            {t("privacyPolicy.contactEmail")}: <a href="mailto:privacy@example.com" className="text-purple-600 hover:underline">privacy@example.com</a>
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
