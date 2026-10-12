// validations/resultValidation.js
const Joi = require('joi');
 
const resultSchema = Joi.object({
  studentId: Joi.number().integer().required(),
  courseId: Joi.number().integer().required(),
  semester: Joi.string().required(),
  examType: Joi.string().required(),
  marksObtained: Joi.number().min(0).required(),
  maxMarks: Joi.number().min(1).required(),
  grade: Joi.string().optional()
});
 
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};
 
module.exports = { resultSchema, validate };
 