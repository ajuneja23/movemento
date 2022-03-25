const mongoose=require("mongoose");
const Schema=mongoose.Schema;
/* VISION
really is just a pages directories editable by accounts 
login: movement name, password
registration: 
movement name
pswrd
site link 
person 1
person 2
contact mail
*/
const organizationSchema=new Schema({
    movementname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    sitelink: {
        type: String,
        required: true
    },
    firstperson: {
        type: String,
        required: true
    },
    secondperson: {
        type: String,
        required: false
    },
    contactmail: {
        type: String,
        required: true
    }
});

module.exports=organization=mongoose.model("organizations", organizationSchema);