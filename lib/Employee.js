// TODO: Write code to define and export the Employee class

const inquirer = require('inquirer');

// set of questions required to create a new object
const _inquirerQuestions = [
  {
    type: 'input',
    name: 'name',
    message: 'Name:',
    validate: (value) => {
      if (value.length >= 2) {
        return true;
      }

      return 'Name is to short (min: 2)';
    },
  },
  {
    type: 'input',
    name: 'id',
    message: 'Id:',
    validate: (value) => {
      if (!Number.isNaN(parseInt(value, 10))) {
        return true;
      }

      return 'Please enter a number';
    },
    // filter: Number // <- leads to NaN issue on invalid input
    filter: (value) => (Number.isNaN(parseInt(value, 10)) ? value : parseInt(value, 10)),
  },
  {
    type: 'input',
    name: 'email',
    message: 'Email:',
    validate: (value) => {
      // https://www.w3resource.com/javascript/form/email-validation.php
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return true;
      }

      return 'Please enter an email';
    },
  },
];

module.exports = class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return 'Employee';
  }

  // using getter syntax to be able to use inquirerQuestions without ()
  // will override this later
  static get inquirerQuestions() {
    return _inquirerQuestions;
  }

  // will override this later
  static createFromAnswers(answers) {
    return new this(answers.name, answers.id, answers.email);
  }

  static create() {
    console.log(`Add ${this.name}`);

    return inquirer.prompt(this.inquirerQuestions).then((answers) => this.createFromAnswers(answers));
  }
};
