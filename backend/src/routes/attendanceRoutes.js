
// routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
 
const {
  markAttendance,
  getDailyAttendance,
  getMonthlyAttendance,
  getAttendancePercentage,
  getAttendanceHistory,
} = require('../controllers/attendanceController');
 
const { validate, attendanceSchema } = require('../validations/attendanceValidation');
 
// NOTE: auth middleware (protect/authorize) is not added yet because
// middleware/authMiddleware.js is still empty (Sanket's part is in progress).
// Once it's ready, import { protect, authorize } from it and add them back
// as middleware before the controller function in each route below.
 
router.post('/', validate(attendanceSchema), markAttendance);
router.get('/daily', getDailyAttendance);
router.get('/monthly', getMonthlyAttendance);
router.get('/percentage', getAttendancePercentage);
router.get('/history', getAttendanceHistory);
 
module.exports = router;
 