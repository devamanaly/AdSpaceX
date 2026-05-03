import { AuthMiddleware } from "../auth/Middleware";
import { AdvertiserService } from "./Advertiser.Service";
// import { AdvertiserProfile  from "./Advertiser.Service";
import AdvertiserProfile from "./GetAdvertiser.Service";
import { Router } from "express";
const router = Router()

router.post('/register', AdvertiserService)
router.get('/profile',AuthMiddleware,AdvertiserProfile)

export default router