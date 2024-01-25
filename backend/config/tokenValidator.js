const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, SECRET);
        next();
    }
    catch(error) {
        res.status(401).json({ 
            error: "Unauthorized"
        });
    }
};