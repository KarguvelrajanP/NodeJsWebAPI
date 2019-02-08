//const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log(`Unable to connect the mongoDB ${err}`);
    }
    console.log('MongoDB is connected successfully');
    const db = client.db('ApiDb');

    // delete many from employee table
    db.collection('employee').deleteMany({ EmployeeName: 'Karguvelrajan' }).then((res) => {
        console.log(res);
    }, (err) => { console.log(`Unable to delete the record : ${err}`) });

    // delete one from employee table 
    db.collection('employee').deleteMany({ EmployeeName: 'XYZ' }).then((res) => {
        console.log(res);
    }, (err) => { console.log(`Unable to delete the record : ${err}`) });

    // find and delete from employee table
    db.collection('employee').deleteMany({ _id: new ObjectID('5c5d27ca10124a1df458426b') }).then((res) => {
        console.log(res);
    }, (err) => { console.log(`Unable to delete the record : ${err}`) });


    // // delete many
    // db.collection('Office').deleteMany({ OfficeName: 'XYZ' }).then((result) => {
    //     console.log(result.result);
    // }, (err) => { console.log(`Unable to delete the records : ${err}`) });
    // delete one 

    // delete one
    // db.collection('Office').deleteOne({ OfficeName: 'Rajan' }).then((result) => {
    //     console.log(result.result);
    // }, (err) => { console.log(`Unable to delete the records : ${err}`) });

    ////find one and delete
    // db.collection('Office').findOneAndDelete({ Location: 'vnr' }).then((result) => {
    //     console.log(result);
    // }, (err) => { console.log(`Unable to delete the records : ${err}`) });

    //  client.close();
});