import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../utils/mongodb";
import DiagnosisModel from "../../../models/diagnosis.model";
import UserModel from "../../../models/user.model";
import BloodTestModel from "../../../models/bloodtest.model";
import ComorbiditiesModel from "../../../models/comorbidities.model";
import SymptomModel from "../../../models/symptom.model";
import ProfileModel from "../../../models/createProfile.model";
import eGFRModel from "../../../models/egfr.model";

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
        eGFR,
      ] = await Promise.all([
        ProfileModel.findOne({userId : id}),
        DiagnosisModel.findOne({diagnosisId : id}),
        ComorbiditiesModel.findOne({comorbiditiesId:id}),
        SymptomModel.findOne({ symptomsId: id }),
        BloodTestModel.findOne({bloodTestId : id}),
        eGFRModel.findOne({eGFRId:id})
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
          eGFR
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
