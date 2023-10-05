import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../utils/mongodb";
 import BloodTestModel from "../../../models/bloodtest.model";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectMongo()

  const { userid,hbA1cLevel,normalHbA1c,hBA1CInterpretation,totalCholesterol,lipidNormal,lipidInterpretation,hdlCholesterol,hdlNormal,hdlInterpretation,lcdCholesterol,lcdNormal,lcdInterpretation,triglycerides,triglyceridesNormal,triglyceridesInterpretation,albumin, creatinine ,acrResult, eGFRResult,sodium,potassium,uricAcid,kidneyInterpretation,tshLevel,tshRange,tshInterpretation,renalArteryDoppler,coronaryArteryDisease,hfrEF,hfpeEF,ejectionFraction} = req.body;

    if(req.method === "POST"){
      try {
        const bloodtestData = req.body;
        const bloodtest = new BloodTestModel(bloodtestData);
        await bloodtest.save();
        res.status(201).json({
          success: true,
          data: bloodtest
        });
      } catch (error) {
          res.status(500).json({ 
            success: false,
            message: "Failed to create the bloodtest" });
         }
    }else if(req.method === "GET"){
      try {
        const bloodtest = await BloodTestModel.find({});
        res.status(200).json({
          success: true,
          message: "successfully",
          data: bloodtest
        });
      }catch(error){
          res.status(500).json({ 
            success: false,
            message: "Failed to retrieve bloodtest" });
         }
    }else{
      res.status(405).json({ error: "Method not allowed" });
    }
  }

export default handler;

