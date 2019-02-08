//const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log(`Unable to connect the mongoDB ${err}`);
    }
    console.log('MongoDB is connected successfully');
    const db = client.db('ApiDb');

    // find one and update

    // db.collection('employee').findOneAndUpdate(
    //     { _id: new ObjectID('5c5d27dbfdf0a43bacfad07d') },
    //     { $set: { EmployeeName: '12345' } },
    //     { returnOriginal: false }
    // ).then((res) => { console.log(res); }, (err) => { console.log(err) });

    // Increment operator
    db.collection('employee').findOneAndUpdate(
        { _id: new ObjectID('5c5d27dbfdf0a43bacfad07d') },
        { $set: { EmployeeName: '12345' }, $inc: { age: 1 } },
        { returnOriginal: false }
    ).then((res) => { console.log(res); }, (err) => { console.log(err) });

});