// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to monodb server');
    }
    console.log('Connected to mongodb server');

    // db.collection('Todos').insertOne({
    //     text:'Some todo ',
    //     completed:false
    // },(err,result)=>{
    //     if(err){
    //         return console.log('Unable to inser todo',err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2))
    // })

    // db.collection('Users').insertOne({
    //     name:"ANkit Sharma",
    //     age:25,
    //     location:"delhi"
    // },(err,result)=>{
    //     if(err){
    //         return console.log("Unable to insert user",err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // })

    db.close();
});