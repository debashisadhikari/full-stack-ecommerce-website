const requireAdmin = (req, res, next) => {
  if (!req.session?.userId) {
    return res.status(401).json({
      success: false,
      message: "Please log in"
    });
  }

  if (req.session.userRole !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required"
    });
  }

  next();
};

module.exports = requireAdmin;