const mongoose=require("mongoose");
const userSchema=mongoose.Schema(
  {
    Name:{
      type:String,
      require:[true,"Name is reauired"]
    },
    Phone:{
      type:String,
      require:[true,"phone no. is required"]
    },
    Email:{
      type:String,
      require:[true,"Email is required"],
    },
    Password:{
      type:String,
      require:[true,"password required"],
    }
  }
);
module.exports=mongoose.model('User',userSchema);