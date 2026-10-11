
const { check, validationResult } = require("express-validator");
const User = require("../Model/user");
const bcrypt = require("bcryptjs");

exports.SignupPost = [


  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name should contain only letters"),

  check("phone")
    .trim()
    .isMobilePhone("en-IN")
    .withMessage("Please enter a valid Indian phone number"),

  
  check("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email"),

  
  check("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })
    .withMessage(
      "Password length must be 8 and contain uppercase, lowercase, number and special character"
    ),
  

  
  check("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password and confirm password must be same");
      }

      return true;
    }),
    check("role")
.notEmpty()
 .withMessage("type must be selected"),

  async (req, res) => {

    const { name, phone, email, password,role } = req.body;

    const errors = validationResult(req);

    
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
        oldData: {
          name,
          phone,
          email
        }
      });
    }

    try {

      
     

     
      const existingUser = await User.findOne({
        Phone: phone,
        Type:role,

      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          errors: "Phone number already registered"
        });
      }

      
      const hashedPassword = await bcrypt.hash(password, 12);

      
      const user = new User({
        Name: name,
        Phone: phone,
        Email: email,
        Password: hashedPassword,
        Type:role,
      });

      
      await user.save();

      return res.status(201).json({
        success: true,
        errors: "User registered successfully"
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        success: false,
        errors: "Something went wrong"
      });
    }
  }
];

