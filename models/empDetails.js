const mongoose = require('mongoose')

const empSchema = new mongoose.Schema({
    empId: {   //generated at front-end
        type: String,
        // required: true,
        unique: true
    },

    empName: {
        type: String,
        required: true
    },

    emailId: {
        type: String,
        required: true,
        unique: true,                           // ensures uniqueness of email
        lowercase: true,                        // converts the email to lowercase
        // validate: (value) => {
        //     return validator.isEmail(value);     //checks if incoming string is valid email address
        // }
    },

    phoneNumber: {
        type: Number,
        required: true,
        // validate: (value) => {
        //     return validator.isMobilePhone(value);     
        // }
    },

    department: {
        type: String,
        // required: true
    },

    dateOfJoining: {   //yyyy-mm-dd
        type: Date,
        required: true,
        // validate: (value) => {
        //     return validator.isBefore(value);     
        // }
    },

    username: {
        type: String,
        unique: true,
        // required: true
    },

    password: {
        type: String,
        // required: true
    },

    role: {
        type: String,
        // required: true,
        enum: ["employee", "admin"]
    }

},
    { versionKey: false }
);

module.exports = mongoose.model('empDetails', empSchema)   //name of collection and passing schema reference