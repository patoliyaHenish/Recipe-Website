import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decode.userId;
    req.user = decode;
    req.email = decode.email;
    req.role = decode.role;
    req.isAuthenticated = true
    next();
  } catch (error) {
    console.log(error);
  }
};
export default isAuthenticated;