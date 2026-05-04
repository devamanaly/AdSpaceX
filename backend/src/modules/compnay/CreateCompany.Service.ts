import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const CreateCompanyService = async (req: Request, res: Response) => {
  // const { id, email,   }= user;
  const prisma =  new PrismaClient();
  const {
    companyName,
    phone,
    alternativePhone,
    addressLine1,
    city,
    postalCode,
    country,
    companyLicence,
    logoUrl,
    industryType,
  } = req.body;
  const CompnayInfo = {
    companyName,
    phone,
    alternativePhone,
    addressLine1,
    city,
    postalCode,
    country,
    companyLicence,
    logoUrl,
    industryType,
  };

  const user = (req as any).user;
  if(!user){
    return res.status(400).json({ error: "User is missing" });

  }
  const {id,role}=user;

  const advertiserId=id;
  if(role!=="advertiser"){
    return res.status(401).json({error:"unAuthuroized"})
  }


  for (const [key, value] of Object.entries(CompnayInfo)) {
    if (!value) {
      return res.status(400).json({ error: `${key} is empty` });
    }
  }



  try{

        const create = await prisma.company.create({
            data:{
                advertiser_id:advertiserId,
                companyName:companyName,
                phone:phone,
                alternatePhone:alternativePhone,
                addressLine1:addressLine1,
                city:city,
                postalCode:postalCode,
                country:country,
                company_licence:companyLicence,
                logoUrl:logoUrl,
                industryType:industryType,
                status:'active',


            }
        })

        return res.status(200).json({message:'successfully created',create})
  }catch(err){
    return res.status(500).json({error:`Internal serverr error ${err}`})

  }


};
