const mongoose = require('mongoose');

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

module.exports = mongoose.model('Edit', EditSchema);