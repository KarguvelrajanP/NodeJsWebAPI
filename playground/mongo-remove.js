const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { user } = require('../server/models/user');

user.findOneAndRemove({ _id: '5c62c7355d4f4339700f662f' }).then((res) => {
    console.log(res);
}, (err) => {
    console.log(err);
});

user.findByIdAndRemove('5c62c7355d4f4339700f6630').then((doc) => {
    console.log(doc);
}, (err) => {
    console.log(err);
})