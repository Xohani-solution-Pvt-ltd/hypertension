import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../../utils/mongodb";
 import DiagnosisModel from "../../../../models/diagnosis.model";
import { verifyJWTandCheckUser } from "../../../../utils/userFromJWT";
import { User } from "next-auth";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectMongo()

if (req.method === "GET") {

    try {
      const diagnosisData= await DiagnosisModel.findOne({diagnosisId :req.query._id});
      res.status(200).json({
        success: true,
        message: "successfully",
        data: diagnosisData
      });
    }catch (error){
        res.status(500).json({ 
          success: false,
          message: "Failed to retrieve Diagnosis" });
       } 
    }else 
if (req.method === "PUT") {
  const { id } = req.query; 
      const { systolic, diastolic, pulseRate } = req.body;
    try {

      const existingDiagnosis = await DiagnosisModel.findByIdAndUpdate(id);
      if (!existingDiagnosis) {
        res.status(404).json({
          success: false,
          message: "Diagnosis not found",
        });
        return;
      }

      existingDiagnosis.systolic = systolic;
      existingDiagnosis.diastolic = diastolic;
      existingDiagnosis.pulseRate = pulseRate;

      const updatedDiagnosis = await existingDiagnosis.save();

      res.status(200).json({
        success: true,
        message: "Diagnosis updated successfully",
        data: updatedDiagnosis,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }else if (req.method === "DELETE"){
        try {
          const { id } = req.query;
          const deletedDiagnosis = await DiagnosisModel.findByIdAndDelete(id);
          if (!deletedDiagnosis){
            return res.status(404).json({ error: "Diagnosis not found" });
           }
           res.status(200).json({
            success: true,
            message: "Deleted Diagnosis successfully",
            data: deletedDiagnosis
          })
        } catch (error) {
          res.status(500).json({ error: "Failed to delete the Diagnosis" });
        }
      }else {
    res.status(405).json({
      success: false,
      message: "Invalid method",
    });
  }
};

export default handler;

