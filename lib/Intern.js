// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee.js");

class Intern extends Employee.Employee{
  constructor(name, id, email, school){
    super(name,id,email);
    this.school = school;
  }

  getSchool()
  {
    return this.school;
  }

  getRole()
  {
    return "Intern";
  }
}

exports.Intern = Intern;
