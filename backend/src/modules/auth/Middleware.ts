import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
interface CustomResquest extends Request {
  user?: any;
}

export const AuthMiddleware = (
  req: CustomResquest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
console.log(authHeader,"auth header")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ error: "token missing" });
  }

  try {
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        error: "Invalid token format",
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET as string);
    
    req.user = decode;
    console.log(req.user);
    next();
  } catch (err) {
    return res.status(401).json({ error: `Invalid or expired token ${err}` });
  }
};
