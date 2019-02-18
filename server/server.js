// Library imports ///
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');
// Local imports ///
// Initiallizing the mongoose connection from mongoose file
var mongoose = require('./db/mongoose.js');
// Initiallizing the model
var { employee } = require('./models/employee');
var { user } = require('./models/user');
// It will store our express application 
var app = express();
app.use(bodyParser.json());
// Be
const port = process.env.PORT || 3000;
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
// Deleting record from user collection
app.delete('/user/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    user.findByIdAndRemove(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
})
// Updating the documents 
app.patch('/user/:id', (req, res) => {
    var id = req.params.id;
    //   console.log(req.body);
    var body = _.pick(req.body, ['userName', 'email']);
    //  console.log(body);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    //  console.log(body);
    user.findByIdAndUpdate(id, { $set: body }, { new: true }).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    })
})

app.listen(port, () => {
    console.log(`Server run in ${port}`);
})
module.exports = { app };