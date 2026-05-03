import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const FindUser = async (email: string): Promise<boolean> => {
  if (!email) return false;

  try {
    const [admin, advertiser] = await Promise.all([
      prisma.admin.findUnique({ where: { email } }),
      prisma.advertiser.findUnique({ where: { email } }),
    ]);

    return !!(admin || advertiser);

  } catch (error) {
    console.error("Error checking user:", error);
    throw error;
  }
};