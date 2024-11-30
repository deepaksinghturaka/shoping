const jwt = require ("jsonwebtoken");

const generateToken = (user) => {
    console.log(process.env.deepak);
    return jwt.sign({email:user.email , id: user._id },process.env.JWT_KEY);
};
module.exports.generateToken = generateToken;