//core module
const express = require("express");
const mongoose = require("mongoose");
const cors=require("cors");
require("dotenv").config();
const session=require("express-session");
const MongoDbStore=require('connect-mongodb-session')(session);
//loacl module
const {signupRoute}=require("./middlewire/Auth/signup");
const { Collection } = require("mongodb");
const app = express();

app.use(express.json());

//session
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
const store= new MongoDbStore({
  uri:process.env.MONGO_URI,
  collection:"session",
})
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: store,

    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false
    }
  })
)



//routes
app.use(signupRoute);






app.get("/", (req, res) => {
  res.send("Server is running ok");
});
const PORT = 5001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting DB:", err);
  });