import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../../DataBase/firebaseConfig";

const ExamList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timers, setTimers] = useState({});

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDB, "quizzesfree"));
        const quizzesData = [];
        querySnapshot.forEach((doc) => {
          quizzesData.push({ id: doc.id, ...doc.data() });
        });
        setQuizzes(quizzesData);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimers = {};
      quizzes.forEach((quiz) => {
        const examTime = new Date(quiz.examPage).getTime();
        const now = new Date().getTime();
        const timeLeft = examTime - now;
  
        if (timeLeft <= 0) {
          updatedTimers[quiz.id] = "STARTED";
        } else {
          const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
           if (days > 0) {
               updatedTimers[quiz.id] = `${days}days `;
            } else {   
              updatedTimers[quiz.id] = `${hours}H ${minutes}M ${seconds}S`; 
            }
        }
      });
      setTimers(updatedTimers);
    }, 1000);
  
    return () => clearInterval(interval);
  }, [quizzes]);
  

  const handleOpenQuiz = (quiz) => {
    window.location.href = `/SGS-Quiz-Open/${quiz.id}`;
  };
  
  const handleDetailsQuiz = (quiz) => {
    window.location.href = `/ExamFree-Quiz-Details/${quiz.id}`;
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-800">Loading exams...</p>;
  }

  if (quizzes.length === 0) {
    return (
      <p className="text-center mt-10 h-screen justify-center items-center flex text-gray-800">
        No exams found.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Available Quizzes
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
              <div className="flex justify-center">
                <img
                  src={quiz.imageUrl}
                  alt={quiz.name}
                  className="h-48 sm:h-52 w-full object-contain object-center mb-4 rounded-lg"
                />
              </div>
              <h2 className="text-xs font-medium mb-1 text-cyan-600">
                Quiz
              </h2>
              <h1 className="text-lg font-semibold mb-3 text-gray-800">
                {quiz.name}
              </h1>
              <p className="text-xs mb-4 text-gray-600">
                Language: {quiz.language}
              </p>

              {/* Countdown or Start Button */}
              <div className="text-center mb-3">
                {timers[quiz.id] === "STARTED" ? (
                  <button
                    onClick={() => handleOpenQuiz(quiz)}
                    className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 transition-all duration-200"
                  >
                    Start Quiz
                  </button>
                ) : (
                  <button
                    className="w-full bg-gray-200 text-gray-800 font-medium rounded-lg text-sm px-4 py-2.5 cursor-default"
                    disabled
                  >
                    {timers[quiz.id] || "Loading timer..."}
                  </button>
                )}
              </div>

              <button
                onClick={() => handleDetailsQuiz(quiz)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg text-sm px-4 py-2.5 transition-colors duration-200"
              >
                Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamList;