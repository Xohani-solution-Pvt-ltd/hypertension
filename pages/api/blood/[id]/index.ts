import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../../utils/mongodb";
import BloodTestModel from "../../../../models/bloodtest.model";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectMongo()

  if (req.method === "PUT") {
    const { id } = req.query; 
    const {
      hbA1cLevel,hBA1CInterpretation,totalCholesterol,lipidInterpretation,hdlCholesterol,hdlInterpretation,ldlCholesterol,ldlInterpretation,triglycerides,triglyceridesInterpretation,albumin, creatinine ,acrResult, eGFRResult,sodium,potassium,uricAcid,kidneyInterpretation,tshLevel,tshInterpretation,renalArteryDoppler,coronaryArteryDisease,hfrEF,hfpeEF,ejectionFraction } = req.body;
    
    try {
      const updatedBloodTest = await BloodTestModel.findByIdAndUpdate(
        id,
        {
          hbA1cLevel,hBA1CInterpretation,totalCholesterol,lipidInterpretation,hdlCholesterol,hdlInterpretation,ldlCholesterol,ldlInterpretation,triglycerides,triglyceridesInterpretation,albumin, creatinine ,acrResult, eGFRResult,sodium,potassium,uricAcid,kidneyInterpretation,tshLevel,tshInterpretation,renalArteryDoppler,coronaryArteryDisease,hfrEF,hfpeEF,ejectionFraction
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: 'BloodTest updated successfully',
        data: updatedBloodTest,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }else if (req.method === "GET") {
    try {
      const BloodTest = await BloodTestModel.findById(req.query.id);
      res.status(200).json({
        success: true,
        message: "successfully",
        data: BloodTest
      });
    }catch (error){
        res.status(500).json({ 
          success: false,
          message: "Failed to retrieve BloodTest" });
       }
  }else if (req.method === "DELETE"){
    try {
      const { id } = req.query;
      const deletedBloodTest = await BloodTestModel.findByIdAndDelete(id);
      if (!deletedBloodTest){
        return res.status(404).json({ error: "BloodTest not found" });
       }
       res.status(200).json({
        success: true,
        message: "Deleted successfully",
        data: deletedBloodTest
      })
    } catch (error) {
      res.status(500).json({ error: "Failed to delete the BloodTest" });
    }
  }else{
    res.status(405).json({
      success: false,
      message: "Invalid method",
    });
    }
  }

export default handler;
