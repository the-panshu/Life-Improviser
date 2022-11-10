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
app.get("/home",function(req,res){
    res.sendFile(__dirname+"/home.html");
});
app.get("/ourdoctors",function(req,res){
    res.sendFile(__dirname+"/ourdoctors.html");
});
app.get("/anxiety",function(req,res){
    res.sendFile(__dirname+"/anxiety.html");
});
app.get("/depression",function(req,res){
    res.sendFile(__dirname+"/depression.html");
});
app.get("/bipolar",function(req,res){
    res.sendFile(__dirname+"/bipolar.html");
});
app.get("/chronic",function(req,res){
    res.sendFile(__dirname+"/chronic.html");
});
app.get("/ptsd",function(req,res){
    res.sendFile(__dirname+"/ptsd.html");
});
app.get("/abuse",function(req,res){
    res.sendFile(__dirname+"/abuse.html");
});

app.get('/index1', (req, res) => {
    res.sendFile(__dirname + '/index1.html')
})



app.post("/l",function(req,res){
console.log("Hello");
const cng=new Cng({

    changepassword:req.body.cngpassword,
    confirmchangepassword:req.body.ccngpassword
});
console.log((cng));
cng.save();
if(cng.changepassword===cng.confirmchangepassword)
{
    res.send("Your Password has been Saved Succesfully");
    
}
else{
    res.send("Entered Password is not Same");
}
})


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



app.post("/signin", async(req,res)=>{
    console.log("Hello");
    const email = req.body.email;
    const password = req.body.password;
    const useremail = await User.findOne({email:email});
    if(password===null || email===null){
         res.send("Please enter data");
    }
    else{
    if(useremail.password===password){
        res.sendFile(__dirname+"/home.html");
        console.log("yayy");
    } else{
        res.send("<h1>Password is not Matching</h1>");
    }
}
});


http.listen(4000,() => {
    console.log(`port running at ${PORT}`);
})
