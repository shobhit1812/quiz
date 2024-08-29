/* eslint-disable react/prop-types */
import { useState } from "react";

const Flashcard = ({
  questionNumber,
  question,
  options,
  correctAnswer,
  onMarkAnswer,
}) => {
  const [flipped, setFlipped] = useState(false); // State to track whether the flashcard is flipped

  // Function to flip the flashcard
  const handleFlip = () => {
    setFlipped(true); // Set the flipped state to true when the card is clicked
  };

  // Function to handle marking the user's answer as correct or wrong
  const handleMarkAnswer = (isCorrect) => {
    onMarkAnswer(isCorrect); // Call the parent function with the result (correct/wrong)
    setFlipped(false); // Reset the flipped state to false after handling the answer
  };

  return (
    <div className="w-80 bg-gray-200 rounded-lg shadow-2xl p-4 text-center">
      {!flipped ? ( // Conditional rendering based on whether the card is flipped or not
        // Front side of the flashcard
        <div onClick={handleFlip}>
          <h3 className="text-lg font-semibold mb-4 cursor-pointer">
            {questionNumber} : {question}{" "}
            {/* Display question number and text */}
          </h3>
          {/* Display the list of options */}
          <div className="flex flex-col gap-2">
            {options.map((option, index) => (
              <div key={index} className="py-2 px-4 rounded bg-blue-200">
                {option} {/* Display each option */}
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Back side of the flashcard (after it's flipped)
        <div>
          <h3 className="text-lg font-semibold mb-4">{question}</h3>{" "}
          {/* Display the question again */}
          <p className="text-md mb-4">
            <strong>Correct Answer:</strong> {correctAnswer}{" "}
            {/* Show the correct answer */}
          </p>
          <p className="text-md mb-4 text-blue-500">
            <strong>What did you get correct or wrong?</strong>
          </p>
          {/* Buttons for user to mark their answer as correct or wrong */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleMarkAnswer(true)} // Mark the answer as correct
              className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Correct
            </button>
            <button
              onClick={() => handleMarkAnswer(false)} // Mark the answer as wrong
              className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Wrong
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
