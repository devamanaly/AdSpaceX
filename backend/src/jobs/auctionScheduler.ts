import cron from "node-cron";
import { PrismaClient } from "@prisma/client";
import logger from "../config/logger";

const prisma = new PrismaClient();

const runAuctionScheduler = async () => {
    const now = new Date();

    try {
        const started = await prisma.auctions.updateMany({
            where: {
                status: "scheduled",
                startingTime: { lte: now },
                endingTime: { gt: now }
            },
            data: { status: "active" }
        });

        if (started.count > 0) {
            logger.info(`Auction scheduler: ${started.count} auction(s) started`);
        }

        // 2. active -> ended
        const endingAuctions = await prisma.auctions.findMany({
            where: {
                status: "active",
                endingTime: { lte: now }
            }
        });

        for (const auction of endingAuctions) {
            const result = await prisma.auctions.updateMany({
                where: { id: auction.id, status: "active" },
                data: { status: "ended" }
            });

            if (result.count > 0) {
                logger.info(`Auction ${auction.id} ended`);
                // TODO: determine the winner, notify users, create the ad booking, etc.
            }
        }
    } catch (error) {
        logger.error("Auction scheduler error:", error);
    }
};

export const startAuctionScheduler = () => {
    // Every 10 seconds (the 6-field format includes seconds)
    cron.schedule("*/10 * * * * *", runAuctionScheduler);
    logger.info("Auction scheduler started");
};