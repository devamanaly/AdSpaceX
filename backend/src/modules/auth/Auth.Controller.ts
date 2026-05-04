import AuthService from "./Auth.Service";

import { Router } from "express";
const router = Router()

router.post('/login',AuthService)

export default router
