const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Admin:btlL2eI5dONpX7hj@cluster0-dzrou.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });
module.exports = { mongoose }; 