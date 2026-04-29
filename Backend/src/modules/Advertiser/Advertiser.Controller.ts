import { AdvertiserService } from "./Advertiser.Service";

import { Router } from "express";
const router = Router()

router.post('/register', AdvertiserService)

export default router