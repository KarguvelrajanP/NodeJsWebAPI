const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log(`Unable to connect the mongoDB ${err}`);
    }
    console.log('MongoDB is connected successfully');
    const db = client.db('ApiDb');

    // Getting data from Office collection
    db.collection('Office').find({ _id: new ObjectID('5c5d2b57636c5b34c8878bab') }).toArray().then((doc) => {
        console.log(JSON.stringify(doc, undefined, 2));
    }, (err) => {
        console.log(`Unable to retrieve the data from Office table : ${err}`);
    })

    // Getting the record count 
    db.collection('Office').find().count().then((count) => {
        //console.log(JSON.stringify(doc, undefined, 2));
        console.log(`Total records : ${count}`);
    }, (err) => {
        console.log(`Unable to retrieve the data from Office table : ${err}`);
    })
    //client.close();
});