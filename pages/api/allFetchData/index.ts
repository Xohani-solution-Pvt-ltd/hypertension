import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../utils/mongodb";
import DiagnosisModel from "../../../models/diagnosis.model";
import UserModel from "../../../models/user.model";
import BloodTestModel from "../../../models/bloodtest.model";
import ComorbiditiesModel from "../../../models/comorbidities.model";
import SymptomModel from "../../../models/symptom.model";
import ProfileModel from "../../../models/createProfile.model";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectMongo();
    if (req.method === "GET") {
      const id = req.query.id;
      const [
        userData,
        diagnosisData,
        comorbiditiesData,
        symptomsData,
        bloodTestData,
      ] = await Promise.all([
        ProfileModel.findOne({userid : id}),
        DiagnosisModel.findOne({userid : id}),
        ComorbiditiesModel.findOne({userid:id}),
        SymptomModel.findOne({ userid: id }),
        BloodTestModel.findOne({userid : id}),
      ]);

      res.status(200).json({
        success: true,
        message: "AllData fetched successfully",
        data: {
          userData,
          diagnosisData,
          comorbiditiesData,
          symptomsData,
          bloodTestData,
        },
      });
    } else {
      res.status(405).json({
        success: false,
        message: "Invalid method",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve allData",
    });
  }
};

export default handler;
