// src/App.js
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Exam from './components/Exam';
import ThankYou from './components/ThankYou';
import NavigationBar from './components/Navbar';
import { getStoredSession, clearStorage } from './utils/storage';

const App = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [examStarted, setExamStarted] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const sessionData = getStoredSession();
        if (sessionData) {
            setUserDetails(sessionData.userDetails);
            setExamStarted(sessionData.examStarted);
            setSubmitted(sessionData.submitted);
        }
    }, []);

    const handleLogin = (data) => {
        setUserDetails(data);
    };

    const startExam = () => {
        setExamStarted(true);
    };

    const handleExamSubmit = () => {
        setSubmitted(true);
        clearStorage(); // Clear session data after submission
    };

    return (
        <div>
            <NavigationBar />
            {userDetails ? (
                submitted ? (
                    <ThankYou />
                ) : (
                    <Exam
                        userDetails={userDetails} // Pass userDetails here
                        examStarted={examStarted}
                        onStartExam={startExam}
                        onSubmit={handleExamSubmit}
                    />
                )
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </div>
    );
};

export default App;
