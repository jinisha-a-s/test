// src/api/auth.js
import axios from 'axios';
//auth.js

// const BASE_URL = "http://python-application-service"
const BASE_URL = window._env_?.VITE_API_URL;
console.log("API Base URL:  ", BASE_URL);


// ✅ Register Student
export const registerStudentAPI = async (formData) => {
    try {
        const payload = {
            "Name": formData.name,
            "Email": formData.email,
            "Phone No": formData.phone_no,
            "Password": formData.password,
            "Confirm Password": formData.confirm_password
        };

        const response = await axios.post(`${BASE_URL}student/create`, payload);
        return response.data;
    } catch (error) {
        // 🚨 Forward error to thunk
        throw error;
    }
};



// ✅ Login Student
export const loginStudentAPI = async (formData) => {
    try {
        const payload = {
            "Email": formData.email,
            "Password": formData.password
        };

        const response = await axios.post(`${BASE_URL}student/login`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ✅ Instructor Registration

export const registerInstructorAPI = async (formData) => {
    try {
        const payload = {
            "Name": formData.name,
            "Email": formData.email,
            "Phone No": formData.phone_no,
            "Password": formData.password,
            "Confirm Password": formData.confirm_password
        };

        const response = await axios.post(`${INSTRUCTOR_BASE_URL}instructor/create`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
}

