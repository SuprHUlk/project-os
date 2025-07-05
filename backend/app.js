const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const isAuthenticatedRoutes = require("./routes/isAuthenticatedRoutes");
const terminalRoutes = require("./routes/terminalRoutes");
const fileRoutes = require("./routes/fileRoutes");
const toDoRoutes = require("./routes/toDoRoutes");
const notesRoutes = require("./routes/notesRoutes");

const app = express();

const URL = process.env.DATABASE_URL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use((req, res, next) => {
  const allowedOrigins = [
    "http://gradient-os-env.eba-8pfmjh6z.ap-south-1.elasticbeanstalk.com",
    "http://www.gradientos.live",
    "*",
  ];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    console.log("Received OPTIONS request");
    res.status(200).end();
  } else {
    next();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/", express.static(path.join(__dirname, "angular")));

app.use("/auth", authRoutes);
app.use("/valid", isAuthenticatedRoutes);
app.use("/terminal", terminalRoutes);
app.use("/file", fileRoutes);
app.use("/todo", toDoRoutes);
app.use("/notes", notesRoutes);
// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "angular", "index.html"));
// });

app.use("/", (req, res) => {
  res.status(200).send("OK");
});

module.exports = app;
