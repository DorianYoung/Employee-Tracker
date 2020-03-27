DROP DATABASE IF EXISTS employee_TrackerDB;

CREATE database employee_TrackerDB;

USE employee_TrackerDB;

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

SELECT
    *
FROM
    `department`;

SELECT
    *
FROM
    `role`;

SELECT
    *
FROM
    `employee`;