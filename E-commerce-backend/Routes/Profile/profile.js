const express=require("express");
const profileRoute=express.Router();
const {addressPost,addressget,editProfile}=require('../../Controller/profileController')
profileRoute.post("/api/adress",addressPost);
profileRoute.get("/api/profile",addressget);
profileRoute.post("/api/editProfile",editProfile);

exports.profileRoute=profileRoute;