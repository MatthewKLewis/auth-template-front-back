const mongoose = require('../connection');
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const userSchema = new Schema({
        "username": {
            type: String,
            required: true
        },
        "email": {
            type: String,
            required: true
        },
        "password": {
            type: String,
            required: true
        },
    }
);
  
module.exports = mongoose.model("User", userSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback)
        })
    })
}