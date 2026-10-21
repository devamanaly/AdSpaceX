import { Request, Response } from "express";
import logger from "../../config/logger";
import { PrismaClient } from "@prisma/client";

export const GetCompaniesService = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  const user = (req as any).user;
  console.log(user,"rolessss")
  if (!user || user.role !== "admin") {
    return res.status(403).json({ error: "Log in as admin" });
  }
  const page = Number(req.query.page) || 1;
  const limit = 15;
  const sort = req.query.sort === "asc" ? "asc" : "desc";
  let companies;

  try {
    companies = await prisma.company.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: sort,
      },
    });
    res.status(200).json({ message: "sucessfully retive", companies });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error", err });
  }
};


export const GetCompanyByIdService  = async(req:Request, res:Response) => {
  const prisma = new PrismaClient()
  const user = (req as any).user;

  const {id} = req.params;
  const companyId =Number(id);
  if (!user || user.role !== "admin") {
    return res.status(403).json({ error: " Log in as admin " });
  }
  if (!id){
    return res.status(400).json({error:"not user"})
  }
  let company;

  try {
    company = await prisma.company.findUnique({
      where: { id: companyId }
    });
  
    if (!company) {
      return res.status(404).json({
        error: "Company not found"
      });
    }

    return res.status(200).json({message:"successfully retrive", company})
  
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error"
 , err   });
  }
}