const inquirer = require("inquirer");
const path = require("path");
// var mysql = require("mysql");

// var connection = mysql.createConnection({
//   host: "localhost",

//   // Your port; if not 3306
//   port: 3306,

//   // Your username
//   user: "root",

//   // Your password
//   password: "root",
//   database: "employee_TrackerDB"
// });

// connection.connect(function(err) {
//   if (err) throw err;
//   runSearch();
// });

const collectInputs = async (inputs = []) => {
  const prompts = [
    {
      type: "list",
      message: "Please choice from the following options",
      choices: [
        "VIEW: Department, Role, or Employee",
        "ADD: Department, Role, Employee",
        "UPDATE: Employee role"
      ],
      name: "options"
    },
    {
      name: "viewOptions",
      type: "list",
      message: "View by:",
      choices: ["Department", "Role", "Employee"],
      when: function(answers) {
        const roleSpecific =
          answers.options == "VIEW: Department, Role, or Employee";
        return roleSpecific;
      }
    },
    {
      name: "addOptions",
      type: "list",
      message: "Add a new:",
      choices: ["Department", "Role", "Employee"],
      when: function(answers) {
        const roleSpecific =
          answers.options == "ADD: Department, Role, Employee";
        return roleSpecific;
      }
    },
    {
      name: "updateOptions",
      type: "list",
      message: "Update an Employees role",
      choices: ["A", "B", "C"],
      when: function(answers) {
        const roleSpecific = answers.options == "UPDATE: Employee role";
        return roleSpecific;
      }
    },
    {
      type: "confirm",
      name: "again",
      message: "Would you like to view/make any more changes?",
      default: true
    }
  ];

  const { again, ...answers } = await inquirer.prompt(prompts);
  const newInputs = [...inputs, answers];
  return again ? collectInputs(newInputs) : newInputs;
};

const generate = async () => {
  const employees = await collectInputs();
  console.log(employees);

  var employeeObjects = [];
  employees.forEach(employee => {
    switch (employee.role) {
      case "Manager":
        employeeObjects.push(
          new Manager(
            employee.name,
            employee.id,
            employee.email,
            employee.officeNumber
          )
        );
        break;
      case "Engineer":
        employeeObjects.push(
          new Engineer(
            employee.name,
            employee.id,
            employee.email,
            employee.github
          )
        );
        break;
      case "Employee":
        employeeObjects.push(
          new Employee(employee.name, employee.id, employee.email)
        );
        break;
      case "Intern":
        employeeObjects.push(
          new Intern(
            employee.name,
            employee.id,
            employee.email,
            employee.school
          )
        );
        break;
    }
  });
};

generate();
