// src/services/studentService.js
// All backend calls are kept here in one place — do not write axios.get/post
// This way, if the backend URL changes, you only need to change it in one place.

import api from './api';


// Add new students
export const addStudent = async (studentData) => {
    const response = await api.post('/students', studentData);
    return response.data;
};

export const getAllStudents = async (filters = {}) => {
    const response = await api.get('/students', { params: filters });
    return response.data;
};

export const getStudentById = async (id) => {
    const response = await api.get(`/students/${id}`);
    return response.data;
};

export const updateStudent = async (id, studentData) => {
    const response = await api.put(`/students/${id}`, studentData);
    return response.data;
};

export const deactivateStudent = async (id) => {
    const response = await api.patch(`/students/${id}/status`);
    return response.data;
};