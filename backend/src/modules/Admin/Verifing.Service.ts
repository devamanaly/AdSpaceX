import { Request, Response } from "express";
import logger from "../../config/logger";
import { PrismaClient } from "@prisma/client";
import { error } from "node:console";
const prisma = new PrismaClient();
export const verifingAdvertiser = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const userId = req.params.id;
  const { isVerified } = req.body;

  if (!user || user.role !== "admin") {
    logger.error("Unauthorized to very");
    return res.status(403).json({ success: false, error: "Unauthorized! Please login as Admin" });
  }
  if (!userId) {
    logger.error("Need User ");
    return res.status(403).json({ success: false, error: "Need User" });
  }
  if (typeof isVerified !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "Missing or invalid 'isVerified' boolean value in request body.",
    });
}
    let advertiser;
    try {
      advertiser = await prisma.advertiser.findUnique({
        where: {
          id: Number(userId),
        },
      });
      if (!advertiser) {
        logger.error("Advertiser not found");
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }
    } catch (err) {
      logger.error("Internal Server error while checking user");

      return res
        .status(500)
        .json({ success: false, error: "Internal Server Errror" });
    }

    try {
      await prisma.advertiser.update({
        where: { id: Number(userId) },
        data: {
          isVerifiedByAdmin: isVerified,
        },
      });
      logger.info(
        `Advertiser ID ${userId} verification status updated to ${isVerified}`
      );
      return res
        .status(200)
        .json({ success: true, message: "successflly verifed" });
    } catch (err) {
      logger.error("Internal Server error while verifying");
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Errror" });
    }
  
};


// import { Request, Response } from "express";
// import logger from "../../config/logger";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();


export const verifyingCompany = async (req: Request, res: Response) => {
    const user = (req as any).user;
    const companyId = req.params.id;
    const { isVerified } = req.body;
  
    if (!user || user.role !== "admin") {
      logger.error("Unauthorized to verify company");
      return res.status(403).json({
        success: false,
        error: "Unauthorized! Please login as Admin",
      });
    }
  
    if (
      !companyId ||
      !Number.isInteger(Number(companyId)) ||
      Number(companyId) <= 0
    ) {
      logger.error("Invalid company ID");
      return res.status(400).json({
        success: false,
        error: "Invalid company ID",
      });
    }
  
    if (typeof isVerified !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Missing or invalid 'isVerified' boolean value.",
      });
    }
  
    try {
      const company = await prisma.company.findUnique({
        where: {
          id: Number(companyId),
        },
      });
  
      if (!company) {
        logger.error("Company not found");
        return res.status(404).json({
          success: false,
          error: "Company not found",
        });
      }
  
      await prisma.company.update({
        where: {
          id: Number(companyId),
        },
        data: {
          verficationDate: isVerified ? new Date() : null,
          isVerifiedByAdmin: isVerified,
          verifiedByAdmin: user.id,
        
        },
      });
  
      logger.info(
        `Company ID ${companyId} verification status updated to ${isVerified}`
      );
  
      return res.status(200).json({
        success: true,
        message: "Company verification status updated successfully",
      });
    } catch (err) {
      logger.error("Error while verifying company");
      return res.status(500).json({
        success: false,
        error: "Internal Server Error",
      });
    }
  };
  