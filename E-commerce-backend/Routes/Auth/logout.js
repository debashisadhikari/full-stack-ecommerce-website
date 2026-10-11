const express=require("express");
const logoutRoute=express.Router();
const {logoutPost}=require("../../Controller/loginController")
logoutRoute.post("/api/logout",logoutPost);
exports.logoutRoute=logoutRoute;
