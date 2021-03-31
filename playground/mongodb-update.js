const {MongoClient,ObjectID} = require('mongoDB') ;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,Client)=>{
    if(err){
        return console.log('Unable to connect');
    }

    var db = Client.db('TodoApp') ;


    
   db.collection('Users').findOneAndUpdate(
        {_id : new ObjectID('60646601398fe8d7f63501d7')},
        { $set : { name : 'Saurav'},
          $inc : {age : 1}  
        },{
            returnOriginal : false
        }
        ).then((result)=>{
            console.log(result);
        });

});