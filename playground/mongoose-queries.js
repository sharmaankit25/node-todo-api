const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/model/todo');
const {User} = require('./../server/model/user');

var id = "5abf964987a50f217c447ce922";

// if(!ObjectID.isValid(id)){
//     return console.log("id not valid");
// }

// Todo.find({
//     _id:id
// }).then((todos)=>{
//     console.log(todos);
// });

// Todo.findOne({
//     _id:id
// }).then((todo)=>{
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('findOne',todo);
// });

// Todo.findById(id).then((todo)=>{
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('findbyid',todo);
// }).catch((e)=>{
//     console.log(e);
// });


var u_id = "5aad4d49122de7194ce2a3ef";
User.findById(u_id).then((user)=>{
    if(!user){
        return console.log("User not fount");
    }
    console.log('USer is ',user);
},(e)=>{
    console.log(e);
});