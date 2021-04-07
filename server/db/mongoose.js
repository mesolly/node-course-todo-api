const mongoose = require('mongoose') ;


mongoose.Promise = global.Promise ;
mongoose.connect(process.env.DATABASE || 'mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose :mongoose
} ;