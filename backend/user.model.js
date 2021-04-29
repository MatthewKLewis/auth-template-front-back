const mongoose = require('./connection');

const Schema = mongoose.Schema

const userSchema = new Schema({
        "Name": String,
        "Password": String,
    }
);
  
module.exports = mongoose.model("User", userSchema);