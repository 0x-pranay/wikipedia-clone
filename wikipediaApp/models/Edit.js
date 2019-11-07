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
    edited_on: {
        type: Date,
        default: Date.now,
    }

});

// Virtual for edit summary URL only.
EditSchema
.virtual('url_summary')
.get(function(){
    return '/wiki/edit/summary/' + this._id;
});

// Virtual for Edit url.
EditSchema
.virtual('url')
.get(function(){
    return '/wiki/edit/' + this._id;
});

// formatted timestamp
EditSchema
.virtual('timestamp_formatted')
.get(function() {
	return this.edited_on ? moment(this.edited_on).format('MMMM Do, YYYY, hh : mm :ss a'): '';
});

module.exports = mongoose.model('Edit', EditSchema);