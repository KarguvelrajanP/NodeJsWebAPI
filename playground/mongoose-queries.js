const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { user } = require('../server/models/user');
const { employee } = require('../server/models/employee');
// var id = '5c6267291846025334947839';

// Code to get the data from user collection 
// user.find({ _id: id }).then((users) => {
//     console.log('Users', users);
// }).catch((e) => {
//     console.log(`Una`)
// })

// Code to get the only one data from user collection
// user.findOne({ _id: id }).then((user) => {
//     console.log('User', user);
// })

// This is code check the Id is valid or not //
// if (!ObjectID.isValid(id)) {
//     console.log('This is not valid id');
// } else {
//     console.log('This is valid ID');
// }

// This code to get the data with ID
// user.findById(id).then((user) => {
//     if (!user) {
//         return console.log('Record not found. Please try with any other id ');
//     }
//     console.log('User by id', user);
// }).catch((e) => { console.log(e) });

var id = '5c62abd8394be880551a8874';

employee.findById(id).then((emp) => {
    if (!emp) {
        return console.log('Record not found. Please try with any other id ');
    }
    console.log('Employee', emp);
})