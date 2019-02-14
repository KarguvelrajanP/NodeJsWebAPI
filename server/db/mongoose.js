const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/APIDb'|| 'mongodb+srv://Admin:yRWcbllDeAISZcpb@cluster0-xpgzz.azure.mongodb.net/EmployeeDB?retryWrites=true', { useNewUrlParser: true });

module.exports = { mongoose }; 