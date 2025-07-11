import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock, FaPaperPlane } from "react-icons/fa";
import Layout from "../../Components/Layout";

const ContactPage = () => {
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_API;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const SERVICE_ID = import.meta.env.VITE__EMAILJS_SERVICEID_SGS;
    const TEMPLATE_ID = import.meta.env.VITE__EMAILJS_TEMPLATEID_SGS;
    const PUBLIC_KEY = import.meta.env.VITE__EMAILJS_PUBLICKEY_SGS;

    emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch((err) => {
        console.error('FAILED...', err);
        setStatus("Failed to send message. Please try again later.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Layout>
 <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white overflow-hidden">
      {/* Main Content */}
      <section className="relative z-10 text-gray-900 px-4 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Contact Us
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-700">
              Have questions or want to work together? Reach out to our team and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Contact Info */}
            <div className="lg:w-1/2 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Get in Touch</h2>
                <p className="text-gray-700">
                  We'd love to hear from you. Fill out the form or use the details below.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100 space-y-6">
                <div className="flex items-start space-x-4">
                  <FaMapMarkerAlt className="text-purple-600 text-xl mt-1" />
                  <div>
                    <p className="font-semibold text-purple-700">Address:</p>
                    <p>House No. 574, Street No. 5, Nai Abadi, Abohar, Punjab 152116</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <FaEnvelope className="text-purple-600 text-xl mt-1" />
                  <div>
                    <p className="font-semibold text-purple-700">Email:</p>
                    <a
                      href="mailto:team.softgamestudio@gmail.com"
                      className="text-indigo-600 hover:underline"
                    >
                      team.softgamestudio@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <FaPhone className="text-purple-600 text-xl mt-1" />
                  <div>
                    <p className="font-semibold text-purple-700">Phone:</p>
                    <p>+91 No Available</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <FaClock className="text-purple-600 text-xl mt-1" />
                  <div>
                    <p className="font-semibold text-purple-700">Service Time:</p>
                    <p>Monday – Saturday, 9:00 AM – 5:00 PM</p>
                  </div>
                </div>

                <div className="pt-4">
                  <iframe
                    title="Soft Game Studio Location"
                    width="100%"
                    height="300"
                    style={{ border: 0, borderRadius: "12px" }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=Soft+Game+Studio`}
                  />
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:w-1/2">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-purple-100">
                <h3 className="text-2xl font-semibold mb-6">Send us a message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 font-medium text-gray-800"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className="w-full p-3 rounded-xl bg-purple-50 border border-purple-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 font-medium text-gray-800"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full p-3 rounded-xl bg-purple-50 border border-purple-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block mb-2 font-medium text-gray-800"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      required
                      className="w-full p-3 rounded-xl bg-purple-50 border border-purple-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-2 font-medium text-gray-800"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your message here..."
                      className="w-full p-3 rounded-xl bg-purple-50 border border-purple-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 px-6 rounded-xl font-medium transition-all flex items-center justify-center ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
                      }`}
                    >
                      {isSubmitting ? (
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
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>

                  {status && (
                    <div
                      className={`text-center p-3 rounded-xl ${
                        status.includes("successfully")
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {status}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-purple-200 blur-3xl opacity-30"></div>
        <div className="absolute bottom-40 right-20 w-64 h-64 rounded-full bg-indigo-200 blur-3xl opacity-20"></div>
      </div>
    </div>
    </Layout>
   
  );
};

export default ContactPage;