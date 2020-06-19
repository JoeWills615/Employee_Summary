// TODO: Write code to define and export the Security class. HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Security extends Employee {

    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getRole() {
        return "Security";
    }

    getOfficeNumber(){
        return this.officeNumber;
    }
}

module.exports = Security;