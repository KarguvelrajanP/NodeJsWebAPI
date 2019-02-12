
// Library imports ///
const express = require('express');
const bodyParser = require('body-parser');

// Local imports ///
// Initiallizing the mongoose connection from mongoose file
var mongoose = require('./db/mongoose.js');
// Initiallizing the model
var { employee } = require('./models/employee');
var { user } = require('./models/user');

// It will store our express application 
var app = express();
app.use(bodyParser.json());
// It will listen our port 

app.post('/user', (req, res) => {
    var usr = new user({
        userName: req.body.userName,
        email: req.body.email
    });
    usr.save().then((doc) => { res.send(doc); }, (e) => {
        res.status(400).send(e);
    })
});

app.listen(3000, () => {
    console.log('Server is running');
})

module.exports = { app };

// var newEmployee = new employee(
//     {
//         name: ' Testing the app with default  '
//         //   name: 'Rajan', age: 23, isAdmin: true
//     }
// )

// newEmployee.save().then((res) => {
//     console.log(res);
// }, (e) => { console.log(`Unable to save the data into database : ${e}`) }
// );



// var newUser = new user(
//     {
//         userName: 'Rajan',
//         email: 'Karguvelrajan.P@gmail.com'
//     }
// );

// newUser.save().then((res) => {
//     console.log(res);
// }, (e) => { console.log(`Unable to insert the records : ${e}`) })