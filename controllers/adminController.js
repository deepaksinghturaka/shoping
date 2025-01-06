const userModel =require("../models/user-model");
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");  
const {generateToken}= require("../utils/generateToken");


module.exports.ownerRegister  = async function(req, res){
    try {
       let { email, password, 
         fullname} =req.body;
 
       let user = await userModel.findOne({email:email});
       if (user) return res.status(401).send("you already have an account please login.");
    
    bcrypt.genSalt(10, function(err , salt) { 
       bcrypt.hash(password,salt, async function (err,hash){
          if (err) return res.send(err.message);
          else {
               let user = await userModel.create({
          email ,
          password:hash,
          fullname
       });
      
       let token = generateToken(user);
    
          res.cookie("token" , token);
          res.redirect('owners/admin');
            //  res.send("user created successfuly");
          }
       });
    });
    
    }
    catch (err) {
       console.log(err.message);
    }
    };


 module.exports.ownerLogin = async function (req, res ){   
      let {email, password}= req.body;
     let user= await userModel.findOne({email:email});  

     if (!user) return res.send("Email or password incorrect");

     bcrypt.compare(password, user.password , function (err, result){
 
      if (result){
         let token= generateToken(user);  
         res.cookie("token",token);
          res.render('adminpages/createproducts');
         
         
      }
      else {

         return res.send("Email or password incorrect");
      }

   });
      
    };

module.exports.ownerlogout= function(req,res){
   res.cookie("token","");
   res.redirect("/");
};