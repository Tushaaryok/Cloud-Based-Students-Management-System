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

const validateStudent = require('../middleware/validateStudent');

//POST  /api/students
router.post('/', validateStudent, addStudent);

//GET  /api/students
router.get('/', getAllStudents);

//GET  /api/students/:id
router.get('/:id', getStudentById);

//PUT  /api/students/:id
router.put('/:id', validateStudent updateStudent);

//PATCH  /api/students/:id/status
router.patch('/:id/status', deactivateStudent);

module.exports = router;