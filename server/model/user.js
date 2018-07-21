const mongoose =require('mongoose');
const validator = require('validator');

var User = mongoose.model('Users',{
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:1
    },
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message: `{value} is not a valid email`
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
});

module.exports = {
    User
}