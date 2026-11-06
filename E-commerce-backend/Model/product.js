const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
      UserId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"users",
            required:true,
      },
      Brand:String,
      Model:String,
      Color:String,
      Image:[],
      OPURL:String,
      Details:{},
      
        
})
module.exports=mongoose.model("products",productSchema);