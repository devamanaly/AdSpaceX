import { CreateAdminService } from "./CreateAdminService";
import { Router } from "express";
const router= Router();

router.post('/register' , CreateAdminService)
export default router