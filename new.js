const inquirer = require("inquirer");
const path = require("path");
const consoleTable = require("console.table");
var mysql = require("mysql");

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

runSearch();

//RUN AND REPEAT SEARCH FUNCTIONS

function runSearch() {
  inquirer
    .prompt({
      name: "mainQuestions",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "VIEW: Departments/Roles/Employees",
        "ADD: Departments/Roles/Employees",
        "UPDATE: An Employees Role"
      ]
    })
    .then(function(answer) {
      switch (answer.mainQuestions) {
        case "VIEW: Departments/Roles/Employees":
          viewByQuestions();
          break;

        case "ADD: Departments/Roles/Employees":
          addToQuestions();
          break;

        case "UPDATE: An Employees Role":
          console.log("PLACE UPDATE FUNCTION HERE");
          break;
      }
    });
}

const repeatSearch = function(answer) {
  inquirer
    .prompt({
      type: "confirm",
      name: "again",
      message: "Would you like to view/make any more changes?",
      default: true
    })
    .then(function(answer) {
      switch (answer.again) {
        case true:
          console.log("TRUE");
          runSearch();
          break;

        case false:
          connection.end();
      }
    });
};

//QUESTIONS

const viewByQuestions = function(answer) {
  inquirer
    .prompt({
      name: "viewByQuestions",
      type: "list",
      message: "Please select an option below:",
      choices: [
        "VIEW: All Departments",
        "VIEW: All Roles",
        "VIEW: All Employees"
      ]
    })
    .then(function(answer) {
      switch (answer.viewByQuestions) {
        case "VIEW: All Departments":
          console.log("VIEW: All Departments");
          repeatSearch();
          break;

        case "VIEW: All Roles":
          console.log("VIEW: All Roles");
          repeatSearch();
          break;

        case "VIEW: All Employees":
          console.log("VIEW: All Employees");
          repeatSearch();
          break;
      }
    });
};

const addToQuestions = function(answer) {
  inquirer
    .prompt({
      name: "addToQuestions",
      type: "list",
      message: "Please select an option below:",
      choices: ["ADD: A Department", "ADD: A Role", "ADD: An Employee"]
    })
    .then(function(answer) {
      switch (answer.addToQuestions) {
        case "ADD: A Department":
          console.log("ADD: A Department");
          repeatSearch();
          break;

        case "ADD: A Role":
          console.log("ADD: A Role");
          repeatSearch();
          break;

        case "ADD: An Employee":
          console.log("ADD: An Employee");
          repeatSearch();
          break;
      }
    });
};
