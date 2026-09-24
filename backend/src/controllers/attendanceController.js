// controllers/attendanceController.js
 
const attendanceModel = require('../models/Attendance');
 
// 1. Mark Attendance
const markAttendance = async (req, res) => {
    try {
        const { studentId, courseId, date, status } = req.body;
        const markedBy = req.user ? req.user.id : null; // set by auth middleware
 
        if (!studentId || !courseId || !date || !status) {
            return res.status(400).json({ message: 'studentId, courseId, date and status are required' });
        }
 
        const record = await attendanceModel.markAttendance({ studentId, courseId, date, status, markedBy });
        res.status(200).json({ message: 'Attendance marked successfully', data: record });
 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
 
// 2. Get Daily Attendance (for one course, one date)
const getDailyAttendance = async (req, res) => {
    try {
        const { courseId, date } = req.query;
        const records = await attendanceModel.getDailyAttendance(courseId, date);
        res.status(200).json(records);
 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
 
// 3. Get Monthly Attendance (for one student, one course, one month)
const getMonthlyAttendance = async (req, res) => {
    try {
        const { studentId, courseId, month, year } = req.query;
        const records = await attendanceModel.getMonthlyAttendance(studentId, courseId, month, year);
        res.status(200).json(records);
 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
 
// 4. Get Attendance Percentage
const getAttendancePercentage = async (req, res) => {
    try {
        const { studentId, courseId } = req.query;
        const result = await attendanceModel.getAttendancePercentage(studentId, courseId);
        res.status(200).json({ studentId, courseId, ...result });
 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
 
// 5. Get Attendance History
const getAttendanceHistory = async (req, res) => {
    try {
        const { studentId, courseId } = req.query;
        const records = await attendanceModel.getAttendanceHistory(studentId, courseId);
        res.status(200).json(records);
 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
 
module.exports = {
    markAttendance,
    getDailyAttendance,
    getMonthlyAttendance,
    getAttendancePercentage,
    getAttendanceHistory,
};