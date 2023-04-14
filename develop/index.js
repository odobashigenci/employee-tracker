const mysql = require("mysql2");
const dotenv = require("dotenv");
const { prompt } = require("inquirer");
require("console.table");
dotenv.config();
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) throw err;
});
function startQuestions() {
  prompt([
    {
      type: "list",
      name: "Option",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Add Employee",
        "Remove Employee",
        "Add Role",
        "Remove Role",
        "Add Department",
        "Remove Department",
        "Exit",
      ],
    },
  ]).then((data) => {
    switch (data.Option) {
      case "View All Employees":
        viewAllEmployees();
        break;
      case "View All Roles":
        viewAllRoles();
        break;
      case "View All Departments":
        viewAllDepartments();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "Remove Employee":
        removeEmployee();
        break;  
      case "Add Role":
        addRole();
        break;
      case "Remove Role":
        removeRole();
        break;  
      case "Add Department":
        addDepartment();
        break; 
      case "Remove Department":
        removeDepartment();
        break;
      case "Exit":
        exit(); 
        break;      
    }
  });
}
function viewAllEmployees() {
  const data = connection.promise().query("SELECT * FROM employee");
  data.then(([data]) => {
    console.table(data);
    startQuestions();
  });
}

function viewAllRoles() {
  const data = connection.promise().query("SELECT * FROM role");
  data.then(([data]) => {
    console.table(data);
    startQuestions();
  });
}

function viewAllDepartments() {
    const data = connection.promise().query("SELECT * FROM department");
    data.then(([data]) => {
      console.table(data);
      startQuestions();
    });
  }

function addEmployee() {
  prompt([
    { name: "firstName", message: "What is the employee`s first name?" },
    { name: "lastName", message: "What is the employee`s last name?" },
  ]).then(({firstName, lastName}) => {
    const roleData =connection.promise().query('SELECT * FROM role')
    roleData.then(([data]) => {
        const roleChoices = data.map(({id, title }) => ({
            name: title,
            value: id
        }))
        prompt({
            type: 'list',
            name: 'selectedRole',
            message:'What is their role?',
            choices: roleChoices
        }).then(res => {
           const roleId = res.selectedRole;
        const managerData = connection.promise().query('SELECT * FROM employee');
        managerData.then(([data]) => {
          const managerChoices = data.map(({id, first_name, last_name}) => ({
            name: `${first_name} ${last_name}`,
            value: id,
          }));
          managerChoices.unshift({name: 'None', value: null});

          prompt({
            type: 'list',
            name: 'selectedManager',
            message: 'Who is their manager? (you must select one)',
            choices: managerChoices,
          }).then(managerRes => {
            const managerId = managerRes.selectedManager;
            const query = connection.promise().query(
              'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
              [firstName, lastName, roleId, managerId],
            );
            query.then(() => {
              console.log('Employee entered successfully.');
              startQuestions();
            });
          });
        });
      });
    });
  });
}

function removeEmployee(){
  prompt({
    name: "id",
    message: "Enter the ID of the employee you want to remove:",
  }).then(({ id }) => {
    connection.promise().query("DELETE FROM employee WHERE id=?", [id]).then(() => {
      console.log("Emplyee removed successfully");
      startQuestions();
    })
  })
}

function addRole(){
  const questions = [
    {
      name: "title",
      message: "What is the role you want to add?"
    },
    {
      name: "salary",
      message: "What is the salary for this role?"
    },
    {
      name: "department",
      message: "Under which department do you want this role to be added?"
    }
  ];
  prompt(questions).then(({ title, salary, department}) => {
    const insertQuery = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
    const getDepartmentQuery = "SELECT id FROM department WHERE department_name = ?";
    connection.promise().query(getDepartmentQuery, department).then(([results]) => {
      if (results.lengh === 0) {
        console.log(`Dpartment ${department} does not exist.`);
        startQuestions();
        return;
      }
      const departmentId = results[0].id;
      connection.promise().query(insertQuery, [title, salary, departmentId]).then(() => {
        console.log(`Role ${title} added to ${department} department.`);
        startQuestions();
      })
      .catch((error) => {
        console.error(error);
        startQuestions();
      })
    })
  })
}

function removeRole() {
  const getRoleQuery = "SELECT * FROM role";
  connection.promise().query(getRoleQuery).then(([roles]) => {
    const roleChoices = roles.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });
    const questions = {
      name: "roleId",
      type: "list",
      message: "Which role do you want to remove?",
      choices: roleChoices,
    };
    prompt(questions).then(({roleId}) => {
      const deleteQuery = "DELETE FROM role WHERE id =?";
      connection.promise().query(deleteQuery, roleId).then(() => {
        console.log("Role removed successfully.");
        startQuestions();
      })
      .catch((error) => {
        console.error(error);
        startQuestions();
      });
    });
  })
  .catch((error) => {
    console.error(error);
    startQuestions();
  })
}

function addDepartment(){
  prompt([
    {
      name: "departmentName",
      message: "What is the name of the department that you want to add?"
    }
  ]).then(({departmentName}) => {
    const query = connection.promise().query("INSERT INTO department (department_name) VALUES (?)",
    [departmentName]
    );
    query.then(() => {
      console.log(`Department '${departmentName}' added successfully.`);
      startQuestions();
    }).catch(error => {
      console.error(error);
      startQuestions();
    });
  });
}

function removeDepartment() {
  const departmentData = connection.promise().query('SELECT * FROM department');
  departmentData.then(([data]) => {
    const departmentChoices = data.map(({id, department_name}) => ({
      name: department_name,
      value: id,
    }));

    prompt({
      type: 'list',
      name: 'selectedDepartment',
      message: 'Which department would you like to remove?',
      choices: departmentChoices,
    }).then(res => {
      const departmentId = res.selectedDepartment;

      connection.promise().query('DELETE FROM department WHERE id = ?', departmentId)
        .then(() => {
          console.log(`Department with id ${departmentId} has been removed successfully.\n`);
          startQuestions();
        })
        .catch(err => console.log(err));
    });
  });
}

function exit() {
    console.log("Goodbye!");
    process.exit(0);
  }

startQuestions();
