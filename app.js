const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const ejs=require("ejs");
const { stringify } = require("querystring");
const { rmSync } = require("fs");
const app =express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"));
mongoose.connect("mongodb://127.0.0.1/SignupDB",{useNewUrlParser:true});
const db=mongoose.connection;
const http = require('http').createServer(app);
const PORT = process.env.PORT || 4000


app.get("/",function(req,res){
     res.sendFile(__dirname+"/index.html");
});
app.get("/signup",function(req,res){
     res.sendFile(__dirname+"/signup.html");
});


app.get("/forgetpass",function(req,res){
     res.sendFile(__dirname+"/forgetpass.html");
});

app.get("/signin",function(req,res){
    res.sendFile(__dirname+"/signin.html");
});



app.post("/signup", async function(req,res){
    console.log("holaa");
   
    const user=new User({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    cpassword:req.body.confirmPassword
    });
    const email = req.body.email;
    const ouruser = await User.findOne({email: email});
    if(ouruser.email === user.email){
       res.send("This email already exist");
    
    }
    else{
    if(user.password===user.cpassword){
    
    user.save();
    res.sendFile(__dirname+"/signin.html");
    }
    else{
        res.send("error");
    }
}
});



http.listen(4000,() => {
    console.log(`port running at ${PORT}`);
})
