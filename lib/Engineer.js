// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require('./Employee');

// additional question(s) required to create a new object
const _inquirerQuestions = [
  {
    type: 'input',
    name: 'github',
    message: 'GitHub account',
    // validate: (value) => {
    //   // XXX validate name
    //   return true;
    // },
  },
];

module.exports = class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);

    this.github = github;
  }

  getRole() {
    return 'Engineer';
  }

  getGithub() {
    return this.github;
  }

  static get inquirerQuestions() {
    return [...Employee.inquirerQuestions, ..._inquirerQuestions];
  }

  static createFromAnswers(answers) {
    return new this(answers.name, answers.id, answers.email, answers.github);
  }
};
