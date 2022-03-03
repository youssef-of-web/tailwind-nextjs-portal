const express = require("express");
const User = require("../models/users.models");
const bcrypt = require("bcrypt");
const key = require('../config/keys')
const jwt = require('jsonwebtoken')
const router = express.Router();
const passport = require('passport');
const validateLogin = require('../validator/Login')
const validateRegister = require('../validator/Register')

router.get("/test", (req, res) => res.json("work pages users"));

router.post("/register", (req, res) => {
  const {errors , isValid} = validateRegister(req.body);
  if(!isValid){
   return res.status(404).json(errors)
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "email already exists";
      return res.status(404).json(errors);
    } else {
      const newuser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newuser.password, salt, function (err, hash) {
          if (err) {
            throw err;
          }
          newuser.password = hash;
          newuser
            .save()
            .then((user) => res.json(user))
            .catch((err) => res.send(err));
        });
      });
    }
  });
});


router.post('/login', (req , res)=>{
    
    const {errors, isValid} = validateLogin(req.body)
    if(!isValid){
     return res.status(404).json(errors)
    }
    User.findOne({email : req.body.email})
    .then(user =>{
        if(!user){
          errors.email = "user not found"
          return res.status(404).json(errors)
        }
        bcrypt.compare(req.body.password, user.password)
        .then(isMatch =>{
            if(isMatch){
                const payload = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar
                };
    
                jwt.sign(
                    payload,
                    key.secretOrKey,
                    {expiresIn: 3600},
                    (err, token)=>{
                        res.json(
                            {
                                success : true,
                                token: 'Bearer '+ token
                            }
                        )
                    }
                )
            }else{
                errors.password = "incorrect password"
                res.status(404).json(errors)
            }
        })
    });

});

router.get('/current', passport.authenticate('jwt', {session: false}), (req , res)=>{
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})

module.exports = router;
