const express = require('express');
const tokenValidator = require('../config/tokenValidator');

const router = express.Router();

router.post("/isauthenticated", tokenValidator, (req, res, next) => {
    res.status(200).json({
        isValid: "true"
    });
});

module.exports = router;