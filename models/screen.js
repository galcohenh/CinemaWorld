const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Screen = new Schema({
    time: {
        type: Date,
        required: true
    },
    hall: {
        type: Schema.Types.ObjectId,
        ref: 'Hall'
    },
    takenSeats: [{
        row: Number,
        col: Number
    }]
});

module.exports = mongoose.model('Screen', Screen);