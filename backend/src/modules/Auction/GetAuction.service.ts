import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import logger from "../../config/logger";

const prisma = new PrismaClient();

const GetAuctionStatusService = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;

        if (!user || user.role !== "admin") {
            logger.warn("Create auction failed: Unauthorized access");

            return res.status(401).json({
                error: "Unauthorized to access this feature"
            });
        }
        const auctionId = Number(req.params.id);

        if (!Number.isInteger(auctionId) || auctionId <= 0) {
            logger.warn("Get auction status failed: Invalid auction id");

            return res.status(400).json({
                error: "Auction id must be a positive integer"
            });
        }

        const auction = await prisma.auctions.findUnique({
            where: { id: auctionId },
            select: {
                id: true,
                adSpaceId: true,
                status: true,
                startingTime: true,
                endingTime: true,
                startingPrice: true,
                currentHeighestBid: true,
                minimumIncrement: true,
                bidCount: true
            }
        });

        if (!auction) {
            logger.warn(`Get auction status failed: Auction ${auctionId} not found`);

            return res.status(404).json({
                error: "Auction not found"
            });
        }

        const now = new Date();

        let liveStatus: string = auction.status;

        if (auction.status === "scheduled" && now >= auction.startingTime) {
            liveStatus = "active";
        }

        if (
            (auction.status === "scheduled" || auction.status === "active") &&
            now >= auction.endingTime
        ) {
            liveStatus = "ended";
        }

        const startsInSeconds = Math.max(
            0,
            Math.floor((auction.startingTime.getTime() - now.getTime()) / 1000)
        );

        const endsInSeconds = Math.max(
            0,
            Math.floor((auction.endingTime.getTime() - now.getTime()) / 1000)
        );

        return res.status(200).json({
            auctionId: auction.id,
            adSpaceId: auction.adSpaceId,
            status: liveStatus,
            storedStatus: auction.status,
            startingTime: auction.startingTime,
            endingTime: auction.endingTime,
            startsInSeconds: liveStatus === "scheduled" ? startsInSeconds : 0,
            endsInSeconds: liveStatus === "ended" ? 0 : endsInSeconds,
            currentHighestBid: auction.currentHeighestBid,
            minimumIncrement: auction.minimumIncrement,
            nextMinimumBid: auction.currentHeighestBid + auction.minimumIncrement,
            bidCount: auction.bidCount,
            serverTime: now
        });

    } catch (error) {
        logger.error("GetAuctionStatusService error:", error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
};



export default GetAuctionStatusService;



