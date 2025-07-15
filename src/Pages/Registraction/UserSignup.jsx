import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../DataBase/firebaseConfig";
import { addUserToFirestore } from "../../Modules/signupHandler";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout";

export default function UserSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setIsLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      await addUserToFirestore(userCredential.user, formData);
      
      // Show success message before redirecting
      setIsLoading(false);
      navigate("/login", { 
        state: { 
          successMessage: "Account created successfully! Please log in." 
        } 
      });
      
    } catch (error) {
      console.error("Signup failed:", error);
      setError(getErrorMessage(error.code));
      setIsLoading(false);
    }
  };

  // Convert Firebase error codes to user-friendly messages
  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already registered. Please log in.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/network-request-failed":
        return "Network error. Please check your connection.";
      default:
        return "Signup failed. Please try again.";
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-purple-100 flex items-center justify-center p-4">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-sm w-full mx-4">
              <div className="flex justify-center mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Creating Your Account
              </h3>
              <p className="text-gray-600">
                Please wait while we set up your account...
              </p>
            </div>
          </div>
        )}

        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8 relative z-10">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-purple-800 mb-2">
              Welcome to Soft Game Studio
            </h1>
            <p className="text-gray-600">
              Secure access to your creative journey
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailSignup} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-gray-700 mb-2 font-medium"
                >
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-gray-700 mb-2 font-medium"
                >
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 mb-2 font-medium"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="user123@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 mb-2 font-medium"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-gray-700 mb-2 font-medium"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="9999999999"
                value={formData.phone}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                title="Please enter a 10-digit phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-medium transition duration-300 flex items-center justify-center ${
                isLoading
                  ? "bg-purple-400 cursor-not-allowed"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-purple-600 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}