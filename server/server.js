const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
var {mongoose} =require('./db/mongoose');
var {Todo} = require('./model/todo');
var {User} = require('./model/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo = new Todo({
        text:req.body.text
    });

    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    })
    
})

app.get('/todo/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.send(404).send();
    }
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.send(404).send();
        }
        res.send({todo});
    },(e)=>{
        return res.send(400).send(e);
    })
});

app.delete('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!Object.isValid(id)){
        return res.send(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.send(404).send();
        }
        res.send({todo});
    },(e)=>{
        return res.send(400).send(e);
    });
});

app.patch('/todos/:id',(req,res)=>{
    var id = request.params.id;
    var body = _.pick(req.body,['text','completed']);
    if(!Object.isValid(id)){
        return res.send(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
        if(!todo){
            return res.status(400).send();
        }
        return res.send({todo});
    }).catch((e)=>{
        return res.status(400).send();
    })
})

app.post('/users',(req,res)=>{
    var body = _.pick(req.body,['name','email','password']);
    var user = new User(body);
    user.save().then((user)=>{
        res.send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    });
})

app.listen(3000,()=>{
    console.log('Server started on port 3000');
});

module.exports = {app};