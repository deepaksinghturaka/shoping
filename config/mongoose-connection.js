const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')('development:mongoose');

const mongoURI = `${config.get("MONGODB_URI")}/Shoping`;

mongoose.connect(mongoURI)
.then(() => dbgr('connected'))
.catch((err) => dbgr(err));

module.exports = mongoose.connection;
