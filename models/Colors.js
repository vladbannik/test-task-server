const { Schema, model } = require('mongoose');

const schema = Schema({
    color: {
        type: String,
        unique: true
    }
});

module.exports = model('Colors', schema);