const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/model/todo');
const {User} = require('./../server/model/user');

Todo.remove({}).then((result)=>{

});

Todo.findByIdAndRemove('sda').then((todo)=>{

});

Todo.findOneAndRemove('').then((todo)=>{

})

