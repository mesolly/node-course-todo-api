var express = require('express') ;
var bodyParser = require('body-parser') ;

var {mongoose} = require('./db/mongoose') ;
var {Todo} =require('./models/todo') ;
var {user} = require('./models/user') ;


var app =express() ;

app.use(bodyParser.json()) ;

app.post('/todos',(request,response)=>{
    var todo = new Todo({
        text : request.body.text
    }) ;
    todo.save().then((doc)=>{
        response.send(doc) ;
    },(err)=>{
        response.send(err) ;
    }) ;
});

app.listen(3000,()=>{
    console.log('Stared at 3000') ;
})