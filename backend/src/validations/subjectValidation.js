// validations/subjectValidation.js
const Joi = require('joi');
 
const subjectSchema = Joi.object({
  courseName: Joi.string().min(2).max(100).required(),
  courseCode: Joi.string().min(2).max(20).required(),
  className: Joi.string().required(),
  division: Joi.string().allow('', null),
  facultyId: Joi.number().integer().allow(null),
  description: Joi.string().allow('', null),
});
 
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};
 
module.exports = { subjectSchema, validate };