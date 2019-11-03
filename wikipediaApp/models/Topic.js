const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TopicSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: true,
    }
});

TopicSchema
.virtual('url')
.get(function(){
    return '/wiki/topic/'+this._id;
});

module.exports = mongoose.model('Topic', TopicSchema);