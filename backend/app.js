const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

const app = express();

mongoose
  .connect(
    "mongodb+srv://constantin:"+process.env.MONGO_ATLAS_PW + "@cluster0.lph99n2.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connection success");
  })
  .catch(() => {
    console.log("connection error");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
