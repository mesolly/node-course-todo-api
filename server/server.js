var express = require('express') ;
var bodyParser = require('body-parser') ;
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose') ;
var {Todo} =require('./models/todo') ;
var {user} = require('./models/user') ;

const port =process.env.PORT || 3000 ;

var app =express() ;

app.use(bodyParser.json()) ;

app.post('/todos',(request,response)=>{
    var todo = new Todo({
        text : request.body.text
    }) ;
    todo.save().then((doc)=>{
        response.send(doc) ;
    },(err)=>{
        response.status(400).send(err) ;
    }) ;
});

app.get('/todos',(request,response)=>{
    Todo.find().then((todos)=>{
        response.send({todos}) ;
    },(err)=>{
        response.send(err) ;
    }) ;
});

app.get('/todos/:id',(req,res)=>{
    var id = req.params.id ;
    if(!ObjectID.isValid(id)){
         return res.status(400).send();
    }
    Todo.findById(id).then((todo)=>{
        if(!todo){
             return res.status(404).send();
        }
        res.send(todo) ;
    }).catch((e)=>{
        res.status(400).send() ;
    });
});


app.delete('/todos/:id',(req,res)=>{
    var id = req.params.id ;
    if(!ObjectID.isValid(id)){
        return res.status(400).send();
    }
    Todo.findByIdAndDelete(id).then((todo)=>{
        if(!todo){
            res.status(404).send();
        }
        res.status(200).send(todo);
    },(err)=>{
        res.status(400).send();
    });
});

app.listen(port,()=>{
    console.log(`Started at port ${port}`) ;
});

module.exports = {app} ;