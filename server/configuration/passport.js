const JwtStrategy=require("passport-jwt").Strategy;
const ExtractJwt=require("passport-jwt").ExtractJwt;
const mongoose=require("mongoose");
const organization=mongoose.model("organizations");
const variables=require("./variables");
const opts={};
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=variables.secretOrKey;
module.exports=passport=>{
    passport.use(
        new JwtStrategy(opts,(jwt_payload,done)=>{
            organization.findById(jwt_payload.id).then(
                org=>{
                    if(org)
                    {
                        return done(null,org);
                    }
                    return done(null,false);
                }).catch(err=>console.log(err));
        })
    );
};