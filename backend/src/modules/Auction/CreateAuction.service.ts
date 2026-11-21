import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
// import logger from "../../utils/logger";
import logger from "../../config/logger";

const prisma = new PrismaClient();

const CreateAuctionService = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;

        if (!user || user.role !== "admin") {
            logger.warn("Create auction failed: Unauthorized access");

            return res.status(401).json({
                error: "Unauthorized to access this feature"
            });
        }

        const {
            adSpaceId,
            startingTime,
            endingTime,
            displayDurationDays,
            startingPrice,
            minimumIncrement
        } = req.body;

        const auctionData = {
            adSpaceId,
            startingTime,
            endingTime,
            displayDurationDays,
            startingPrice,
            minimumIncrement
        };

        for (const [key, value] of Object.entries(auctionData)) {
            if (value === undefined || value === null || value === "") {
                logger.warn(`Create auction failed: ${key} is missing`);

                return res.status(400).json({
                    error: `${key} is missing`
                });
            }
        }

        const startDate = new Date(startingTime);
        const endDate = new Date(endingTime);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            logger.warn("Create auction failed: Invalid auction dates");

            return res.status(400).json({
                error: "Invalid auction dates"
            });
        }

        if (startDate <= new Date()) {
            logger.warn("Create auction failed: Starting time must be in the future");

            return res.status(400).json({
                error: "Starting time must be in the future"
            });
        }

        if (endDate <= startDate) {
            logger.warn("Create auction failed: Ending time must be after starting time");

            return res.status(400).json({
                error: "Ending time must be after starting time"
            });
        }

        if (!Number.isInteger(Number(displayDurationDays)) || Number(displayDurationDays) <= 0) {
            logger.warn("Create auction failed: Invalid display duration");

            return res.status(400).json({
                error: "Display duration must be a positive integer"
            });
        }

        if (!Number.isInteger(Number(startingPrice)) || Number(startingPrice) <= 0) {
            logger.warn("Create auction failed: Invalid starting price");

            return res.status(400).json({
                error: "Starting price must be a positive integer"
            });
        }

        if (!Number.isInteger(Number(minimumIncrement)) || Number(minimumIncrement) <= 0) {
            logger.warn("Create auction failed: Invalid minimum increment");

            return res.status(400).json({
                error: "Minimum increment must be a positive integer"
            });
        }

        const adSpace = await prisma.ad_Space.findUnique({
            where: {
                id: Number(adSpaceId)
            }
        });

        if (!adSpace) {
            logger.warn(`Create auction failed: Ad space ${adSpaceId} not found`);

            return res.status(404).json({
                error: "Ad space not found"
            });
        }

        const existingAuction = await prisma.auctions.findFirst({
            where: {
                adSpaceId: Number(adSpaceId),
                status: {
                    in: ["scheduled", "active"]
                },
                startingTime: {
                    lt: endDate
                },
                endingTime: {
                    gt: startDate
                }
            }
        });

        if (existingAuction) {
            logger.warn(`Create auction failed: Overlapping auction for ad space ${adSpaceId}`);

            return res.status(409).json({
                error: "An auction already exists for this ad space during the selected period"
            });
        }

        const auction = await prisma.auctions.create({
            data: {
                adSpaceId: Number(adSpaceId),
                startingTime: startDate,
                endingTime: endDate,
                displayDurationDays: Number(displayDurationDays),
                startingPrice: Number(startingPrice),
                currentHeighestBid: Number(startingPrice),
                minimumIncrement: Number(minimumIncrement),
                bidCount: 0,
                status: "scheduled",
                createdByAdmin: user.id,
                cancelled_reason: "null"
            }
        });

        logger.info(`Auction created successfully: Auction ID ${auction.id}, Admin ID ${user.id}`);

        return res.status(201).json({
            message: "Auction created successfully",
            auction
        });

    } catch (error) {
        logger.error("CreateAuctionService error:", error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
};

export default CreateAuctionService;