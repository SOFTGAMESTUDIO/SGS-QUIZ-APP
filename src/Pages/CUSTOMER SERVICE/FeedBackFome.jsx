import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { fireDB } from "../../DataBase/firebaseConfig";
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy } from "firebase/firestore";
import Layout from "../../Components/Layout";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function FeedbackSection() {
  const [formData, setFormData] = useState({
    name: "", email: "", subject: "", message: "", rating: 5
  });
  const [feedbackList, setFeedbackList] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch feedback from Firestore
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setIsLoading(true);
        const feedbackRef = collection(fireDB, "feedback");
        const q = query(feedbackRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        const feedbacks = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          feedbacks.push({
            id: doc.id,
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
            rating: data.rating,
            createdAt: data.createdAt.toDate()
          });
        });
        
        setFeedbackList(feedbacks);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setStatus("Failed to load feedback data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFeedback();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setStatus("Submitting feedback...");
      
      // Add to Firestore
      const docRef = await addDoc(collection(fireDB, "feedback"), {
        ...formData,
        createdAt: serverTimestamp()
      });
      
      setStatus("Feedback submitted successfully!");
      
      // Update local state optimistically
      const newFeedback = {
        id: docRef.id,
        ...formData,
        createdAt: new Date()
      };
      
      setFeedbackList([newFeedback, ...feedbackList]);
      setFormData({ name: "", email: "", subject: "", message: "", rating: 5 });
    } catch (error) {
      console.error("Error adding feedback:", error);
      setStatus("Failed to submit feedback");
    }
    
    // Auto-clear success message
    setTimeout(() => setStatus(""), 3000);
  };

  // Calculate statistics
  const ratingStats = [1, 2, 3, 4, 5].map((r) => 
    feedbackList.filter((f) => Math.round(f.rating) === r).length
  );
  
  const total = feedbackList.length;
  const positiveFeedbacks = feedbackList.filter(f => f.rating >= 4).length;
  const positivePercentage = total > 0 ? Math.round((positiveFeedbacks / total) * 100) : 0;
  
  const avgRating = total > 0 
    ? (feedbackList.reduce((sum, fb) => sum + fb.rating, 0) / total).toFixed(1)
    : "0.0";

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => {
          const filled = rating >= i + 1;
          const half = rating > i && rating < i + 1;
          return filled ? (
            <FaStar key={i} className="text-yellow-400 text-lg" />
          ) : half ? (
            <FaStarHalfAlt key={i} className="text-yellow-400 text-lg" />
          ) : (
            <FaRegStar key={i} className="text-gray-300 text-lg" />
          );
        })}
      </div>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-20 px-4">
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-80 mx-auto mt-4 animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center animate-pulse">
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                <div className="h-6 w-32 mt-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
          
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <div className="h-10 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
            <div className="h-80 bg-gray-200 rounded mt-6 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
 <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Share Your Experience
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-blue-100 max-w-3xl mb-8"
          >
            Help us improve by sharing your feedback
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-yellow-300">{avgRating}</div>
                <div>
                  <div className="flex gap-1">
                    {renderStars(avgRating)}
                  </div>
                  <p className="text-white mt-2">Based on {total} reviews</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-3xl font-bold text-blue-600">{total}</div>
              <h3 className="text-lg font-semibold mt-2 text-gray-700">Total Reviews</h3>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-3xl font-bold text-blue-600">{positivePercentage}%</div>
              <h3 className="text-lg font-semibold mt-2 text-gray-700">Positive Feedback</h3>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-3xl font-bold text-blue-600">{avgRating}</div>
              <h3 className="text-lg font-semibold mt-2 text-gray-700">Average Rating</h3>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Rating Chart */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Rating Distribution</h2>
            <div className="h-80">
              <Bar
                data={{
                  labels: ["1★", "2★", "3★", "4★", "5★"],
                  datasets: [{
                    label: "Ratings",
                    data: ratingStats,
                    backgroundColor: [
                      'rgba(239, 68, 68, 0.7)',
                      'rgba(249, 115, 22, 0.7)',
                      'rgba(234, 179, 8, 0.7)',
                      'rgba(101, 163, 13, 0.7)',
                      'rgba(16, 185, 129, 0.7)',
                    ],
                    borderColor: [
                      'rgb(239, 68, 68)',
                      'rgb(249, 115, 22)',
                      'rgb(234, 179, 8)',
                      'rgb(101, 163, 13)',
                      'rgb(16, 185, 129)',
                    ],
                    borderWidth: 1,
                    borderRadius: 6,
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { 
                    legend: { display: false },
                    tooltip: {
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      titleFont: { size: 14 },
                      bodyFont: { size: 14 },
                      padding: 12,
                      displayColors: false,
                      callbacks: {
                        label: function(context) {
                          return `${context.parsed.y} reviews`;
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { 
                        stepSize: 1,
                        color: '#6B7280',
                        font: { size: 12 }
                      },
                      grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                      }
                    },
                    x: {
                      ticks: { 
                        color: '#6B7280',
                        font: { size: 12, weight: 'bold' }
                      },
                      grid: {
                        display: false
                      }
                    }
                  }
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Feedback Form */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-blue-600">Share Your Feedback</h2>
              <p className="text-gray-600 mt-2">
                We value your opinion and use it to improve our services
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
                    Your Name
                  </label>
                  <input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                    Email Address
                  </label>
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-1 font-medium text-gray-700">
                  Subject
                </label>
                <input 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-1 font-medium text-gray-700">
                  Your Feedback
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  value={formData.message} 
                  onChange={handleChange} 
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  How would you rate us?
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="text-xl focus:outline-none"
                    >
                      {star <= formData.rating ? (
                        <FaStar className="text-yellow-400" />
                      ) : (
                        <FaRegStar className="text-gray-300" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors"
              >
                Submit Feedback
              </button>
              
              {status && (
                <div className={`text-center py-2 rounded-lg ${status.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {status}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Customer Testimonials</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Hear what our users have to say about their experience
            </p>
          </div>
          
          {feedbackList.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-700">No feedback yet</h3>
              <p className="text-gray-500 mt-2">Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {feedbackList.map((fb, index) => (
                <motion.div
                  key={fb.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-800">{fb.name}</h3>
                        <p className="text-sm text-gray-500">{fb.email}</p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {fb.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="mt-3">
                      {renderStars(fb.rating)}
                    </div>
                    
                    <h4 className="font-semibold text-gray-800 mt-3">{fb.subject}</h4>
                    <p className="text-gray-600 mt-2 text-sm">{fb.message}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </Layout>
   
  );
}