CREATE DATABASE IF NOT EXISTS student_feedback_db;
USE student_feedback_db;

-- Table for Faculty Members
CREATE TABLE IF NOT EXISTS faculty (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Table for Feedback Submissions
CREATE TABLE IF NOT EXISTS feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    student_id VARCHAR(50) NOT NULL,
    faculty_id INT NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (faculty_id) REFERENCES faculty(id) ON DELETE CASCADE
);

-- Sample Data Insertion
INSERT INTO faculty (name, department, email) VALUES
('Dr. A. Sharma', 'Computer Science', 'asharma@univ.edu'),
('Prof. R. Verma', 'Information Technology', 'rverma@univ.edu');
