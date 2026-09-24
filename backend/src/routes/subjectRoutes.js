// routes/subjectRoutes.js
const express = require('express');
const router = express.Router();
 
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  assignFaculty,
} = require('../controllers/subjectController');
 
const { validate, subjectSchema } = require('../validations/subjectValidation');
 
// NOTE: auth middleware (protect/authorize) is not added yet because
// middleware/authMiddleware.js is still empty (Sanket's part is in progress).
// Once it's ready, import { protect, authorize } from it and add them back
// as middleware before the controller function in each route below.
 
router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', validate(subjectSchema), createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);
router.patch('/:id/assign-faculty', assignFaculty);
 
module.exports = router;