import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Layout from "../../Components/Layout";

const CopyrightPage = () => {
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
        
        {/* Floating elements */}
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
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
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
              Copyright & Business Information
            </motion.h1>
            <motion.p 
              className="text-lg text-purple-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Official Business Documentation and Intellectual Property Details
            </motion.p>
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-10">
            {/* Udyam Registration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white backdrop-blur-sm rounded-2xl p-8 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <span className="text-3xl">🏢</span>
                </div>
                <h2 className="text-2xl font-bold text-blue-700">Udyam Registration Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">Business Information</h3>
                  <ul className="space-y-3">
                    <li className="flex">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                      <div>
                        <strong>Udyam Registration Number:</strong> UDYAM-PB-06-0032977
                      </div>
                    </li>
                    <li className="flex">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                      <div>
                        <strong>Enterprise Name:</strong> Soft Game Studio
                      </div>
                    </li>
                    <li className="flex">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                      <div>
                        <strong>Type of Enterprise:</strong> Micro (2024-25)
                      </div>
                    </li>
                    <li className="flex">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                      <div>
                        <strong>Major Activity:</strong> Services
                      </div>
                    </li>
                    <li className="flex">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                      <div>
                        <strong>Social Category:</strong> General
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">Contact Details</h3>
                  <ul className="space-y-3">
                    <li className="flex">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                      <div>
                        <strong>Official Address:</strong> Flat No. 574, Soft Game Studio, St. No. 5, Nai Abadi, Abohar, Fazilka, Punjab, 152116
                      </div>
                    </li>
                    <li className="flex">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                      <div>
                        <strong>Contact:</strong> +91 1634358414 | Email: team.softgamestudio@gmail.com
                      </div>
                    </li>
                    <li className="flex">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                      <div>
                        <strong>Date of Incorporation:</strong> 01/01/2025
                      </div>
                    </li>
                    <li className="flex">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                      <div>
                        <strong>Date of Udyam Registration:</strong> 21/01/2025
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Industry Classification */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white backdrop-blur-sm rounded-2xl p-8 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <span className="text-3xl">🏭</span>
                </div>
                <h2 className="text-2xl font-bold text-purple-700">Industry Classification</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">Primary Activities</h3>
                  <ul className="space-y-3">
                    <li className="flex">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                      <div>Computer programming activities (62011 - Software Development)</div>
                    </li>
                    <li className="flex">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                      <div>Web-page designing (62012)</div>
                    </li>
                    <li className="flex">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                      <div>IT and Computer Services (62099)</div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">Secondary Activities</h3>
                  <ul className="space-y-3">
                    <li className="flex">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                      <div>Web Hosting (63112)</div>
                    </li>
                    <li className="flex">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                      <div>Educational Services (85499)</div>
                    </li>
                    <li className="flex">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                      <div>Digital Content Creation (58142)</div>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Copyright Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white backdrop-blur-sm rounded-2xl p-8 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-orange-100 p-3 rounded-xl">
                  <span className="text-3xl">©️</span>
                </div>
                <h2 className="text-2xl font-bold text-orange-700">Copyright & Ownership</h2>
              </div>
              
              <div className="space-y-4">
                <p>
                  &copy; {new Date().getFullYear()} Soft Game Studio. All Rights Reserved.
                </p>
                
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h3 className="font-bold mb-2 flex items-center gap-2 text-yellow-700">
                    <span>⚠️</span> Intellectual Property Notice
                  </h3>
                  <p>
                    All content, trademarks, logos, graphics, text, images, software, and intellectual property displayed on this website are the exclusive property of Soft Game Studio. Unauthorized use, reproduction, distribution, or modification of any material without prior written consent is strictly prohibited and may result in legal action.
                  </p>
                </div>
                
                <p>
                  By accessing this website, users agree to respect the intellectual property rights of Soft Game Studio. Any breach of these rights may lead to severe penalties under applicable copyright and intellectual property laws including but not limited to:
                </p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>The Copyright Act, 1957 (India)</li>
                  <li>The Information Technology Act, 2000 (India)</li>
                  <li>Digital Millennium Copyright Act (DMCA) for international protections</li>
                </ul>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-bold mb-2 flex items-center gap-2 text-blue-700">
                    <span>ℹ️</span> Permissions and Licensing
                  </h3>
                  <p className="">
                    If you wish to use any content from this website for commercial or personal purposes, you must obtain explicit permission from Soft Game Studio. For licensing inquiries, please contact our legal department at <a href="mailto:legal@softgamestudio.com" className="text-blue-600 underline ">Email</a>.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Additional Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white backdrop-blur-sm rounded-2xl p-8 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-green-100 p-3 rounded-xl">
                  <span className="text-3xl">🔗</span>
                </div>
                <h2 className="text-2xl font-bold text-green-700">Additional Resources</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">Legal Documents</h3>
                  <ul className="space-y-3">
                    <li className="flex">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                      <a 
                        href="/PrivacyPolicy" 
                        className="text-blue-600 hover:underline"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li className="flex">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                      <a 
                        href="/TermsAndConditions" 
                        className="text-blue-600 hover:underline"
                      >
                        Terms & Conditions
                      </a>
                    </li>
                   
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">Company Information</h3>
                  <ul className="space-y-3">
                    <li className="flex">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                      <a 
                        href="/AboutUS" 
                        className="text-blue-600 hover:underline"
                      >
                        About Us
                      </a>
                    </li>
                    <li className="flex">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                      <a 
                        href="/ContactUs" 
                        className="text-blue-600 hover:underline"
                      >
                        Contact Us
                      </a>
                    </li>
                    <li className="flex">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                      <a 
                        href="/OurMembers" 
                        className="text-blue-600 hover:underline"
                      >
                        Our Team Members
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-center">
                  For more details, visit our official website:{" "}
                  <a 
                    href="https://softgamestudio.web.app/" 
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Soft Game Studio
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CopyrightPage;