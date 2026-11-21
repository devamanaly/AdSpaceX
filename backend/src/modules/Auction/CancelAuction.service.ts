import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import logger from "../../config/logger";
import { error } from "node:console";

const prisma = new PrismaClient();

const CancelAuctionService = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;

        if (!user || user.role !== "admin") {
            logger.warn("Cancel auction failed: Unauthorized access");

            return res.status(401).json({
                error: "Unauthorized to access this feature"
            });
        }

        const auctionId = Number(req.params.id);

        if (!Number.isInteger(auctionId) || auctionId <= 0) {
            logger.warn("Cancel auction failed: Invalid auction id");

            return res.status(400).json({
                error: "Auction id must be a positive integer"
            });
        }

        const { reason } = req.body;

        if (typeof reason !== "string" || reason.trim().length < 3) {
            logger.warn("Cancel auction failed: Cancellation reason is missing");

            return res.status(400).json({
                error: "A cancellation reason is required"
            });
        }

        const auction = await prisma.auctions.findUnique({
            where: { id: auctionId }
        });

        if (!auction) {
            logger.warn(`Cancel auction failed: Auction ${auctionId} not found`);

            return res.status(404).json({
                error: "Auction not found"
            });
        }

        const now = new Date();

        if (auction.status === "cancelled") {
            return res.status(409).json({
                error: "Auction is already cancelled"
            });
        }

        if (auction.status === "ended" || now >= auction.endingTime) {
            return res.status(409).json({
                error: "Auction has already ended and cannot be cancelled"
            });
        }

        // Active auctions that already have bids cannot be cancelled
        if (now >= auction.startingTime && auction.bidCount > 0) {
            logger.warn(`Cancel auction failed: Auction ${auctionId} already has ${auction.bidCount} bid(s)`);

            return res.status(409).json({
                error: "An active auction that already has bids cannot be cancelled"
            });
        }

        // The conditions are repeated in the update, so if a bid arrives or the
        // status changes between the check above and this update, nothing is cancelled.
        const result = await prisma.auctions.updateMany({
            where: {
                id: auctionId,
                endingTime: { gt: now },
                OR: [
                    { status: "scheduled" },
                    { status: "active", bidCount: 0 }
                ]
            },
            data: {
                status: "cancelled",
                cancelled_reason: reason.trim()
            }
        });

        if (result.count === 0) {
            logger.warn(`Cancel auction failed: Auction ${auctionId} changed state during cancellation`);

            return res.status(409).json({
                error: "Auction state changed (a bid may have been placed). Please check the status and try again"
            });
        }

        logger.info(`Auction ${auctionId} cancelled by Admin ID ${user.id}. Reason: ${reason.trim()}`);

        return res.status(200).json({
            message: "Auction cancelled successfully",
            auctionId,
            status: "cancelled",
            reason: reason.trim()
        });

    } catch (error) {
        logger.error("CancelAuctionService error:", error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
};

export default CancelAuctionService;

/*
Route example (in AuctionController):

import CancelAuctionService from "./CancelAuction.service";

router.patch("/:id/cancel", AuthMiddleware, CancelAuctionService);

Request:
PATCH /api/v1/auction/12/cancel
Body: { "reason": "Ad space no longer available" }
*/