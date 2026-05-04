import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const GetCompanyService = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  const user = (req as any).user;
  const { id, email, role } = user;

  if (!user) {
    return res.status(401).json({ error: " un authorized" });
  }
  let companies;
  let totalCompanies;
  try {
    if (role === "advertiser") {
      companies = await prisma.company.findMany({
        where: { advertiser_id: id },
        select: {
          companyName: true,
          company_licence: true,
          verifiedByAdmin: true,
          phone: true,
          city: true,
          addressLine1: true,
          alternatePhone: true,
          logoUrl: true,
          industryType: true,
          verficationDate: true,
        },
      });

      totalCompanies = await prisma.company.count({
        where: { advertiser_id: id },
      });
    } else {
      companies = await prisma.company.findMany({
        // where:{id},
        select: {
          companyName: true,
          company_licence: true,
          verifiedByAdmin: true,
          phone: true,
          city: true,
          addressLine1: true,
          alternatePhone: true,
          logoUrl: true,
          industryType: true,
          verficationDate: true,
        },
      });
      totalCompanies = await prisma.company.count();
    }

    return res.status(200).json({ message: "successfully return", companies, totalCompanies });
  } catch (err) {
    return res.status(500).json({ error: `Internal Server Error ${err}` });
  }
};
