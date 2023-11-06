import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../utils/mongodb";
 import ComorbiditiesModel from "../../../models/comorbidities.model";
import { verifyJWTandCheckUser } from "../../../utils/userFromJWT";
import { setCookie } from "cookies-next";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectMongo()

  if (req.method === "POST") {
    const { cva,coronaryArteryDisease,heartFailure,diabetes,pregnancy,lungDisease} = req.body;
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
      const newComorbidities = new ComorbiditiesModel({
        userid : user._id,
        cva,
        coronaryArteryDisease,
        heartFailure,
        diabetes,
        pregnancy,
        lungDisease
      });
      const savedComorbidities = await newComorbidities.save();
      if(savedComorbidities)
      {
        setCookie('comorbiditiesId', savedComorbidities._id, { req, res });
      }
      res.status(201).json({
        success: true,
        message: "Comorbidities created successfully",
        data: savedComorbidities,
      });
    }
     catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
  else if (req.method === "GET") {
    try {
      const ComorbiditiesData= await ComorbiditiesModel.find({});
      res.status(200).json({
        success: true,
        message: "successfully",
        data: ComorbiditiesData
      });
    }
    catch (error){
        res.status(500).json({ 
          success: false,
          message: "Failed to retrieve Comorbidities" });
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
