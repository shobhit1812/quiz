import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuizApp from "./QuizApp";

const Quiz = () => {
  const user = localStorage.getItem("name");
  const navigate = useNavigate();

  const handleLogoutButton = () => {
    // remove the name from localStorage and will navigate to login page
    localStorage.removeItem("name");
    navigate("/");
  };

  useEffect(() => {
    // user authentication
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      {/* Navbar */}
      <div className="text-2xl p-4 text-blue-500 flex justify-between bg-slate-200 shadow-md">
        <span>Welcome, {user}</span>
        <button onClick={handleLogoutButton} className="text-red-600">
          Logout
        </button>
      </div>

      {/* Rules */}
      <div className="flex flex-col items-center justify-center mt-3 mb-5 p-2 bg-white rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-1 underline">
          Quiz Rules
        </h1>
        <ul className="list-decimal text-lg font-medium text-gray-700">
          <li className="pb-1">
            Choose your subject from the options available.
          </li>
          <li className="pb-1">
            Read each question carefully and think of your answer.
          </li>
          <li className="pb-1">
            Tap on the flashcard to reveal the correct answer.
          </li>
          <li className="pb-1">
            There are a total of 10 questions in the quiz.
          </li>
        </ul>
      </div>

      {/* Quiz */}
      <div>
        <QuizApp />
      </div>
    </div>
  );
};

export default Quiz;
