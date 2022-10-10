const mongoose = require('mongoose')

const empTaskSchema = new mongoose.Schema({
    empId: {
        type: String,
        required: true
    },

    taskDescription: {
        type: String,
        required: true
    },

    taskType: {
        type: String,
        required: true,
        enum: ["Work", "Break", "Meeting"]
    },

    startTime: {        // date time format
        type: Date,
        required: true,
    },

    timeSpent: {   // time in minutes
        type: Number,
        required: true
    }

},
    { versionKey: false }
);

module.exports = mongoose.model('empTaskTracker', empTaskSchema)  