// src/utils/storage.js

export const storeExamSession = (data) => {
    localStorage.setItem('examData', JSON.stringify(data));
};

export const getStoredSession = () => {
    const sessionData = localStorage.getItem('examData');
    return sessionData ? JSON.parse(sessionData) : null;
};

export const clearStorage = () => {
    localStorage.clear();
};
