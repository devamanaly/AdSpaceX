import { Express, Router } from "express"
// import { AdminMiddleware } from "../../Middleware/AdminAuth"
import CreateAuctionService from "./CreateAuction.service"
import { AuthMiddleware } from "../auth/Middleware"
import GetAuctionStatusService from "./GetAuction.service"
import GetAllAuctionsService from "./GetAllAuction.service"
import CancelAuctionService from "./CancelAuction.service"
const router = Router()

router.post("/create", AuthMiddleware, CreateAuctionService)
router.get("/:id/status", AuthMiddleware, GetAuctionStatusService);
router.get("/", AuthMiddleware, GetAllAuctionsService)
router.patch("/:id/cancel", AuthMiddleware, CancelAuctionService);



export default router