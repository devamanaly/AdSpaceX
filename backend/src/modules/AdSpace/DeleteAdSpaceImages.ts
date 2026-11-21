import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import logger from "../../config/logger";

const prisma = new PrismaClient();

export const DeleteAdSpaceImage = async (
  req: Request,
  res: Response
) => {
  const user = (req as any).user;

  if (!user) {
    logger.warn("Delete ad space image failed: User is missing");
    return res.status(400).json({
      error: "User is missing",
    });
  }

  const { id } = req.params;
  const AdSpaceImagesId=Number(id)
  try {
    const image = await prisma.ad_Space_Images.findUnique({
      where: { id:AdSpaceImagesId },
    });

    if (!image) {
      logger.error(`Delete ad space image failed: Image ${id} not found`);
      return res.status(404).json({
        error: "Ad space image not found",
      });
    }

    await prisma.ad_Space_Images.delete({
      where: { id:AdSpaceImagesId },
    });

    logger.info(`Ad space image ${id} deleted successfully`);

    return res.status(200).json({
      message: "Ad space image deleted successfully",
    });
  } catch (err) {
    logger.error(`Delete ad space image failed for ${id}: ${err}`);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};