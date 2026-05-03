import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { error } from "node:console";
interface userLoginData {
  email: string;
  password: string;
}

interface jwtPayload {
  id: number;
  email: string;
  role: string;
}

interface UserResponse {
  id: number;
  email: string;
  name: string;
  role: "admin" | "advertiser";
}
const AuthService = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  try {
    const { email, password }: userLoginData = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: ` email or password is missing` });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
      return;
    }

    let user = await prisma.admin.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        hashPassword: true,
        name: true,
      },
    });

    let role: "admin" | "advertiser" = "admin";

    if (!user) {
      user = await prisma.advertiser.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          name: true,
          hashPassword: true,
        },
      });
      role = "advertiser";
    }

    if (!user) {
      return res.status(401).json({ error: "User Not found" });
    }

    const ismatch = await bcrypt.compare(password, user.hashPassword);
    if (!ismatch) {
      res.status(401).json({ error: "Password is incorrect" });
      return;
    }
    const userResponse: UserResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: role,
    };
    const jwtPayload: jwtPayload = {
      id: user.id,
      email: user.email,
      role,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET || "", {
      expiresIn: "1h",
    });

    switch (role) {
      case "admin":
        await prisma.admin.update({
          where: { id: user.id },
          data: {
            lastLoginAt: new Date(),
          },
        });
        break;

      case "advertiser":
        await prisma.advertiser.update({
          where: { id: user.id },
          data: {
            lastLoginAt: new Date(),
          },
        });
        break;

      default:
        return res.status(400).json({ error: "Error in role" });
    }
    return res.status(200).json({
      success: true,
      message: "user is login",
      data: {
        user: userResponse,
        token: token,
        expireIn: "1hr",
      },
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default AuthService;
