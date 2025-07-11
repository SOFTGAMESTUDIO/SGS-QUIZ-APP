import React from "react";
import { Link } from "react-router-dom"; // or next/link if using Next.js
import { motion } from "framer-motion";


export default function NotFoundPage() {
  return (
  
   
      <div className="min-h-screen bg-white text-black flex items-center justify-center p-8 dark:bg-black dark:text-white">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Left Side Content */}
          <div>
            <p className="text-gray-400 mb-2">ERROR CODE: 404</p>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              OOOPS!!
            </h1>
            <p className="text-xl md:text-2xl mb-6">
              This is not the page you are looking for
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Here are some helpful links instead:
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/" className="underline hover:text-blue-500">
                Home
              </Link>
              <Link to="/ContactUs" className="underline hover:text-blue-500">
                Contact Us
              </Link>
              <Link to="/About-SGS" className="underline hover:text-blue-500">
                About Us
              </Link>
            </div>
          </div>

          {/* Right Side Graphic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/SGS%20images%2F%E2%80%94Pngtree%E2%80%94error%20404%20page%20not%20found_6681621.png?alt=media&token=e8563741-5d63-4b58-895c-951529ee8ad3" // Add your custom astronaut + 404 image in this path
              alt="404 Illustration"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
  );
}
