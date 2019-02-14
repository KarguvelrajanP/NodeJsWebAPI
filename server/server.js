
// Library imports ///
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
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

// Inserting data into user collection using POST method POST /user
app.post('/user', (req, res) => {
    var usr = new user({
        userName: req.body.userName,
        email: req.body.email
    });
    usr.save().then((doc) => { res.send(doc); }, (e) => {
        res.status(400).send(e);
    })
});

// Getting all reocords from user collection using get method  Get /users
app.get('/users', (req, res) => {
    user.find({}).then((users) => {
        res.send({ users, status: 200 })
    }, (e) => {
        res.status(400).send(e);
    })
});

// Getting the data by ID 
app.get('/user/:id', (req, res) => {
    var id = req.params.id;
    // Checking id is valid or not using mongodb ObjectID
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    user.findById(id).then((emp) => {       
        if (!emp) {
            return res.status(404).send();
        }
        res.send(emp);
    }).catch((e) => {
        res.status(400).send();
    })
})

app.listen(3000, () => {
    console.log('Server is running');
})

module.exports = { app };

