import React, { useState, useEffect } from 'react';
import {Option} from '../Option/Option';

const Question = ({ question, options, correctAnswer, onNextQuestion, isAnswered, timeLeft }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    setIsAnswered(true); // Set isAnswered to true when an option is selected
    clearTimeout(timer); // Clear the timer

    if (selectedOption === correctAnswer) {
      // Handle correct answer feedback
      onNextQuestion(true); // Move to the next question with the correct answer
    } else {
      // Handle wrong answer feedback
      onNextQuestion(false); // Move to the next question with a wrong answer
    }
  };

  const [timer, setTimer] = useState(null); // Define the 'timer' variable

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const newTimer = setTimeout(() => {
        // Decrement timeLeft by 1 second
        setTimeLeft(timeLeft - 1);
      }, 1000);
      setTimer(newTimer); // Set the timer state
    } else if (timeLeft === 0 && !isAnswered) {
      setIsAnswered(true); // Time's up, set isAnswered to true
      clearTimeout(timer); // Clear the timer
      onNextQuestion(false); // Move to the next question with a wrong answer
    }
    // Cleanup the timer when the component unmounts or when dependencies change
    return () => clearTimeout(timer);
  }, [timeLeft, isAnswered, onNextQuestion, timer]); // Include 'timer' in the dependency array

  return (
    <div>
      <h2>{question}</h2>
      {options.map((option, index) => (
        <Option
          key={index}
          text={option}
          isSelected={option === selectedOption}
          onSelect={handleOptionSelect}
        />
      ))};
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Question;
