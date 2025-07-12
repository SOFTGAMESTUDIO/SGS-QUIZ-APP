import React, { useState, useEffect, useRef } from "react";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Layout from "../../Components/Layout";
import { fireDB } from "../../DataBase/firebaseConfig";
import { getUserData } from "../../Modules/UserData";

const DailyQuiz = () => {
  const { id: quizId } = useParams();
  const [step, setStep] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [userData, setUserData] = useState({});
  const [quizData, setQuizData] = useState(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const timerRef = useRef(null);
  const userEmail = JSON.parse(localStorage.getItem("user"))?.email;
  const violationCount = useRef(0);

  // Anti-cheating measures
  useEffect(() => {
    // Prevent context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      toast.warning("Right-click is disabled during quiz");
    };
    
    // Prevent copy/paste
    const handleCopyPaste = (e) => {
      if (["copy", "cut", "paste"].includes(e.type)) {
        e.preventDefault();
        handleViolation("Copy/Paste attempt");
      }
    };
    
    // Block screenshot key
    const handlePrintScreen = (e) => {
      if (e.key === "PrintScreen") {
        navigator.clipboard.writeText("");
        handleViolation("Screenshot attempt");
      }
    };
    
    // Tab switching detection
    const handleVisibilityChange = () => {
      if (document.hidden && step === 1) {
        handleViolation("Tab switching");
      }
    };

    // Block function keys
    const handleFunctionKeys = (e) => {
      if (e.key.startsWith('F') && e.key.length > 1) {
        e.preventDefault();
        handleViolation("Function key pressed");
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopyPaste);
    document.addEventListener("cut", handleCopyPaste);
    document.addEventListener("paste", handleCopyPaste);
    window.addEventListener("keyup", handlePrintScreen);
    window.addEventListener("keydown", handleFunctionKeys);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopyPaste);
      document.removeEventListener("cut", handleCopyPaste);
      document.removeEventListener("paste", handleCopyPaste);
      window.removeEventListener("keyup", handlePrintScreen);
      window.removeEventListener("keydown", handleFunctionKeys);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [step]);

  // Handle cheating violations
  const handleViolation = (reason) => {
    violationCount.current += 1;
    
    if (violationCount.current >= 3) {
      disqualifyUser(reason);
    } else {
      toast.warning(`Warning: ${reason} detected (${violationCount.current}/3)`);
    }
  };

  // Disqualify user
  const disqualifyUser = async (reason) => {
    try {
      await addDoc(collection(fireDB, "user_DailyQuiz"), {
        quizId,
        email: userData.email,
        name: userData.name,
        rollNumber: userData.rollNumber,
        timestamp: new Date(),
        disqualified: true,
        reason,
        language: quizData.language,
        violations: violationCount.current
      });
      
      toast.error("Disqualified for cheating");
      window.location.href = "/";
    } catch (err) {
      console.error("Disqualification error:", err);
      toast.error("Failed to save disqualification");
    }
  };

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const users = await getUserData();
        const currentUser = users.find(user => 
          user.email?.toLowerCase() === userEmail?.toLowerCase()
        );
        setUserData(currentUser || {});
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user information");
      }
    };
    
    if (userEmail) fetchUserData();
  }, [userEmail]);

  // Fetch quiz data
  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId) {
        toast.error("Quiz ID missing");
        return;
      }
      
      try {
        const docRef = doc(fireDB, "Dailyquizzes", quizId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setQuizData(data);
          setTotalQuestions(data.questions.length);
          
          // Set timer if quiz has time limit
          if (data.timeLimit) {
            setTimeRemaining(data.timeLimit * 60); // Convert minutes to seconds
          }
        } else {
          toast.error("Quiz not found");
        }
      } catch (err) {
        console.error("Quiz fetch error:", err);
        toast.error("Failed to load quiz");
      }
    };
    
    fetchQuiz();
  }, [quizId]);

  // Timer countdown
  useEffect(() => {
    if (step !== 1 || timeRemaining <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [step, timeRemaining]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnswerSelect = (questionIndex, optionKey) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: optionKey }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    clearInterval(timerRef.current);

    // Calculate score
    let correctAnswers = 0;
    quizData.questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correctAnswers++;
      }
    });

    setScore(correctAnswers);

    try {
      // Save results to Firebase
      await addDoc(collection(fireDB, "user_DailyQuiz"), {
        quizId,
        userId: userData.uid,
        email: userData.email,
        name: userData.name,
        rollNumber: userData.rollNumber,
        timestamp: new Date(),
        score: correctAnswers,
        totalQuestions,
        answers: selectedAnswers,
        language: quizData.language,
        timeTaken: quizData.timeLimit ? (quizData.timeLimit * 60 - timeRemaining) : null
      });

      setStep(2);
      toast.success("Quiz submitted successfully!");
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Failed to submit quiz results");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!quizData) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {step === 0 && (
          <div className="max-w-4xl mx-auto p-4 py-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
              <div className="p-8">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">
                    {quizData.name}
                  </h1>
                  <div className="w-32 h-1 bg-indigo-200 dark:bg-indigo-700 mx-auto rounded-full"></div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-xl p-6 w-full md:w-1/3">
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-indigo-200 dark:bg-indigo-800 w-16 h-16 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                          {userData.name?.charAt(0) || "U"}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-center font-medium text-gray-800 dark:text-white">
                      {userData.name || "User"}
                    </h3>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                      {userData.rollNumber || "No ID"}
                    </p>
                  </div>

                  <div className="w-full md:w-2/3">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-5 mb-6">
                      <h2 className="text-xl font-bold text-center text-yellow-700 dark:text-yellow-300 mb-3">
                        Important Instructions
                      </h2>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                          <span className="text-yellow-500 mr-2">•</span>
                          Switching tabs/windows will result in disqualification
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-500 mr-2">•</span>
                          Copy/paste functionality is disabled
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-500 mr-2">•</span>
                          You cannot return to previous questions
                        </li>
                        {quizData.timeLimit && (
                          <li className="flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            Time limit: {quizData.timeLimit} minutes
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    Quiz Description
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {quizData.description}
                  </p>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => setStep(1)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
                  >
                    Start Quiz Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 1 && quizData && (
          <div className="max-w-4xl mx-auto p-4 py-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    {quizData.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Question {currentQuestion + 1} of {totalQuestions}
                  </p>
                </div>
                
                {timeRemaining > 0 && (
                  <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-2 rounded-full font-medium">
                    Time: {formatTime(timeRemaining)}
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    {quizData.questions[currentQuestion]?.question}
                  </h3>

                  {quizData.questions[currentQuestion]?.code && (
                    <div className="mt-6 mb-8">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <pre className="whitespace-pre-wrap font-mono text-sm text-gray-200 overflow-x-auto">
                          {quizData.questions[currentQuestion].code}
                        </pre>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {quizData.questions[currentQuestion]?.options && 
                      Object.entries(quizData.questions[currentQuestion].options).map(([key, value]) => (
                        <div 
                          key={key}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            selectedAnswers[currentQuestion] === key
                              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30"
                              : "border-gray-200 dark:border-gray-700 hover:border-indigo-300"
                          }`}
                          onClick={() => handleAnswerSelect(currentQuestion, key)}
                        >
                          <div className="flex items-center">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                              selectedAnswers[currentQuestion] === key
                                ? "border-indigo-500 bg-indigo-500"
                                : "border-gray-400"
                            }`}>
                              {selectedAnswers[currentQuestion] === key && (
                                <div className="w-3 h-3 rounded-full bg-white"></div>
                              )}
                            </div>
                            <span className="text-gray-800 dark:text-gray-200">{value}</span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={handlePrevQuestion}
                    disabled={currentQuestion === 0}
                    className={`px-6 py-3 rounded-lg font-medium ${
                      currentQuestion === 0
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    Previous
                  </button>
                  
                  <button
                    onClick={handleNextQuestion}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    {currentQuestion === totalQuestions - 1
                      ? "Submit Quiz"
                      : "Next Question"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-4xl mx-auto p-4 py-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
              <div className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    Quiz Completed!
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">
                    You've successfully finished the quiz
                  </p>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-8 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-700 p-5 rounded-lg shadow">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Score</p>
                      <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
                        {score}/{totalQuestions}
                      </p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-700 p-5 rounded-lg shadow">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Percentage</p>
                      <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
                        {((score / totalQuestions) * 100).toFixed(1)}%
                      </p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-700 p-5 rounded-lg shadow">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Time Taken</p>
                      <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
                        {quizData.timeLimit ? 
                          `${quizData.timeLimit} min` : 
                          "No time limit"
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                      Performance Summary
                    </h3>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                      <div 
                        className="bg-green-500 h-4 rounded-full" 
                        style={{ width: `${(score / totalQuestions) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {score > totalQuestions * 0.7 ? 
                        "Excellent work! You've demonstrated strong knowledge." : 
                        score > totalQuestions * 0.5 ?
                        "Good effort! Review the topics to improve further." :
                        "Keep practicing! Focus on the fundamentals."
                      }
                    </p>
                    
                    <button
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow transition duration-300"
                      onClick={() => window.location.reload()}
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DailyQuiz;