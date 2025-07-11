import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, providerGoogle } from "../../DataBase/firebaseConfig";
import { addUserToFirestore } from "../../Modules/signupHandler";

export default function UserSignup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await addUserToFirestore(userCredential.user, formData);
      navigate("/Login");
    } catch (error) {
      console.error("Email signup failed:", error.message);
    }
  };

  const handleSocialSignup = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const nameParts = result.user.displayName?.split(" ") || ["", ""];
      const socialData = {
        firstName: nameParts[0],
        lastName: nameParts[1],
        email: result.user.email,
        phone: "",
      };
      await addUserToFirestore(result.user, socialData);
      navigate("/login");
    } catch (error) {
      console.error("Social signup error:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-purple-800 mb-2">
            Welcome to Soft Game Studio
          </h1>
          <p className="text-gray-600">
            Secure access to your creative journey
          </p>
        </div>

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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition duration-300"
          >
            Sign Up
          </button>

          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button
            type="button"
            onClick={() => handleSocialSignup(providerGoogle)}
            className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign up with Google
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already registered?{" "}
          <Link
            to="/Login"
            className="text-purple-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}