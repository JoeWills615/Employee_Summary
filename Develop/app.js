const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Security = require("./lib/Security");
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
            "Would you like to add an engineer, security, intern or finalize your team?",
          name: "memberChoice",
          choices: ["engineer", "security", "intern", "finalize team"],
        },
      ])
      .then((res) => {
        switch (res.memberChoice) {
          case "engineer":
            addEngineer();
            break;
          case "security":
            addSecurity();
            break;
          case "intern":
            addIntern();
            break;
          case "finalize team":
            buildTeam();
        }
      });
  }
    // engineer's info segment
  function addEngineer() {
    
    
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

   // security's info segment
  function addSecurity() {
        
    inquirer
      .prompt([
        {
          type: "input",
          message: "Who is handling security?",
          name: "name",
        },
        {
          type: "input",
          message: "What is the ID number for security?",
          name: "id",
        },
        {
          type: "input",
          message: "What is the email for the security officer?",
          name: "email",
        },
        {
          type: "input",
          message: "What is the phone number for security?",
          name: "managerOffice",
        },
      ])
      //engineer's info results
      .then((res) => {
        const security = new Security(res.name, res.id, res.email, res.officeNumber);
        team.push(security);
        teamInfo();
      });
  }

    // intern's info segment
  function addIntern() {
        
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
