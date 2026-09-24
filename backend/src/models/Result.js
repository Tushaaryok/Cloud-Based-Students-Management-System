// models/Result.js
// Plain data-access functions using the mysql2 connection pool (no ORM).
 
const pool = require('../config/database');
 
async function addMarks({ studentId, courseId, semester, examType, marksObtained, maxMarks, grade }) {
  const [result] = await pool.query(
    `INSERT INTO marks (studentId, courseId, semester, examType, marksObtained, maxMarks, grade)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [studentId, courseId, semester, examType, marksObtained, maxMarks, grade]
  );
 
  const [rows] = await pool.query('SELECT * FROM marks WHERE id = ?', [result.insertId]);
  return rows[0];
}
 
async function getMarksById(id) {
  const [rows] = await pool.query('SELECT * FROM marks WHERE id = ?', [id]);
  return rows[0] || null;
}
 
async function updateMarks(id, fields) {
  const keys = Object.keys(fields);
  if (!keys.length) return getMarksById(id);
 
  const setClause = keys.map((key) => `${key} = ?`).join(', ');
  const values = keys.map((key) => fields[key]);
 
  await pool.query(`UPDATE marks SET ${setClause} WHERE id = ?`, [...values, id]);
  return getMarksById(id);
}
 
async function getSubjectWiseMarks(studentId, courseId) {
  const [rows] = await pool.query(
    'SELECT * FROM marks WHERE studentId = ? AND courseId = ?',
    [studentId, courseId]
  );
  return rows;
}
 
async function getMarksForSemester(studentId, semester) {
  const [rows] = await pool.query(
    'SELECT * FROM marks WHERE studentId = ? AND semester = ?',
    [studentId, semester]
  );
  return rows;
}
 
module.exports = {
  addMarks,
  getMarksById,
  updateMarks,
  getSubjectWiseMarks,
  getMarksForSemester,
};