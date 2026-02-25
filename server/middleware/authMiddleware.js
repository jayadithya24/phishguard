const jwt = require("jsonwebtoken");

/* =================================
   🔐 VERIFY JWT TOKEN
================================= */
exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach clean user object
    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();

  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


/* =================================
   🛡 ADMIN CHECK MIDDLEWARE
================================= */
exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admin only."
    });
  }

  next();
};