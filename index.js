const mysql2 = require('mysql2')
const inquirer = require('inquirer')
require("console.table")

// connecting to the minion_db
const db = mysql2.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'minion_db',
});

db.connect(() => {
    console.log("successfully connected to database")
    selectPrompt()
})

// setting up prompt functions through inquirer

function selectPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'Choose An Action!',
            choices: ["Add Department", "Add Role", "Add Employee", "View Departments", "View Roles", "View Employees", "Exit"]
        }
    ])
        .then(({ selection }) => {
            switch (selection) {
                case "Add Department":
                    addDepartment();
                    break
                case "Add Role":
                    addRole();
                    break
                case "Add Employee":
                    addEmployee();
                    break
                case "View Departments":
                    viewDepartments();
                    break
                case "View Roles":
                    viewRoles();
                    break
                case "View Employees":
                    viewEmployees();
                    break;
                default:
                    db.end();
                    process.exit(0);
            }
        })
}

// creating functions for every prompt option given above

function viewDepartments() {
    db.query('SELECT * FROM departments;',
        function (err, response) {
            if (err) throw err;
            console.table(response);
            selectPrompt()
        })
}

function viewRoles() {
    db.query('SELECT * FROM roles;',
        function (err, response) {
            if (err) throw err;
            console.table(response);
            selectPrompt()
        })
}

function viewEmployees() {
    db.query('SELECT * FROM employees;',
        function (err, response) {
            if (err) throw err;
            console.table(response);
            selectPrompt()
        })
}

function addDepartment() {
    inquirer.prompt([{
        type: 'input',
        name: 'departmentName',
        message: 'Enter Department Name.',
    }]).then(({ departmentName }) => {
        db.query('INSERT INTO departments (department_name) VALUES(?);', departmentName, function (err, response) {
            if (err) throw err;
            console.table(response);
            selectPrompt()
        })
    })
}

function addRole() {
    inquirer.prompt([{
        type: 'input',
        name: 'roleTitle',
        message: 'Enter Role Title.'
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'Enter Role Salary.'
    },
    {
        type: 'input',
        name: 'roleDepartmentID',
        message: "Enter Department ID Of Role."
    }]).then(response => {
        const sql = 'INSERT INTO roles (title, salary, department_id) VALUES(?)';
        const values = [response.roleTitle, response.roleSalary, response.roleDepartmentID]
        db.query(sql, [values], function (err, response) {
            if (err) throw err;
            console.table(response);
            selectPrompt()
        })
    })
}

function addEmployee() {
    inquirer.prompt([{
        type: 'input',
        name: 'firstName',
        message: 'Enter Employee First Name.'
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'Enter Employee Last Name.'
    },
    {
        type: 'input',
        name: 'roleID',
        message: "Enter Employee Role ID."
    },
    {
        type: 'input',
        name: 'managerID',
        message: "Enter Employee Manager ID."
    }]).then(response => {
        const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES(?)';
        const values = [response.firstName, response.lastName, response.roleID, response.managerID]
        db.query(sql, [values], function (err, response) {
            if (err) throw err;
            console.table(response);
            selectPrompt()
        })
    })
}
