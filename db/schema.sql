DROP DATABASE IF EXISTS minion_db;
CREATE DATABASE minion_db;

USE minion_db;

CREATE TABLE departments(
    id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT NOT NULL DEFAULT 1
);

CREATE TABLE employees(
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL REFERENCES roles(department_id),
    manager_id INT REFERENCES employee(id) ON DELETE SET NULL
);
