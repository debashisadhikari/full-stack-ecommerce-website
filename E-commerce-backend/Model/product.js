const mongoose=require("mongoose");
const productSchema=mongoose.Schema({
      userId:String,
      brand:String,
      model:String,
      color:[],
      specification:{},
      image:[],
        
})
module.exports=mongoose.model("products",productSchema);