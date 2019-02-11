const { mongoose } = require('../db/mongoose');
var employee = mongoose.model('employee', {
    name: {
        type: String,
        required: true,
        minlengtn: 1,
        trim: true
    },
    age: {
        type: Number
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = { employee };