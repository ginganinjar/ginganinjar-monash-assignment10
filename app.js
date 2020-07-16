const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = {
  members: [],
};

console.log('Hi, welcome to Team Generator');

async function addTeamMember() {
  console.log('Add a team member');

  const member = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'memberType',
        message: 'Select type of team member:',
        choices: ['Manager', 'Engineer', 'Intern'],
      },
    ])
    .then((answers) => {
      switch (answers.memberType) {
        case 'Manager': return Manager.create();
        case 'Engineer': return Engineer.create();
        case 'Intern': return Intern.create();
        default:
          // should not happen but it is here to make eslint happy
          return null;
      }
    });

  team.members.push(member);

  const addMore = await inquirer
    .prompt([{
      type: 'confirm',
      name: 'addMore',
      message: 'Add more members?',
      default: true,
    }])
    .then((answers) => answers.addMore);

  if (addMore) {
    await addTeamMember();
  }
}

// "promise" style with async/await
function createTeam() {
  return inquirer.prompt([
      {
        type: 'input',
        name: 'teamName',
        message: 'What is the name of the team?',
        validate: (value) => {
          if (value.length > 2) {
            return true;
          }

          return 'Name is to short (min: 3)';
        },
      },
    ])
    .then((answers) => answers.teamName);
}

function mkdir(dir) {
  // Calling fs.mkdir() when path is a directory that exists results in an error only when recursive is false.
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(dir);
      }
    });
  });
}

function writeOutput(html) {
  // console.log(html);

  return new Promise((resolve, reject) => {
    fs.writeFile(outputPath, html, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });
}

(async () => {
  try {
    team.name = await createTeam();

    // at least one manager is required
    team.members.push(await Manager.create());

    await addTeamMember();

    await mkdir(OUTPUT_DIR);
    await writeOutput(render(team.members));

    console.log('Done');
  } catch (err) {
    console.error('Something is wrong', err);
  };
})();