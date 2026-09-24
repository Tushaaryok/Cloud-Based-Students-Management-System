// models/Attendance.js
// Plain data-access functions using the mysql2 connection pool (no ORM).
 
const pool = require('../config/database');
 
// Marks attendance; if a row for the same student+course+date already exists, it updates the status
// instead of erroring (relies on the UNIQUE KEY defined in schema.sql).
async function markAttendance({ studentId, courseId, date, status, markedBy }) {
  await pool.query(
    `INSERT INTO attendance (studentId, courseId, date, status, markedBy)
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE status = VALUES(status), markedBy = VALUES(markedBy)`,
    [studentId, courseId, date, status, markedBy || null]
  );
 
  const [rows] = await pool.query(
    'SELECT * FROM attendance WHERE studentId = ? AND courseId = ? AND date = ?',
    [studentId, courseId, date]
  );
  return rows[0];
}
 
async function getDailyAttendance(courseId, date) {
  const [rows] = await pool.query(
    'SELECT * FROM attendance WHERE courseId = ? AND date = ?',
    [courseId, date]
  );
  return rows;
}
 
// month: 1-12
async function getMonthlyAttendance(studentId, courseId, month, year) {
  const start = `${year}-${String(month).padStart(2, '0')}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const end = `${year}-${String(month).padStart(2, '0')}-${lastDay}`;
 
  const [rows] = await pool.query(
    `SELECT * FROM attendance
     WHERE studentId = ? AND courseId = ? AND date BETWEEN ? AND ?
     ORDER BY date ASC`,
    [studentId, courseId, start, end]
  );
  return rows;
}
 
async function getAttendancePercentage(studentId, courseId) {
  const [[{ total }]] = await pool.query(
    'SELECT COUNT(*) AS total FROM attendance WHERE studentId = ? AND courseId = ?',
    [studentId, courseId]
  );
  const [[{ present }]] = await pool.query(
    "SELECT COUNT(*) AS present FROM attendance WHERE studentId = ? AND courseId = ? AND status = 'present'",
    [studentId, courseId]
  );
 
  const percentage = total === 0 ? 0 : Number(((present / total) * 100).toFixed(2));
  return { totalClasses: total, present, percentage };
}
 
async function getAttendanceHistory(studentId, courseId) {
  let query = 'SELECT * FROM attendance WHERE studentId = ?';
  const params = [studentId];
 
  if (courseId) {
    query += ' AND courseId = ?';
    params.push(courseId);
  }
  query += ' ORDER BY date DESC';
 
  const [rows] = await pool.query(query, params);
  return rows;
}
 
module.exports = {
  markAttendance,
  getDailyAttendance,
  getMonthlyAttendance,
  getAttendancePercentage,
  getAttendanceHistory,
};