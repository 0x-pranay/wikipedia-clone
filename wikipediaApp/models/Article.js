const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    edits: [{
        type: Schema.Types.ObjectId,
        ref: 'Edit'
    }],
    topics: [{
        type: Schema.Types.ObjectId,
        ref: 'Topic',
        required: true,
    }],
    created_on: {
        type: Date,
        default: Date.now
    },
});

// Virtual for Articel URL
ArticleSchema
.virtual('url')
.get(function ()  {
    return '/wiki/article/'+ this._id;
});

ArticleSchema
.virtual('created_on_formatted')
.get(function() {
	return this.created_on ? moment(this.created_on).format('MMMM Do, YYYY'): '';
});

ArticleSchema
.virtual('origin')
.get( () => {
    return this.edits[0];
});

module.exports = mongoose.model('Article', ArticleSchema);

