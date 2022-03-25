const Validator=require("validator");
const isEmpty=require("is-empty");

module.exports=function validateLoginData(data) {
    let err={};
    data.movementname=!isEmpty(data.movementname) ? data.movementname: "";
    data.password=!isEmpty(data.password) ? data.password: "";
    if(Validator.isEmpty(data.movementname))
    {
        err.movementname="Movement Name Field is required"
    }
    if(Validator.isEmpty(data.password))
    {
        err.password="Password field is required";
    }
    return {
        err,
        isValid: isEmpty(err)
    };
};