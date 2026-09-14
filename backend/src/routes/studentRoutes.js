// routes/studentRoutes.js
// This file only handles "mapping": which controller function should
// run when a particular URL + method is received.

const express = require('express');
const router = express.Router();

const {
    addStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deactivateStudent,

} = require('../controllers/studentController');

//POST  /api/students
router.post('/', addStudent);

//GET  /api/students
router.get('/', getAllStudents);

//GET  /api/students/:id
router.get('/:id', getStudentById);

//PUT  /api/students/:id
router.get('/:id', updateStudent);

//PATCH  /api/students/:id/status
router.get('/:id/status', deactivateStudent);

module.exports = router;