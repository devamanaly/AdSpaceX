import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import logger from "../../config/logger";

const prisma = new PrismaClient();

const GetAllAuctionsService = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;

        if (!user || !["admin", "advertiser"].includes(user.role)) {
            logger.warn("Get all auctions failed: Unauthorized access");

            return res.status(401).json({
                error: "Unauthorized to access this feature"
            });
        }

        const statusFilter = req.query.status as string | undefined;
        const adSpaceId = req.query.adSpaceId ? Number(req.query.adSpaceId) : undefined;
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));

        if (statusFilter && !["active", "scheduled"].includes(statusFilter)) {
            logger.warn("Get all auctions failed: Invalid status filter");

            return res.status(400).json({
                error: "Status must be either 'active' or 'scheduled'"
            });
        }

        if (adSpaceId !== undefined && (!Number.isInteger(adSpaceId) || adSpaceId <= 0)) {
            logger.warn("Get all auctions failed: Invalid adSpaceId");

            return res.status(400).json({
                error: "adSpaceId must be a positive integer"
            });
        }

        const now = new Date();

        const activeCondition = {
            status: { in: ["scheduled", "active"] },
            startingTime: { lte: now },
            endingTime: { gt: now }
        };

        const scheduledCondition = {
            status: "scheduled",
            startingTime: { gt: now }
        };

        let timeCondition: any;

        if (statusFilter === "active") {
            timeCondition = activeCondition;
        } else if (statusFilter === "scheduled") {
            timeCondition = scheduledCondition;
        } else {
            timeCondition = { OR: [activeCondition, scheduledCondition] };
        }

        const where: any = {
            ...timeCondition,
            ...(adSpaceId !== undefined && { adSpaceId })
        };

        const [total, auctions] = await Promise.all([
            prisma.auctions.count({ where }),
            prisma.auctions.findMany({
                where,
                orderBy: { startingTime: "asc" },
                skip: (page - 1) * limit,
                take: limit,
                select: {
                    id: true,
                    adSpaceId: true,
                    status: true,
                    startingTime: true,
                    endingTime: true,
                    displayDurationDays: true,
                    startingPrice: true,
                    currentHeighestBid: true,
                    minimumIncrement: true,
                    bidCount: true
                }
            })
        ]);

        const data = auctions.map((auction) => {
            const isActive = now >= auction.startingTime && now < auction.endingTime;

            return {
                ...auction,
                status: isActive ? "active" : "scheduled",
                startsInSeconds: isActive
                    ? 0
                    : Math.max(0, Math.floor((auction.startingTime.getTime() - now.getTime()) / 1000)),
                endsInSeconds: Math.max(
                    0,
                    Math.floor((auction.endingTime.getTime() - now.getTime()) / 1000)
                )
            };
        });

        return res.status(200).json({
            message: "Auctions fetched successfully",
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            serverTime: now,
            auctions: data
        });

    } catch (error) {
        logger.error("GetAllAuctionsService error:", error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
};

export default GetAllAuctionsService;

/*
Route example (in AuctionController):

import GetAllAuctionsService from "./GetAllAuctionsService";

// Add your auth middleware here if you have one, so req.user is set
router.get("/", authMiddleware, GetAllAuctionsService);

Requests:
GET /api/v1/auction
GET /api/v1/auction?status=active
GET /api/v1/auction?status=scheduled&page=1&limit=10
*/