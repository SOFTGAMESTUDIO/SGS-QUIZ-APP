import React from 'react';
import { FaCode, FaGraduationCap, FaLightbulb, FaLaptopCode, FaRocket } from 'react-icons/fa';
import Layout from '../../Components/Layout';

export default function AboutUs() {
  return (
   <Layout>
<div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
          Welcome to Soft Game Studio
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10">
          Join us on our journey as we innovate, inspire, and create exceptional digital experiences for the gamers of tomorrow.
        </p>
        <div className="w-24 h-1 bg-purple-500 mx-auto mb-16"></div>
      </section>

      {/* About Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-purple-700 flex items-center">
              <FaCode className="mr-3" /> About Us
            </h2>
            <p className="text-gray-700 mb-6">
              Welcome to <span className="font-semibold text-purple-600">Soft Game Studio</span> — your go-to platform for everything programming!
            </p>
            <p className="text-gray-700 mb-6">
              Founded with a deep passion for education, development, and innovation, we are dedicated to empowering students, developers, and tech enthusiasts by offering a growing collection of high-quality programming resources.
            </p>
            <p className="text-gray-700 mb-6">
              Whether you're a beginner just starting out or an advanced learner preparing for exams or interviews, we're here to support your journey.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-purple-100">
            <h3 className="text-xl font-semibold mb-4 text-purple-700">We specialize in:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2 mt-1">📚</span>
                <span>Detailed notes on programming languages like C, C++, Python, Java, JavaScript, and more</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2 mt-1">💡</span>
                <span>Source code for both short programs and long-form projects</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2 mt-1">🛠️</span>
                <span>Practical projects and mini-apps aligned with real academic syllabi</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2 mt-1">🎓</span>
                <span>Exam-focused content and concept breakdowns</span>
              </li>
            </ul>
            <p className="mt-6 text-gray-700 font-medium">
              Our goal is to make programming simple, structured, and student-friendly.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 flex items-center justify-center">
              <FaLightbulb className="mr-3" /> Our Mission
            </h2>
            <p className="mb-6">
              At Soft Game Studio, our mission is rooted in the belief that education should be accessible, practical, and inspiring. We understand the challenges students and self-learners face when diving into the world of programming — from confusing syntax to overwhelming concepts.
            </p>
            <p className="mb-6">
              Through our curated notes, real-world examples, and hands-on coding projects, we aim to build a foundation that not only helps learners pass exams but also prepares them to solve real-world problems.
            </p>
            <p>
              Our long-term mission is to create a space where learning to code doesn't feel like a task — it feels like a journey worth taking.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-purple-700">
          <FaGraduationCap className="inline mr-3" /> What We Offer
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: '📘',
              title: 'Programming Language Notes',
              desc: 'Clear and concise notes covering fundamentals and advanced concepts in C, C++, Java, Python, JavaScript, and more.'
            },
            {
              icon: '💻',
              title: 'Source Code',
              desc: 'Access a wide range of tested short and long programs with complete source code to boost your coding confidence.'
            },
            {
              icon: '🛠️',
              title: 'Projects',
              desc: 'Build real-world short and long projects ideal for college assignments, portfolios, and self-learning.'
            },
            {
              icon: '🎥',
              title: 'Video Lectures',
              desc: 'Learn by watching! Our video tutorials break down complex topics and walk you through live coding sessions.'
            },
            {
              icon: '🔗',
              title: 'Examples & Links',
              desc: 'Practice through real examples and curated external resources that help deepen your understanding.'
            },
            {
              icon: '🏆',
              title: 'Competitions & Quizzes',
              desc: 'Take part in our online/offline coding competitions and quiz contests to test and prove your skills.'
            }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-purple-50 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-purple-700">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-purple-700 flex items-center">
              <FaRocket className="mr-3" /> Our Vision
            </h2>
            <p className="text-gray-700 mb-6">
              At Soft Game Studio, we envision a future where learning to code is not a privilege but a basic right. We believe that every student should have access to high-quality programming education that empowers them to shape their own digital future.
            </p>
            <p className="text-gray-700 mb-6">
              In a world increasingly driven by technology, we recognize the growing gap between theoretical knowledge and practical skills. Our vision is to close this gap by offering a platform that not only teaches but also inspires, guides, and motivates learners to build and innovate.
            </p>
            <p className="text-gray-700">
              We look ahead to a world where our content helps build the next generation of software engineers, tech entrepreneurs, and problem-solvers. Our vision is simple yet powerful — to democratize coding education and make it so engaging that learners don't just understand the code — they live it.
            </p>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 md:p-12 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 flex items-center justify-center">
            <FaLaptopCode className="mr-3" /> Join Us
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Whether you're a beginner just starting your programming journey or an experienced developer eager to sharpen your skills, Soft Game Studio is here to support you every step of the way.
          </p>
          <button className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
   </Layout>
    
  );
}