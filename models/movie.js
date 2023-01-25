const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Movie = new Schema({
    name : {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        default: Date.now()
    },
    screens: [{
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
    }],
    genre: {
        type: [String]
    },
    duration: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Movie', Movie);