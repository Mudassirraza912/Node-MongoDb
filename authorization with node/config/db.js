const mongoose = require("mongoose");

// connection URI
const mongoURI = "mongodb://Mudassir:mams9990@ds123929.mlab.com:23929/classproject";

// remove deprecation warning of collection.ensureIndex
mongoose.set('useCreateIndex', true);

// connect to mongodb
mongoose.connect(mongoURI, {useNewUrlParser: true})

module.exports = mongoose;