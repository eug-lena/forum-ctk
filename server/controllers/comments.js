"use strict"

var router = require('express').Router();
var Comment = require('../models/comment');

// GET all comments
router.get('/', async function (req, res, next) {
    try {
        var comments = await Comment.find();
        if (comments.length === 0) {
            return res.status(404).json({ "message": "Comments not found" });
        }
        res.status(200).json({ "comments": comments });
    } catch (err) {
        next(err);
    }
});

// GET comment by id
router.get('/:id', async function (req, res, next) {
    try {
        var comment = await Comment.findById(req.params.id);
        if (comment === null) {
            return res.status(404).json({ "message": "Comment not found" });
        }
        res.status(200).json(comment);
    } catch (err) {
        // CastError is thrown when an invalid id is passed to findById
        if (err.name === 'CastError') {
            return res.status(400).json({ "message": "Invalid " + err.path });
        }
        next(err);
    }
});

// POST new comment
router.post('/', async function (req, res, next) {
    var comment = new Comment(req.body);
    try {
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

// PUT update comment by id
router.put('/:id', async function (req, res, next) {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment === null) {
            return res.status(404).json({ "message": "Comment not found" });
        }

        comment.content = req.body.content;

        await comment.save();
        res.status(201).json(comment);

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

// PATCH update comment by id
router.patch('/:id', async function (req, res, next) {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment === null) {
            return res.status(404).json({ "message": "Comment not found" });
        }

        comment.content = (req.body.content || comment.content);

        await comment.save();
        res.status(201).json(comment);
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

// Delete a comment by id
router.delete('/:id', async function (req, res, next) {
    const id = req.params.id;
    try {
        const comment = await Comment.findById(id);
        if (comment === null) {
            return res.status(404).json({ "message": "Comment not found" });
        }

        await comment.deleteOne();

        return res.status(200).json(comment);

    } catch (err) {
        // CastError is thrown when an invalid id is passed to finOneAndDelete
        if (err.name === 'CastError') {
            return res.status(400).json({ "message": "Invalid " + err.path });
        }
        next(err);
    }
});


module.exports = router;