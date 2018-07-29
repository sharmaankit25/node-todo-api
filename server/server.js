const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
var {mongoose} =require('./db/mongoose');
var {Todo} = require('./model/todo');
var {User} = require('./model/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();

app.use(bodyParser.json());

app.post('/todos',authenticate,(req,res)=>{
    var todo = new Todo({
        text:req.body.text,
        _creator:req.user._id
    });

    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos',authenticate,(req,res)=>{
    Todo.find({_creator:req.user._id}).then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    })
    
})

app.get('/todo/:id',authenticate,(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.send(404).send();
    }
    Todo.findOne({
        _id:id,
        _creator:req.user._id
    }).then((todo)=>{
        if(!todo){
            return res.send(404).send();
        }
        res.send({todo});
    },(e)=>{
        return res.send(400).send(e);
    })
});

app.delete('/todos/:id',authenticate,(req,res)=>{
    var id = req.params.id;
    if(!Object.isValid(id)){
        return res.send(404).send();
    }
    Todo.findOneAndRemove({
        _id:id,
        _creator:req.user._id
    }).then((todo)=>{
        if(!todo){
            return res.send(404).send();
        }
        res.send({todo});
    },(e)=>{
        return res.send(400).send(e);
    });
});

app.patch('/todos/:id',authenticate,(req,res)=>{
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

    Todo.findOneAndUpdate({_id:id,_creator:req.user._id},{$set:body},{new:true}).then((todo)=>{
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
    user.save().then(()=>{
        // res.send(user);
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    });
});

app.post('/users/login',(req,res)=>{
    var body = _.pick(req.body,['email','password']);
    User.findByCredentials(body.email,body.password).then((user)=>{
        return user.generateAuthToken().then((token)=>{
            res.send(token);
        });
    }).catch((e)=>{
        res.status(400).send();
    });
});

app.get('/users/me',authenticate,(req,res)=>{
    res.send(req.user);
});

app.delete('/users/me/token',authenticate,(req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    },()=>{
        res.status(400).send();
    });
});

app.listen(3000,()=>{
    console.log('Server started on port 3000');
});

module.exports = {app};