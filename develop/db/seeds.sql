INSERT INTO department (department_name)
VALUES ("Central Control"),
       ("Linehaul"),
       ("Operations"),
       ("HR"),
       ("QA"),
       ("Maintenance");

INSERT INTO role (title, salary, department_id)
VALUES ("Ops Manager", 55000, 1),
       ("Coordinator", 50000, 2),
       ("Ops Admin", 40000, 2),
       ("Area Manager", 65000, 3),
       ("Sort Manager", 85000, 3),
       ("Associate", 50000, 4),
       ("Business Partner", 85000, 4),
       ("QA Specialist", 40000, 5),
       ("Technician", 60000, 6),
       ("Engineer", 75000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Gareth", "Bale", 1, 1),
       ("Harry", "Kane", 2, 2),
       ("Erling", "Haaland", 3, 3),
       ("Bernardo", "Silva", 4, 3),
       ("Rafael", "Leao", 4, 4),
       ("Zlatan", "Ibrahimovic", 4, 2),
       ("Sandro", "Tonali", 5, 1),
       ("Lionel", "Messi", 6, 6),
       ("Cristiano", "Ronaldo", 6, 7);