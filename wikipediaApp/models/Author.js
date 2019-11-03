const mongoose = require('mongoose');

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
.virtual('url')
.get(() => {
    return '/wiki/author/'+ this._id;
});

models.exports = mongoose.model('Author', AuthorSchema);