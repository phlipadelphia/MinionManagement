USE minion_db

INSERT INTO departments (department_name)
VALUES  ("R & D"),
        ("Accounting"),
        ("Production");

INSERT INTO roles (title, salary, department_id)
VALUES  ('CEO', 1200000, 1),
        ('Minion Wrangler', 70000, 2),
        ('Back End Minion', 60000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('Bob', 'Edith', 1, 1),
        ('Dave', 'Margo', 2, 7),
        ('Stuart', 'Agnes', 3, 9);