// src/components/Question.js
import React from 'react';

const Question = ({ question, index, selectedAnswer, onAnswerChange }) => {
    return (
        <div className="question-block mb-4">
            <h5>{index + 1}. {question.question}</h5>
            {question.options.map((option, i) => (
                <div key={i} className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name={`question${index}`}
                        value={option}
                        checked={selectedAnswer === option}
                        onChange={() => onAnswerChange(index, option)}
                    />
                    <label className="form-check-label">{option}</label>
                </div>
            ))}
        </div>
    );
};

export default Question;
