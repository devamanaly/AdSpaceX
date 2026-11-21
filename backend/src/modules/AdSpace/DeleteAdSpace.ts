import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import logger from "../../config/logger";

const prisma = new PrismaClient();

export const DeleteAdSpace = async (req: Request, res: Response) => {
  const user = (req as any).user;

  if (!user || user.role !== "admin") {
    logger.warn("Delete ad space failed: User is missing");
    return res.status(400).json({
      error: "User is missing",
    });
  }

  const { id } = req.params;
  const AdSpaceId = Number(id);
  try {
    const adSpace = await prisma.ad_Space.findUnique({
      where: { id: AdSpaceId },
    });

    if (!adSpace) {
      logger.warn(`Delete ad space failed: Ad space ${id} not found`);
      return res.status(404).json({
        error: "Ad space not found",
      });
    }
    await prisma.$transaction(async (tx) => {
      await tx.ad_Space.update({
        where: { id: AdSpaceId },
        data: {
          adSpaceSmages: {
            deleteMany: {},
          },
        },
      });

      await tx.ad_Space.delete({
        where: { id: AdSpaceId },
      });
    });

    logger.info(`Ad space ${id} deleted successfully`);

    return res.status(200).json({
      message: "Ad space deleted successfully",
    });
  } catch (err) {
    logger.error(`Delete ad space failed for ${id}: ${err}`);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
