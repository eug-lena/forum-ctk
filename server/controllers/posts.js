"use strict"

var router = require('express').Router();
var Post = require('../models/post');

// GET all posts
router.get('/', async function (req, res, next) {
    try {
        var posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
});

// GET post by id
router.get('/:id', async function (req, res, next) {
    try {
        var post = await Post.findById(req.params.id);
        if (post === null) {
            return res.status(404).json({ "message": "Post not found" });
        }
        res.status(200).json(post);
    } catch (err) {
        // CastError is thrown when an invalid id is passed to findById
        if (err.name === 'CastError') {
            return res.status(400).json({ "message": "Invalid " + err.path });
        }
        next(err);
    }
});

// GET comments by post id
router.get('/:id/comments', async function (req, res, next) {
    try {
        var Comment = require('../models/comment');
        var comments = await Comment.find({ post: req.params.id });
        if (comments === null) {
            return res.status(404).json({ "message": "Comments not found" });
        }
        res.status(200).json(comments);
    } catch (err) {
        // CastError is thrown when an invalid id is passed to findById
        if (err.name === 'CastError') {
            return res.status(400).json({ "message": "Invalid " + err.path });
        }
        next(err);
    }
});

// POST new comment by post id
router.post('/:id/comments', async function (req, res, next) {
    try {
        var Comment = require('../models/comment');
        var comment = new Comment(req.body);
        comment.post = req.params.id;
        // To ensure that date is set correctly
        comment.date = Date.now();

        await comment.save();
        res.status(201).json(comment);

    } catch (err) {
        // ValidationError is thrown when a required field is missing or is invalid
        if (err.name === 'ValidationError') {
            return res.status(400).json({ "message": err.message });
        }

        next(err);
    }
});

// POST new post
router.post('/', async function (req, res, next) {

    try {
        var post = new Post(req.body);
        // To ensure that date is set correctly
        post.date = Date.now();

        await post.save();
        res.status(201).json(post);

    } catch (err) {
        // ValidationError is thrown when a required field is missing or is invalid
        if (err.name === 'ValidationError') {
            return res.status(400).json({ "message": err.message });
        }

        next(err);
    }
});

// PUT update post by id
router.put('/:id', async function (req, res, next) {
    try {
        const post = await Post.findById(req.params.id);
        if (post === null) {
            return res.status(404).json({ "message": "Post not found" });
        }

        post.title = req.body.title;
        post.content = req.body.content;

        await post.save();
        res.status(201).json(post);

    } catch (err) {
        // ValidationError is thrown when a required field is missing or is invalid
        if (err.name === 'ValidationError') {
            return res.status(400).json({ "message": err.message });
        }

        // CastError is thrown when an invalid id is passed to findById
        if (err.name === 'CastError') {
            return res.status(400).json({ "message": "Invalid " + err.path });
        }

        next(err);
    }
});

// PATCH update post by id
router.patch('/:id', async function (req, res, next) {
    try {
        const post = await Post.findById(req.params.id);
        if (post === null) {
            return res.status(404).json({ "message": "Post not found" });
        }

        post.title = (req.body.title || post.title);
        post.content = (req.body.content || post.content);

        await post.save();
        res.status(201).json(post);
    } catch (err) {
        // ValidationError is thrown when a required field is missing or is invalid
        if (err.name === 'ValidationError') {
            return res.status(400).json({ "message": err.message });
        }

        // CastError is thrown when an invalid id is passed to findById
        if (err.name === 'CastError') {
            return res.status(400).json({ "message": "Invalid " + err.path });
        }

        next(err);
    }
});

// delete comment by post id
router.delete('/:id/comment/:commentid', async function (req, res, next) {
    try {
        var Comment = require('../models/comment');
        var comment = await Comment.findById(req.params.commentid);
        await comment.deleteOne();
        res.status(200).json({ comment });
    } catch (err) {
        // ValidationError is thrown when a required field is missing or is invalid
        if (err.name === 'ValidationError') {
            return res.status(400).json({ "message": err.message });
        }
        // CastError is thrown when an invalid id is passed to findById
        if (err.name === 'CastError') {
            return res.status(400).json({ "message": "Invalid " + err.path });
        }

        next(err);
    }
});

// delete comments by post id
router.delete('/:id/comments', async function (req, res, next) {
    try {
        var Comment = require('../models/comment');
        var comment = await Comment.find({ post: req.params.id });
        await Comment.deleteMany();
        res.status(200).json({ comment });
    } catch (err) {
        // ValidationError is thrown when a required field is missing or is invalid
        if (err.name === 'ValidationError') {
            return res.status(400).json({ "message": err.message });
        }
        // CastError is thrown when an invalid id is passed to findById
        if (err.name === 'CastError') {
            return res.status(400).json({ "message": "Invalid " + err.path });
        }

        next(err);
    }
});

// DELETE post by id
router.delete('/:id', async function (req, res, next) {
    try {
        var post = await Post.findById(req.params.id);
        if (post === null) {
            return res.status(404).json({ "message": "Post not found" });
        }

        await post.deleteOne();

        res.status(200).json({ post });
    } catch (err) {
        // CastError is thrown when an invalid id is passed to findById
        if (err.name === 'CastError') {
            return res.status(400).json({ "message": "Invalid " + err.path });
        }
        next(err);
    }
});

// delete all posts 
router.delete('/', async function (req, res, next) {
    try {
        await Post.deleteMany();
        res.status(200).json({ "message": "Posts deleted" });
    } catch (err) {
        next(err);
    }
});

module.exports = router;