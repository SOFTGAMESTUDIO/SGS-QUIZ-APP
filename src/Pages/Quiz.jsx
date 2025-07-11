import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExamList from "./QuizFree/Quiz";
import ExamList2 from "./Quiz/Quiz";

const QuizList = () => {
  const [activeTab, setActiveTab] = useState("free");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setIsLoggedIn(!!storedUser?.email);
    };
    checkAuth(); // Added: Actually call the function
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Available Quizzes</h1>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === "free" 
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("free")}
          >
            Free Quizzes
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === "official" 
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("official")}
          >
            Official Quizzes
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white p-4 rounded-lg shadow">
          {activeTab === "free" ? (
            <ExamList/>
          ) : (
            isLoggedIn ? <ExamList2/> : (
              <div className="max-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
                  <p className="text-gray-600 mb-6">
                    You need to be logged in to access the quizzes.
                  </p>
                  <button
                    onClick={() => navigate('/Login')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                  >
                    Go to Login Page
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizList;