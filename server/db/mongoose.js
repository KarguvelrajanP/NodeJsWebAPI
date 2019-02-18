const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const port = process.env.PORT || 3000;



if (port === 3000) {
    // Local Mongo Database Server
    mongoose.connect('mongodb://localhost:27017/APIDb', { useNewUrlParser: true });
    console.log('Local DB');
}
else {
    // Could Mongo Database Server
    mongoose.connect('mongodb+srv://Admin:btlL2eI5dONpX7hj@cluster0-dzrou.mongodb.net/employeeDB?retryWrites=true', { useNewUrlParser: true });
    console.log('Cloud DB');
}

// 'mongodb://localhost:27017/APIDb' || 
module.exports = { mongoose }; 