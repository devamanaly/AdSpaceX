import { AuthMiddleware } from "../auth/Middleware";
import { CreateCompanyService } from "./CreateCompany.Service";
import { GetCompanyService } from "./GetCompany.Service";
import { Router } from "express";
const router = Router()

router.post('/register',AuthMiddleware,CreateCompanyService)
router.get('/get',AuthMiddleware,GetCompanyService)

export default router