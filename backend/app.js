const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/firebase');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const isAuthenticatedRoutes = require('./routes/isAuthenticatedRoutes');
const terminalRoutes = require('./routes/terminalRoutes');
const fileRoutes = require('./routes/fileRoutes');
const toDoRoutes = require('./routes/toDoRoutes');
const notesRoutes = require('./routes/notesRoutes');

const app = express();

mongoose.connect("mongodb+srv://ayush:o8YWE6QiFvdPcYko@cluster0.xljrb9i.mongodb.net/test?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected");
    })
    .catch(() => {
        console.log("Connection failed");
    })


app.use((req, res, next) => {
    const allowedOrigins = [
        'http://gradient-os-env.eba-8pfmjh6z.ap-south-1.elasticbeanstalk.com'
    ];
    
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
        console.log('Received OPTIONS request');
        res.status(200).end();
    } else {
       next();
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "angular")));




app.use("/auth", authRoutes);
app.use("/valid", isAuthenticatedRoutes);
app.use("/terminal", terminalRoutes);
app.use("/file", fileRoutes);
app.use("/todo", toDoRoutes);
app.use("/notes", notesRoutes);
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "angular", "index.html"));
})

module.exports = app;