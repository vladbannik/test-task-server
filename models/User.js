const { Schema, model } = require('mongoose');

const schema = Schema({
    user: {
        type: String,
        unique: true
    },
    color: {
        type: String
    }
});

module.exports = model('User', schema);