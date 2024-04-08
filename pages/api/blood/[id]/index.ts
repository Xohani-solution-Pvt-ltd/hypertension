import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../../utils/mongodb";
import BloodTestModel from "../../../../models/bloodtest.model";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectMongo();

  if (req.method === "PUT") {
    const { id } = req.query;
    const {
      hbA1cLevel,
      normalHbA1cLevel,
      hBA1CInterpretation,
      totalCholesterol,
      normalTotalCholesterol,
      lipidInterpretation,
      hdlCholesterol,
      normalHdlCholesterol,
      hdlInterpretation,
      ldlCholesterol,
      normalLdlCholesterol,
      ldlInterpretation,
      triglycerides,
      normalTriglycerides,
      triglyceridesInterpretation,
      albumin,
      creatinine,
      acrResult,
      sodium,
      potassium,
      uricAcid,
      kidneyInterpretation,
      tshLevel,
      normalTshLevel,
      tshInterpretation,
      renalArteryDoppler,
      coronaryArteryDisease,
      ejectionFraction,
      eGFRResult,
      age,
    } = req.body;

    try {
      const updatedBloodTest = await BloodTestModel.findByIdAndUpdate(id);
      if (!updatedBloodTest) {
        res.status(404).json({
          success: false,
          message: "BloodTest not found",
        });
        return;
      }
      updatedBloodTest.hbA1cLevel = hbA1cLevel;
      updatedBloodTest.normalHbA1cLevel = normalHbA1cLevel;
      updatedBloodTest.hBA1CInterpretation = hBA1CInterpretation;
      updatedBloodTest.totalCholesterol = totalCholesterol;
      updatedBloodTest.normalTotalCholesterol = normalTotalCholesterol;
      updatedBloodTest.lipidInterpretation = lipidInterpretation;
      updatedBloodTest.hdlCholesterol = hdlCholesterol;
      updatedBloodTest.normalHdlCholesterol = normalHdlCholesterol;
      updatedBloodTest.hdlInterpretation = hdlInterpretation;
      updatedBloodTest.ldlCholesterol = ldlCholesterol;
      updatedBloodTest.normalLdlCholesterol = normalLdlCholesterol;
      updatedBloodTest.ldlInterpretation = ldlInterpretation;
      updatedBloodTest.triglycerides = triglycerides;
      updatedBloodTest.normalTriglycerides = normalTriglycerides;
      updatedBloodTest.triglyceridesInterpretation =
        triglyceridesInterpretation;
      updatedBloodTest.albumin = albumin;
      updatedBloodTest.creatinine = creatinine;
      updatedBloodTest.acrResult = acrResult;
      updatedBloodTest.sodium = sodium;
      updatedBloodTest.potassium = potassium;
      updatedBloodTest.uricAcid = uricAcid;
      updatedBloodTest.kidneyInterpretation = kidneyInterpretation;
      updatedBloodTest.tshLevel = tshLevel;
      updatedBloodTest.normalTshLevel = normalTshLevel;
      updatedBloodTest.tshInterpretation = tshInterpretation;
      updatedBloodTest.renalArteryDoppler = renalArteryDoppler;
      updatedBloodTest.coronaryArteryDisease = coronaryArteryDisease;
      updatedBloodTest.ejectionFraction = ejectionFraction;
      updatedBloodTest.eGFRResult = eGFRResult;
      updatedBloodTest.age = age;

      const updatedBloodTestData = await updatedBloodTest.save();

      res.status(200).json({
        success: true,
        message: "BloodTest updated successfully",
        data: updatedBloodTestData,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  } else if (req.method === "GET") {
    try {
      const BloodTest = await BloodTestModel.findOne({ userid: req.query.id });
      res.status(200).json({
        success: true,
        message: "successfully",
        data: BloodTest,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve BloodTest",
      });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const deletedBloodTest = await BloodTestModel.findByIdAndDelete(id);
      if (!deletedBloodTest) {
        return res.status(404).json({ error: "BloodTest not found" });
      }
      res.status(200).json({
        success: true,
        message: "Deleted successfully",
        data: deletedBloodTest,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete the BloodTest" });
    }
  } else {
    res.status(405).json({
      success: false,
      message: "Invalid method",
    });
  }
};

export default handler;
