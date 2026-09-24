// routes/resultRoutes.js
const express = require('express');
const router = express.Router();
 
const {
  addMarks,
  updateMarks,
  getSubjectWiseMarks,
  getSemesterResult,
} = require('../controllers/resultController');
 
const { validate, resultSchema } = require('../validations/resultValidation');
 
// NOTE: auth middleware (protect/authorize) is not added yet because
// middleware/authMiddleware.js is still empty (Sanket's part is in progress).
// Once it's ready, import { protect, authorize } from it and add them back
// as middleware before the controller function in each route below.
 
router.post('/', validate(resultSchema), addMarks);
router.put('/:id', updateMarks);
router.get('/subject', getSubjectWiseMarks);
router.get('/semester-result', getSemesterResult);
 
module.exports = router;