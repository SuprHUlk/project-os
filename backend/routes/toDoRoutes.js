const express = require('express');
const jwt = require('jsonwebtoken');

const tokenValidator = require('../config/tokenValidator');
const toDoModel = require('../models/toDoModel');

const router = express.Router();

const SECRET = process.env.SECRET;

router.post('/add', tokenValidator, (req, res, next) => {
    const userId = jwt.verify(req.headers.authorization.split(" ")[1], SECRET).userId;
    
    const data = new toDoModel({
        userId: userId,
        task: req.body.task
    })

    data.save()
        .then((result) => {
            res.status(201).json({
                msg: 'task added successfully',
                result: result
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                msg: 'task adding unsuccessful',
                error: err
            })
        });
})

router.get('/fetch', tokenValidator, async (req, res, next) => {
    try {
        const userId = jwt.verify(req.headers.authorization.split(" ")[1], SECRET).userId;
        const query = { userId: userId };
        const result = await toDoModel.find(query);

        res.status(200).json({
            msg: 'fetch successful',
            result: result
        })
    }
    catch(error) {
        res.status(404).json({
            msg: 'fetch unsuccessful',
            error: error
        })
    }
})

router.delete('/delete/:id', tokenValidator, (req, res, next) => {
    toDoModel.deleteOne({ _id: req.params.id })
        .then((result) => {
            res.status(200).json({
                msg: 'delete successful',
                result: result
            })
        })
        .catch((error) => {
            res.status(404).json({
                msg: 'delete unsuccessful',
                error: error
            })
        })
})

module.exports = router;