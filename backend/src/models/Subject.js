// models/Subject.js
// Plain data-access functions using the mysql2 connection pool (no ORM).
 
const pool = require('../config/database');
 
async function createCourse({ courseName, courseCode, className, division, facultyId, description }) {
  const [result] = await pool.query(
    `INSERT INTO courses (courseName, courseCode, className, division, facultyId, description)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [courseName, courseCode, className, division || null, facultyId || null, description || null]
  );
  return getCourseById(result.insertId);
}
 
async function getAllCourses({ className, division } = {}) {
  let query = 'SELECT * FROM courses WHERE 1=1';
  const params = [];
 
  if (className) {
    query += ' AND className = ?';
    params.push(className);
  }
  if (division) {
    query += ' AND division = ?';
    params.push(division);
  }
 
  const [rows] = await pool.query(query, params);
  return rows;
}
 
async function getCourseById(id) {
  const [rows] = await pool.query('SELECT * FROM courses WHERE id = ?', [id]);
  return rows[0] || null;
}
 
async function updateCourse(id, fields) {
  const keys = Object.keys(fields);
  if (!keys.length) return getCourseById(id);
 
  const setClause = keys.map((key) => `${key} = ?`).join(', ');
  const values = keys.map((key) => fields[key]);
 
  await pool.query(`UPDATE courses SET ${setClause} WHERE id = ?`, [...values, id]);
  return getCourseById(id);
}
 
async function deleteCourse(id) {
  await pool.query('DELETE FROM courses WHERE id = ?', [id]);
}
 
async function assignFaculty(id, facultyId) {
  await pool.query('UPDATE courses SET facultyId = ? WHERE id = ?', [facultyId, id]);
  return getCourseById(id);
}
 
module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  assignFaculty,
};