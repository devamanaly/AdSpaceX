import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import adminRouter from "./modules/Admin/CreateAdminController";
import advertiserRouter from "./modules/Advertiser/Advertiser.Controller";
import profileRouter from "./modules/profile/Profile.Controller";
import authRouter from "./modules/auth/Auth.Controller";
// import advertiserProfileRoute from 
import companyRoutes from './modules/compnay/Company.Controller'
import AdSpaceRoute from './modules/AdSpace/AdSpace.Controller'
import { ErrorHandler } from "./util/globalErrorHandler/globalErrorHandler";
const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());
// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// app.use("/api/profile",
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Backend is working!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});
// )
app.use('/api/v1/advertiser', advertiserRouter)
app.use('/api/v1/admin',adminRouter)
app.use('/api/v1/auth', authRouter)
app.use("/api/v1/company", companyRoutes)
app.use("/api/v1/ad-space", AdSpaceRoute)
app.use("/api/v1/user", profileRouter)
app.get("/api/v1/ads", async (req, res) => {


  app.use(ErrorHandler);

  try {
    const ads = await prisma.ad.findMany();
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch ads" });
  }
});

export default app;
// Create ad
// app.post("/api/ads", async (req, res) => {
//   try {
//     const { title, description, price, location } = req.body;
//     const ad = await prisma.ad.create({
//       data: { title, description, price, location }
//     });
//     res.json(ad);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create ad" });
//   }
// });

// Get all ads