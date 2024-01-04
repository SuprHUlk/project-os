const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/firebase');

const authRoutes = require('./routes/authRoutes');
const isAuthenticatedRoutes = require('./routes/isAuthenticatedRoutes');
const terminalRoutes = require('./routes/terminalRoutes');
const fileRoutes = require('./routes/fileRoutes');

const app = express();

mongoose.connect("mongodb+srv://ayush:o8YWE6QiFvdPcYko@cluster0.xljrb9i.mongodb.net/test?retryWrites=true&w=majority")
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

app.use((req, res, next) => {
    // console.log(`Received ${req.method} request for ${req.originalUrl}`);
    // console.log('Request headers:', req.headers);
  
    if (req.method === 'OPTIONS') {
      console.log('Received OPTIONS request');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      res.status(200).end();
    } 
    else {
      next();
    }
});

app.use('/test', async (req, res, next) => {
    const docRef = db.collection('test').doc('testing');
    await docRef.set({
        title: 'ayush'
    })
    console.log(req.body);
    res.status(200).json({
        msg: 'ok'
    })
})


app.use("/auth", authRoutes);
app.use("/valid", isAuthenticatedRoutes);
app.use("/terminal", terminalRoutes);
app.use("/file", fileRoutes);

module.exports = app;