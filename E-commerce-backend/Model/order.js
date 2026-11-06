const mongoose=require("mongoose");
const orderSchema=mongoose.Schema({
  UserId:{
    type:mongoose.Schema.Types.ObjectId,
     ref:"users",
    required:true,
  },
  Products:[{
     productId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"products",
      required:true,
     },
     adress:{},
     orderPrice:String,
     orderDate:Date,
     shippingDate:Date,
     deliveryDate:Date,
       status: {
      type: String,
      default: "pending",
    },

     quantity:Number,

  }],
})
module.exports=mongoose.model("Order",orderSchema);