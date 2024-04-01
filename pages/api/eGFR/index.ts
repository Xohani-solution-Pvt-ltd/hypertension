import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../utils/mongodb";
import BloodTestModel from "../../../models/bloodtest.model";
import ProfileModel from "../../../models/createProfile.model";
import { verifyJWTandCheckUser } from "../../../utils/userFromJWT";
import { setCookie } from "cookies-next";
import eGFRModel from "../../../models/egfr.model";

function calculateAge(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectMongo();

  if (req.method === "POST") {
    const { creatinine, age, eGFRResult } = req.body;
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

      const userDetail = await ProfileModel.findOne({ profileId: user.userid });

      const { gender, dateOfBirth, weight } = userDetail;
      const age = calculateAge(dateOfBirth);
      console.log("Calculated age:", age);

      let eGFRResult = 0;
      if (gender === "Male") {
        if (age > 0 && weight > 0 && creatinine > 0) {
          eGFRResult = ((140 - age) * weight) / (72 * creatinine);
        } else {
          eGFRResult = 0;
        }
      } else if (gender === "Female") {
        if (age > 0 && weight > 0 && creatinine > 0) {
          eGFRResult = (((140 - age) * weight) / (72 * creatinine)) * 0.85;
        } else {
          eGFRResult = 0;
        }
      }
      console.log("data of egfr", eGFRResult);

      const neweGFR = new eGFRModel({
        userid: user._id,

        creatinine,
        age,
        eGFRResult,
      });

      const savedeGFR = await neweGFR.save();
      if (savedeGFR) {
        setCookie("eGFRId", savedeGFR._id, {
          req,
          res,
          maxAge: 60 * 60 * 24,
        });
      }

      res.status(201).json({
        success: true,
        message: "eGFR created successfully",
        data: savedeGFR,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    res.status(405).json({
      success: false,
      message: "Invalid method",
    });
  }
};

export default handler;
