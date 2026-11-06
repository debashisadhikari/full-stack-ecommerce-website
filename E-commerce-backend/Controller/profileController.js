const UserProfileDetails = require("../Model/profile");
const User=require("../Model/user");
const Order=require("../Model/order");
const products=require("../Model/product");
const product = require("../Model/product");

exports.addressPost = async (req, res, next) => {
  try {
   
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please log in first",
      });
    }

    const data = req.body;

    console.log("User ID:", userId);
    console.log("Address data:", data);

    
    const profile = await UserProfileDetails.findOne({
      UserId: userId,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    
    profile.Address=data;

  
    await profile.save();

    return res.status(201).json({
      success: true,
      message: "Address added successfully",
      addresses: profile.Address,
    });
  } catch (err) {
    next(err);
  }
};
exports.addressget=async(req,res,next)=>{
  const userId=req.session.userId;
  console.log("this is id",userId);
  const profile= await UserProfileDetails.findOne({
    UserId:userId,
  })
  console.log(profile.Address);
  
  return res.status(200).json({
    success:true,
    address:profile.Address,
  })


}
exports.editProfile=async(req,res,next)=>{
  const UserId=req.session.userId;
  if(!UserId){
    return res.status(404).json({
      success:false,
      message:"Login first",
    })
  }
 const profile=await User.findById(UserId);

   const data=req.body;
   console.log("this is profile", profile);
   if(profile.Name!==data.name){
    profile.Name=data.name;
   }
   if(profile.Phone!==data.phone){
    profile.Phone=data.phone;
   }
   if(profile.Email!==data.email){
    profile.Email=data.email;
   }
   profile.save();
   
   return res.status(200).json({
    success:true,
    message:"Updated successfull!",
    UserUpdate: {
        id: profile._id,
        name: data.name,
        phone: data.phone,
        email: data.email,
        type:profile.Type,
      }
   })

   
}
exports.orderControllerPost=async(req,res,next)=>{
     const UserId=req.session.userId;
     const obj=req.body;
     console.log(obj);
    const price=obj.price;
    const id=obj.id;

     const orderDate=new Date();
     orderDate.toLocaleDateString();
     const shippingDate=new Date();
     shippingDate.setDate(shippingDate.getDate() + 3);
     shippingDate.toLocaleDateString();

     const  deliveryDate= new Date();
     deliveryDate.setDate(deliveryDate.getDate() + 5);
        deliveryDate.toLocaleDateString();
     const status="pending";

     const Used=await Order.findOne({
      UserId:UserId,
     })
     if(Used){
      Used.Products.push({
         productId:id,
         price:price,
        orderDate:orderDate,
        shippingDate:shippingDate,
        deliveryDate:deliveryDate,
        status:status,
      });
      await Used.save();
      return res.status(200).json({
        success:true,
        message:"Order confirm successfull!",
      })
         
     }
     const order= new Order({
      UserId:UserId,
      Products:[{
        productId:id,
        price:price,
        orderDate:orderDate,
        shippingDate:shippingDate,
        deliveryDate:deliveryDate,
        status:status,

      }]
     })
     await order.save();
     return res.status(200).json({
        success:true,
        message:"Order confirm successfull!",
      })
}
exports.orderGet=async(req,res,next)=>{
   const userId=req.session.userId;
  const OrderDetails = await Order.find({ UserId: userId })
  .populate("Products.productId");
  
   if(OrderDetails){
   console.log(
  JSON.stringify(OrderDetails, null, 2)
);

    
    
    return res.status(200).json({
      success:true,
      OrderDetails,
    })
   }
   return res.status(404).json({
    success:false,
    message:"Not Order yet",
   })
}
exports.CanceledControll=async(req,res,next)=>{
  const UserId=req.session.userId;
  const {id}=req.params;
  console.log("this is id: ",id);
  const order= await Order.findOne({
    UserId:UserId,
    });
    
const product=order.Products.find((item)=>{
   item.productId.toString()=== id
   console.log(item.productId.toString()===id);
})
console.log(product);

  console.log(product);
  if(order){


    return res.status(200).json({
      success:true,
      order,

    })
  }
}

