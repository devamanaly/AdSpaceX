import { Request ,Response } from "express";
import { error } from "node:console";
import { FindUser } from "../util/FindUser";
import { hashPassword } from "../util/Bycriptpassword";
import { Prisma, PrismaClient } from "@prisma/client";
export const AdvertiserService =async(req:Request, res:Response)=>{
const prisma = new PrismaClient()
    const {email,name,password,phone,confirmPassword}=req.body;

    const AdvertiserInfo = {email,name,password,confirmPassword }

    for (const [key,value] of Object.entries(AdvertiserInfo)){
        if(!value){
          return  res.status(400).json({error:`${key} is missing`})
        }
    }

    const isAdvertiserRegister= await FindUser(email)

    if(isAdvertiserRegister){
      return  res.status(400).json({error:"Email is already Register"})
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
  const hashedPassword = await hashPassword(password);


  try {
    await prisma.advertiser.create({
      data: {
        name,
        email,    
        phone: String(phone),
        hashPassword: hashedPassword, // ✅ matches schema after `prisma generate`
        isActive:false,
        isVerifiedByAdmin:false
      },
    });

    return res.status(201).json({ message: "Admin created successfully"  });
  } catch (err) {
    return res.status(500).json({ error: `Error while registering admin: ${err}` });
  }


}
