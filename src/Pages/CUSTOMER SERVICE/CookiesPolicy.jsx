import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Layout from "../../Components/Layout";

const CookiesPolicy = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const cookieData = [
  {
    name: "termsAccepted",
    purpose: "Remembers if the user accepted Terms & Conditions",
    type: "First-party",
    data: "true / false",
    duration: "1 year",
    essential: "Yes",
  },
  {
    name: "_ga, _gid",
    purpose: "Tracks usage behavior via Google Analytics for site improvement",
    type: "Third-party",
    data: "Anonymous user ID and session data",
    duration: "2 years / 24 hours",
    essential: "No",
  },
  {
    name: "firebase-auth",
    purpose: "Maintains user login session using Firebase authentication (Email, Google, GitHub)",
    type: "First-party",
    data: "Firebase Auth ID token (JWT)",
    duration: "Session (until browser close)",
    essential: "Yes",
  },
  {
    name: "userProfile",
    purpose: "Stores user information like name, email, phone, and address after login",
    type: "First-party",
    data: "User name, email, phone, address",
    duration: "1 year",
    essential: "Yes",
  },
  {
    name: "cartData",
    purpose: "Stores selected product IDs and their quantity for shopping cart",
    type: "First-party",
    data: "Array of product IDs, quantity, selected variants",
    duration: "30 days",
    essential: "No",
  },
  {
    name: "orderHistory",
    purpose: "Saves a temporary record of placed orders for confirmation and local reference",
    type: "First-party",
    data: "Order ID, items, payment status",
    duration: "30 days",
    essential: "No",
  },
  {
    name: "paymentSession",
    purpose: "Tracks ongoing payment session details for Razorpay or other integrations",
    type: "Third-party / First-party (depending on provider)",
    data: "Transaction ID, status, session info",
    duration: "Session",
    essential: "Yes",
  },
  {
    name: "theme",
    purpose: "Remembers user’s selected UI theme (dark/light)",
    type: "First-party",
    data: "dark / light",
    duration: "1 year",
    essential: "No",
  }
];

  return (
    <Layout>
 <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800 overflow-hidden">
      {/* Background elements */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ 
          y,
          backgroundImage: "url('https://webjl26.web.app/static/media/stars.7d85fe42.png')",
          backgroundSize: "cover"
        }}
      />
      
      {/* Floating cookie decorations */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-10 h-10 rounded-full bg-amber-200 opacity-80"
          initial={{ 
            y: Math.random() * 100, 
            x: Math.random() * 100,
            scale: 0.8
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 15, 0],
            x: [0, Math.random() > 0.5 ? 20 : -20, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
          style={{
            top: `${10 + i * 15}%`,
            left: `${10 + i * 10}%`,
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
          }}
        >
          <div className="absolute w-2 h-2 rounded-full bg-amber-400 top-2 left-3"></div>
          <div className="absolute w-2 h-2 rounded-full bg-amber-400 top-2 right-3"></div>
          <div className="absolute w-2 h-2 rounded-full bg-amber-400 bottom-2 left-6"></div>
        </motion.div>
      ))}
      
      {/* Content Container */}
      <div className="relative max-w-5xl mx-auto px-4 py-16 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-600">
            🍪 Cookie Policy
          </h1>
          <p className="text-xl text-purple-600">
            Last Updated: June 7, 2025
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <span className="text-2xl">ℹ️</span>
              </div>
              <h2 className="text-xl font-bold text-blue-700">Understanding Cookies</h2>
            </div>
            <p className="mb-4">
              At <strong className="text-blue-600">Soft Game Studio</strong>, we use cookies to enhance your experience,
              analyze traffic, and deliver personalized content.
            </p>
            <p>
              Cookies are small text files stored on your browser or device by websites
              you visit. They help remember your preferences and improve functionality.
            </p>
          </motion.div>

          {/* Cookie Table - Mobile Friendly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-4 shadow-md overflow-hidden"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <span className="text-2xl">📋</span>
              </div>
              <h2 className="text-xl font-bold text-purple-700">Cookies We Use</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="p-2 border-b font-semibold text-blue-700 text-left">Cookie</th>
                    <th className="p-2 border-b font-semibold text-blue-700 text-left">Purpose</th>
                    <th className="p-2 border-b font-semibold text-blue-700 text-left">Type</th>
                    <th className="p-2 border-b font-semibold text-blue-700 text-left hidden md:table-cell">Data</th>
                    <th className="p-2 border-b font-semibold text-blue-700 text-left">Duration</th>
                    <th className="p-2 border-b font-semibold text-blue-700 text-left">Essential</th>
                  </tr>
                </thead>
                <tbody>
                  {cookieData.map((cookie, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="border-t hover:bg-blue-50"
                    >
                      <td className="p-2 font-medium">{cookie.name}</td>
                      <td className="p-2">{cookie.purpose}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          cookie.type === "First-party" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-purple-100 text-purple-800"
                        }`}>
                          {cookie.type}
                        </span>
                      </td>
                      <td className="p-2 hidden md:table-cell">{cookie.data}</td>
                      <td className="p-2">{cookie.duration}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          cookie.essential === "Yes" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {cookie.essential}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Third-party Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <span className="text-2xl">🌐</span>
              </div>
              <h2 className="text-xl font-bold text-orange-700">Third-Party Cookies</h2>
            </div>
            <p className="mb-4">
              We use services like Google Analytics and Firebase that may set their own cookies.
            </p>
            <div className="grid grid-cols-1 gap-4 mt-4">
              <a
                href="https://policies.google.com/technologies/cookies"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <div className="bg-white p-2 rounded-lg">
                  <span className="text-xl">🔍</span>
                </div>
                <div>
                  <h3 className="font-medium">Google Cookie Policy</h3>
                  <p className="text-xs opacity-80">policies.google.com</p>
                </div>
              </a>
              <a
                href="https://firebase.google.com/support/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <div className="bg-white p-2 rounded-lg">
                  <span className="text-xl">🔥</span>
                </div>
                <div>
                  <h3 className="font-medium">Firebase Privacy Policy</h3>
                  <p className="text-xs opacity-80">firebase.google.com</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Management Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <span className="text-2xl">⚙️</span>
              </div>
              <h2 className="text-xl font-bold text-green-700">Managing Cookies</h2>
            </div>
            <p className="mb-4">
              You can control or disable cookies via your browser settings. Essential features may require cookies.
            </p>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <span>💡</span> Browser Cookie Settings
              </h3>
              <ul className="grid grid-cols-1 gap-2">
                <li className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Chrome: Settings → Privacy → Cookies
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Firefox: Options → Privacy → Cookies
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Safari: Preferences → Privacy → Cookies
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <span className="text-2xl">📬</span>
              </div>
              <h2 className="text-xl font-bold text-purple-700">Contact Us</h2>
            </div>
            <p className="mb-4">
              Questions about our cookie policy? Get in touch:
            </p>
            <div className="grid grid-cols-1 gap-4">
              <a
                href="mailto:team.softgamestudio@gmail.com"
                className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <div className="bg-white p-2 rounded-lg">
                  <span className="text-xl">📧</span>
                </div>
                <div>
                  <h3 className="font-medium">Email Us</h3>
                  <p className="text-xs opacity-80">team.softgamestudio@gmail.com</p>
                </div>
              </a>
              <a
                href="https://softgamestudio.web.app/ContactUs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <div className="bg-white p-2 rounded-lg">
                  <span className="text-xl">🌐</span>
                </div>
                <div>
                  <h3 className="font-medium">Contact Form</h3>
                  <p className="text-xs opacity-80">softgamestudio.web.app</p>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </Layout>
   
  );
};

export default CookiesPolicy;