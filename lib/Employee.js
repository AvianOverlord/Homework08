// TODO: Write code to define and export the Employee class
class Employee{
    constructor(name,id,email)
    {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    GetName()
    {
        return this.name;
    }

    GetId()
    {
        return this.id;
    }

    GetEmail()
    {
        return this.email;
    }

    GetRole()
    {
        return "Employee";
    }
}

exports.Employee = Employee;