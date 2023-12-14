const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { log } = require('console');

const authRoutes = require('./routes/authRoutes');
const isAuthenticatedRoutes = require('./routes/isAuthenticatedRoutes');

const app = express();

mongoose.connect("mongodb+srv://ayush:qqvbgp7ZJHF6DOZy@cluster0.xljrb9i.mongodb.net/test?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected");
    })
    .catch(() => {
        console.log("Connection failed");
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.use("/auth", authRoutes);
app.use("/valid", isAuthenticatedRoutes)

module.exports = app;