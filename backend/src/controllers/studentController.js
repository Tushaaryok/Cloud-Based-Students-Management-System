// controllers/studentController.js


const studentModel = require('../model/studentModel');

// 1. Add Student
const addStudent = async (req, res) => {
    try {

        const { enrollment_no, first_name } = req.body;

        if (!enrollment_no || !first_name) {
            return res.status(400).json({ message: "Enrollment No. and First Name is required "});

        }

        const studentId = await studentModel.createStudent(req.body);
        res.status(201).json({message: 'Student added successfully', studentId: result.insertId

         });

    } catch (error) {
        console.error(error);

        if(error.code ===  'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Enrollment No. or Email already exists' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// 2 Get All Students
const getAllStudents = async (req, res) => {
    try {
        
        const { course, class_name, division, search } = req.query;

        let sql = 'SELECT * FORM students WHERE status = "active"';
        const params = []

        if (course) {
            sql += ' AND course = ?';
            params.push(course);

        }
        if (class_name) {
            sql += ' AND class_name = ?';
            params.push(class_name);

        }
        if (division) {
            sql += ' AND division = ?';
            params.push(division);

        }
        if (search) {
            sql += ' AND (first_name LIKE ? OR last_name LIKE ? OR enrollment_no LIKE ?)';
            params.push(`%${search}%`, `%${search}`, `%${search}%`);
        }

        const [rows] = await pool.query(sql, params);
        res.status(200).json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
        
    }
};

// 3 Get Single student by ID -> GET
const getStudentById = async (req, res) => {
    try {
        const { id } = req.params; // from url

        const [rows] = await pool.query('SELECT * FORM students WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Student doesn't find"});
        }
        res.status(200).json(rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// 4 Update Student -> Using  PUT
const updateStudent = async (req, res) => {
    try {
        const affectedRows = await studentModel.updateStudentById(res.params.id, req.body);

        const { first_name, last_name, email, phone, date_of_birth, gender, address, city, state, pincode, course, class_name, division} = req.body;

        const [result] = await pool.query(
            `UPDATE students SET first_name = ?, last_name = ?, email = ?, phone = ?, date_of_birth = ?, course = ?, class_name = ?, division = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, 
            [ first_name, last_name, email, phone, date_of_birth, gender,address, city, state, pincode, course, class_name, division, id ]
        );

        if (result.affectedRows === 0) {
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
        const { id } = req.params;

        const [result] = await pool.query (
            `UPDATE students SET status = "inactive", updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [id]
        );

        if (result.affectedRows === 0) {
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
    addStudent.
    getAllStudents.
    getStudentById,
    updateStudent,
    deactivateStudent
};


