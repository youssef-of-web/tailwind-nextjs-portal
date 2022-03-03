const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLogin(data){
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
   
    if (!validator.isEmail(data.email)) {
        errors.email = "invalid email"
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "required email"
    }

    

    if(!validator.isLength(data.password, {min: 6, max: 20})){
        errors.password = "password must be between 6 and 30 !"
    }
    
    if(validator.isEmpty(data.password)){
        errors.password = "required password"
     }
    

    return {
        errors,
        isValid: isEmpty(errors)
    }

}