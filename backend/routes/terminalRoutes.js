const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get("/whoami", (req, res, next) => {
    jwt.verify(req.body.token, "meAryaman");
})

module.exports = router;