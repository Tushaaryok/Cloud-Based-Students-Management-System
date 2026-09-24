// controllers/resultController.js
 
const resultModel = require('../models/Result');
const { calculateGrade, calculateSemesterResult } = require('../services/gradeService');
 
// 1. Add Marks
const addMarks = async (req, res) => {
    try {
        const { studentId, courseId, semester, examType, marksObtained, maxMarks } = req.body;
 
        if (!studentId || !courseId || !semester || marksObtained == null || maxMarks == null) {
            return res.status(400).json({ message: 'studentId, courseId, semester, marksObtained and maxMarks are required' });
        }
 
        const { grade } = calculateGrade(marksObtained, maxMarks);
        const record = await resultModel.addMarks({ studentId, courseId, semester, examType, marksObtained, maxMarks, grade });
 
        res.status(201).json({ message: 'Marks added successfully', data: record });
 
    } catch (error) {
        console.error(error);
 
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Marks for this student, subject, semester and exam already exist' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
 
// 2. Update Marks (grade is recalculated automatically)
const updateMarks = async (req, res) => {
    try {
        const existing = await resultModel.getMarksById(req.params.id);
 
        if (!existing) {
            return res.status(404).json({ message: 'Marks record not found' });
        }
 
        const marksObtained = req.body.marksObtained ?? existing.marksObtained;
        const maxMarks = req.body.maxMarks ?? existing.maxMarks;
        const { grade } = calculateGrade(marksObtained, maxMarks);
 
        const record = await resultModel.updateMarks(req.params.id, { ...req.body, grade });
        res.status(200).json({ message: 'Marks updated successfully', data: record });
 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
 
// 3. Get Subject-wise Marks (all attempts for one student in one subject)
const getSubjectWiseMarks = async (req, res) => {
    try {
        const { studentId, courseId } = req.query;
        const records = await resultModel.getSubjectWiseMarks(studentId, courseId);
        res.status(200).json(records);
 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
 
// 4. Get Semester Result (overall result across all subjects for a semester)
const getSemesterResult = async (req, res) => {
    try {
        const { studentId, semester } = req.query;
        const records = await resultModel.getMarksForSemester(studentId, semester);
        const result = calculateSemesterResult(records);
 
        res.status(200).json({ studentId, semester, subjects: records, result });
 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
 
module.exports = {
    addMarks,
    updateMarks,
    getSubjectWiseMarks,
    getSemesterResult,
};