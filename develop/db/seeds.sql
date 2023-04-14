INSERT INTO department (department_name)
VALUES ("Goal"),
       ("Defence"),
       ("Midfield"),
       ("Atack"),
       ("Bench"),
       ("Headquarters");

INSERT INTO role (title, salary, department_id)
VALUES ("Goalkeeper", 55000, 1),
       ("Full Back", 65000, 2),
       ("Wing Back", 60000, 2),
       ("Attacking Midfielder", 75000, 3),
       ("Defensive Midfielder", 80000, 3),
       ("Striker", 100000, 4),
       ("Center Forward", 90000, 5),
       ("Coach", 20000, 5),
       ("CEO", 60000, 6);
       

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Hugo", "Lloris", 1, 1),
       ("Petr", "Cech", 1, 1),
       ("Sergio", "Ramos", 2, 2),
       ("Theo", "Hernandez", 3, 2),
       ("Gareth", "Bale", 4, 3),
       ("Sergio", "Busquets", 5, 3),
       ("Kylian", "Mbappe", 6, 4),
       ("Erling", "Haaland", 7, 4),
       ("Jurgen", "Klopp", 8, 5),
       ("Florentino", "Perez", 9, 6);