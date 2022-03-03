const validator = require('validator');
const isEmpty = require('./isEmpty')

module.exports = function validateRegistration(data){
    
    const errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    
    if (!validator.isLength(data.password, {min: 6, max:20})) {
        errors.password = "password must be between 6 and 20"
    }
    if (!validator.isLength(data.password2,  {min: 6, max:20})) {
        errors.password2 = "confirm password  must be between 6 and 20"
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "required password"
    }
    if (validator.isEmpty(data.password2)) {
        errors.password2 = "required confirm password"
    }
    if (!validator.isEmail(data.email)) {
        errors.email = "invalid email"
    }
    if (validator.isEmpty(data.name)) {
        errors.name = "required name"
    }
    if (validator.isEmpty(data.email)) {
        errors.email = "required email"
    }
    
    

   

    if(!validator.equals(data.password, data.password2)){
       errors.password2 = "password must matches"
    }






    return{
        errors,
        isValid: isEmpty(errors)
    }
}