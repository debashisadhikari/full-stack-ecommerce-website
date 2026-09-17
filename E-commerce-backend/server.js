const express = require("express");
const mongoose = require("mongoose");
const cors=require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running ok");
});
app.get("/api/products",(req,res,next)=>{
  res.json({
    message:"hello this is from backend",
  })
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