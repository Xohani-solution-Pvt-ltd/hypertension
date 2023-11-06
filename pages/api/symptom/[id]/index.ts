import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../../utils/mongodb";
 import SymptomModel from "../../../../models/symptom.model";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectMongo()

  if (req.method === "PUT") {
    const { id } = req.query; 
    const {
      previousHeartAttacks,
      breathlessness,
      minorNYHA,
      majorNYHA,
      legSwelling,
    } = req.body;
    
    try {
      const updatedSymptoms = await SymptomModel.findByIdAndUpdate(
        id,
        {
          previousHeartAttacks,
          breathlessness,
          minorNYHA,
          majorNYHA,
          legSwelling,
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: 'Symptoms updated successfully',
        data: updatedSymptoms,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }else if (req.method === "GET") {
    try {
      const symptoms = await SymptomModel.findOne({ symptomsId :req.query._id });
      res.status(200).json({
        success: true,
        message: "successfully",
        data: symptoms
      });
    }catch (error){
        res.status(500).json({ 
          success: false,
          message: "Failed to retrieve symptoms" });
       }
  }else if (req.method === "DELETE"){
    try {
      const { id } = req.query;
      const deletedSymptom = await SymptomModel.findByIdAndDelete(id);
      if (!deletedSymptom){
        return res.status(404).json({ error: "Symptom not found" });
       }
       res.status(200).json({
        success: true,
        message: "Deleted successfully",
        data: deletedSymptom
      })
    } catch (error) {
      res.status(500).json({ error: "Failed to delete the symptom" });
    }
    }
  else
  {
    res.status(405).json({
      success: false,
      message: "Invalid method",
    });
    }
  }

export default handler;
