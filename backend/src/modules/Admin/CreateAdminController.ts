import { AuthMiddleware } from "../auth/Middleware";
import { CreateAdminService } from "./CreateAdminService";
import { Router } from "express";
import { GetCompaniesService, GetCompanyByIdService } from "./GetCompaniesService";
const router= Router();

router.post('/register' , CreateAdminService)
router.get('/getCompanies', AuthMiddleware,GetCompaniesService)
router.get('/getCompaniesById/:id', AuthMiddleware,GetCompanyByIdService)
export default router