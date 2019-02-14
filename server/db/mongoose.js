const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Admin:yRWcbllDeAISZcpb@cluster0-xpgzz.azure.mongodb.net/EmployeeDB?retryWrites=true' || 'mongodb://localhost:27017/APIDb', { useNewUrlParser: true });

module.exports = { mongoose }; 