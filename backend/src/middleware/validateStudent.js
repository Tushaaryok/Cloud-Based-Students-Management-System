// middleware/validateStudent.js
// This is a "middleware" — it runs BETWEEN the route and the controller.
// If everything is valid, call next()
// Its job is to check req.body. If something is invalid, it sends an error from here

const validateStudent = (req, res, next) => {
    const { enrollment_no, first_name, email, phone, date_of_birth } = req.body;
    const errors = [];

    // required fields
    if (!enrollment_no || enrollment_no.trim() === '') {
        errors.push('Enrollment No. are required');
    }

    if (!first_name || first_name.trim() === '') {
        errors.push('First Name is required');
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Email formate is right');
    }
    
    if (phone && !/^\d{10}$/.test(phone)) {
        errors.push('Phone Number must be 10 digit');
    }

    if (date_of_birth) {
        const dob = new Date(date_of_birth);
        if (isNaN(dob.getTime())) {
            errors.push('Date of birth is not in a valid format');
        } else if (dob > new Date()) {
            errors.push('Date of birth cannot be in the future');
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation field', errors });
    }

    next(); // if all are true then go next
}

module.exports = validateStudent;