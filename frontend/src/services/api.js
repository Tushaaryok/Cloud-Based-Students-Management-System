// src/services/api.js
// This is a shared axios instance — all services (studentService,
// authService, attendanceService, etc.) will import and use it.
// Benefit: the base URL is written in only one place, and later if the JWT token

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',

})

export default api;