import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function Layout({ children }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Go back one step in history
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation Bar - Fixed position */}
      <header className=" fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-1 flex items-end h-16  ">
          {/* Back Button (Left) */}
          <button 
            onClick={handleBackClick}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Go back"
          >
            <FiArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          {/* Centered App Name */}
          <div className="flex-grow text-center">
            <h1 className="text-xl font-bold text-gray-800">SGS Quiz</h1>
          </div>
          
          {/* Right side placeholder for balance */}
          <div className="w-9"></div>
        </div>
      </header>

      {/* Main Content - Pushed down by the nav height */}
      <main className="flex-grow container mx-auto  pt-20 pb-6">
        {children}
      </main>

      {/* Optional Footer */}
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Soft Game Studio. All rights reserved.
        </div>
      </footer>
    </div>
  );
}