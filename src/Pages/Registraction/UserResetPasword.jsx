import React, { useState } from "react";
import { sendResetPasswordEmail } from "../../Modules/SetNewPassword";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function UserResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required!");

    setLoading(true);
    try {
      await sendResetPasswordEmail(email);
      setEmailSent(true);
      toast.success("Reset email sent! Check your inbox.");
    } catch (error) {
      toast.error("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-purple-800 mb-2">
            Forgot Password?
          </h1>
          <p className="text-gray-600">
            Enter your email to receive a reset link
          </p>
        </div>

        <form onSubmit={handleSendEmail} className="space-y-5">
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
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={emailSent}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading || emailSent}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition duration-300 ${
              loading || emailSent
                ? 'bg-purple-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {loading
              ? "Sending..."
              : emailSent
              ? "Email Sent ✓"
              : "Send Reset Email"}
          </button>

          {emailSent && (
            <p className="text-sm text-green-600 text-center p-3 bg-green-50 rounded-lg">
              Email sent! Please check your inbox. Didn't get it? 
              <button 
                type="button"
                onClick={handleSendEmail}
                className="text-purple-600 hover:underline font-medium ml-1"
              >
                Resend now
              </button>
            </p>
          )}
        </form>

        <p className="text-center text-gray-600 mt-6">
          Remember your password?{" "}
          <Link
            to="/Login"
            className="text-purple-600 hover:underline font-medium"
          >
            Go back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}