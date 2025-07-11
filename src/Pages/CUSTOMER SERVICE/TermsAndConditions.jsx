import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Layout from "../../Components/Layout";

const TermsAndConditions = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <Layout>
<div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 text-gray-800 overflow-hidden">
      {/* Parallax background */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ 
          y,
          backgroundImage: "url('https://webjl26.web.app/static/media/stars.7d85fe42.png')",
          backgroundSize: "cover"
        }}
      />
      
      {/* Floating legal document elements */}
      <motion.div
        className="absolute top-[15%] left-[15%] w-64 h-64 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: "radial-gradient(circle, rgba(192, 132, 252, 0.4) 0%, transparent 70%)"
        }}
      />
      
      <motion.div
        className="absolute bottom-[25%] right-[15%] w-48 h-48 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{
          background: "radial-gradient(circle, rgba(129, 140, 248, 0.4) 0%, transparent 70%)"
        }}
      />
      
      {/* Content Container */}
      <div className="relative max-w-5xl mx-auto px-4 py-16 z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-purple-600 overflow-hidden flex items-center justify-center">
              <img src="https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/Designer.png?alt=media&token=3e6ee22e-f7f7-4d73-8ce7-0b1441ed3050" alt="Soft Game Studio Logo" />
            </div>
            <h1 className="text-3xl font-bold text-purple-800">Soft Game Studio</h1>
          </div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Terms & Conditions
          </motion.h1>
          <motion.p 
            className="text-lg text-purple-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Effective: January 10, 2025
          </motion.p>
        </motion.div>

        {/* Terms sections */}
        <div className="space-y-10">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white backdrop-blur-sm rounded-2xl p-8 shadow-xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-100 p-3 rounded-xl">
                <span className="text-3xl">📜</span>
              </div>
              <h2 className="text-2xl font-bold text-blue-700">Agreement to Terms</h2>
            </div>
            <p className="mb-4">
              Welcome to <strong className="text-blue-600">Soft Game Studio</strong>! By accessing or using our website (
              <a
                href="https://softgamestudio.web.app"
                className="text-blue-600 underline hover:text-blue-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://softgamestudio.web.app
              </a>
              ), you agree to be bound by these Terms & Conditions.
            </p>
            <p>
              If you disagree with any part of these terms, you may not access the
              website or use our services.
            </p>
          </motion.div>

          {/* Account Creation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white backdrop-blur-sm rounded-2xl p-8 shadow-xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-purple-100 p-3 rounded-xl">
                <span className="text-3xl">👤</span>
              </div>
              <h2 className="text-2xl font-bold text-purple-700">Account Creation</h2>
            </div>
            <p className="mb-4">
              To access certain features of our website, you must create an
              account. When creating an account, you agree to provide accurate and
              complete information, including your name, email address, phone
              number, and address.
            </p>
            <p>
              You are responsible for maintaining the confidentiality of your account 
              credentials and for any activities that occur under your account.
            </p>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white backdrop-blur-sm rounded-2xl p-8 shadow-xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-green-100 p-3 rounded-xl">
                <span className="text-3xl">🛒</span>
              </div>
              <h2 className="text-2xl font-bold text-green-700">Services and Purchases</h2>
            </div>
            <p className="mb-4">
              Our website offers both free and paid courses, notes, and services.
              Users can purchase goods, items, or services through one-time
              payments only.
            </p>
            <p>
              By making a purchase, you agree to provide accurate
              payment information and comply with any additional terms related to
              the transaction.
            </p>
          </motion.div>

          {/* Content Ownership */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white backdrop-blur-sm rounded-2xl p-8 shadow-xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-orange-100 p-3 rounded-xl">
                <span className="text-3xl">©️</span>
              </div>
              <h2 className="text-2xl font-bold text-orange-700">Ownership of Content</h2>
            </div>
            <p className="mb-4">
              All content on our website, including our logo, visual design,
              trademarks, and other intellectual property, is the exclusive
              property of Soft Game Studio.
            </p>
            <p>
              Unauthorized use of our content is strictly prohibited.
            </p>
          </motion.div>

          {/* Feedback */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white backdrop-blur-sm rounded-2xl p-8 shadow-xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-yellow-100 p-3 rounded-xl">
                <span className="text-3xl">💡</span>
              </div>
              <h2 className="text-2xl font-bold text-yellow-700">Feedback and Suggestions</h2>
            </div>
            <p>
              By submitting feedback or suggestions, you grant us the right to
              implement and use them without any obligation to compensate you.
            </p>
          </motion.div>

          {/* Promotions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-white backdrop-blur-sm rounded-2xl p-8 shadow-xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-red-100 p-3 rounded-xl">
                <span className="text-3xl">🎉</span>
              </div>
              <h2 className="text-2xl font-bold text-red-700">Promotions and Contests</h2>
            </div>
            <p className="mb-4">
              We may offer promotions, contests, and sweepstakes from time to
              time. These activities may have additional terms and conditions,
              which will be provided when applicable.
            </p>
          </motion.div>

          {/* Responsibilities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-white backdrop-blur-sm rounded-2xl p-8 shadow-xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <span className="text-3xl">⚖️</span>
              </div>
              <h2 className="text-2xl font-bold text-indigo-700">User Responsibilities</h2>
            </div>
            <p className="mb-4">
              You agree to use our website and services in compliance with all
              applicable laws and regulations.
            </p>
            <p>
              Any misuse of our services or violation of these Terms & Conditions 
              may result in the suspension or termination of your account.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            className="bg-white backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center"
          >
            <div className="flex items-center gap-4 mb-6 justify-center">
              <div className="bg-blue-100 p-3 rounded-xl">
                <span className="text-3xl">📬</span>
              </div>
              <h2 className="text-2xl font-bold text-blue-700">Contact Us</h2>
            </div>
            <p className="mb-6 max-w-2xl mx-auto">
              If you have any questions about these Terms & Conditions, please contact our team:
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="mailto:team.softgamestudio@gmail.com"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Email Our Team
              </a>
              <a
                href="https://softgamestudio.web.app/ContactUs"
                className="px-6 py-3 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Contact Form
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </Layout>
    
  );
};

export default TermsAndConditions;