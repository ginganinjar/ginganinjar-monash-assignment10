
const Employee = require('./Employee');

const _inquirerQuestions = [
  {
    type: 'input',
    name: 'officeNumber',
    message: 'Office number',
    validate: (value) => {
      if (!Number.isNaN(parseInt(value, 10))) {
        return true;
      }

      return 'Please enter an office number';
    },
    // filter: Number // <- leads to NaN issue on invalid input
    filter: (value) => (Number.isNaN(parseInt(value, 10)) ? value : parseInt(value, 10)),
  },
];

module.exports = class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }

  getRole() {
    return 'Manager';
  }

  getOfficeNumber() {
    return this.officeNumber;
  }

  static get inquirerQuestions() {
    return [...Employee.inquirerQuestions, ..._inquirerQuestions];
  }

  static createFromAnswers(answers) {
    return new this(answers.name, answers.id, answers.email, answers.officeNumber);
  }
};
