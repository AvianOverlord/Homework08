// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
// If you inherit from a class, make sure you REQUIRE that class


// Basic class structure:
const Employee = require("./Employee.js");

class Engineer extends Employee.Employee{
  constructor(name, id, email, github){
    Super(name,id,email);
    this.github = github;
  }

  getGithub()
  {
    return this.github;
  }

  GetRole()
  {
    return "Engineer";
  }
}

exports.Engineer = Engineer;