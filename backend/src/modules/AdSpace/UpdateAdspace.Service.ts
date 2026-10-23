import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import logger from "../../config/logger";

const prisma = new PrismaClient();

export const UpdateAdSpace = async (req: Request, res: Response) => {
  const user = (req as any).user;

  if (!user || user.role!=="admin") {
    logger.warn("Update ad space failed: User is missing");
    return res.status(400).json({
      error: "User is missing",
    });
  }

  const { id } = req.params;

  const { title, description, address, city, width, height, basePrice } =
    req.body;

  const data = {
    title,
    description,
    address,
    city,
    width,
    height,
    basePrice,
  };

  const updateData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined)
  );

  if (Object.keys(updateData).length === 0) {
    logger.warn("Update ad space failed: No fields provided");
    return res.status(400).json({
      error: "At least one field is required to update",
    });
  }
  const AdSpaceId = Number(id);

  try {
    const adSpace = await prisma.ad_Space.findUnique({
      where: { id: AdSpaceId },
    });

    if (!adSpace) {
      logger.warn(`Update ad space failed: Ad space ${id} not found`);
      return res.status(404).json({
        error: "Ad space not found",
      });
    }

    const updatedAdSpace = await prisma.ad_Space.update({
      where: { id: AdSpaceId },
      data: updateData,
    });

    logger.info(`Ad space ${id} updated successfully`);

    return res.status(200).json({
      message: "Ad space updated successfully",
      adSpace: updatedAdSpace,
    });
  } catch (err) {
    logger.error(`Update ad space failed for ${id}: ${err}`);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
