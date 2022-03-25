const Validator=require("validator");
const isEmpty=require("is-empty");

module.exports=function validateRegistrationdata(data) {
    let err={};

    data.movementname=!isEmpty(data.movementname) ? data.movementname: "";
    data.password=!isEmpty(data.password) ? data.password: "";
    data.sitelink=!isEmpty(data.sitelink) ? data.sitelink: "";
    data.firstperson=!isEmpty(data.firstperson) ? data.firstperson: "";
    data.secondperson=!isEmpty(data.secondperson) ? data.secondperson: "";
    data.contactmail=!isEmpty(data.contactmail) ? data.contactmail: "";
    if(Validator.isEmpty(data.movementname)) 
    {
        err.movementname="Movement Name field is required";
    }
    if(Validator.isEmpty(data.password)) 
    {
        err.password="Password field is required";
    }
    if(Validator.isEmpty(data.firstperson)) 
    {
        err.firstperson="Person 1 field is required";
    }
    if(Validator.isEmpty(data.sitelink)) 
    {
        err.sitelink="Website field is required";
    }
    if(Validator.isEmpty(data.contactmail)) 
    {
        err.contactmail="Contact Email field is required";
    }
    else if(!Validator.isEmail(data.contactmail)) 
    {
        err.contactmail="Email is invalid";
    } 
    return {
        err,
        isValid: isEmpty(err)
    };
};