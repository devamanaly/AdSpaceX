import AdvertiserProfile from "./GetAdvertiser.Service";
import { AuthMiddleware } from "../auth/Middleware";

import { Router } from "express";
const router = Router()

router.get('/profile',AuthMiddleware,AdvertiserProfile)

export default router