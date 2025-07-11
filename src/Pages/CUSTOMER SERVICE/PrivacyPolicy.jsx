import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Layout from '../../Components/Layout';

const PrivacyPolicy = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 text-gray-800 overflow-hidden">
        {/* Parallax background */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{ 
            y,
            backgroundImage: "url('https://webjl26.web.app/static/media/stars.7d85fe42.png')",
            backgroundSize: "cover"
          }}
        />
        
        {/* Floating elements - Reduced size and blur on mobile */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-32 h-32 md:w-64 md:h-64 rounded-full blur-xl md:blur-3xl"
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
          className="absolute bottom-1/3 left-1/3 w-24 h-24 md:w-48 md:h-48 rounded-full blur-xl md:blur-3xl"
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
        <div ref={containerRef} className="relative max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16 z-10">
          {/* Header with logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center mb-8 md:mb-12"
          >
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-600 overflow-hidden flex items-center justify-center">
                <img src="https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/Designer.png?alt=media&token=3e6ee22e-f7f7-4d73-8ce7-0b1441ed3050" alt="Soft Game Studio Logo" className="w-full h-full object-cover" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-purple-800">Soft Game Studio</h1>
            </div>
            
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-3 md:mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Privacy Policy
            </motion.h1>
            <motion.p 
              className="text-base md:text-lg text-purple-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Effective: June 7, 2025
            </motion.p>
          </motion.div>

          {/* Policy sections */}
          <div className="space-y-6 md:space-y-10">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-purple-700">Our Commitment to Your Privacy</h2>
              <div className="space-y-3 md:space-y-4 text-sm md:text-base">
                <p>
                  At Soft Game Studio, we prioritize the protection of your personal information. 
                  This Privacy Policy outlines how we collect, use, and safeguard your data when 
                  you interact with our services and products.
                </p>
                <p>
                  This policy has been carefully crafted by our legal team to ensure compliance 
                  with international privacy standards and to clearly communicate our practices. 
                  We do not rely on automated policy generators - every aspect of this document 
                  reflects our company's specific practices and values.
                </p>
                <p>
                  By using our services, you consent to the data practices described in this policy.
                </p>
              </div>
            </motion.div>

            {/* Core Principles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-purple-700">Our Core Privacy Principles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {[
                  { 
                    title: "Transparency", 
                    icon: "🔍",
                    desc: "We clearly communicate what data we collect and why we need it" 
                  },
                  { 
                    title: "Minimal Data", 
                    icon: "📉",
                    desc: "We only collect what's necessary to provide our services" 
                  },
                  { 
                    title: "Security First", 
                    icon: "🔒",
                    desc: "Industry-standard encryption and security protocols protect your data" 
                  }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="p-4 md:p-5 bg-purple-50 rounded-lg md:rounded-xl border border-purple-100"
                  >
                    <div className="text-2xl md:text-3xl mb-2 md:mb-3">{item.icon}</div>
                    <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2 text-purple-800">{item.title}</h3>
                    <p className="text-xs md:text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Data Collection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-purple-700">Information We Collect</h2>
              
              <div className="mb-6 md:mb-8">
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-900">Personal Information</h3>
                <p className="mb-3 md:mb-4 text-sm md:text-base">
                  When you register for an account, purchase our products, or contact support, 
                  we may collect:
                </p>
                <ul className="grid grid-cols-1 gap-2 md:gap-3 mb-4 md:mb-6">
                  {[
                    "Full name",
                    "Email address",
                    "Billing address",
                    "Phone number",
                    "Payment information",
                    "Company details (if applicable)"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start text-sm md:text-base">
                      <div className="mt-1.5 w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-500 rounded-full mr-2 md:mr-3"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-900">Automated Data Collection</h3>
                <p className="mb-3 md:mb-4 text-sm md:text-base">
                  To improve our services and user experience, we automatically collect:
                </p>
                <ul className="grid grid-cols-1 gap-2 md:gap-3">
                  {[
                    "Device information (type, OS, browser)",
                    "IP address and approximate location",
                    "Usage patterns and interaction data",
                    "Crash reports and performance metrics",
                    "Game progress and achievements"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start text-sm md:text-base">
                      <div className="mt-1.5 w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full mr-2 md:mr-3"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Data Usage */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-purple-700">How We Use Your Information</h2>
              
              <div className="space-y-4 md:space-y-6">
                {[
                  {
                    icon: "🎯",
                    title: "Service Delivery",
                    desc: "To provide and maintain our services, process transactions, and authenticate users."
                  },
                  {
                    icon: "📈",
                    title: "Product Improvement",
                    desc: "To analyze usage patterns and enhance functionality, performance, and security."
                  },
                  {
                    icon: "📣",
                    title: "Communication",
                    desc: "To respond to inquiries, provide updates, and share important service information."
                  },
                  {
                    icon: "🔐",
                    title: "Security & Compliance",
                    desc: "To detect and prevent fraud, comply with legal obligations, and enforce our terms."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-purple-100 p-2 md:p-3 rounded-lg mr-3 md:mr-4">
                      <span className="text-lg md:text-xl">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base md:text-lg mb-1">{item.title}</h3>
                      <p className="text-sm md:text-base">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg text-center"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-purple-700">Contact Our Privacy Team</h2>
              <p className="mb-4 md:mb-6 max-w-2xl mx-auto text-sm md:text-base">
                If you have questions about this policy or your personal data, 
                our dedicated privacy team is ready to assist you.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                <a
                  href="mailto:team.softgamestudio@gmail.com"
                  className="px-4 py-2 md:px-6 md:py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm md:text-base"
                >
                  Email Privacy Team
                </a>
                <a
                  href="https://softgamestudio.web.app/ContactUs"
                  className="px-4 py-2 md:px-6 md:py-3 bg-white border border-purple-600 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors text-sm md:text-base"
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

export default PrivacyPolicy;