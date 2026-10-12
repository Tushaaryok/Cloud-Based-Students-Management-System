use student_management;

CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  courseName VARCHAR(100) NOT NULL,
  courseCode VARCHAR(20) NOT NULL UNIQUE,
  className VARCHAR(20) NOT NULL,
  division VARCHAR(10),
  facultyId INT,
  description TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  studentId INT NOT NULL,
  courseId INT NOT NULL,
  date DATE NOT NULL,
  status ENUM('present', 'absent', 'late') NOT NULL DEFAULT 'present',
  markedBy INT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_attendance (studentId, courseId, date),
  FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS marks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  studentId INT NOT NULL,
  courseId INT NOT NULL,
  semester VARCHAR(20) NOT NULL,
  examType VARCHAR(30) NOT NULL DEFAULT 'Final',
  marksObtained FLOAT NOT NULL,
  maxMarks FLOAT NOT NULL DEFAULT 100,
  grade VARCHAR(5),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_marks (studentId, courseId, semester, examType),
  FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE
);

show tables;
SELECT * FROM students WHERE id = 1;

ALTER TABLE attendance
ADD CONSTRAINT fk_attendance_student
FOREIGN KEY (studentId) REFERENCES students(id) ON DELETE CASCADE;

ALTER TABLE marks 
ADD CONSTRAINT fk_marks_student 
FOREIGN KEY (studentId) REFERENCES students(id) ON DELETE CASCADE;

SELECT * FROM courses;
SELECT * FROM attendance;
SELECT * FROM marks;
SELECT * FROM marks ORDER BY id ASC;



