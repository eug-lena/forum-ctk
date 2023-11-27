"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: { type: String, required: true, maxLength: [50, 'Title cannot exceed 50 characters'] },
    content: { type: String, required: true, maxLength: [2000, 'Content cannot exceed 2000 characters'] },
    date: { type: Date, default: Date.now },
    topic: { type: String, required: true, enum: ['Life', 'Gaming', 'Health', 'Food', 'Business', 'Politics', 'Sports', 'News', 'Others'] }
});

// Cascade delete comments when a post is deleted for findOneAndDelete
PostSchema.pre('findOneAndDelete', { document: false, query: true }, async function () {
    var Comment = require('../models/comment');
    const doc = await this.model.findOne(this.getFilter());
    if (doc === null) {
        return;
    }
    await Comment.deleteMany({ post: doc._id });
});

// Cascade delete comments when posts are deleted for deleteMany
PostSchema.pre('deleteMany', { document: false, query: true }, async function () {
    var Comment = require('../models/comment');
    const docs = await this.model.find(this.getFilter());
    if (docs === null) {
        return;
    }
    for (const doc of docs) {
        await Comment.deleteMany({ post: doc._id });
    }
});

// Cascade delete comments when posts are deleted for deleteOne
PostSchema.pre('deleteOne', { document: false, query: true }, async function () {
    var Comment = require('../models/comment');
    const doc = await this.model.findOne(this.getFilter());
    if (doc === null) {
        return;
    }
    await Comment.deleteMany({ post: doc._id });
});

module.exports = mongoose.model('posts', PostSchema);