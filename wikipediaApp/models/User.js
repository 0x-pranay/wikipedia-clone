const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    name: {
        type: String,
        required: true,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema
.virtual('date_formatted')
.get(function() {
	return this.date ? moment(this.date).format('MMMM Do, YYYY'): '';
});

module.exports = mongoose.model('User', UserSchema);