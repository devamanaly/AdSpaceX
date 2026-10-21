import { AuthMiddleware } from "../auth/Middleware";
import { CreateAdminService } from "./CreateAdminService";
import { Router } from "express";
import { GetCompaniesService, GetCompanyByIdService } from "./GetCompaniesService";
import { verifingAdvertiser, verifyingCompany } from "./Verifing.Service";
const router= Router();

router.post('/register' , CreateAdminService)
router.get('/getCompanies', AuthMiddleware,GetCompaniesService)
router.get('/getCompaniesById/:id', AuthMiddleware,GetCompanyByIdService)
router.patch('/advertiser/:id/verify',AuthMiddleware,verifingAdvertiser)
router.patch('/company/:id/verify',AuthMiddleware,verifyingCompany)

export default router