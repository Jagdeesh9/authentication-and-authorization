var express = require('express');
const mongoose = require("mongoose");
var router = express.Router();
const userModel = require('./users');
const passport = require('passport');
const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */
router.get('/', function(req, res, next) {
  // req.session.ban = true;
  // res.send("hiii");
  res.render("index");
});

router.get("/checkban",(req,res)=>{
  if(req.session.ban === true){
    res.send("you are banned from this URL");
  }
  else{
    res.send("your are not banned");
  }
})

router.get("/removeban",(req,res)=>{
  req.session.destroy((err)=>{
    if(err) throw err;
    res.send("ban removed");
  })
})

router.get("/create",(req,res)=>{
  res.cookie("name","Jagdeesh");
  res.send("chek karr");
})
router.get("/see",(req,res)=>{
  console.log(req.cookies.name);
  res.send("check console");
})
router.get("/clear",(req,res)=>{
  res.clearCookie("name")
  res.send("hello");
});

router.get("/creation",async(req,res)=>{
  const createdUser=await userModel.create({
    Username:"0_Keash_9",
    Name: "keash",
    Age: 90
  })
  res.send(createdUser)
})
router.get("/find",async(req,res)=>{
   const all =await userModel.find();
   res.send(all);
})
router.get("/findOne",async(req,res)=>{
  let n = new RegExp("^jagdeesh$")
  const user = await userModel.findOne({Name:"jagdeesh"}); 
  console.log(user);
  res.send(user);
})

router.get("/delete",async(req,res)=>{
  const n = await userModel.findOneAndDelete({Name:"keash"})
  res.send(n);
})

router.get("/profile",isLoggedIn,(req,res)=>{
  res.send("<h1>welcome to profile</h1>")
})

router.post('/register',(req,res)=>{
  var userdata = new userModel({
    Username:req.body.username,
    secert : req.body.secert
  });
})

//code for creating accont and loging in user (note: should be written in idex file)
userModel.register(userdata,req.body.passport)
.then((registereduser)=>{
  passport.authenticate("local")(req,res,()=>{
    res.redirect('/profile');
  })
})

router.post("/login",passport.authenticate("local",{
  successRedirect :"/profile",
  failureRedirect : "/"
}),function(req,res){})

router.get("/logout",function(req,res,next){
  req.logOut(function(err){
    if(err) return next(err);
    req.redirect("/");
  })
})

function isLoggedIn(req,res,nex){
  //if user is logged in he will move forwar other wise stay is "/" route
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}

module.exports = router;
