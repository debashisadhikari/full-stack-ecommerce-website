const express=require("express");
const orderRouter=express.Router();
const {orderControllerPost,orderGet,CanceledControll}=require('../../Controller/profileController')
orderRouter.post("/api/order",orderControllerPost);
orderRouter.get("/api/order",orderGet);
orderRouter.get("/api/cancel/:id",CanceledControll);
exports.orderRouter=orderRouter;