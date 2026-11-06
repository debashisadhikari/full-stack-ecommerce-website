const requireUser = (req, res, next) => {
  if (!req.session?.userId) {
    return res.status(401).json({
      success: false,
      message: "Please log in"
    });
  }

  if (req.session.userRole !== "customer") {
    return res.status(403).json({
      success: false,
      message: "User access required"
    });
  }

  next();
};

module.exports = requireUser;