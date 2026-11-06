const express=require("express");
const requireAdmin=require("../../middle-wire/protectedAdmin");
const productRoute=express.Router();

const {productPost,productGetAdminListed,getAllProducts,getProductbyId}=require('../../Controller/productController');
productRoute.post("/api/addProduct",requireAdmin,productPost);
productRoute.get("/api/getproductAdmin",requireAdmin,productGetAdminListed);
productRoute.get("/api/getAllProducts",getAllProducts);
productRoute.get("/api/productDetails/:id",getProductbyId);

exports.productRoute=productRoute;