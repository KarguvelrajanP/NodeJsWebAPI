var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/APIDb'
}
else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/APIDbTest'
}
else {
    process.env.MONGODB_URI = 'mongodb+srv://Admin:btlL2eI5dONpX7hj@cluster0-dzrou.mongodb.net/employeeDB?retryWrites=true';
}