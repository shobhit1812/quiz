import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLoginForm = (e) => {
    e.preventDefault();

    // set name to localStorage and will navigate to quiz
    localStorage.setItem("name", name);
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-4">
          Welcome to Flashcard Quiz App
        </h1>
        <h2 className="text-lg text-center text-gray-500 mb-6">
          Log in to start your quiz journey!
        </h2>

        {/* Login Form */}
        <form onSubmit={handleLoginForm}>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              value={name}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Start
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
