// src/components/Login.js
import React, { useState } from 'react';
import { loginUser } from '../utils/api'; 
import { Spinner } from 'react-bootstrap'; 

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message
        setLoading(true);

        try {
            // Use the `loginUser` function from the API layer
            const data = await loginUser(username, password);

            if (data.message === 'Success') {
                // Pass the user data to the parent component
                onLogin(data.data);
            }
        } catch (err) {
            if (err.status === 401) {
                setError('Incorrect credentials. Please try again.');
            } else if (err.status === 403) {
                setError('User already attended the exam.');
            } else {
                setError('Something went wrong. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center align-items-center">
            <div className="card shadow-lg p-4" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Login to Start Exam</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && <div className="alert alert-danger text-center">{error}</div>}

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        {loading ? (
                            <>
                                <Spinner animation="border" role="status" size="sm" className="me-2" />
                                Logging in...
                            </>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
