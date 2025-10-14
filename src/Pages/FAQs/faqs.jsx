import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';

const FAQs = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqsData, setFaqsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب البيانات من API
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://spiritual.brmjatech.uk/api/pages/faqs');
        setFaqsData(response.data.data);
        document.title = t("faqs.title");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, [t]);

  // أنيميشن للـ container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // أنيميشن للـ item
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

  // دالة لفتح/إغلاق الأسئلة
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // حالة التحميل
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

  // حالة الخطأ
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

  // عرض البيانات
  return (
    <motion.div
      dir={isRTL ? 'rtl' : 'ltr'}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 mt-4 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl   mx-auto">
        {/* عنوان الصفحة */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-xl overflow-hidden mb-12 p-8 border border-gray-100"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
          >
            {t("faqs.title") || "Frequently Asked Questions"}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 text-center leading-relaxed"
          >
            {t("faqs.subtitle") || "Find answers to common questions here."}
          </motion.p>
        </motion.div>

        {/* عرض الأسئلة */}
        {faqsData.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">{t("faqs.noFAQs") || "No FAQs found."}</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            className="space-y-4"
          >
            {faqsData.map((faq, index) => (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
              >
                {/* زر السؤال */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full p-6 text-left flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <h3 className={`text-lg font-medium text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-purple-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-purple-600" />
                    )}
                  </motion.div>
                </button>

                {/* عرض الإجابة */}
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className={`text-gray-600 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}
                      >
                        {faq.answer}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* قسم الاتصال */}
        <motion.div
          variants={itemVariants}
          className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-100 text-center"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {t("faqs.contactTitle") || "Still have questions?"}
          </h2>
          <p className="text-gray-600 mb-4">
            {t("faqs.contactDescription") || "Feel free to contact us for more help."}
          </p>
          <a
            href="mailto:support@example.com"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300"
          >
            {t("faqs.contactButton") || "Contact Us"}
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FAQs;
