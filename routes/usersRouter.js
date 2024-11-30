const express = require('express');
const router = express.Router();
const userModel =require('../models/user-model');
const {registerUser ,
    loginUser,
     logout,} 
= require("../controllers/authController");

router.get("/", function(req, res){
   res.send('done');
});

router.post("/register", registerUser);


router.post("/login",loginUser ); 

router.get("/logout",logout );

module.exports= router;