const express=require("express");
const requireAdmin=require("../../middle-wire/protectedAdmin");
const productRoute=express.Router();

const {productPost,productGet}=require('../../Controller/productController');
productRoute.post("/api/addProduct",requireAdmin,productPost);
productRoute.get("/api/getproduct",requireAdmin,productGet);

exports.productRoute=productRoute;