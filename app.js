const inquirer = require("inquirer");
const fs = require("fs");

const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const util = require("util");

const readTemplate = util.promisify(fs.readFile);
let returnHtml = require("./templates/html");

const employees = [];


// core object for adding, deleting and modifying member details
function addMember() {
  inquirer
    .prompt([
      {
        message: "Enter team member's name",
        name: "name",
      },
      {
        type: "list",
        message: "Select team member's role",
        choices: ["Engineer", "Intern", "Manager"],
        name: "role",
      },
      {
        message: "Enter team member's id",
        name: "id",
      },
      {
        message: "Enter team member's email address",
        name: "email",
      },
    ])
    .then(function ({ name, role, id, email }) {
      let roleInfo = "";
      if (role === "Engineer") {
        roleInfo = "GitHub username";
      } else if (role === "Intern") {
        roleInfo = "education facility";
      } else {
        roleInfo = "contact number";
      }
      inquirer
        .prompt([
          {
            message: `Enter team member's ${roleInfo}`,
            name: "roleInfo",
          },
          {
            type: "list",
            message: "Would you like to add more team members?",
            choices: ["yes", "no"],
            name: "moreMembers",
          },
        ])
        .then(function ({ roleInfo, moreMembers }) {
          let newMember;
          if (role === "Engineer") {
            newMember = new Engineer(name, id, email, roleInfo);
          } else if (role === "Intern") {
            newMember = new Intern(name, id, email, roleInfo);
          } else {
            newMember = new Manager(name, id, email, roleInfo);
          }
          employees.push(newMember);
          addHtml(newMember).then(function () {
            if (moreMembers === "yes") {
              addMember();
            } else {
              finishHtml();
            }
          });
        });
    });
}

async function getHtmlHeader() {
  // load the text file html header content
  const html = await readTemplate("./Assets/html.json");

  fs.writeFile("./output/team.html", html, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

function addHtml(member) {
  return new Promise(function (resolve, reject) {

    // var {name,id,email,school,number} = member;
  
     const name = member.name;
     const id = member.id;
     const email = member.email;
     school = member.school;
     number = member.officeNumber;

    const role = member.getRole(); 

    let data = "";
    if (role === "Engineer") {

      // return engineer html
      data = returnHtml("Engineer", name, role, id, email, member.github);

    }
    else if (role === "Intern") {
      // return intern html
      data = returnHtml("Intern", name, role, id, email, school);

    } else {
      // return manager html
      data = returnHtml("Manager", name, role, id, email, number);
    }

    console.log("adding team member");
    fs.appendFile("./output/team.html", data, function (err) {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

// function to retrive and display footer
function finishHtml() {
  html = returnHtml("footer");
  fs.appendFile("./output/team.html", html, function (err) {
    if (err) {
      console.log(err);
    }
  });
  console.log("end");
}

function init() {
  // console.log(returnHtml());

  getHtmlHeader();
  addMember();
}

function promptUser(input, title, theMessage, theDefault) {
  //console.log(clc.blue("Enter for previous answer : " + theDefault));

  return inquirer.prompt([
    {
      type: input,
      name: title,
      default: theDefault,
      message: theMessage,
    },
  ]);
}






init();
