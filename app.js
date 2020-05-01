const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// This file will generate the final HTML. You don't need to touch this at all!
const render = require("./lib/htmlRenderer");

// This will be an array of all team member objects created
let teamMembers = [];

// This will be an array of the id values created for each object so there are no duplicates
let idArray = [];


// STUDENT: This function generates all the questions for creating the manager. You need to add more to this.
function createManager(){
  console.log("Please build your team");
  inquirer.prompt([
    {
      type: "input",
      name: "managerName",
      message: "What is your manager's name?",
      // Note how the validate function works
      validate: answer => {
        if (answer !== "") {
          return true;
        }
        return "Please enter at least one character.";
      }
    },
    {
      type: "input",
      name: "managerEmail",
      message: "What is your manager's email address?",
      validate: answer => {
        if(answer !== ""){
          return true;
        }
        return "Please enter at least one character.";
      }
    },
    {
      type: "input",
      name: "managerID",
      message: "What is your manager's ID?",
      validate: answer => {
        if(answer !== "" && !isNaN(answer)){
          return true;
        }
        return "Please enter a number.";
      }
    },
    {
      type: "input",
      name: "managerOffice",
      message: "What is the room number of your project?",
      validate: answer => {
        if(answer !== "" && !isNaN(answer)){
          return true;
        }
        return "Please enter a number.";
      }
    }]).then(answers => {
      const newManager = new Manager.Manager(answers.managerName,answers.managerID,answers.managerEmail, answers.managerOffice);
      teamMembers.push(newManager);
      idArray.push(answers.managerID);
      createTeam();
    });
}

// This function starts team creation.
function createTeam() {
  inquirer.prompt([
    {
      type: "list",
      name: "selection",
      message: "What do you want to do next?",
      choices: ["Add an Engineer","Add an Intern","Remove a team member","Create my page"]
    }
  ]).then(userChoice => {
    switch(userChoice.selection)
    {
      case "Add an Engineer":
        createEngineer();
        break;
      case "Add an Intern":
        createIntern();
        break;
      case "Remove a team member":
        removeMember();
        break;
      case "Create my page":
        renderHtmlPage();
        break;
    }
  });
}

// This function starts team creation.
function createEngineer() {
  inquirer.prompt([
    {
      type: "input",
      name: "EngineerName",
      message: "What is your engineer's name?",// Note how the validate function works
      validate: answer => {
        if (answer !== "") {
          return true;
        }
        return "Please enter at least one character.";
      }
  },
  {
    type: "input",
    name: "EngineerEmail",
    message: "What is your engineer's email address?",
    validate: answer => {
      if (answer !== "") {
        return true;
      }
      return "Please enter at least one character.";
    }
  },
  {
    type: "input",
    name: "EngineerGithub",
    message: "What is this engineer's github username?",
    validate: answer => {
      if (answer !== "") {
        return true;
      }
      return "Please enter at least one character.";
    }
  },
  {
    type: "input",
    name: "EngineerId",
    message: "What is your engineer's ID?",
    validate: answer => {
      if(answer !== "" && !isNaN(answer)){
        return true;
      }
      return "Please enter a number.";
    }
  }
  ]).then(userChoice => {
    if(IdCheck(userChoice.EngineerId))
    {
      const newEngi = new Engineer.Engineer(userChoice.EngineerName,userChoice.EngineerId,userChoice.EngineerEmail,userChoice.EngineerGithub);
      //TODO: Fix this sodding bug
      idArray.push(userChoice.EngineerId);
      teamMembers.push(newEngi);
    }
    createTeam();
  });
}

function createIntern(){
  inquirer.prompt([
    {
      type: "input",
      name: "internName",
      message: "What is your intern's name?",// Note how the validate function works
      validate: answer => {
      if (answer !== "") {
        return true;
      }
      return "Please enter at least one character.";
    }
  },
  {
    type: "input",
    name: "internEmail",
    message: "What is your intern's email address?",
    validate: answer => {
      if (answer !== "") {
        return true;
      }
      return "Please enter at least one character.";
    }
  },
  {
    type: "input",
    name: "internSchool",
    message: "Where does your intern go to school?",
    validate: answer => {
      if (answer !== "") {
        return true;
      }
      return "Please enter at least one character.";
    }
  },
  {
    type: "input",
    name: "internId",
    message: "What is your intern's ID?",
    validate: answer => {
      if(answer !== "" && !isNaN(answer)){
        return true;
      }
      return "Please enter a number.";
    }
  }
  ]).then(userChoice => {
    if(IdCheck(userChoice.internId))
    {
      const newIntern = new Intern.Intern(userChoice.internName,userChoice.internId,userChoice.internEmail,userChoice.internSchool);
      idArray.push(userChoice.internId);
      teamMembers.push(newIntern);
    }
    createTeam();
  });
}

function removeMember()
{
  const choiceArray = ["Never mind"];
  for(let y = 0; y < teamMembers.length; y++)
  {
    if(teamMembers[y].getRole !== "Manager")
    {
      choiceArray.push(teamMembers[y].getName());
    }
  }
  inquirer.prompt([
    {
      type: "list",
      name: "removalSelection",
      message: "Who do you want to remove?",
      choices: choiceArray
    }
  ]).then(choice => {
    if(choice.removalSelection !== "Never Mind")
    {
      for(let z = 0; z < teamMembers.length; z++)
      {
        if(teamMembers[z].getName() === choice.removalSelection)
        {
          if(teamMembers[z].getRole() === "Manager")
          {
            console.log("You can't remove the manager. If you got that wrong, start over.");
          }
          else
          {
            teamMembers.splice(z,1);
            idArray.splice(z,1);
          }
          z = teamMembers.length;
        }
      }
    }
    createTeam();
  });
}

// STUDENT: This function will call the render function required near the top (line 12), 
// and pass INTO it the teamMembers area; from there, write the HTML returned back to a file 
// in a directory called output.
function renderHtmlPage(){
  //console.log(teamMembers);
  //console.log(idArray);
  const HTMLpage = render(teamMembers);
  fs.writeFileSync(outputPath,HTMLpage);
}

// This is our starter function.
// Note that we use separate functions for different questions in inquirer to 
// help keep code organized.
function startMenu() {

  // Here we start things off by calling the createManager function
  createManager()

}

function IdCheck(id)
{
  if(idArray.includes(id))
  {
    console.log("This person has already been added.");
    return false;
  }
  return true;
}


// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


startMenu();