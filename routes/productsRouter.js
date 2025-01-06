 const express = require('express');
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/prodect-model");


router.post("/create", upload.single("image") ,async function (req, res){
    
try {

    let { name, price, discount, bgcolor_color, bgcolor_text, panelcolor_color, panelcolor_text, textcolor_color, textcolor_text } = req.body;
        
        // Handle the color and text input fields
        const bgcolor = bgcolor_color || bgcolor_text || '';
        const panelcolor = panelcolor_color || panelcolor_text || '';
        const textcolor = textcolor_color || textcolor_text || '';


let product = await productModel.create({
    image: req.file.buffer,
    name,
    price, 
    discount,
    bgcolor,
    panelcolor,
    textcolor
});
req.flash("Success","Product created successfully.");
res.redirect("/owners/admin");
}
catch(err){
    res.send(err.massage);
}
});


