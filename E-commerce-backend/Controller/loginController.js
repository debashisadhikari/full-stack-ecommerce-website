
const { check, validationResult } = require("express-validator");
const User = require("../Model/user");
const bcrypt = require("bcryptjs");

exports.loginPost = [
  check("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Please enter a valid 10-digit Indian phone number"),

  check("password")
    .notEmpty()
    .withMessage("Password is required"),

  check("role")
    .notEmpty()
    .withMessage("Role is required"),

  async (req, res) => {
    const { phone, password, role } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    try {
      const user = await User.findOne({
        Phone: phone,
        Type: role
      });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found"
        });
      }

      const isMatch = await bcrypt.compare(
        password,
        user.Password
      );

      if (!isMatch) {
        return res.status(422).json({
          success: false,
          message: "Invalid password"
        });
      }

      // Store user information in the session
      req.session.userId = user._id.toString();
      req.session.userRole = user.Type;

      console.log("Before save:", req.session);

      // Save session before responding
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          return res.status(500).json({
            success: false,
            message: "Could not save session"
          });
        }

        console.log("Session ID:", req.sessionID);
        console.log("Saved user ID:", req.session.userId);

        return res.status(200).json({
          success: true,
          message: "Login successful"
        });
      });

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Server error"
      });
    }
  }
];

exports.logoutPost = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Logout failed"
      });
    }

    res.clearCookie("connect.sid");

    return res.json({
      success: true,
      message: "Logout successful"
    });
  });
};
