import { Request, Response } from "express";
import { FindUser } from "../util/FindUser";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../util/Bycriptpassword";

const prisma = new PrismaClient(); // move outside function

 export const CreateAdminService = async (req: Request, res: Response) => {
  const { email, name, department, phone, password, confirmPassword } = req.body;

  const AdminData = { email, name, department, phone, password, confirmPassword };

  for (const [key, value] of Object.entries(AdminData)) {
    if (!value) {
      return res.status(400).json({ error: `${key} is empty` });
    }
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Password does not match confirm password" });
  }

  if (String(phone).length !== 11) {
    return res.status(400).json({ error: "Phone should be 11 digits" });
  }
  if (!/^03\d{9}$/.test(String(phone))) {
    return res.status(400).json({ error: "Invalid Pakistani phone number" });
  }
  const isAdminRegistered = await FindUser("admin", email);
  if (isAdminRegistered) {
    return res.status(400).json({ error: "Admin with this email already exists" });
  }

  const hashedPassword = await hashPassword(password);

  try {
    await prisma.admin.create({
      data: {
        name,
        email,    
        phone: String(phone),
        hashPassword: hashedPassword, // ✅ matches schema after `prisma generate`
        department,
        isActive:true
      },
    });

    return res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    return res.status(500).json({ error: `Error while registering admin: ${err}` });
  }
};