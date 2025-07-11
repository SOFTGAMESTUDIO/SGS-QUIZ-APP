import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Components/Layout';

const FAQPage = () => {
  const navigate = useNavigate();
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: '',
    title: ''
  });

  const faqs = [  {
      id: 1,
      title: "How to create an account?",
      content: "To create an account, navigate to our sign-up page and enter your email address, choose a secure password, and complete the verification process. You'll receive a confirmation email to activate your account.",
      tags: ["account", "sign-up"]
    },
    {
      id: 2,
      title: "How can I make payment using Paypal?",
      content: "During checkout, select PayPal as your payment method. You'll be redirected to PayPal's secure site to log in and authorize the payment. Once confirmed, you'll return to our site to complete the transaction.",
      tags: ["payment", "paypal"]
    },
    {
      id: 3,
      title: "Can I cancel my subscription plan?",
      content: "Yes, you can cancel your subscription at any time. Go to your account settings, select 'Subscriptions', and choose the plan you wish to cancel. Your access will continue until the end of your current billing period.",
      tags: ["subscription", "billing"]
    },
    {
      id: 4,
      title: "How can I reach technical support?",
      content: "Our support team is available 24/7. You can contact us via live chat on our website, email support@softgamestudio.com, or call +1 (800) 555-1234. Response time is typically under 30 minutes during business hours.",
      tags: ["support", "contact"]
    },
    {
      id: 5,
      title: "What platforms do your games support?",
      content: "Our games are available on Windows, macOS, iOS, and Android. Some titles also support PlayStation, Xbox, and Nintendo Switch. Check individual game pages for specific platform compatibility.",
      tags: ["platforms", "compatibility"]
    },
    {
      id: 6,
      title: "Do you offer educational discounts?",
      content: "Yes, we provide special pricing for educational institutions. Contact our sales team at edu@softgamestudio.com with proof of your academic affiliation to receive a custom quote and discount code.",
      tags: ["education", "discount"]
    }];

  // Close context menu
  const closeContextMenu = () => {
    setContextMenu(prev => ({ ...prev, visible: false }));
  };

  // Handle right-click on FAQ items
  const handleContextMenu = (event, faq) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      content: faq.content,
      title: faq.title
    });
  };

  // Close context menu on outside click
  const handleClickOutside = () => {
    if (contextMenu.visible) {
      closeContextMenu();
    }
  };

  // Close context menu on Escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closeContextMenu();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <Layout>
 <div 
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-900"
      onClick={handleClickOutside}
    >
      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p 
            className="max-w-2xl mx-auto text-lg text-blue-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Find answers to common questions about our services and support.
          </motion.p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              onContextMenu={(e) => handleContextMenu(e, faq)}
            >
              <div className="flex items-start">
                <div className="p-2 rounded-lg mr-4 bg-blue-100 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">
                    {faq.title}
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    {faq.content.substring(0, 100)}...
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {faq.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Right-click for full details
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div 
          className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100 border border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Need more help?
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-blue-700">
            Our support team is ready to assist you with any questions not covered in our FAQ.
          </p>
          <button 
            onClick={() => navigate("/ContactUs")}
            className="px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg transition-all"
          >
            Contact Support
          </button>
        </motion.div>
      </div>

      {/* Context Menu */}
      {contextMenu.visible && (
        <motion.div
          className="fixed z-50 bg-white rounded-lg shadow-xl p-4 max-w-sm border border-gray-300"
          style={{
            top: Math.min(contextMenu.y, window.innerHeight - 200),
            left: Math.min(contextMenu.x, window.innerWidth - 350),
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-blue-600">
              {contextMenu.title}
            </h3>
            <button 
              onClick={closeContextMenu}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-700 mb-4">
            {contextMenu.content}
          </p>
          <div className="flex justify-end">
            <button 
              className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              onClick={closeContextMenu}
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </div>
    </Layout>
   
  );
};

export default FAQPage;