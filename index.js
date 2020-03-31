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
  database: "employeeTracker_DB"
});

connection.connect(function(err) {
  if (err) throw err;
});

startSearch();

//RUN AND REPEAT SEARCH FUNCTIONS

function startSearch() {
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
          startSearch();
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
          viewDepartment();
          break;

        case "VIEW: All Roles":
          console.log("VIEW: All Roles");
          viewRole();
          break;

        case "VIEW: All Employees":
          console.log("VIEW: All Employees");
          viewEmployee();
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
          addDepartment();
          break;

        case "ADD: A Role":
          console.log("ADD: A Role");
          addRole();
          break;

        case "ADD: An Employee":
          console.log("ADD: An Employee");
          addEmployee();
          break;
      }
    });
};

//FUNCTIONS
//VIEW FUNCTIONS

function viewDepartment() {
  connection.query("SELECT * FROM `department`", function(err, res) {
    if (err) throw err;
    console.table(res);
    repeatSearch();
  });
}

function viewRole() {
  connection.query("SELECT * FROM `role`", function(err, res) {
    if (err) throw err;
    console.table(res);
    repeatSearch();
  });
}

function viewEmployee() {
  connection.query("SELECT * FROM `employee`", function(err, res) {
    if (err) throw err;
    console.table(res);
    repeatSearch();
  });
}

//ADD FUNCTIONS

function addDepartment() {
  var query = connection.query(
    "INSERT INTO `department` SET ?",
    { name: "CODE TO GET NAME FROM INQUIRER" },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " department inserted!\n");
      viewDepartment();
    }
  );
  // logs the actual query being run
  //console.log(query.sql);
}

function addRole() {
  var query = connection.query(
    "INSERT INTO `role` SET ?",
    {
      title: "ROLE TITLE FROM INQUIRER",
      salary: 100
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " role inserted!\n");
      viewRole();
    }
  );
  // logs the actual query being run
  //console.log(query.sql);
}

function addEmployee() {
  var query = connection.query(
    "INSERT INTO `employee` SET ?",
    {
      first_name: "John",
      last_name: "Doe"
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " employee inserted!\n");
      viewEmployee();
    }
  );
  // logs the actual query being run
  //console.log(query.sql);
}
