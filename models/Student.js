const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const student = new Schema({
    studentname: {
        type: String,
        trim: true,
        required: true,
    },
    cin: {
        type: String,
        trim: true,
        required: true,
    },
    class: {
        type: String,
        trim: true,
        required: true,
    },
    average: {
        type: Number, 
        min: 0, 
        max: 20,
        required: true,
    },
    
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model('Student', student);