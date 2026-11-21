import { AuthMiddleware } from "../auth/Middleware";
import { CreateAdSpace } from "./CreateAdSpace.Service";
import { getAdSpaceById, getAdSpaceService } from "./GetAdSpace.Service";
import { Router } from "express";
import { UpdateAdSpace } from "./UpdateAdspace.Service";
import { DeleteAdSpaceImage } from "./DeleteAdSpaceImages";
import { DeleteAdSpace } from "./DeleteAdSpace";

const router = Router()

router.post('/register',AuthMiddleware,CreateAdSpace)
router.get('/all',getAdSpaceService)
router.get('/:id',getAdSpaceById)
router.patch('/:id',AuthMiddleware,UpdateAdSpace)
router.delete('/:id', AuthMiddleware, DeleteAdSpace);
router.delete("/image/:id", AuthMiddleware, DeleteAdSpaceImage);
export default router