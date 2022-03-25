const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const passport=require("passport");

const organizations=require("./routes/api/organizations");
const app=express();

app.use(express.json());

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

const db=require('./configuration/variables').mongoURI;

mongoose.connect(db,
    {useNewUrlParser: true}
).then(()=>console.log("Successfully connected."))
.catch(err=>console.log(err));

app.use(passport.initialize());
require("./configuration/passport")(passport);
app.use("/api/organizations",organizations);
const port=5000;

app.listen(port, ()=>console.log(`Running on port ${port}`));