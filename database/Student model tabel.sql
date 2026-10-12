CREATE DATABASE student_management;
USE student_management;

CREATE TABLE students (
	
		id INT AUTO_INCREMENT PRIMARY KEY,
        enrollment_no VARCHAR(100) NOT NULL UNIQUE,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100),
        email VARCHAR(150) UNIQUE,
        phone VARCHAR(15),
        date_of_birth DATE,
        gender ENUM('Male', 'Female', 'Other'),
        address TEXT,
        city VARCHAR(100),
        state VARCHAR(100),
        pincode VARCHAR(10),
        course VARCHAR(100),
	    class_name VARCHAR(50),
		division VARCHAR(10),
        admission_date DATE,
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESC students;
SELECT * FROM students;


CREATE TABLE students (
	
		id INT AUTO_INCREMENT PRIMARY KEY,
        enrollment_no VARCHAR(100) NOT NULL UNIQUE,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100),
        email VARCHAR(150) UNIQUE,
        phone VARCHAR(15),
        date_of_birth DATE,
        gender ENUM('Male', 'Female', 'Other'),
        address TEXT,
        city VARCHAR(100),
        state VARCHAR(100),
        pincode VARCHAR(10),
        course VARCHAR(100),
	    class_name VARCHAR(50),
		division VARCHAR(10),
        admission_date DATE,
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

drop table students;
SELECT * FROM students;

SELECT id, name, email, role FROM students;