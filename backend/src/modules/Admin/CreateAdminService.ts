import { Request, Response } from "express";
import { FindUser } from "../util/FindUser";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../util/Bycriptpassword";
// import logger from ""
import logger from "../../config/logger";

const prisma = new PrismaClient(); // move outside function

export const CreateAdminService = async (req: Request, res: Response) => {
  const { email, name, department, phone, password, confirmPassword } =
    req.body;

  const AdminData = {
    email,
    name,
    department,
    phone,
    password,
    confirmPassword,
  };

  logger.info("Admin registration request received");

  for (const [key, value] of Object.entries(AdminData)) {
    if (!value) {
      logger.warn(`Admin registration failed: ${key} is empty`);
      return res.status(400).json({ error: `${key} is empty` });
    }
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    logger.warn("Admin registration failed: Invalid email");
    return res.status(400).json({ error: "Invalid email" });
  }

  if (password !== confirmPassword) {
    logger.warn("Admin registration failed: Password mismatch");
    return res
      .status(400)
      .json({ error: "Password does not match confirm password" });
  }

  if (String(phone).length !== 11) {
    logger.warn("Admin registration failed: Phone should be 11 digits");
    return res.status(400).json({ error: "Phone should be 11 digits" });
  }

  if (!/^03\d{9}$/.test(String(phone))) {
    logger.warn("Admin registration failed: Invalid Pakistani phone number");
    return res.status(400).json({ error: "Invalid Pakistani phone number" });
  }

  const isAdminRegistered = await FindUser(email);

  if (isAdminRegistered) {
    logger.warn("Admin registration failed: Email already exists");
    return res.status(400).json({ error: " email already exists" });
  }

  const hashedPassword = await hashPassword(password);

  try {
    await prisma.admin.create({
      data: {
        name,
        email,
        phone: String(phone),
        hashPassword: hashedPassword,
        department,
        isActive: true,
      },
    });

    logger.info("Admin created successfully");

    return res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    logger.error("Error while registering admin");

    return res
      .status(500)
      .json({ error: `Error while registering admin: ${err}` });
  }
};