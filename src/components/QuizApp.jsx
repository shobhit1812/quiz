import { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import api from "../constants/api";

const QuizApp = () => {
  // State variables to manage the quiz
  const [flashcards, setFlashcards] = useState([]); // Stores the fetched quiz questions
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current question index
  const [score, setScore] = useState(0); // Tracks the user's score
  const [quizOver, setQuizOver] = useState(false); // Indicates if the quiz is finished
  const [selectedCategory, setSelectedCategory] = useState("politics"); // Tracks the selected category for questions

  // Function to fetch questions from the selected category API
  const fetchQuestions = async () => {
    try {
      // Fetch data from the API based on the selected category
      const response = await fetch(api[selectedCategory]);
      const data = await response.json();
      // Map the fetched data to a flashcard format with question, correct answer, and shuffled options
      const questions = data.results.map((item) => ({
        question: item.question,
        correctAnswer: item.correct_answer,
        options: [...item.incorrect_answers, item.correct_answer].sort(
          () => Math.random() - 0.5
        ), // Shuffle options to randomize the order
      }));
      setFlashcards(questions); // Update the state with the fetched questions
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Function to handle user's answer and progress to the next question
  const handleMarkAnswer = (isCorrect) => {
    if (isCorrect) setScore((prevScore) => prevScore + 1); // Increment score if the answer is correct
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next question if available
    } else {
      setQuizOver(true); // End the quiz if there are no more questions
    }
  };

  // Function to restart the quiz
  const handleRestartQuiz = () => {
    setQuizOver(false); // Reset the quizOver state to false
    setCurrentIndex(0); // Reset the currentIndex to start from the first question
    setScore(0); // Reset the score to zero
    fetchQuestions(); // Re-fetch questions when restarting the quiz
  };

  // useEffect to fetch questions when the component mounts or when the selected category changes
  useEffect(() => {
    fetchQuestions(); // Fetch questions when the component first renders
    handleRestartQuiz(); // Ensure quiz starts fresh with a new category selection
  }, [selectedCategory]); // Dependency array includes selectedCategory to refetch questions on change

  return (
    <div className="flex flex-col items-center justify-center">
      {!quizOver ? ( // Conditional rendering based on quiz state
        <>
          {/* Dropdown for selecting quiz category */}
          <div className="mb-4">
            <label className="mr-2 text-lg font-medium">Select Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 rounded bg-white shadow"
            >
              {/* Populate dropdown with categories from API object keys */}
              {Object.keys(api).map((category) => (
                <option key={category} value={category}>
                  {category.replace("-", " ")}
                </option>
              ))}
            </select>
          </div>
          {/* Display the flashcard if questions are available */}
          {flashcards.length > 0 && (
            <Flashcard
              questionNumber={currentIndex + 1} // Pass the current question number
              question={flashcards[currentIndex].question} // Pass the current question
              options={flashcards[currentIndex].options} // Pass the answer options
              correctAnswer={flashcards[currentIndex].correctAnswer} // Pass the correct answer
              onMarkAnswer={handleMarkAnswer} // Function to handle answer selection
            />
          )}
        </>
      ) : (
        // Display score and restart button when the quiz is over
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Quiz Over!</h2>
          <p className="text-2xl">
            Your score: {score} / {flashcards.length}{" "}
            {/* Display user's score */}
          </p>
          <button
            onClick={handleRestartQuiz} // Restart quiz on button click
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
