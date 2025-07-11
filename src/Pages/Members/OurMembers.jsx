import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../../DataBase/firebaseConfig";
import { FaLinkedin, FaGithub, FaInstagram, FaSearch, FaChevronUp } from "react-icons/fa";
import Layout from "../../Components/Layout";

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

function OurMembers() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 6;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDB, "jobApplications"));
        const applicationsData = querySnapshot.docs.map((doc) => ({ 
          id: doc.id, 
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date()
        }));
        setApplications(applicationsData);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
      setLoading(false);
    };
    fetchApplications();
  }, []);

  // Filter applications based on search term
  const filteredApplications = applications.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (app.post && app.post.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (app.qualifications && app.qualifications.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination logic
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredApplications.slice(indexOfFirstMember, indexOfLastMember);
  const totalPages = Math.ceil(filteredApplications.length / membersPerPage);

  return (
  
     
<Layout>
<div 
        ref={containerRef}
        className="min-h-screen bg-gradient-to-b from-purple-50 to-white text-gray-900 overflow-hidden"
      >
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 rounded-full filter blur-3xl"></div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Meet Our Team
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              The passionate creators and innovators behind Soft Game Studio
            </p>
          </motion.div>
        </section>

        {/* Core Team Section */}
        <section className="py-16 px-4 relative z-10 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership</h2>
              <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white rounded-xl p-6 h-full transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-100 hover:border-indigo-100">
                    <div className="flex flex-col items-center text-center">
                      <motion.div 
                        className="relative mb-6"
                        whileHover={{ scale: 1.05 }}
                      >
                        <img
                          alt={member.name}
                          className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-md group-hover:border-indigo-100 transition-colors duration-300"
                          src={member.image}
                        />
                        <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 rounded-full ${member.accentColor}`}></div>
                      </motion.div>
                      <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                        {member.role}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {member.bio}
                      </p>
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

        {/* Team Members from Applications */}
        <section className="py-16 px-4 bg-gray-50" id="team-members">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200"
            >
              <motion.h2 
                className="text-3xl font-bold text-center mb-8 text-gray-900"
                whileInView={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                Our Talented Team
              </motion.h2>
              
              {/* Search and Filter */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="relative w-full md:w-1/2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search team members..."
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                  <div className="text-gray-600">
                    Showing {indexOfFirstMember + 1}-{Math.min(indexOfLastMember, filteredApplications.length)} of {filteredApplications.length} members
                  </div>
                </div>
              </motion.div>
              
              {loading ? (
                <motion.div 
                  className="flex justify-center py-12"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent"></div>
                </motion.div>
              ) : filteredApplications.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-12"
                >
                  <p className="text-gray-500 mb-4">
                    {searchTerm ? 'No matching team members found.' : 'No team members found. Check back later!'}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors"
                  >
                    Join Our Team
                  </motion.button>
                </motion.div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentMembers.map((app, index) => (
                      <motion.div
                        key={app.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow duration-300 border border-gray-100"
                        whileHover={{ y: -5 }}
                      >
                        <div className="flex items-start space-x-4">
                          <motion.div 
                            className="flex-shrink-0"
                            whileHover={{ rotate: 10 }}
                          >
                            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600">
                              {app.name.charAt(0)}
                            </div>
                          </motion.div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {app.name}
                            </h3>
                            <p className="text-gray-600 mt-1">
                              <span className="font-medium">Role:</span> {app.post || "Team Member"}
                            </p>
                            <p className="text-gray-600 mt-1">
                              <span className="font-medium">Skills:</span> {app.qualifications}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="flex justify-center mt-8"
                    >
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                        >
                          Previous
                        </button>
                        
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`px-4 py-2 rounded-md ${currentPage === pageNum ? 'bg-indigo-600 text-white' : 'border border-gray-300 hover:bg-gray-50'} transition-colors`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                        
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                        >
                          Next
                        </button>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </section>
      </div>
</Layout>
      
  );
}

export default OurMembers;