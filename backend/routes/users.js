const express = require("express")
const router = express.Router()
const passport = require('passport-jwt')
const jwt = require('jsonwebtoken')

const User = require('../models/user.model')

//Register
router.post('/register', (req, res, next)=>{
    let newUser = new User({
        username: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    User.addUser(newUser, (err, user)=>{
        if (err){
            res.json({success: false, msg: 'failed to register user'})
        } else {
            res.json({success: true, msg: 'registered user'})
        }
    })
    res.send('register')
})

router.get('/authenticate', (req, res, next)=>{
    res.send('authenticate')
})

router.get('/profile', (req, res, next)=>{
    res.send('profile')
})

module.exports = router;