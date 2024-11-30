const express = require("express");
const app = express();
const expressSession = require('express-session');
const path = require("path");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

require("dotenv").config(); // Load environment variables

const paymentRoute = require('./routes/paymentRouter');
const indexRouter = require("./routes/index");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const paymentRouter = require("./routes/paymentRouter");
const db = require("./config/mongoose-connection");

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
 

// Route handling
app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use('/', paymentRouter);    

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
