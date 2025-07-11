import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaLinkedin, FaGithub, FaInstagram, FaArrowLeft } from "react-icons/fa";

 const teamMembers = [
  {
    name: "LIVESH KUMAR GARG",
    role: "SENIOR DEVELOPER & FOUNDER",
    bio: "I am a BCA student with expertise in Python, HTML, CSS, JavaScript, React JS, Data Structures & Algorithms (DSA), SQL, Firebase, Unity, and Unreal Engine. I am passionate about exploring new technologies and building innovative projects.",
    image: "https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/DEVLOPERS%2FSnapchat-467264900.jpg?alt=media&token=a1f217d0-2444-47d1-8e40-7d69b43a970d",
    accentColor: "bg-pink-500",
    skills: ["Python", "React", "Firebase", "Unity"],
    social: {
      linkedin: "https://www.linkedin.com/in/Livesh-Kumar-Garg",
      github: "https://github.com/SOFTGAMESTUDIO",
      instagram: "https://www.instagram.com/liveshkumargarg/",
    }
  },
  {
    name: "JATIN DUA",
    role: "JUNIOR DEVELOPER",
    bio: "I am a B Tech CSBS (Computer Science) student with proficiency in C, C++, Data Structures & Algorithms (DSA), HTML, CSS, JavaScript, and Python. I am eager to expand my knowledge and apply my skills to real-world projects.",
    image: "https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/DEVLOPERS%2FSnapchat-471840155.jpg?alt=media&token=af7951a2-e956-4531-804f-ec448f914083",
    accentColor: "bg-blue-500",
    skills: ["C++", "DSA", "JavaScript", "Python"],
    social: {
      linkedin: "https://www.linkedin.com/in/jatin-2a-kumar-/",
      github: "",
      instagram: "https://www.instagram.com/jatinkumar.dua/",
    }
  },
  {
    name: "SHARIK HASAN",
    role: "JUNIOR DEVELOPER",
    bio: "I am a B Tech CSE student with expertise in C, HTML, CSS, JavaScript, and Firebase database. I am focused on enhancing my skills and working on practical projects to further my knowledge in computer science.",
    image: "https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/DEVLOPERS%2F467048382_429449520023246_5293710440583554823_n.jpeg?alt=media&token=c4cacfe1-bea3-43a6-848e-8b5e852e41a1",
    accentColor: "bg-purple-500",
    skills: ["C", "JavaScript", "Firebase", "HTML/CSS"],
    social: {
      linkedin: "www.linkedin.com/in/sharik-hasan",
      github: "https://github.com/0xSharik",
      instagram: "https://www.instagram.com/samar_pb15/",
    }
  }
];

const SocialIcon = ({ platform, url }) => {
  if (!url) return null;

  const IconComponent = {
    linkedin: FaLinkedin,
    github: FaGithub,
    instagram: FaInstagram
  }[platform];

  return (
    <motion.a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-indigo-600 transition-colors"
      whileHover={{ y: -2 }}
    >
      <IconComponent className="w-5 h-5" />
    </motion.a>
  );
};

const AboutUsPage = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  const sections = [
    {
      id: "about-sgs",
      title: "About Soft Game Studio",
      route: "/AboutUS"
    },
    {
      id: "policies",
      title: "Policies",
      buttons: [
        { title: "Privacy Policy", route: "/PrivacyPolicy" },
        { title: "Terms & Conditions", route: "/TermsAndConditions" },
        { title: "Cookies Policy", route: "/CookiesPolicy" },
        { title: "Copyright", route: "/CopyrightPage" }
      ]
    },
    {
      id: "support",
      title: "Support",
      buttons: [
        { title: "Contact Us", route: "/ContactUs" },
        { title: "FAQs", route: "/FAQs" },
        { title: "Feedback", route: "/Feedback" }
      ]
    },
  ];

 

  const openModal = (content, title) => {
    setModalContent(content);
    setModalTitle(title);
    setActiveModal(true);
  };

  const closeModal = () => {
    setActiveModal(false);
    setTimeout(() => {
      setModalContent(null);
      setModalTitle("");
    }, 300);
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
     

      {/* Main Content */}
      <main className="pt-20 pb-12"> {/* pt-20 to account for fixed header */}
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              About Our Studio
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-700">
              Creating amazing gaming experiences through innovation and passion
            </p>
          </motion.div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {sections.map((section) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100"
              >
                <h2 className="text-2xl font-semibold mb-4 text-purple-700">
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.buttons?.map((button) => (
                    <button
                      key={button.route}
                      onClick={() => handleNavigation(button.route)}
                      className="w-full py-3 px-4 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-lg transition-all text-left"
                    >
                      {button.title}
                    </button>
                  ))}
                  {!section.buttons && (
                    <button
                      onClick={() => handleNavigation(section.route)}
                      className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all"
                    >
                      Learn More
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Team Section */}
          <section className="py-12 bg-white rounded-2xl shadow-sm">
            <div className="container mx-auto px-4">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
                <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="bg-white rounded-xl p-6 h-full transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-100">
                      <div className="flex flex-col items-center text-center">
                        <motion.div whileHover={{ scale: 1.05 }} className="relative mb-6">
                          <img
                            alt={member.name}
                            className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-md"
                            src={member.image}
                          />
                          <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 rounded-full ${member.accentColor}`}></div>
                        </motion.div>
                        <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                          {member.role}
                        </h3>
                        <p className="text-gray-600 mb-4">{member.bio}</p>
                        <div className={`w-16 h-1 rounded-full ${member.accentColor} mb-4`}></div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {member.name}
                        </h2>
                        <div className="flex flex-wrap justify-center mt-4 gap-2">
                          {member.skills.map((skill) => (
                            <motion.span 
                              key={skill}
                              className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                              whileHover={{ scale: 1.1 }}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                        <div className="flex justify-center mt-6 space-x-4">
                          {Object.entries(member.social).map(([platform, url]) => (
                            <SocialIcon key={platform} platform={platform} url={url} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </section>
      </main>

      
    </div>
  );
};

export default AboutUsPage;