const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Admin:btlL2eI5dONpX7hj@cluster0-dzrou.mongodb.net/employeeDB?retryWrites=true', { useNewUrlParser: true });

// 'mongodb://localhost:27017/APIDb' || 
module.exports = { mongoose }; 