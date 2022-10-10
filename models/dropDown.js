const mongoose = require('mongoose')

const dropDownSchema = new mongoose.Schema({
    deptId: {
        type: String,
        required: true
    },

    department: {
        type: String,
        required: true
    }
},
{ versionKey: false }
);

module.exports = mongoose.model('dropdown', dropDownSchema)