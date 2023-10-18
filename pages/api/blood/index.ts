
import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../utils/mongodb";
import { verifyJWTandCheckUser } from "../../../utils/userFromJWT";
import { setCookie } from "cookies-next";
import BloodTestModel from "../../../models/bloodtest.model";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectMongo()

  if (req.method === "POST") {
    const { hbA1cLevel,hBA1CInterpretation,totalCholesterol,lipidInterpretation,hdlCholesterol,hdlInterpretation,ldlCholesterol,ldlInterpretation,triglycerides,triglyceridesInterpretation,albumin, creatinine ,acrResult,sodium,potassium,uricAcid,kidneyInterpretation,tshLevel,tshInterpretation,renalArteryDoppler,coronaryArteryDisease,ejectionFraction,ejectInterpretation} = req.body;
    try {
      const { token } = req.headers;
      if (!token) {
        throw new Error("Token not available");
      }
      const [error, user] = await verifyJWTandCheckUser(token);
      if (error) {
        res.status(401).json({
          success: false,
          message: error,
        });
        return;
      }
      const newBloodTest = new BloodTestModel({
        userid : user._id,
        hbA1cLevel,hBA1CInterpretation,totalCholesterol,lipidInterpretation,hdlCholesterol,hdlInterpretation,ldlCholesterol,ldlInterpretation,triglycerides,triglyceridesInterpretation,albumin, creatinine ,acrResult,sodium,potassium,uricAcid,kidneyInterpretation,tshLevel,tshInterpretation,renalArteryDoppler,coronaryArteryDisease,ejectionFraction,ejectInterpretation
      });
      const savedBloodTest = await newBloodTest.save();
      if(savedBloodTest)
      {
        setCookie('bloodTestId', savedBloodTest._id, { req, res });
      }
      res.status(201).json({
        success: true,
        message: "BloodTest created successfully",
        data: savedBloodTest,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
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

