const products=require("../Model/product");

exports.productPost=async(req,res,next)=>{
  try{
  const {brand,model,color,image,productdetails}=req.body;
  const userId=req.session.userId;
  
  const product= new products({
    userId:userId,
    brand:brand,
    model:model,
    color:color,
    image:image.url,
    specification:productdetails,

  })
  
  await product.save();
  return res.json({
    status:"success",
    message:"product add successfully",
  })
}catch(err){
  return res.json({
    status:"success",
    message:err,
  })
}




}
exports.productGet=async(req,res,next)=>{
       const userId=req.session.userId;
      const allProducts=await products.find({
        userId:userId,
      });
      

   
      return res.status(200).json({
        status:"success",
        allProducts,
      })
}