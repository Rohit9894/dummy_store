import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // const token = req.cookies.token;
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];



  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export { authMiddleware };
