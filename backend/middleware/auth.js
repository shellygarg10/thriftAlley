import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Access denied." });
  }
  const token = authHeader.split(" ")[1]; // Extract the token after 'Bearer'
  if (!token) {
    return res.status(401).json({ message: "Access denied. Login Again." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    if (req.user.email !== process.env.ADMIN_EMAIL) {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }
    next();
  } catch (error) {
    console.log("Admin authentication error:", error);
    res.status(401).json({ message: error.message });
  }
};
export default adminAuth;
