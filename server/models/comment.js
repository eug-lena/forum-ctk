'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
        validate: {
            // Post must exist
            validator: async function (post_id) {
                var post = await mongoose.model('posts').findById(post_id);
                if (post === null) return false;
                return true;
            },
            message: 'Post does not exist'
        }
    },

    content: { type: String, required: true, max: 2000 },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('comments', CommentSchema);