const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
var userSchema = new mongoose.Schema({
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
})

userSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject,['_id','email']);
};

userSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
    // user.tokens.push({access,token});
    user.tokens = user.tokens.concat([{access,token}]);

    return user.save().then(()=>{
        return token;
    });
};

var User = mongoose.model('Users',userSchema);

module.exports = {
    User
}