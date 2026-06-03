import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const CreateAdSpace = async (req: Request, res: Response) => {
  const user = (req as any).user;

  if (!user) {
    return res.status(400).json({
      error: "User is missing",
    });
  }

  const { id, role } = user;

  const {
    title,
    description,
    address,
    city,
    width,
    height,
    basePrice,
    adSpaceImages,
  } = req.body;

  const AdSpaceData = {
    title,
    description,
    address,
    city,
    width,
    height,
    basePrice,
    adSpaceImages,
  };

  for (const [key, value] of Object.entries(AdSpaceData)) {
    if (!value) {
      return res.status(400).json({
        error: `${key} is missing`,
      });
    }
  }

  try {
    await prisma.ad_Space.create({
      data: {
        title,
        description,
        address,
        city,
        width,
        height,
        basePrice,

        adSpaceSmages: {
          create: adSpaceImages.map((img: any, index: number) => ({
            imgUrl: img.imgUrl,
            thumnail: img.thumnail,
            isPrimary: img.isPrimary,
            caption: img.caption,
            uploadedByAdmin: id,
          })),
        },

        createdByAdmin: id,
      },
    });

    return res.status(200).json({
      message: "Ad space is successfully created",
    });
  } catch (err) {
    return res.status(500).json({
      error: `Internal Server Error ${err}`,
    });
  }
};