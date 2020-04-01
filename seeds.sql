DROP DATABASE IF EXISTS employeeTracker_DB;

CREATE database employeeTracker_DB;

USE employeeTracker_DB;

CREATE TABLE `department` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE `role` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(30),
    `salary` DECIMAL,
    `department_id` INT,
    PRIMARY KEY(id)
);

CREATE TABLE `employee` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(30),
    `last_name` VARCHAR(30),
    PRIMARY KEY(id)
);

-- INSERT INTO `department` (`name`) VALUES ("DEPARTMENT A");
-- INSERT INTO `role` (`title`, `salary`) VALUES ("ROLE A", 1000);
-- INSERT INTO `employee` (`first_name`, `last_name`) VALUES ("John", "Doe");
-- SELECT * FROM department;
-- SELECT * FROM role;
-- SELECT * FROM employee;