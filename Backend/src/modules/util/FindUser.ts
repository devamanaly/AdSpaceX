import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const FindUser = async (role: string, email: string) => {
    if (!email || !role) {
        return null;
    }

    try {
        if (role === "admin") {
            const user = await prisma.admin.findUnique({
                where: { email }
            });

            return user ? true : false; // true = exists
        }

        else if(role === "advertiser"){
            const user = await prisma.advertiser.findUnique({
                where: { email }
            });
            return user ? true : false; // true = exists

        }
        else {
            return null
        }
    } catch (error) {
        console.error("Error finding user:", error);
        throw error;
    }
};