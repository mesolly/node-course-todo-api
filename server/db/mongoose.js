const mongoose = require('mongoose') ;

var url = 'mongodb+srv://solly:<Saurav7$>@cluster0.7bvqw.mongodb.net/TodoApp?retryWrites=true&w=majority';
mongoose.Promise = global.Promise ;
mongoose.connect(url || 'mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose :mongoose
} ;