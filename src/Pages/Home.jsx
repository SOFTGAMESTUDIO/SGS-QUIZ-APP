// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { FaPlay, FaCode, } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../DataBase/firebaseConfig";



const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const navigate = useNavigate();
  
  
  // Image slides for the carousel
  const slides = [
    { id: 1, title: "Weekly Quiz Challenge", description: "Test your knowledge every day!" },
    { id: 2, title: "Compete with Friends", description: "Challenge your friends and climb the leaderboard" },
    { id: 3, title: "Earn Achievements", description: "Unlock badges and show off your expertise" },
  ];


    const [quizzes, setQuizzes] = useState([]);
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



const [totalQuizzes, setTotalQuizzes] = useState(0);
const [totalQuestions, setTotalQuestions] = useState(0);

useEffect(() => {
  const fetchQuizzesData = async () => {
    try {
      const querySnapshot = await getDocs(collection(fireDB, "quizzesfree"));
      const querySnapshot1 = await getDocs(collection(fireDB, "quizzes"));
      const querySnapshot2 = await getDocs(collection(fireDB, "user_DailyQuiz"));

      const allQuizzes = [];

      querySnapshot.forEach((doc) => {
        allQuizzes.push({ id: doc.id, ...doc.data() });
      });
      querySnapshot1.forEach((doc) => {
        allQuizzes.push({ id: doc.id, ...doc.data() });
      });
      querySnapshot2.forEach((doc) => {
        allQuizzes.push({ id: doc.id, ...doc.data() });
      });

      // Count total number of quizzes and questions
      const quizCount = allQuizzes.length;
      const questionCount = allQuizzes.reduce((acc, quiz) => {
        return acc + (quiz.questions?.length || 0);
      }, 0);

      setTotalQuizzes(quizCount);
      setTotalQuestions(questionCount);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } 
  };

  fetchQuizzesData();
}, []);

const [totalUser, setTotalUser] = useState(0);


useEffect(() => {
  const fetchUserData = async () => {
    try {
      const querySnapshot = await getDocs(collection(fireDB, "users"));
      const userCount = querySnapshot.size; // 🔥 No need to loop, just use size

      setTotalUser(userCount);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  fetchUserData();
}, []);





  const handleOpenQuiz = (quiz) => {
    window.location.href = `/SGS-Quiz-Open/${quiz.id}`;
  };
  
  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-purple-50 pb-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-12 px-4 rounded-b-3xl shadow-lg">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 w-20 overflow-hidden rounded-full">
            <img src="../assets/icon.png" className='w-20' alt="" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3">SGS QUIZ</h1>
          <p className="text-lg mb-6 opacity-90">Test your knowledge, challenge friends, and become a trivia master!</p>
         
       
         
          <button onClick={() => {navigate('/DailyQuiz')}} className="bg-white text-purple-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-purple-100 transition-all transform hover:scale-105">
            <FaPlay className="inline-block mr-2" /> Play Weekly Quiz
          </button>
        </div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute top-4 left-4 w-4 h-4 rounded-full bg-yellow-300 animate-pulse"></div>
        <div className="absolute top-10 right-8 w-6 h-6 rounded-full bg-pink-300 opacity-70"></div>
        <div className="absolute bottom-8 left-10 w-5 h-5 rounded-full bg-white opacity-30"></div>
      </div>
      
      {/* Image Slider */}
      <div className="max-w-lg mx-auto mt-8 px-4 relative">
        <div className="relative h-56 overflow-hidden rounded-2xl shadow-xl">
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-6 transition-opacity duration-500 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
              style={{
                background: `linear-gradient(135deg, ${index === 0 ? '#8B5CF6' : index === 1 ? '#6366F1' : '#EC4899'}, #7C3AED)`
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-2">{slide.title}</h3>
              <p className="text-white/90 text-center">{slide.description}</p>
            </div>
          ))}
        </div>
        
        {/* Slider Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-purple-600' : 'bg-purple-300'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
    
      {/* Featured Quizzes */}
      <div className="mt-12 px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Featured Quizzes</h2>
        <div className="max-w-md mx-auto space-y-4">
          
           {quizzes.map((quiz) => (
            <div 
              key={quiz.id} 
              className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center border-l-4 border-purple-500"
            >
              <div>
                <h3 className="font-bold text-gray-800">{quiz.name}</h3>
                  <span><FaCode className="inline mr-1 text-purple-500" /> {quiz.language}</span>
                <div className="flex mt-2 space-x-4 text-sm text-gray-600">
                  <span>{quiz.questions.length} questions</span>
                </div>
              </div>
                {timers[quiz.id] === "STARTED" ? 
                
              <button  onClick={() => handleOpenQuiz(quiz)} className="bg-purple-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-purple-700 transition-colors">
                Play
              </button>
              :
              <button className="bg-purple-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-purple-700 transition-colors">
                {timers[quiz.id] || "Loading timer..."}
              </button>
}
            </div>
          ))}
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="mt-12 bg-purple-100 rounded-3xl mx-4 p-6 shadow-inner">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Quiz Community</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-xl shadow">
            <div className="text-xl font-bold text-purple-600">{totalUser}</div>
            <div className="text-gray-600 text-sm mt-1">Players</div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow">
            <div className="text-xl font-bold text-purple-600">{totalQuizzes}</div>
            <div className="text-gray-600 text-sm mt-1">Quizzes</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <div className="text-xl font-bold text-purple-600">{totalQuestions}</div>
            <div className="text-gray-600 text-sm mt-1">Questions</div>
          </div>

          
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="mt-12 text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Challenge Yourself?</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Join millions of players worldwide in the ultimate trivia experience!
        </p>
        <button  className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
          Soft Game Studio Quiz
        </button>
      </div>
    </div>
  );
};

export default HomePage;