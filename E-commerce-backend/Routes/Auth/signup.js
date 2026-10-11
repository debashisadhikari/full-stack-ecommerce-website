const express=require("express");
const signupRoute=express.Router();
//local
const {SignupPost}=require('../../Controller/signupControl');

  signupRoute.get("/api/signup",(req,res,next)=>{
        res.json({
          message:" get requiest is works ",
        })
  })
  signupRoute.post("/api/signup",SignupPost);
  exports.signupRoute=signupRoute;