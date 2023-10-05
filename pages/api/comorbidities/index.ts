import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../utils/mongodb";
 import ComorbiditiesModel from "../../../models/symptom.model";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectMongo()

  if(req.method === "POST") {

    const { userid, cva, previousHeartAttacks, heartFailure,diabetes,pregnancy,lungDisease,coronaryArteryDisease } = req.body;
    try {
            const newComorbidities = new ComorbiditiesModel({
                cva,
                previousHeartAttacks,
                heartFailure,
                diabetes,
                pregnancy,
                lungDisease,
                coronaryArteryDisease
              });
              const savedComorbidities = await newComorbidities.save();
        
      res.status(201).json({
        success: true,
        message: "Comorbidities created successfully",
        data: savedComorbidities,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }else if (req.method === "GET") {
    try {
      const ComorbiditiesData= await ComorbiditiesModel.find({});
      res.status(200).json({
        success: true,
        message: "successfully",
        data: ComorbiditiesData
      });
    }catch (error){
        res.status(500).json({ 
          success: false,
          message: "Failed to retrieve Comorbidities" });
       } 
    }else {
    res.status(405).json({
      success: false,
      message: "Invalid method",
    });
  }
};

export default handler;
