// validations/attendanceValidation.js
const Joi = require('joi');

const attendanceSchema = Joi.object({
  studentId: Joi.number().integer().required(),
  courseId: Joi.number().integer().required(),
  date: Joi.date().required(),
  status: Joi.string().valid('present', 'absent', 'late').required(),
});

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};

module.exports = { attendanceSchema, validate };