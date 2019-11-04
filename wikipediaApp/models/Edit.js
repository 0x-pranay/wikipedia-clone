const mongoose = require('mongoose');
const moment = require('moment');


const Schema = mongoose.Schema;

const EditSchema = new Schema({
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true,
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    article_title: {
        type: String,
        minlength: 03,
        maxlength: 266,
        requied: true,
    },
    article_summary: {
        type: String,
        minlength: 03,
        requied: true
    },
    edit_summary:{
        type: String,
        minlength: 03,
        maxlength: 255,
        requied: true,
    },
    timestamp: {
        type: Date,
        Default: Date.now,
    },

});

// Virtual for Articel URL
EditSchema
.virtual('url_summary')
.get(() => {
    return '/wiki/edit/summary/' + this._id;
});

// formatted timestamp
EditSchema
.virtual('timestamp_formatted')
.get(function() {
	return this.timestamp ? moment(this.timestamp).format('MMMM Do, YYYY'): '';
});

module.exports = mongoose.model('Edit', EditSchema);