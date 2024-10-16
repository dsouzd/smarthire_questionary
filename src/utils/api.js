// src/utils/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/';

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, {
            username,
            password
        });
        return response.data;
    } catch (error) {
        throw error.response || error;
    }
};

export const getQuestions = async ({ candidate_id, jd_id, bu_id }) => {
    const response = await axios.post(`${BASE_URL}/startexam/${candidate_id}/jd/${jd_id}/bu/${bu_id}`);
    return response.data;
};

export const submitExam = async ({ candidate_id, jd_id, bu_id }, answers) => {
    await axios.post(`${BASE_URL}/submitanswers`, {
        jd_id,
        bu_id,
        candidate_id,
        answers
    });
};
