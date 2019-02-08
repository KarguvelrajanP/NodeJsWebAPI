//const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb');

// var objID = new ObjectID();
// console.log(objID);

// var user = { name: 'Kargu', age: 29 };
// var { name } = user;

// console.log(name); // OutPut : Kargu

MongoClient.connect('mongodb://127.0.0.1:27017/', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log(`Unable to connect the mongoDB ${err}`);
    }
    console.log('MongoDB is connected successfully');
    const db = client.db('ApiDb');

    // db.collection('employee').insertOne({
    //     EmployeeName: 'Karguvelrajan'
    // }, (err, res) => {
    //     if (err) {
    //         return console.log(`Unable to insert the data into mongoDB : ${err}`);
    //     }
    //     console.log(`Data inserted successfully : ${res}`);
    // });

    // db.collection('Office').insertOne({
    //     OfficeName: 'XYZ',
    //     Location: 'Chennai'
    // }, (err, res) => {
    //     if (err) {
    //         return console.log(`Unable to insert the data into mongoDB : ${err}`);
    //     }
    //     console.log(`Data inserted successfully : ${res.ops[0]._id.getTimestamp()}`);
    // })

    client.close();
});