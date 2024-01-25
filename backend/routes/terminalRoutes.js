const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const SECRET = process.env.SECRET;

router.get("/whoami", (req, res, next) => {
    jwt.verify(req.body.token, SECRET);
})

module.exports = router;