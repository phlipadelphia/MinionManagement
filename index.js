const mysql2 = require('mysql2')
const inquirer = require('inquirer')
require('console.table')

// connecting to the minion_db
const db = mysql2.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "minion_db",
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
        function (err, res) {
            if (err) throw err;
            console.table(res);
            selectPrompt()
        })
}

function viewRoles() {
    db.query('SELECT * FROM roles;',
        function (err, res) {
            if (err) throw err;
            console.table(res);
            selectPrompt()
        })
}

function viewEmployees() {
    db.query('SELECT * FROM employees;',
        function (err, res) {
            if (err) throw err;
            console.table(res);
            selectPrompt()
        })
}

function addDepartment() {
    inquirer.prompt([{
        type: 'input',
        name: 'departmentName',
        message: 'Enter Department Name.',
    }]).then(({ departmentName }) => {
        db.query('INSERT INTO departments (department_name) VALUES (?);', departmentName, function (err, res) {
            if (err) throw err;
            console.table(res);
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
    }]).then(res => {
        const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?)';
        const values = [res.roleTitle, res.roleSalary, res.roleDepartmentID]
        db.query(sql, [values], function (err, res) {
            if (err) throw err;
            console.table(res);
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
    }]).then(res => {
        const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?)';
        const values = [res.firstName, res.lastName, res.roleID, res.managerID]
        db.query(sql, [values], function (err, res) {
            if (err) throw err;
            console.table(res);
            selectPrompt()
        })
    })
}
