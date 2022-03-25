const express=require("express");
const router=express.Router();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const variables=require("../../configuration/variables");

const validateRegistrationdata=require("../../validating/register");
const validateLoginData=require("../../validating/login");
const organization=require("../../models/organization");
//register route
router.post("./register", (req,res) => {
    const {err,isValid}=validateRegistrationdata(req.body);
    if(!isValid)
    {
        return res.status(400).json(err);
    }
    organization.findOne({
        movementname: req.body.movementname
    }).then(org=>{
        if(org)
        {
            return res.status(400).json({movementname: "Movement Name already exists"});
        }
        else 
        {
            const newOrg=new organization({
                movementname: req.body.movementname,
                password: req.body.password,
                sitelink: req.body.sitelink,
                firstperson: req.body.firstperson,
                secondperson: req.body.secondperson,
                contactmail: req.body.contactmail
            });
            bcrypt.genSalt(10, (err,salt)=> {
                bcrypt.hash(newOrg.password,salt,(err,hash)=>{ 
                    if(err)
                    {
                        throw err;
                    }
                    newOrg.password=hash;
                    newOrg.save()
                    .then(org=>res.json(org))
                    .catch(err=>console.log(err));
                });
            });
        }
    });
});


//login route
router.post("/login",(req,res)=>{
    const {err,isValid}=validateLoginData(req.body);
    if(!isValid)
    {
        return res.status(400).json(err);
    }
    const movementname=req.body.movementname;
    const password=req.body.password;
    organization.findOne({movementname: req.body.movementname}).then(
        org=>{
            if(!org)
            {
                res.status(400).json({movementnamenotexist: "There is no registered movement with this name."});
            }
            bcrypt.compare(org.password,password).then(
                isMatch=>{
                    if(isMatch)
                    {
                        const payload={
                            id: org.id,//HELP I DONT UNDERSTAND JWT AT ALL I FEEL LIKE IM THROWING RANDOM THINGS TOGETHER WHY AM I USING THIS
                            movementname: org.movementname
                        };
                        jwt.sign(payload,variables.secretOrKey,{
                            expiresIn: 31556926
                        },
                        (err,token)=>{
                            res.json({
                                success: true,
                                token: "Bearer "+token
                            });
                        }
                        );
                    }
                    else 
                    {
                        return res.status(400).json({wrongpassword: "The entered password is incorrect"})
                    }
                });
        });
});

module.exports=router;//export router 