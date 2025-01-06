 const mongoose = require('mongoose');
const dbgr = require('debug')('development:mongoose');

// Directly define MongoDB URI here
const mongoURI = "mongodb+srv://deepakpay17:bP4XFk00t9E97Gtz@shoping.uzc9y.mongodb.net/onlineShoping";

mongoose.connect(mongoURI)
.then(() => dbgr('connected'))
.catch((err) => dbgr(err));

module.exports = mongoose.connection;
