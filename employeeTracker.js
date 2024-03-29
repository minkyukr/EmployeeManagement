var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Minkyukr91!",
  database: "employee_trackerDB"
});

connection.connect(function(err) {
  if (err) throw err;
  runTracker();
});

function runTracker() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add departments, roles, employees",
        "View departments, roles, employees",
        "Update employee roles"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Add departments, roles, employees":
        addDRE();
        break;

      case "View departments, roles, employees":
        viewDRE();
        break;

      case "Update employee roles":
        updateRoles();
        break;
      }
    });
}
// until here, the user can choose what it would like to do.
//under this section, I will ask if I want to add a department or roles or employees
function addDRE() {
  inquirer
    .prompt({ 
      name: "addAction",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add departments?", 
        "Add roles?",
        "Add employee?"
    ]
    })
    .then(function(answer) {
      switch (answer.addAction) {
      case "Add departments?":
        addDepartment();
        break;

      case "Add roles?":
        addRoles();
        break;

      case "Add employee?":
        addEmployee();
        break;
      }
    });
}

function addDepartment() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "departmentName",
        type: "input",
        message: "What's the new department?"
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.departmentName
        },
        function(err) {
          if (err) throw err;
          console.log("Your department was created successfully!");
          // re-prompt the user for if they want to bid or post
          runTracker();
        }
      );
    });
}

function addRoles() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What's the new title?"
      },
      {
        name: "salary",
        type: "input",
        message: "Salary?"
      },
      {
        name: "departmentID",
        type: "input",
        message: "What's the department id"
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO roles SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.departmentID
        },
        function(err) {
          if (err) throw err;
          console.log("Your department was created successfully!");
          // re-prompt the user for if they want to bid or post
          runTracker();
        }
      );
    });
}

function addEmployee() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What's the first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What's the last name?"
      },
      {
        name: "departmentID",
        type: "input",
        message: "roleID"
      },
      {
        name: "departmentID",
        type: "input",
        message: "managerID"
      },
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName
        },
        function(err) {
          if (err) throw err;
          console.log("Your employee was created successfully!");
          // re-prompt the user for if they want to bid or post
          runTracker();
        }
      );
    });
}

function viewDRE() {
  inquirer
  .prompt({ 
    name: "viewOption",
    type: "rawlist",
    message: "What would you like to view?",
    choices: [
      "departments?", 
      "roles?",
      "employee?"
  ]
  })
  .then(function(answer) {
    switch (answer.viewDRE) {
    case "departments?":
      viewDepartment();
      break;

    case "roles?":
      viewRoles();
      break;

    case "employee?":
      viewEmployee();
      break;
    }
  });
}
function viewDepartment() {
  var query = "SELECT * FROM department";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.log(res);
    runTracker();
  });
}

function viewRoles() {
  var query = "SELECT * FROM roles";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.log(res);
    runTracker();
  });
}

function viewEmployee() {
  var query = "SELECT * FROM employee";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.log(res);
    runTracker();
  });
}

//여기까지 끝=================================


// function updateRoles() {
//   inquirer
//     .prompt([
//       {
//         name: "start",
//         type: "input",
//         message: "Enter starting position: ",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       },
//       {
//         name: "end",
//         type: "input",
//         message: "Enter ending position: ",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       }
//     ])
//     .then(function(answer) {
//       var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//       connection.query(query, [answer.start, answer.end], function(err, res) {
//         for (var i = 0; i < res.length; i++) {
//           console.log(
//             "Position: " +
//               res[i].position +
//               " || Song: " +
//               res[i].song +
//               " || Artist: " +
//               res[i].artist +
//               " || Year: " +
//               res[i].year
//           );
//         }
//         runTracker();
//       });
//     });
// }
