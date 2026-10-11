const express=require("express");
const sessionRoute=express.Router();
const {getSession}=require("../../Controller/sessionController");
sessionRoute.get("/api/me",getSession);
exports.sessionRoute=sessionRoute;