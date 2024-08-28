import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.SECRET_KEY;

export function verifyUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const [, token] = authHeader.split(" ");
    if (token) {
      jwt.verify(token, secretKey, (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Invalid token" });
        }
        req.user = user; // Optionally, you can attach user info to the request object
        next();
      });
    } else {
      res.status(401).json({ message: "Token not provided" });
    }
  } else {
    res.status(401).json({ message: "Authorization header not provided" });
  }
}

export function createToken(email) {
  return jwt.sign( email,secretKey);
}

export async function hashPassword(password) {
  return await bcrypt.hash(password, 10); 
}
