const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticeSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true,
    },
    edits = [{
        type: Schema.Types.ObjectId,
        ref: 'Edit'
    }],
    created_on: {
        type: Date,
        default: Date.now
    },
});

// Virtual for Articel URL
ArticeSchema
.virtual('url')
.get(() => {
    return '/wiki/article/' + this._id;
});

ArticleSchema
.virtual('latest')
.get( () => {
    return this.edits[0];
});

module.exports = mongoose.model('Article', ArticeSchema);

