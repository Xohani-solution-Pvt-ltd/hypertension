import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../../utils/mongodb";
import SymptomModel from "../../../../models/symptom.model";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectMongo();
  if (req.method === "GET") {
    try {
      const symptomsData = await SymptomModel.findOne({
        userid: req.query.id,
      });
      res.status(200).json({
        success: true,
        message: "fetch data successfully",
        data: symptomsData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve data",
      });
    }
  } else if (req.method === "PUT") {
    const { id } = req.query;

    const { previousHeartAttacks, breathlessness, legSwelling } = req.body;
    try {
      const existingSymptom = await SymptomModel.findByIdAndUpdate(id);
      if (!existingSymptom) {
        res.status(404).json({
          success: false,
          message: "Symptom not found",
        });
        return;
      }

      existingSymptom.previousHeartAttacks = previousHeartAttacks;
      existingSymptom.breathlessness = breathlessness;
      existingSymptom.legSwelling = legSwelling;

      const updatedSymptom = await existingSymptom.save();

      res.status(200).json({
        success: true,
        message: "Symptom updated successfully",
        data: updatedSymptom,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const deletedSymptom = await SymptomModel.findByIdAndDelete(id);
      if (!deletedSymptom) {
        return res.status(404).json({ error: "Symptom not found" });
      }
      res.status(200).json({
        success: true,
        message: "Deleted Symptom successfully",
        data: deletedSymptom,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete the Symptom" });
    }
  } else {
    res.status(405).json({
      success: false,
      message: "Invalid method",
    });
  }
};

export default handler;
