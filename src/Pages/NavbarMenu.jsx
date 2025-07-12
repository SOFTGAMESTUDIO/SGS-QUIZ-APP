import { useState, useEffect } from 'react';
import { FaHome, FaQuestionCircle, FaUser, FaInfoCircle, FaBars, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfilePage from './Profile/Profile';
import AboutUsPage from './Aboutus';
import QuizList from './Quiz';
import { getUserData } from '../Modules/UserData';
import HomePage from './Home';

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab based on current route
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.startsWith('/quiz')) return 'quiz';
    if (path.startsWith('/account')) return 'account';
    if (path.startsWith('/about')) return 'about';
    return 'home';
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  // Update active tab when route changes
  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    switch(tab) {
      case 'home':
        navigate('/');
        break;
      case 'quiz':
        navigate('/quiz');
        break;
      case 'account':
        navigate('/account');
        break;
      case 'about':
        navigate('/about');
        break;
      default:
        navigate('/');
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return <HomePage/>;
      case 'quiz':
        return <QuizList/>;
      case 'account':
        return <ProfilePage/>;
      case 'about':
        return <AboutUsPage/>;
      default:
        return <HomePage/>;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate('/login');
  };
  const login = () => {
    navigate('/login');
  };


  const userid = JSON.parse(localStorage.getItem("user"))?.email;
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredUser, setFilteredUser] = useState({});

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
    

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navigation Bar */}
      <div className="bg-purple-100 shadow-md z-50">
        <div className="flex items-end justify-between px-4 py-1 m-2 h-16">
          <button 
            onClick={toggleMenu}
            className="text-purple-800 p-2 rounded-full hover:bg-purple-200"
          >
            <FaBars className="text-xl" />
          </button>
          
          <h1 className="text-xl font-bold text-purple-800">SGS Quiz</h1>
          
          <div className="w-8"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-16">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-purple-100 shadow-md z-50">
        <div className="flex justify-around items-center h-16">
          <button 
            onClick={() => handleTabChange('home')}
            className={`flex-1 flex flex-col items-center ${activeTab === 'home' ? 'text-purple-600' : 'text-purple-800'}`}
          >
            <FaHome className="text-xl" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button 
            onClick={() => handleTabChange('quiz')}
            className={`flex-1 flex flex-col items-center ${activeTab === 'quiz' ? 'text-purple-600' : 'text-purple-800'}`}
          >
            <FaQuestionCircle className="text-xl" />
            <span className="text-xs mt-1">Quiz</span>
          </button>
          <button 
            onClick={() => handleTabChange('account')}
            className={`flex-1 flex flex-col items-center ${activeTab === 'account' ? 'text-purple-600' : 'text-purple-800'}`}
          >
            <FaUser className="text-xl" />
            <span className="text-xs mt-1">Account</span>
          </button>
          <button 
            onClick={() => handleTabChange('about')}
            className={`flex-1 flex flex-col items-center ${activeTab === 'about' ? 'text-purple-600' : 'text-purple-800'}`}
          >
            <FaInfoCircle className="text-xl" />
            <span className="text-xs mt-1">About Us</span>
          </button>
        </div>
      </div>

      {/* Menu Drawer */}
    {isMenuOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={toggleMenu}>
    <div 
      className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
    
      
      {/* User Info */}
      <div className="flex justify-between items-end  p-4 pt-16 border-b border-purple-100 bg-purple-50">
        <div className=''>
        <p className="font-semibold text-purple-800">{filteredUser.name || "Guest User"}</p>
        <p className="text-sm text-purple-600 flex text-center">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg> 
          {filteredUser.rollNumber || "000000"}
        </p>
        </div>
        <div>
          <button 
        onClick={toggleMenu}
        className=" bg-white border rounded-full text-purple-800 hover:text-purple-600 focus:outline-none"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        </button>
        </div>
       
      </div>

      
      

      {/* Menu Items */}
      <div className="py-2">
        <button onClick={() => {navigate('/SGS-Quiz-Result')}} className="w-full text-left px-4 py-3 text-purple-800 hover:bg-purple-100">
          SGS Quiz Result
        </button>
         <button onClick={() => {navigate('/SGS-DailyQuiz-Result')}} className="w-full text-left px-4 py-3 text-purple-800 hover:bg-purple-100">
          Weekly Quiz Result
        </button>
      </div>

      {/* Logout Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-purple-100">
  {userid ? (
    <button 
      onClick={logout}
      className="flex items-center justify-center w-full py-2 text-red-600 hover:bg-red-50 rounded"
    >
      <FaSignOutAlt className="mr-2" />
      Logout
    </button>
  ) : (
    <button 
      onClick={login}
      className="flex items-center justify-center w-full py-2 text-purple-600 hover:bg-purple-50 rounded"
    >
      <FaSignInAlt className="mr-2" />
      Login
    </button>
  )}
</div>
    </div>
  </div>
)}
    </div>
  );
};

export default NavigationBar;