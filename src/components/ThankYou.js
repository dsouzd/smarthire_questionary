// src/components/ThankYou.js
import React, { useEffect } from 'react';
import '../styles/ThankYou.css'; 

const ThankYou = () => {
    useEffect(() => {
        localStorage.clear(); 
    }, []);

    return (
        <div className="container text-center mt-5">
            <div className="thank-you-card shadow-lg p-4 rounded">
                <h2 className="mb-4">Thank You for Participating!</h2>
                <p className="lead">
                    We appreciate your time and effort in completing the exam.
                </p>
                <p>
                    HR team will review your responses and get in touch with you shortly.
                </p>
                <p>
                    If you have any questions, feel free to reach out to our support team.
                </p>
                <h5 className="mt-4">What Happens Next?</h5>
                <ul className="list-unstyled">
                    <li>✅ Your responses will be evaluated by our HR team.</li>
                    <li>✅ You will receive an email notification regarding the next steps.</li>
                    <li>✅ Feel free to reach out if you have any questions!</li>
                </ul>
                <p className="mt-4">
                    Thank you once again, and we wish you all the best in your career!
                </p>
                <button className="btn btn-primary mt-3" onClick={() => window.close()}>
                    Close Window
                </button>
            </div>
        </div>
    );
};

export default ThankYou;
