const express = require("express")
const router = express.Router()
const passport = require('passport-jwt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

//Register
router.post('/register', (req, res, next)=>{
    let newUser = new User({
        username: req.body.username,
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
})

router.post('/authenticate', (req, res, next)=>{
    const username = req.body.username
    const password = req.body.password
    User.findOne({username: username}).then((user)=>{
        console.log(user)
        User.comparePassword(password, user.password, (err, isMatch)=>{
            console.log('comparing')
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), process.env.SECRET, {expiresIn: 604800})
                res.json({
                    sucess: true, 
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                })
            } else {
                return res.json({success: false, msg: "wrong password"})
            }
        })
    })
})

router.get('/profile', (req, res, next)=>{
    res.send('profile')
})

module.exports = router;