const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let team = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function sneakers() {
  // Manager question section

  function managerInfo() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the manager?",
        },
        {
          type: "input",
          name: "id",
          message: "What is the manager's ID number?",
        },
        {
          type: "input",
          name: "email",
          message: "What is the manager's email?",
        },
        {
          type: "input",
          name: "managerOffice",
          message: "What is the manager's office phone number?",
        },
      ])
      //process the manager's answers
      .then((res) => {
        const manager = new Manager(res.name, res.id, res.email, res.officeNumber
        );
      
        team.push(manager);
        teamInfo();
      });
  }

  function teamInfo() {
    // creating an Engineer or intern position
    inquirer
      .prompt([
        {
          type: "list",
          message:
            "Do you want to create an engineer, intern, or build your team template?",
          name: "memberChoice",
          choices: ["engineer", "intern", "Build your team template"],
        },
      ])
      .then((res) => {
        switch (res.memberChoice) {
          case "engineer":
            addEngineer();
            break;
          case "intern":
            addIntern();
            break;
          case "Build your team template":
            buildTeam();
        }
      });
  }

  function addEngineer() {
    // engineer's info segment
    
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the engineer's name?",
          name: "name",
        },
        {
          type: "input",
          message: "What is the engineer's employee ID number?",
          name: "id",
        },
        {
          type: "input",
          message: "What is the engineer's email?",
          name: "email",
        },
        {
          type: "input",
          message: "What is the engineer's GitHub?",
          name: "github",
        },
      ])
      //engineer's info results
      .then((res) => {
        const engineer = new Engineer(res.name, res.id, res.email, res.github);
        team.push(engineer);
        teamInfo();
      });
  }

  function addIntern() {
    // intern's info segment
    
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the intern's name?",
          name: "name",
        },
        {
          type: "input",
          message: "What is the employee ID number for the intern?",
          name: "id",
        },
        {
          type: "input",
          message: "What is intern's email?",
          name: "email",
        },
        {
          type: "input",
          message: "What school does the intern attend?",
          name: "school",
        },
      ])
      //intern's info results
      .then((res) => {
        const intern = new Intern(res.name, res.id, res.email, res.school);
        team.push(intern);
        teamInfo();
      });
  }

  function buildTeam() {
    
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(team), "utf-8");
  }
  managerInfo();
}
sneakers();
