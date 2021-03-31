const {MongoClient,ObjectID} = require('mongoDB') ;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,Client)=>{
    if(err){
        return console.log('Unable to connect');
    }

    var db = Client.db('TodoApp') ;
    db.collection('Users').findOneAndDelete({
        _id : new ObjectID('6064435ae1a8270f2033507f')
    }).then((result)=>{
        console.log(result);
    })
});