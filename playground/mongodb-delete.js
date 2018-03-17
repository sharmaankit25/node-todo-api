// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to monodb server');
    }
    console.log('Connected to mongodb server');

    // deleteMany
    // db.collection('Todos').deleteMany({text:'Eat Lunch'}).then((result)=>{
    //     console.log(result);
    // });

    // Delete One
    // db.collection('Todos').deleteOne({text:"Lunch"}).then((result)=>{
    //     console.log(result);
    // });

    // Find One and delete
    // db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
    //     console.log(result);
    // });

    db.collection('Users').deleteMany({text:""}).then((result)=>{
            console.log(result);
        });


    // db.close();
});