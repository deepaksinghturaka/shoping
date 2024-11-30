const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isloggedin");
const productModel= require("../models/prodect-model");
const prodectModel = require("../models/prodect-model");
const userModel = require("../models/user-model");

router.get("/", function(req,res){
    let error = req.flash("error");
    res.render("index",{ error, loggedin: false });

});
router.get("/account", function(req,res){
    let error= req.flash("error");
    res.render("account",{ error, loggedin: false });

});

router.get("/shop", isloggedin,  async function(req,res){
    let products = await productModel.find();  
    let success = req.flash("success");
        res.render("shop", { products ,loggedin: true, success }); 
   

});

router.get("/cart", isloggedin,  async function(req,res){
    let user =await userModel 
    .findOne({email : req.user.email})
    .populate("cart");
    
    // const bill = Number(user.cart[0].price ) + 20 - Number(user.cart[0].discount);
     
    const bill ={};
    res.render("cart", {user, bill , loggedin : true}); 

});



router.get("/addtocart/:productid", isloggedin, async function(req, res) {
    try {
        // Find the user by email
        let user = await userModel.findOne({ email: req.user.email });
        
        if (!user) {
            req.flash("error", "User not found");
            return res.redirect("/shop");
        }

        // Initialize cart if it is undefined
        if (!user.cart) {
            user.cart = [];
        }

        // Add product ID to the cart
        user.cart.push(req.params.productid);

        // Save the updated user document
        await user.save();

        // Set a success message and redirect
        req.flash("success", "Added to cart");
        res.redirect("/shop");
    } catch (error) {
        console.error(error);
        req.flash("error", "An error occurred");
        res.redirect("/shop");
    }
});





module.exports = router;


