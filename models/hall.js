const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Hall = new Schema({
    number: {
        type: Number,
        isRequired: true
    },
    rows: {
        type: Number,
        isRequired: true
    },
    columns: {
        type: Number,
        isRequired: true
    }
});

module.exports = mongoose.model('Hall', Hall);