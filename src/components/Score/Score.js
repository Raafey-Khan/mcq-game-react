import React from 'react';

const Score = ({ score, totalQuestions }) => {
  return (
    <div className="score-container">
      <h2>Your Score</h2>
      <p>
        {score} / {totalQuestions}
      </p>
    </div>
  );
};

export default Score;
