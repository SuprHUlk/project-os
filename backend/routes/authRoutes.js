const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');

const router = express.Router();

router.post("/google", (req, res, next) => {
  userModel.findOne({ email: req.body.email })
    .then(user => {
      if(!user) {
        const data = new userModel({
          username: req.body.username,
          email: req.body.email,
          password: "meAryaman"
        });

        data.save()
          .then(result => {
            const token = jwt.sign(
              {email: result.email, userId: result._id, username: result.username},
              'meAryaman',
              { expiresIn: "1h" }
            );
            return res.status(201).json({
              message: "NO_ERROR",
              idToken: token
            })
          })
          .catch(err => {
            return res.status(400).json({ error: err});
          });
      }
      else {
        const token = jwt.sign(
          {email: user.email, userId: user._id, username: user.username},
          'meAryaman',
          { expiresIn: "1h" }
        );
        return res.status(200).json({
          message: "NO_ERROR",
          idToken: token
        });
      }
    });
});

router.post("/login", (req, res, next) => {
    let fetchedUser;
    userModel
        .findOne({ email: req.body.email })
        .then(user => {
            if(!user) {
                return res.status(401).json({
                    error: "InvalidCredentials"
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if(!result) {
                return res.status(401).json({
                    error: "InvalidCredentials"
                });
            }

            const token = jwt.sign(
                {email: fetchedUser.email, userId: fetchedUser._id, username: fetchedUser.username},
                'meAryaman',
                { expiresIn: "1h" }); 

            res.status(200).json({
                message: "NO_ERROR",
                idToken: token
            });
        })
        .catch(error => {
            return res.status(401).json({
                error: error
            });
        });
});

router.post("/signup", (req, res, next) => {
    if(req.body.password.length < 6) {
        return res.status(400).json({
            error: "WeakPassword"
        });
    }
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const data = new userModel({
                username: req.body.username,
                email: req.body.email,
                password: hash
            });
            data.save()
                .then((result) => {
                    res.status(201).json({
                        result: result
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        error: err
                    });
                });
        });
});

module.exports = router;