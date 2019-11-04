const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    date_of_joining: {
        type: Date,
        Default: Date.now
    },

});

AuthorSchema
.virtual('date_of_joining_formatted')
.get(function() {
	return this.date_of_joining ? moment(this.date_of_joining).format('MMMM Do, YYYY'): '';
});

AuthorSchema
.virtual('url')
.get(() => {
    return '/wiki/author/'+ this._id;
});

module.exports = mongoose.model('Author', AuthorSchema);