import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../utils/mongodb";
import BloodTestModel from "../../../models/bloodtest.model";
import ProfileModel from "../../../models/createProfile.model";
import { verifyJWTandCheckUser } from "../../../utils/userFromJWT";
import { setCookie } from "cookies-next";

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
      ejectionInterpretation,
    } = req.body;
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

      const userDetail = await ProfileModel.findOne({ userid: user._id });

      const { gender, dateOfBirth, weight } = userDetail;
      const age = calculateAge(dateOfBirth);

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

      let ejectionInterpretation = "";
      if (ejectionFraction && coronaryArteryDisease) {
        if (
          ejectionFraction >= 40 &&
          ejectionFraction <= 60 &&
          coronaryArteryDisease === "Absent"
        ) {
          ejectionInterpretation = "HfpeEF";
        } else if (
          ejectionFraction > 40 &&
          coronaryArteryDisease === "Present"
        ) {
          ejectionInterpretation = "CAD";
        } else if (
          ejectionFraction > 60 &&
          coronaryArteryDisease === "Absent"
        ) {
          ejectionInterpretation = "Normal";
        } else if (ejectionFraction < 40) {
          ejectionInterpretation = "HfrEF";
        }
      }

      const newBloodTest = new BloodTestModel({
        userid: user._id,
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
        ejectionInterpretation,
      });

      const savedBloodTest = await newBloodTest.save();
      if (savedBloodTest) {
        setCookie("bloodTestId", savedBloodTest._id, {
          req,
          res,
          maxAge: 60 * 60 * 24,
        });
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
  } else {
    res.status(405).json({
      success: false,
      message: "Invalid method",
    });
  }
};

export default handler;
