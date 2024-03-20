import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../utils/mongodb";
import SymptomModel from "../../../models/symptom.model";
import { verifyJWTandCheckUser } from "../../../utils/userFromJWT";
import { setCookie } from "cookies-next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectMongo();

  if (req.method === "POST") {
    const { previousHeartAttacks, breathlessness, legSwelling } = req.body;
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
      const newSymptoms = new SymptomModel({
        userid: user._id,
        previousHeartAttacks,
        breathlessness: {
          minorNYHA: breathlessness.minorNYHA || false,
          majorNYHA: breathlessness.majorNYHA || false,
        },
        legSwelling,
      });
      const savedSymptoms = await newSymptoms.save();
      if (savedSymptoms) {
        setCookie("symptomsId", savedSymptoms._id, {
          req,
          res,
          maxAge: 60 * 60 * 24,
        });
      }
      res.status(201).json({
        success: true,
        message: "Symptoms created successfully",
        data: savedSymptoms,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
