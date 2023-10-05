import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../../utils/mongodb";
 import DiagnosisModel from "../../../../models/diagnosis.model";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectMongo()
if (req.method === "GET") {
    try {
      const diagnosisData= await DiagnosisModel.findById(req.query.id);
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
    }else if (req.method === "PUT") {
      const { id } = req.query; 
      const { userid, systolic, diastolic, pulseRate } = req.body;
      try {
        const updatedDiagnosis = await DiagnosisModel.findByIdAndUpdate(
          id,
          {
            userid,
            systolic,
            diastolic,
            pulseRate
          },
          { new: true }
        );
        res.status(200).json({
          success: true,
          message: 'Diagnosis updated successfully',
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

