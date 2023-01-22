-- Active: 1668920595276@@127.0.0.1@3306@iipe
CREATE TABLE faculty_academic_experience (
    user_id VARCHAR(11) NOT NULL,
    organisation VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_faculty_academic_experience PRIMARY KEY (user_id, organisation, designation),
    CONSTRAINT fk_faculty_academic_experience_user FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE faculty_academic_experience ADD COLUMN type_of_organisation ENUM ("private", 'state', 'central', 'CFTI/Autonomous/PSU', 'others') NOT NULL AFTER designation;



- Deployment            - 5
- testing/validation    - 10
- UI/UX and System Design (Scalability, Reliability, Performance, Security, Maintainability, Availability) - 5