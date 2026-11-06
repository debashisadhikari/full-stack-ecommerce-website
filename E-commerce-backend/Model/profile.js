const mongoose=require("mongoose");
const profileScheme=mongoose.Schema({
  UserId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true,
  },
  Address:{},
  
  Profile:{},
  Order:[],
})
module.exports=mongoose.model("UserProfileDetails", profileScheme);