import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import UserSignup from "./Pages/Registraction/UserSignup";
import UserLogin from "./Pages/Registraction/UserLogin";
import UserResetPasswordPage from "./Pages/Registraction/UserResetPasword";
import NotFoundPage from "./Pages/NoPage/NoPage";
import NavigationBar from "./Pages/NavbarMenu";
import CopyrightPage from "./Pages/CopyrightPage/CopyrightPage";
import PrivacyPolicy from "./Pages/CUSTOMER SERVICE/PrivacyPolicy";
import ContactPage from "./Pages/CUSTOMER SERVICE/Contact_Us";
import TermsAndConditions from "./Pages/CUSTOMER SERVICE/TermsAndConditions";
import AboutUs from "./Pages/CUSTOMER SERVICE/About";
import FeedbackSection from "./Pages/CUSTOMER SERVICE/FeedBackFome";
import FAQPage from "./Pages/CUSTOMER SERVICE/FAQs";
import CookiesPolicy from "./Pages/CUSTOMER SERVICE/CookiesPolicy";

import { StatusBar, Style } from '@capacitor/status-bar';
import ExamQuizDetails from "./Pages/QuizFree/EXAM CONTROLER/ExamDetails";
import QuizExam from "./Pages/QuizFree/EXAM CONTROLER/QuizExam";

import ExamQuizDetailsOfficial from "./Pages/Quiz/EXAM CONTROLER/ExamDetails";
import QuizExamOfficial from "./Pages/Quiz/EXAM CONTROLER/QuizExam";
import { Capacitor } from '@capacitor/core';
import {checkStoragePermission } from './deviceUtils';
import OurMembers from "./Pages/Members/OurMembers";
import ResultsPage from "./Pages/Result/Result";
import DailyQuiz from "./Pages/DailyQuiz/DailyQuiz";
import DailyQuizList from "./Pages/DailyQuiz/DailyQuizList";
import DailyResultsPage from "./Pages/Result/DailyResult";



StatusBar.setBackgroundColor({ color: '#000' }); // white background
StatusBar.setStyle({ style: Style.Light }); // dark text for light background






function App() {
  useEffect(() => {
    const initializeApp = async () => {
      if (Capacitor.isNativePlatform()) {
        await checkStoragePermission();
      }
    };
    
    initializeApp();
  }, []);

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >

      <useBackButton/>

      <ScrollToTop />
      <Routes>
        <Route path="/quiz" element={<NavigationBar />} />
        <Route path="/account" element={<NavigationBar />} />
        <Route path="/about" element={<NavigationBar />} />


        <Route path="/SignUp" element={<UserSignup />} />
        <Route path="/Login" element={<UserLogin />} />
        <Route path="/ResetPassword" element={<UserResetPasswordPage />} />

        <Route path="/CopyrightPage" element={<CopyrightPage/>} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>} />
        <Route path="/ContactUs" element={<ContactPage/>} />
        <Route path="/TermsAndConditions" element={<TermsAndConditions/>} />
        <Route path="/AboutUS" element={<AboutUs/>} />
        <Route path="/Feedback" element={<FeedbackSection/>} />
        <Route path="/FAQs" element={<FAQPage />} />
        <Route path="/CookiesPolicy" element={<CookiesPolicy/>} />
        <Route path="/OurMembers" element={<OurMembers/>} />



         {/* Exam Routes free */}
         <Route path="/ExamFree-Quiz-Details/:id" element={<ExamQuizDetails/>} />
         <Route path="/SGS-Quiz-Open/:id" element={<QuizExam/>} />

          {/* Exam Routes */}
         <Route path="/Exam-Quiz-Details/:id" element={<ExamQuizDetailsOfficial/>} />
         <Route path="/SGS-Quiz/:id" element={<QuizExamOfficial/>} />
         <Route path="/SGS-Quiz-Result" element={<ResultsPage/>} />

        {/* Daily Quiz */}
        <Route path="/DailyQuiz" element={<DailyQuizList/>} />
        <Route path="/DailyQuiz/:id" element={<DailyQuiz/>} />
        <Route path="/SGS-DailyQuiz-Result" element={<DailyResultsPage/>} />
        
        {/* Add redirect for root path */}
        <Route path="/" element={<NavigationBar/>} />
        
        {/* Add 404 fallback */}
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </Router>
  );
}

export default App;

// Protected routes
export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/Login" replace />;
};

export const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));
  return admin?.email === import.meta.env.VITE__ADMIN_EMAIL_SGS 
    ? children 
    : <Navigate to="/Login" replace />;
};