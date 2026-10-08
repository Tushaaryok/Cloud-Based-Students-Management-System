// models/studentModel.js
// this file only communication with database any req/res and for validation.
// All function the run single query and return result
// Controller are call this files

const pool = require('../config/database');

// Added new Student
const createStudent = async (data) => {
    const {
        enrollment_no,
        first_name,
        last_name,
        email,
        phone,
        date_of_birth,
        gender,
        address,
        city,
        state,
        pincode,
        course,
        class_name,
        division,
        admission_date,
    } = data;

const [result] = await pool.query(
    `INSERT INTO students (enrollment_no, first_name, last_name, email, phone,
    date_of_birth, gender, address, city, state, pincode, course, class_name,
    division, admission_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
        enrollment_no,
        
        first_name,
        last_name,
        email,
        phone,
        date_of_birth,
        gender,
        address,
        city,
        state,
        pincode,
        course,
        class_name,
        division,
        admission_date,
    ]
);

        return result.insertId;
}

//find all active students
const findAllStudents = async (filters) => {
    const { course, class_name, division, search } = filters;

    let sql = "SELECT * FROM students WHERE status = 'active'";
    const params = [];

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
        params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    const [rows] = await pool.query(sql, params);
    return rows;
}

// Student find by id only one student
const findStudentById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);
    return rows[0] || null; // if student are not found then return null
};

// find student from enrollment no
const findStudentByEnrollmentNo =  async (enrollment_no) => {
    const [rows] = await pool.query('SELECT * FROM students WHERE enrollment_no = ?', [enrollment_no]);
    return rows[0] || null;
};

//Student Update
const updateStudentById = async (id, data) => {
    const {
        first_name,
        last_name,
        email,
        phone,
        date_of_birth,
        gender,
        address,
        city,
        state,
        pincode,
        course,
        class_name,
        division,
    } = data;

    const [result] = await pool.query(
        `UPDATE students SET first_name = ?, last_name = ?, email = ?, phone = ?, date_of_birth = ?,
         gender = ?, address = ?, city = ?, state = ?, pincode = ?,
         course = ?, class_name = ?, division = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
     [
        first_name,
        last_name,
        email,
        phone,
        date_of_birth,
        gender,
        address,
        city,
        state,
        pincode,
        course,
        class_name,
        division,
        id,
     ]
    );

    return result.affectedRows; // 0 means student doesn't find
};

// Deactivated students
const deactivateStudentById = async (id) => {
    const [result] = await pool.query('UPDATE students SET status = "inactive", updated_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    return result.affectedRows;
};

module.exports = {
    createStudent,
    findAllStudents,
    findStudentById,
    findStudentByEnrollmentNo,
    updateStudentById,
    deactivateStudentById,
};