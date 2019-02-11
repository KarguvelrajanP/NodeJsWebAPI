const { mongoose } = require('../db/mongoose');
var user = new mongoose.model('userModel', {
    userName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        minlengtn: 1,
        required: true
    }
});

module.exports = { user };