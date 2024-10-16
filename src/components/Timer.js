// src/components/Timer.js
import React from 'react';
import '../styles/Exam.css';

const Timer = ({ timeLeft }) => {
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="alert alert-info text-center bg-color-secondary">
            <h3>Time Left: {formatTime(timeLeft)}</h3>
        </div>
    );
};

export default Timer;
