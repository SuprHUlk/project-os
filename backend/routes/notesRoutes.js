const express = require('express');
const jwt = require('jsonwebtoken');

const fileModel = require('../models/fileModel');
const tokenValidator = require('../config/tokenValidator');

const router = express.Router();

router.post('/save', tokenValidator, (req, res, next) => {

    const data = new fileModel({
        userId: jwt.verify(req.headers.authorization.split(" ")[1], 'meAryaman').userId,
        link: req.body.content,
        mimeType: 'notes',
        name: req.body.fileName
    })

    data.save().then((result) => {
        res.status(201).json({
            msg: 'File upload successful',
            result: result
        });
    }).catch((error) => {
        res.status(404).json({
            msg: 'File upload unsuccessful',
            error: error.message
        });
    });
})

module.exports = router;