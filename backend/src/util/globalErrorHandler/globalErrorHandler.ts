import { Request, Response, NextFunction } from "express";
import logger from "../../config/logger";

export const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(`Unhandled Error: ${err.message}`, {
        stack: err.stack,
        url: req.originalUrl,
        method: req.method,
    });    res.status(500).json({
        error: "Internal Server Error",
        message: err.message || "An unexpected error occurred"
    });
};