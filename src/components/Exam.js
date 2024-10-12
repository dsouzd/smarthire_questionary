// src/components/Exam.js
import React, { useEffect, useState } from 'react';
import Timer from './Timer';
import Question from './Question';
import { getQuestions, submitExam } from '../utils/api';
import { storeExamSession } from '../utils/storage';
import { ProgressBar, Alert } from 'react-bootstrap';
import '../styles/Exam.css';

const Exam = ({ userDetails, examStarted, onStartExam, onSubmit }) => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(3600); // 1 hour default
    const [submitted, setSubmitted] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (examStarted) {
            fetchQuestions();
        }
    }, [examStarted]);

    // Fetch questions
    const fetchQuestions = async () => {
        try {
            const response = await getQuestions(userDetails);
            if (response.questions) {
                setQuestions(response.questions);
                setAnswers(Array(response.questions.length).fill(''));
            }
        } catch (error) {
            console.error('Failed to fetch questions', error);
        }
    };

    // Update progress based on answered questions
    useEffect(() => {
        const answeredCount = answers.filter((answer) => answer !== '').length;
        const totalQuestions = questions.length;
        const newProgress = totalQuestions ? (answeredCount / totalQuestions) * 100 : 0;
        setProgress(newProgress);
    }, [answers, questions.length]);

    useEffect(() => {
        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timerId);
                    handleSubmit(); // Auto-submit on timeout
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    useEffect(() => {
        storeExamSession({ timeLeft, answers });
    }, [timeLeft, answers]);

    const handleAnswerChange = (index, answer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = answer;
        setAnswers(updatedAnswers);
    };

    const handleSubmit = async () => {
        if (submitted) return;

        try {
            await submitExam(userDetails, answers);
            setSubmitted(true);
            onSubmit(); // Move to ThankYou page
        } catch (error) {
            console.error('Failed to submit answers', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Welcome, {userDetails.name}!</h2>

            {examStarted ? (
                <>
                    <Timer timeLeft={timeLeft} />

                    <Alert variant="info" className="text-center">
                        <strong>Instructions:</strong> Please select the correct answer for each question. You have 1 hour to complete the exam. 
                        Your progress will be saved automatically. The exam will be submitted once the time runs out or when you click "Submit Exam."
                    </Alert>

                    <ProgressBar now={progress} label={`${Math.round(progress)}% Completed`} className="mb-4" />

                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        {questions.map((q, index) => (
                            <Question
                                key={index}
                                index={index}
                                question={q}
                                selectedAnswer={answers[index]}
                                onAnswerChange={handleAnswerChange}
                            />
                        ))}

                        <button type="submit" className="btn btn-success w-100 mt-4">
                            Submit Exam
                        </button>
                    </form>
                </>
            ) : (
                <>
                    <div className="card p-4 shadow-lg">
                        <h3 className="text-center">Instructions for the Exam</h3>
                        <p className="mt-3">
                            You are about to start the exam, which consists of multiple-choice questions. Each question has only 
                            one correct answer, and you will need to select the most appropriate one from the given options. 
                            The total time allotted for this exam is 1 hour. Your answers will be saved automatically as you move 
                            through the exam. Should you refresh or accidentally close the page, your progress will be preserved.
                        </p>
                        <p className="mt-2">
                            Please ensure that you submit your exam before the time expires. In case you run out of time, 
                            the system will automatically submit your answers. Take your time, read each question carefully, 
                            and make sure to provide your best possible answer. Remember, once the exam is submitted, you 
                            will not be able to make any changes.
                        </p>
                        <p className="mt-2">
                            We recommend sitting in a quiet place with minimal distractions to give yourself the best 
                            chance of performing well. Good luck!
                        </p>

                        <div className="text-center mt-4">
                            <button onClick={onStartExam} className="btn btn-primary w-50">
                                Start Exam
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Exam;
