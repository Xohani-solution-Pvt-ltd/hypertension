import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../utils/mongodb";
 import SymptomModel from "../../../models/symptom.model";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectMongo()

  const { userid,diagnosisid,coronaryArteryDisease,breathlessness,minorNYHA,majorNYHA,legSwelling} = req.body;

    if(req.method === "POST"){
      try {
        const symptomData = req.body;
        const symptom = new SymptomModel(symptomData);
        await symptom.save();
        res.status(201).json({
          success: true,
          data: symptom
        });
      } catch (error) {
          res.status(500).json({ 
            success: false,
            message: "Failed to create the symptom" });
         }
    }else if(req.method === "GET"){
      try {
        const symptoms = await SymptomModel.findOne({diagnosisid : req.query.id });
        res.status(200).json({
          success: true,
          message: "successfully",
          data: symptoms
        });
      }catch(error){
          res.status(500).json({ 
            success: false,
            message: "Failed to retrieve symptoms" });
         }
    }else{
      res.status(405).json({ error: "Method not allowed" });
    }
  }

export default handler;

