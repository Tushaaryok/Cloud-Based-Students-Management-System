// controllers/studentController.js


const studentModel = require('../models/studentModel');

// 1. Add Student
const addStudent = async (req, res) => {
    try {

        const { enrollment_no, first_name } = req.body;

        if (!enrollment_no || !first_name) {
            return res.status(400).json({ message: "Enrollment No. and First Name is required "});

        }

        const studentId = await studentModel.createStudent(req.body);
        res.status(201).json({message: 'Student added successfully', studentId });

    } catch (error) {
        console.error(error);

        if(error.code ===  'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Enrollment No. and Email is already exists' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// 2 Get All Students
const getAllStudents = async (req, res) => {
    try {
        
        const rows = await studentModel.findAllStudents(req.query);
        res.status(200).json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
        
    }
};

// 3 Get Single student by ID -> GET
const getStudentById = async (req, res) => {
    try {
        const student = await studentModel.findStudentById(req.params.id); // from url

        if (!student) {
            return res.status(404).json({ message: "Student doesn't find"});
        }
        res.status(200).json(student);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// 4 Update Student -> Using  PUT
const updateStudent = async (req, res) => {
    try {
        const affectedRows = await studentModel.updateStudentById(res.params.id, req.body);

        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Student does not find' });
        }

        res.status(200).json({ message: 'Student updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
        
    }
};

// 5 Deactivate Student -> Using PATCH
const deactivateStudent = async (req , res) => {
    try {
        const affectedRows = await studentModel.deactivateStudentById(req.params.id);

        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Student does not find'});
        }

        res.status(200).json({ message: 'Student deactived successfully' });
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });

    }
};

// Export all the functions so that the routes file can import them.
module.exports = {
    addStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deactivateStudent,
};


