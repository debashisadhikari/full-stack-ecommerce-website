const User=require("../Model/user");
exports.getSession= async(req,res)=>{
  try{
    console.log(req.session.userId);
    if(!req.session.userId){
      return res.status(401).json({
        success: false,
        message: "Not logged in"
      });
    }
  const user = await User.findById(req.session.userId);
   if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }
res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.Name,
        phone: user.Phone,
        email: user.Email,
        type:user.Type,
      }
    });

  }catch{
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  

  }
}
