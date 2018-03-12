// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to monodb server');
    }
    console.log('Connected to mongodb server');

    // db.collection('Todos').find({completed:true}).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log("unable to fetch",err);
    // });

    db.collection('Users').find({name:"ANkit Sharma"}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
    });

    // db.close();
});