
import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../utils/mongodb";
import { verifyJWTandCheckUser } from "../../../utils/userFromJWT";
import { setCookie } from "cookies-next";
import BloodTestModel from "../../../models/bloodtest.model";
import UserModel from "../../../models/user.model";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectMongo()

  if (req.method === "POST") {
    const { hbA1cLevel,hBA1CInterpretation,totalCholesterol,lipidInterpretation,hdlCholesterol,hdlInterpretation,ldlCholesterol,ldlInterpretation,triglycerides,triglyceridesInterpretation,albumin, creatinine ,acrResult,sodium,potassium,uricAcid,kidneyInterpretation,tshLevel,tshInterpretation,renalArteryDoppler,coronaryArteryDisease,ejectionFraction} = req.body;
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

      const userDetail = await UserModel.findOne({ _id: user._id });
      const { gender, age, weight } = userDetail;
      
      let eGFRResult = 0;
     if (gender === 'Male') {
        if (age > 0 && weight > 0 && creatinine > 0) {
           eGFRResult = ((140 - age) * weight) / (72 * creatinine);
      } else {
           eGFRResult = 10;
     }
    } else if (gender === 'Female') {
     if (age > 0 && weight > 0 && creatinine > 0) {
          eGFRResult = ((140 - age) * weight) / (72 * creatinine) * 0.85;
    } else {
         eGFRResult = 11;
        }
     }

      let ejectionInterpretation = "";
      if (ejectionFraction && coronaryArteryDisease) {
       if (ejectionFraction >= 40 && ejectionFraction <= 60 && coronaryArteryDisease === "Absent") {
        ejectionInterpretation = "HfpeEF";
      } else if (ejectionFraction > 40 && coronaryArteryDisease === "Present") {
        ejectionInterpretation = "CAD";
      } else if (ejectionFraction > 60 && coronaryArteryDisease === "Absent") {
        ejectionInterpretation = "Normal";
      } else if(ejectionFraction < 40){
        ejectionInterpretation= "HfrEF";
      }
    }
      const newBloodTest = new BloodTestModel({
        userid : user._id,
        hbA1cLevel,hBA1CInterpretation,totalCholesterol,lipidInterpretation,hdlCholesterol,hdlInterpretation,ldlCholesterol,ldlInterpretation,triglycerides,triglyceridesInterpretation,albumin, creatinine ,acrResult,eGFRResult,sodium,potassium,uricAcid,kidneyInterpretation,tshLevel,tshInterpretation,renalArteryDoppler,coronaryArteryDisease,ejectionFraction,ejectionInterpretation
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

