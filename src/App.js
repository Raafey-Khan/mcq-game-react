import React, { useState, useEffect } from 'react';
import './App.css';
import Question from './components/Question/Question';
import Score from './components/Score/Score';
import Leaderboard from './components/Leaderboard/Leaderboard';
import UserAuthentication from './components/UserAuthentication/UserAuthentication';
import questionsData from './data/questions.json';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [timer, setTimer] = useState(null); // Define the 'timer' variable

  const handleNextQuestion = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false);
      setTimeLeft(10);
    }
  };

  const handleUserAnswer = (selectedOption) => {
    setIsAnswered(true);
    if (timer) {
      clearTimeout(timer);
    }
    if (selectedOption === questionsData[currentQuestionIndex].correctAnswer) {
      handleNextQuestion(true);
    } else {
      handleNextQuestion(false);
    }
  };

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const newTimer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      setTimer(newTimer); // Set the timer state
    } else if (timeLeft === 0 && !isAnswered) {
      handleUserAnswer(null);
    }
    // Cleanup the timer when the component unmounts or when dependencies change
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timeLeft, isAnswered]);

  return (
    <div className="App">
      {currentQuestionIndex < questionsData.length ? (
        <Question
          question={questionsData[currentQuestionIndex].question}
          options={questionsData[currentQuestionIndex].options}
          correctAnswer={questionsData[currentQuestionIndex].correctAnswer}
          onNextQuestion={handleUserAnswer}
          isAnswered={isAnswered}
          timeLeft={timeLeft}
        />
      ) : (
        <div>
          <h2>Game Over</h2>
          <Score score={score} totalQuestions={questionsData.length} />
          <Leaderboard />
          <UserAuthentication />
        </div>
      )}
    </div>
  );
}

export default App;
