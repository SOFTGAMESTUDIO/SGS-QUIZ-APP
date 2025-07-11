import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Layout from "../../../Components/Layout";
import Certificate from "../../../Components/Certificate/Certificate";
import { fireDB } from "../../../DataBase/firebaseConfig";
import { getUserData } from "../../../Modules/UserData";

const QuizExam = () => {
  const { id: quizId } = useParams();
  const [date, setDate] = useState("");
  const [step, setStep] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false);
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [filteredUser, setFilteredUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState(null);
  const [userList, setUserList] = useState([]);
  const userid = JSON.parse(localStorage.getItem("user"))?.email;
  const [score, setScore] = useState(0);
  const [Que, setQue] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      const allUsers = await getUserData();
      setUserList(allUsers);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (Array.isArray(userList) && userList.length > 0 && userid) {
      const matchedUser = userList.find(
        (user) => user.email?.toLowerCase() === userid?.toLowerCase()
      );
      setFilteredUser(matchedUser || {});
    }
    setLoading(false);
  }, [userList, userid]);

  useEffect(() => {
    setDate(new Date().toLocaleDateString());
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (step === 1 && !isAlreadySubmitted) handleSubmit();
    };
    const handleBeforeUnload = (e) => {
      if (step === 2 && !isAlreadySubmitted) {
        e.preventDefault();
        handleSubmit();
        e.returnValue = "";
      }
    };
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [step, isAlreadySubmitted]);

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleCopyCutPaste = (e) => e.preventDefault();
    const blockPrintScreen = (e) => {
      if (e.key === "PrintScreen") {
        navigator.clipboard.writeText("Screenshot is disabled.");
        alert("Screenshots are disabled.");
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopyCutPaste);
    document.addEventListener("cut", handleCopyCutPaste);
    document.addEventListener("paste", handleCopyCutPaste);
    window.addEventListener("keyup", blockPrintScreen);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopyCutPaste);
      document.removeEventListener("cut", handleCopyCutPaste);
      document.removeEventListener("paste", handleCopyCutPaste);
      window.removeEventListener("keyup", blockPrintScreen);
    };
  }, []);


