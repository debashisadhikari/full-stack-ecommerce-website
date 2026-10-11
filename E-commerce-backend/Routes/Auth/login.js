const express=require("express");
const loginRoute=express.Router();
const {loginPost}=require("../../Controller/loginController")


loginRoute.get("/api/login",(req,res,next)=>{

})
loginRoute.post("/api/login",loginPost)
exports.loginRoute=loginRoute;