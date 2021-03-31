const {MongoClient,ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,Client)=>{
    if(err){
        return console.log('Unable to connect');
    }
    const db = Client.db('TodoApp');
    console.log('Connected to MongoDB');

    db.collection('Users').find({name : 'Saurav'}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log('Unable to fetch',err);
    });










   /* db.collection('Todo').find({completed : true}).count().then((count)=>{
        console.log(`Todo Count: ${count}`);
    },(err)=>{
        console.log('Unable to fetch',err);
    });
    /*db.collection('Todo').insertOne({
        name : 'Some task to be done',
        completed : false
    },(err,res)=>{
        if(err){
           return console.log('Unable to insert todo',err);
        }

        console.log(JSON.stringify(res.ops,undefined,2));

    });*/

  /*  db.collection('Users').insertOne({
        name : 'Ben',
        age : 21,
        location : 'Los Angles'
    },(err,result)=>{
        if(err){
            return console.log('Unable to insert in Users');
        }
        console.log(result.ops[0]._id);
    });*/

    //Client.close();    
});