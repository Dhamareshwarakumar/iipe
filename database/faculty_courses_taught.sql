-- Active: 1668920595276@@127.0.0.1@3306@iipe

DROP TABLE faculty_courses_taught;

CREATE TABLE faculty_courses_taught (
    user_id VARCHAR(11) NOT NULL,
    course_code VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    level ENUM ("ug", "pg", "phd") NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_faculty_courses_taught PRIMARY KEY (user_id, course_code),
    CONSTRAINT fk_faculty_courses_taught_user FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;