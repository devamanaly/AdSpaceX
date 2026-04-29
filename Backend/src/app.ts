import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import adminRouter from "./modules/CreateAdmin/CreateAdminController";
import advertiserRouter from "./modules/Advertiser/Advertiser.Controller";

const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

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
app.use('/api/advertiser', advertiserRouter)
app.use('/api/admin',adminRouter)
app.get("/api/ads", async (req, res) => {
  try {
    const ads = await prisma.ad.findMany();
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch ads" });
  }
});

export default app;