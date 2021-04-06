const {mongoose} = require('./../server/db/mongoose') ;
const {Todo} = require('./../server/models/todo') ;
const {user} = require('./../server/models/user') ;

var id = '606b02f0335ae9292cb8a586' ;
var id2 = '60659f58ce32861c6cd68615';

Todo.findById(id).then((todo)=>{
    if(!todo){
        return console.log('Id invalid') ;
    }
    console.log(JSON.stringify(todo,undefined,2));
}).catch((err)=>{
    console.log(err) ;
});

user.findById(id2).then((users)=>{
    if(!users){
        return console.log('Inavlid User Id') ;
    }
    console.log(JSON.stringify(users,undefined,2)) ;
},(err)=>{
    console.log(err) ;
});