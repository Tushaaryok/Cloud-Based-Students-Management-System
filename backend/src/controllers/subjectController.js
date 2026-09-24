
// controllers/subjectController.js
 
const subjectModel = require('../models/Subject');
 
// 1. Add Course/Subject
const createCourse = async (req, res) => {
    try {
        const { courseName, courseCode, className } = req.body;
 
        if (!courseName || !courseCode || !className) {
            return res.status(400).json({ message: 'courseName, courseCode and className are required' });
        }
 
        const course = await subjectModel.createCourse(req.body);
        res.status(201).json({ message: 'Course added successfully', data: course });
 
    } catch (error) {
        console.error(error);
 
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Course code already exists' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
 
// 2. Get All Courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await subjectModel.getAllCourses(req.query);
        res.status(200).json(courses);
 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
 
// 3. Get Course By Id
const getCourseById = async (req, res) => {
    try {
        const course = await subjectModel.getCourseById(req.params.id);
 
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
 
// 4. Update Course
const updateCourse = async (req, res) => {
    try {
        const existing = await subjectModel.getCourseById(req.params.id);
 
        if (!existing) {
            return res.status(404).json({ message: 'Course not found' });
        }
 
        const course = await subjectModel.updateCourse(req.params.id, req.body);
        res.status(200).json({ message: 'Course updated successfully', data: course });
 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
 
// 5. Delete Course
const deleteCourse = async (req, res) => {
    try {
        const existing = await subjectModel.getCourseById(req.params.id);
 
        if (!existing) {
            return res.status(404).json({ message: 'Course not found' });
        }
 
        await subjectModel.deleteCourse(req.params.id);
        res.status(200).json({ message: 'Course deleted successfully' });
 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
 
// 6. Assign Faculty to a Course
const assignFaculty = async (req, res) => {
    try {
        const existing = await subjectModel.getCourseById(req.params.id);
 
        if (!existing) {
            return res.status(404).json({ message: 'Course not found' });
        }
 
        const course = await subjectModel.assignFaculty(req.params.id, req.body.facultyId);
        res.status(200).json({ message: 'Faculty assigned successfully', data: course });
 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
 
module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    assignFaculty,
};