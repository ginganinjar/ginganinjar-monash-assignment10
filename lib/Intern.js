// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

const Employee = require('./Employee');

const _inquirerQuestions = [
  {
    type: 'input',
    name: 'school',
    message: 'School name',
    validate: (value) => {
      if (value.length >= 2) {
        return true;
      }

      return 'School name is to short (min: 2)';
    },
  },
];

module.exports = class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);

    this.school = school;
  }

  getRole() {
    return 'Intern';
  }

  getSchool() {
    return this.school;
  }

  static get inquirerQuestions() {
    return [...Employee.inquirerQuestions, ..._inquirerQuestions];
  }

  static createFromAnswers(answers) {
    return new this(answers.name, answers.id, answers.email, answers.school);
  }
};
