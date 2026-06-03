import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const getAdSpaceService = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  //   const user = (req as any).user;
  //   const { id, role } = user;

  try {
    const data = await prisma.ad_Space.findMany({
      select: {
        title: true,
        description: true,
        adSpaceSmages: true,
        address: true,
        city: true,
        width: true,
        height: true,
        basePrice: true,
        status: true,
      },
    });
    return res.status(200).json({ message: "successfully return", data });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAdSpaceById = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
console.log(" i am provke")
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "missing id " });
  }
  const ad_Space_id = Number(id);
  try {
    const data = await prisma.ad_Space.findUnique({
      where: { id: ad_Space_id },
      select: {
        title: true,
        description: true,
        adSpaceSmages: true,
        address: true,
        city: true,
        width: true,
        height: true,
        basePrice: true,
        status: true,
      },
    });
    return res
      .status(200)
      .json({ message: `the data is retrevive successfully`, data  });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server error" });
  }
};
