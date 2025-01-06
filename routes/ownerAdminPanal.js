const express = require('express');
const router = express.Router();
const  ownerModel =require('../models/user-model');
const {ownerRegister ,
    ownerLogin,
    ownerlogout,} 
= require("../controllers/adminController");

router.get("/admin-login", function(req,res){
    let error = req.flash("error"); 
    res.render("adminpages/index", { error, loggedin: false });  
});

router.post("/admin-login", ownerLogin ); 

router.get("/ownerlogout ", ownerlogout );



router.post("/admin-register",ownerRegister );


module.exports= router;