const useExamKeyLock = (enableLock = true) => {
  const attemptCount = useRef(0);
  useEffect(() => {
    if (!enableLock) return;

    const handleCheatingAttempt = (keyCombination = '') => {
      attemptCount.current += 1;
      
      if (attemptCount.current < 3) {
        // Show warning toast for first 3 attempts
        toast.warning(
          `Warning ${attemptCount.current}/3: ${keyCombination} is not allowed.`,
          { autoClose: 3000 }
        );
      } else if (attemptCount.current === 3) {
        // Final warning
        toast.error(
          `Final Warning! Next violation will disqualify you.`,
          { autoClose: 4000 }
        );
      } else {
        // 4th attempt - disqualify
        disqualifyUser(`Used forbidden key combination: ${keyCombination}`);
      }
      
      return attemptCount.current;
    };

    const handleKeyDown = (e) => {
      // Block all modifier key combinations
      if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) {
         handleCheatingAttempt(modifiers.join('+'));
        e.preventDefault();
        return;
      }

      // Block specific keys
      const blockedKeys = [
        'Tab', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 
        'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
        'Escape', 'PrintScreen', 'Insert', 'Delete',
        'Home', 'End', 'PageUp', 'PageDown',
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'
      ];

      if (blockedKeys.includes(e.key)) {
         handleCheatingAttempt(modifiers.join('+'));
        e.preventDefault();
        return;
      }

      // Special case for Alt+Tab (Windows) and Command+Tab (Mac)
      if ((e.key === 'Tab' && e.altKey) || (e.key === 'Tab' && e.metaKey)) {
         handleCheatingAttempt(modifiers.join('+'));
        e.preventDefault();
        return;
      }


    };

    useExamKeyLock(step === 1);

    // Block right click context menu
    const handleContextMenu = (e) => e.preventDefault();

    // Block copy/paste
    const handleCopyPaste = (e) => e.preventDefault();

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopyPaste);
    document.addEventListener('cut', handleCopyPaste);
    document.addEventListener('paste', handleCopyPaste);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopyPaste);
      document.removeEventListener('cut', handleCopyPaste);
      document.removeEventListener('paste', handleCopyPaste);
    };
  }, [enableLock]);
};

  const handleDisqualification = async () => {
    if (!filteredUser?.uid || !quizData) return;
    try {
      await addDoc(collection(fireDB, "user_Quiz"), {
        quizId,
        uid: filteredUser.uid,
        email: filteredUser.email,
        name: filteredUser.name,
        rollNumber: filteredUser.rollNumber,
        language: quizData.language,
        timestamp: new Date(),
        disqualified: true,
        reason: "Cheating - switched tab",
      });
      toast.error("Disqualified for switching tabs.");
      window.location.href = "/";
    } catch (err) {
      console.error("Disqualification error:", err);
      toast.error("Failed to save disqualification.");
    }
  };

  const handleVisibilityChange = () => {
    if (document.hidden && step === 1 && !isAlreadySubmitted) {
      handleDisqualification();
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [step, isAlreadySubmitted, filteredUser, quizData]);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId) {
        toast.error("Quiz ID missing.");
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(fireDB, "quizzes", quizId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setQuizData(docSnap.data());
        else toast.error("Quiz not found.");
      } catch (err) {
        console.error("Quiz fetch error:", err);
        toast.error("Failed to load quiz.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    const checkSubmission = async () => {
      if (!filteredUser?.uid || !quizData) return;
      try {
        const q = query(
          collection(fireDB, "user_Quiz"),
          where("uid", "==", filteredUser.uid),
          where("quizId", "==", quizId)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setIsAlreadySubmitted(true);
          const docData = querySnapshot.docs[0].data();
          if (docData?.disqualified) {
            setIsDisqualified(true);
            console.warn("Disqualified:", docData?.reason);
          }
          setScore(docData.score || 0);
          setQue(docData.NoQuestion || 0);
        }
      } catch (err) {
        console.error("Check submission error:", err);
      }
    };
    checkSubmission();
  }, [filteredUser, quizData, quizId]);

  const handleRadioChange = (index, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [index]: option }));
  };

  const handleNext = () => {
    if (!quizData) return;
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion((prev) => prev - 1);
  };

 const handleSubmit = async () => {
  if (isAlreadySubmitted) return; // ✅ prevent double submission

  if (!filteredUser?.uid) {
    toast.error("User not authenticated.");
    return;
  }

  if (!quizData) {
    toast.error("Quiz not loaded.");
    return;
  }

  let correctCount = 0;
  quizData.questions.forEach((q, i) => {
    if (selectedAnswers[i] === q.correctAnswer) correctCount++;
  });

  const NoQuestion = quizData.questions.length;

  try {
    await addDoc(collection(fireDB, "user_Quiz"), {
      quizId,
      language: quizData.language,
      uid: filteredUser.uid,
      email: filteredUser.email,
      name: filteredUser.name,
      rollNumber: filteredUser.rollNumber,
      timestamp: new Date(),
      score: correctCount,
      NoQuestion,
    });

    // ✅ Set this so submission happens only once
    setIsAlreadySubmitted(true); 
    setScore(correctCount);
    setQue(NoQuestion);
    toast.success("Quiz submitted!");
    setStep(2);
  } catch (err) {
    console.error("Submit error:", err);
    toast.error("Submission failed.");
  }
};


  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (!quizData) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-4">
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-center">
            Quiz data not available.
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
       
      {step === 0 && (
   <Layout>
 <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 md:p-8 transition-all duration-200">
              <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
                {quizData.name} Quiz
              </h1>
              
              <div className="text-center mb-8">
                <p className="text-gray-600 dark:text-gray-300">
                  Welcome,{" "}
                  <span className="font-medium text-gray-900 dark:text-white">
                    {filteredUser?.name || "User"}
                  </span>
                </p>
              </div>

              {isAlreadySubmitted ? (
                isDisqualified ? (
                  <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-center mb-6">
                    Disqualified. Reason: <em>Cheating - switched tab</em>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="bg-green-100 dark:bg-green-900/20 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg text-center">
                      You have already completed this exam.
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-inner">
                      <Certificate
                        name={filteredUser.name}
                        rollNumber={filteredUser.rollNumber}
                        examName={quizData.name}
                        date={date}
                        language={quizData.language}
                        score={score}
                        Que={Que}
                      />
                    </div>
                  </div>
                )
              ) : (
                <div className="space-y-6">
                  <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-400 dark:border-yellow-600 text-yellow-700 dark:text-yellow-300 p-4 rounded-lg">
                    <h2 className="text-xl font-bold text-center mb-2">Important Note</h2>
                    <p className="text-center font-medium">(Read Before Starting the Quiz)</p>
                  </div>

                  <div 
                    className="prose dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                    dangerouslySetInnerHTML={{ __html: quizData.description }}
                  />

                  <div className="flex justify-center pt-4">
                    <button
                      onClick={() => setStep(1)}
                      className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 px-6 py-3 rounded-lg text-white font-semibold shadow-md transition-colors duration-200"
                    >
                      Start Quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
   </Layout>
         

      )}

      {step === 1 && (
        <div className="max-w-4xl mx-auto p-4 md:p-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 transition-all duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Question {currentQuestion + 1} of {quizData.questions.length}
              </h2>
              <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                {quizData.language}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  {quizData.questions[currentQuestion]?.question}
                </h3>

                {quizData.questions[currentQuestion]?.code && (
                  <div className="mt-4 mb-6">
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">
                        Code for this question:
                      </h4>
                      <pre className="whitespace-pre-wrap bg-gray-900 rounded-md p-3 font-mono text-sm text-gray-200 overflow-x-auto">
                        {quizData.questions[currentQuestion].code}
                      </pre>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {quizData.questions[currentQuestion]?.options ? (
                    Object.entries(
                      quizData.questions[currentQuestion].options
                    ).map(([key, value]) => (
                      <label
                        key={key}
                        className={`flex items-start gap-3 p-4 rounded-lg cursor-pointer border transition ${
                          selectedAnswers[currentQuestion] === key
                            ? "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-600"
                            : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion}`}
                          value={key}
                          checked={selectedAnswers[currentQuestion] === key}
                          onChange={() =>
                            handleRadioChange(currentQuestion, key)
                          }
                          className="mt-1 accent-blue-600 w-5 h-5"
                        />
                        <span className="text-gray-800 dark:text-gray-200">{value}</span>
                      </label>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                      No options available for this question.
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className={`px-5 py-2.5 rounded-md font-medium ${
                    currentQuestion === 0
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-5 py-2.5 rounded-md font-medium transition-colors duration-200"
                >
                  {currentQuestion === quizData.questions.length - 1
                    ? "Submit Quiz"
                    : "Next Question"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <Layout>
          <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 md:p-8 transition-all duration-200">
              <div className="text-center space-y-6">
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">
                    Congratulations!
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    You have successfully completed the quiz.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
                  <Certificate
                    name={filteredUser.name}
                    rollNumber={filteredUser.rollNumber}
                    examName={quizData.name}
                    date={date}
                    language={quizData.language}
                    score={score}
                    Que={Que}
                  />
                </div>

                <div className="pt-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-3 rounded-lg inline-block">
                    <p className="font-medium">
                      Score: {score} out of {Que}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </div>


  );
};

export default QuizExam;