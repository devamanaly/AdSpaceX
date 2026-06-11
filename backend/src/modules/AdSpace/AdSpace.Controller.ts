import { AuthMiddleware } from "../auth/Middleware";
import { CreateAdSpace } from "./CreateAdSpace.Service";
import { getAdSpaceById, getAdSpaceService } from "./GetAdSpace.Service";
import { Router } from "express";

const router = Router()

router.post('/register',AuthMiddleware,CreateAdSpace)
router.get('/all',getAdSpaceService)
router.get('/:id',getAdSpaceById)

export default router