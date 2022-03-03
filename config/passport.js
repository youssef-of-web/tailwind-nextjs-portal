const passportJwt = require('passport-jwt');

const JwtStrategy = passportJwt.Strategy;

const ExtractJwt = passportJwt.ExtractJwt;

const mongoose = require('mongoose');

const User = mongoose.model('users');

const keys = require('./keys');


const opts ={};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
passport.use(
    new JwtStrategy(opts, (jwt_payload, done)=>{
User.findById(jwt_payload.id)
    .then(user=>
        {
            if(user){
                 return done(null ,user, 'hello');
            }
            return done(null, false);
        })
        .catch(err =>console.log(err))
})
);
};