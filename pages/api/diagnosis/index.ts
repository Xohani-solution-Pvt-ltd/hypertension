import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../utils/mongodb";
import DiagnosisModel from "../../../models/diagnosis.model";
import { verifyJWTandCheckUser } from "../../../utils/userFromJWT";
import { setCookie} from 'cookies-next';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectMongo()

  if (req.method === "POST") {
    const { systolic, diastolic, pulseRate } = req.body;
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
      const newDiagnosis = new DiagnosisModel({
        userid : user._id,
        systolic,
        diastolic,
        pulseRate,
      });
      const savedDiagnosis = await newDiagnosis.save();
      if(savedDiagnosis)
      {
        setCookie('diagnosisId', savedDiagnosis._id, { req, res, maxAge: 60 * 60 * 24 });
      }
      res.status(201).json({
        success: true,
        message: "Diagnosis created successfully",
        data: savedDiagnosis,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
   else if (req.method === "GET") {
    try {
      const diagnosisData = await DiagnosisModel.find({});
      res.status(200).json({
        success: true,
        message: "your data saved successfully",
        data: diagnosisData
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve Diagnosis"
      });
    }
  } 
  else {
    res.status(405).json({
      success: false,
      message: "Invalid method",
    });
  }
};

export default handler;
