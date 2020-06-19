const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
 
let team = []

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function teamQuestions() {
    
    // Manager question section
    
    function createManager() {

    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the manager?"
        }, 
        {
            type: "input",
            name: "id",
            message: "What is the manager's ID number?"
        },
        { 
            type: "input",
            name: "email",
            message: "What is the manager's email?"
        },
        { 
              type: "input",
              name: "managerOffice",
              message: "What is the manager's office phone number?"
        }
      
    ])

      .then(res => {
        const manager = new Manager(res.name, res.id, res.email, res.email, res.managerOffice);
        team.push(manager); 
        createTeam();
      })

    }

  // function to write README file
  function writeToFile(fileName, data) {
      return fs.writeFileSync(path.join(process.cwd(), fileName), data)
  }
  
  // function to initialize program
  function init() {
      inquirer
      .prompt (questions)
      .then((data) => {
          let manager = new Manager (data.managerName, data.managerId, data.managerEmail, data.managerOffice)
          teamMembers.push(manager) 
          console.log (teamMembers)
          inquirer
          .prompt ([
            {
                type: "list",
                name: "chosenMember",
                message: "What other team memeber is involved?",
                choices: [
                    "Engineer",
                    "Intern",
                    "No other team members"
                ]
              }
          ])
          .then((data) => {
          if (data.chosenMember === "Engineer"){
              inquirer
              .prompt (engineerQuestions)
              .then((data) => {
                let engineer = new Engineer (data.engineerName, data.engineerId, data.engineerEmail, data.engineerGithub)
                teamMembers.push(engineer) 
                console.log (teamMembers)
              })
          }
          
        }).catch((err) => {
          console.log(err);
        })
  }

  // function call to initialize program
  teamQuestions();
  


