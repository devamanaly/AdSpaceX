import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { error } from "node:console";

 const AdvertiserProfile = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  const user = (req as any).user; // Fixed: removed extra .req
  console.log(user,"user")
  if (!user) {
    return res.status(400).json({ error: `user has to login` });
  }
  const { role, email } = user;
  try {
    let user;
    switch (role) {
      case "admin":
       user = await prisma.admin.findUnique({
          where: { email: email },
          select: {
            name: true,
            email: true,
            isActive: true,
            phone: true,
            department: true,
          },
        });
        return res.status(200).json({message:"Successfully Return", user})
      case "advertiser":
      user=  await prisma.advertiser.findUnique({
          where: { email: email },
          select: {
            name: true,
            email: true,
            isActive: true,
            phone: true,
            // department:true,
            isVerifiedByAdmin: true,
          },
        });
        return res.status(200).json({message:"Successfully Return", user})

        

    }
  } catch (err) {
    return res.status(500).json({ error: `Internal Server Error ${err}` });
  }
};

export default AdvertiserProfile