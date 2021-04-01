const mongoose = require('mongoose') ;

var Todo = mongoose.model('Todo',{
    text : {
        type : String ,
        required :true,
        trim :true
    },
    completed : {
        type : Boolean ,
        default :false 
    },
    completedAt : {
        type : Number,
        deafualt : null
    }
});

module.exports ={
    Todo
} ;