import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const CreateAuctionService = async(req:Request, res:Response) =>{

    const prisma = new PrismaClient();
    const user =(req as any).user 
    const {adSpaceId,startingTime,endingTime,displayDurationDays,minimumIncrement}=req.body;
    if(!user && user.role!== "admin"){
        return res.status(401).json({error:"unauthorized to this feature"})
    }

    const auctionData ={
        adSpaceId,startingTime,endingTime,displayDurationDays,minimumIncrement

    }
    for (const [key, value] of Object.entries(auctionData)) {
        if(!value){

            return res.status(400).json({error:`${key} is missing`})
        }
        
    }
    let isAdSpaceAvalaible ;
    try{

        isAdSpaceAvalaible= prisma.ad_Space.findUnique({

            where:{ id:adSpaceId}
        }
        )


    }catch(e){
        return res.status(404).json({error:"adspace is not registered"})
    }
    const  adminId = user.id;


    
}