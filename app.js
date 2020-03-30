const inquirer = require("inquirer");
const path = require("path");
const consoleTable = require("console.table");
var mysql = require("mysql");
const orm = require("orm");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employee_TrackerDB"
});

connection.connect(function(err) {
  if (err) throw err;
});

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
        const viewOptions =
          answers.options == "VIEW: Department, Role, or Employee";

        return viewOptions;
      }
    },
    {
      name: "addOptions",
      type: "list",
      message: "Add a new:",
      choices: ["Department", "Role", "Employee"],
      when: function(answers) {
        const addOptions = answers.options == "ADD: Department, Role, Employee";
        return addOptions;
      }
    },
    {
      name: "updateOptions",
      type: "list",
      message: "Update an Employees role",
      choices: ["A", "B", "C"],
      when: function(answers) {
        const updateOptions = answers.options == "UPDATE: Employee role";
        return updateOptions;
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
  const inputs = await collectInputs();
  console.log(inputs);
  
  });
};

generate();

// V I E W

// SELECT * FROM `department`
// SELECT * FROM `role`
// SELECT * FROM `employee`

// function viewDepartments() {
//   var query = "SELECT * FROM `department`";
//   orm.connection.query(query, (err, result) => {
//     consoleTable(result);
//   });
// }



