import React, { useState, useEffect } from "react";
import {  
  collection, 
  getDocs, 
  query,
  where 

} from "firebase/firestore";
import Layout from "../../Components/Layout";
import { FaTrophy, FaMedal } from "react-icons/fa";
import { fireDB } from "../../DataBase/firebaseConfig";

const DailyResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  // Fetch published results
  const fetchResults = async () => {
    try {
      const q = query(
        collection(fireDB, "Dailyresults"), 
        where("display", "==", true)
      );
      
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setResults(data);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // Filter results by language
  const filteredResults = selectedLanguage === "all" 
    ? results 
    : results.filter(r => r.language === selectedLanguage);

  // Get unique languages from results
  const getResultLanguages = () => {
    const languages = [...new Set(results.map(r => r.language))];
    return ["all", ...languages].filter(lang => lang);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-purple-100 dark:bg-neutral-950 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-purple-800 dark:text-purple-200 text-lg">
              Loading results...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-purple-100 dark:bg-neutral-950 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-purple-800 dark:text-purple-200 mb-2">
              Competition Results
            </h1>
            <p className="text-purple-600 dark:text-purple-300 max-w-2xl mx-auto">
              Congratulations to all participants! These results recognize the exceptional 
              performance of our top scorers across various languages and categories.
            </p>
          </div>

          {/* Language Filter */}
          <div className="mb-8 flex justify-center">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 inline-block">
              <label className="mr-3 text-purple-800 dark:text-purple-200 font-medium">
                Filter by Language:
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white dark:bg-neutral-700 text-purple-900 dark:text-purple-100 border border-purple-300 dark:border-neutral-600"
              >
                {getResultLanguages().map((lang) => (
                  <option key={lang} value={lang}>
                    {lang === "all" ? "All Languages" : lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Display */}
          {filteredResults.length === 0 ? (
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-12 text-center">
              <div className="inline-block bg-purple-100 dark:bg-purple-900 p-6 rounded-full mb-6">
                <FaTrophy className="text-5xl text-purple-600 dark:text-purple-300" />
              </div>
              <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-2">
                Results Coming Soon
              </h2>
              <p className="text-purple-600 dark:text-purple-300 max-w-md mx-auto">
                The competition results are being finalized by our judging panel. 
                Please check back later to see the winners!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredResults.map((result) => (
                <div 
                  key={result.id} 
                  className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden border border-purple-200 dark:border-neutral-700"
                >
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-5">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                      <h2 className="text-2xl font-bold text-white mb-2 md:mb-0">
                        {result.examName} - {result.language}
                      </h2>
                      <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-white text-sm flex items-center">
                        <FaMedal className="mr-1" /> {result.winners.length} Winners
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {result.winners.map((winner, index) => {
                        const rankColors = [
                          "from-yellow-400 to-yellow-300",
                          "from-gray-300 to-gray-200",
                          "from-amber-700 to-amber-600"
                        ];
                        const rankNames = ["1st", "2nd", "3rd"];
                        
                        return (
                          <div 
                            key={winner.id} 
                            className={`bg-gradient-to-br ${index < 3 ? rankColors[index] : "from-purple-500 to-indigo-500"} rounded-xl p-1 shadow-lg`}
                          >
                            <div className="bg-white dark:bg-neutral-800 rounded-lg p-5 h-full">
                              <div className="text-center">
                                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center text-xl font-bold text-white mb-3">
                                  {index + 1}
                                </div>
                                <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200">
                                  {index < 3 ? rankNames[index] : `Top ${index + 1}`} Place
                                </h3>
                                <p className="text-purple-600 dark:text-purple-300 font-medium mt-1">
                                  {winner.name}
                                </p>
                                <p className="text-sm text-purple-500 dark:text-purple-400">
                                  Roll: {winner.rollNumber}
                                </p>
                                <div className="mt-4 bg-purple-100 dark:bg-purple-900 rounded-lg p-3">
                                  <p className="text-purple-800 dark:text-purple-200 font-bold text-lg">
                                    Score: {winner.score}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {result.winners.length > 3 && (
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3">
                          Additional Top Performers
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {result.winners.slice(3).map((winner, index) => (
                            <div 
                              key={winner.id} 
                              className="bg-purple-50 dark:bg-neutral-700 rounded-lg p-4 flex items-center"
                            >
                              <span className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold">
                                {index + 4}
                              </span>
                              <div>
                                <p className="font-medium text-purple-800 dark:text-purple-200">
                                  {winner.name}
                                </p>
                                <p className="text-sm text-purple-600 dark:text-purple-300">
                                  Roll: {winner.rollNumber} | Score: {winner.score}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DailyResultsPage;