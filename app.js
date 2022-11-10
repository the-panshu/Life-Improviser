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

http.listen(4000,() => {
    console.log(`port running at ${PORT}`);
})
