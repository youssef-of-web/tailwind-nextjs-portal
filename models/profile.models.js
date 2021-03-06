const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ProfileSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    postalcode: {
        type: String
    },
    about: {
        type: String
    },
    company:{
        type: String
    },
    location:{
        type: String
    },
    website:{
        type: String
    },
    status:{
        type: String
    },
    skills:{
        type:[String]
    },
    bio:{
        type:String
    },
    githubusername:{
        type:String
    },
    experience:[
        {
            title: {
                type: String,
                required: true
            },
            company:{
                type: String,
                required: true
            },
            location:{
                type: String
            },
            from:{
                type: Date,
                required: true
            },
            to:{
                type: Date
                
            },
            current:{
                type: Boolean,
                default: false
            },
            description:{
                type: String
            }
        }
    ],
    education:[
        {
            school: {
                type: String,
                required: true
            },
            degree:{
                type: String,
                required: true
            },
            fieldofstudy:{
                type: String,
                required: true
            },
            from:{
                type: Date,
                required: true
            },
            to:{
                type: Date
                
            },
            current:{
                type: Boolean,
                default: true
            },
            description:{
                type: String
            }
        }
    ],
    social:{
        youtube:{
            type: String
        },
        twitter:{
            type: String
        },
        linkedin:{
            type: String
        },
        facebook:{
            type: String
        },
        instagram:{
            type: String
        }
    },
    date:{
        type: Date,
        default: Date.now()
    }
    
    });

module.exports = Profile = mongoose.model('profiles', ProfileSchema)