const products=require("../Model/product");

exports.productPost=async(req,res,next)=>{
  const product=req.body;
  
  const userId=req.session.userId;
  try{
  const Newproduct= await new products({
    UserId:userId,
    Brand:product.brand,
    Model:product.model,
    Color:product.color,
    Image:product.image,
    OPURL:product.OPURL,
    Details:product.productdetails,
  })
  
   await Newproduct.save();
   return res.status(200).json({
    success:true,
    message:"products is succesfully added",
   })
}catch{
 return res.status(500).json({
  success:false,
  message:"Intenal error",
 })
}
  
  





}
exports.productGetAdminListed=async(req,res,next)=>{
       const userId=req.session.userId;
      
      const allProducts=await products.find({
        UserId:userId,
      });
      
      

   
      return res.status(200).json({
        status:"success",
        allProducts,
      })
};

exports.getAllProducts = async (req, res, next) => {
  const product=await products.find();
 
    return res.status(200).json({
      product
    })
   
};
exports.getProductbyId=async(req,res,next)=>{
     const { id } = req.params;
   
     const product = await products.findById(id);
     
     
     return res.status(200).json({
      success:true,
      product:product,
     })
}
