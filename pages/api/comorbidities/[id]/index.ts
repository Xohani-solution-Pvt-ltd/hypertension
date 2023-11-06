import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../../utils/mongodb";
import SymptomModel from "../../../../models/symptom.model";
import ComorbiditiesModel from "../../../../models/comorbidities.model";



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectMongo()
if (req.method === "GET") {
    try {
      const comorbiditiesData= await ComorbiditiesModel.findOne({comorbiditiesId : req.query.id});
      res.status(200).json({
        success: true,
        message: "fetch data successfully",
        data: comorbiditiesData
      });
    }
    catch (error){
        res.status(500).json({ 
          success: false,
          message: "Failed to retrieve data" });
       } 
    }
    else if (req.method === "PUT") {
      const { id } = req.query; 
      const { userid,cva,coronaryArteryDisease,heartFailure,diabetes,pregnancy,lungDisease} = req.body;
      try {
        const updatedComorbidities = await ComorbiditiesModel.findByIdAndUpdate(
          id,
          {
            userid,cva,coronaryArteryDisease,heartFailure,diabetes,pregnancy,lungDisease
          },
          { new: true }
        );
        res.status(200).json({
          success: true,
          message: 'Comorbidities updated successfully',
          data: updatedComorbidities,
        });
      }
       catch (error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
     }
    else if (req.method === "DELETE"){
        try {
          const { id } = req.query;
          const deletedComorbidities = await ComorbiditiesModel.findByIdAndDelete(id);
          if (!deletedComorbidities){
            return res.status(404).json({ error: "Comorbidities not found" });
           }
           res.status(200).json({
            success: true,
            message: "Deleted Comorbidities successfully",
            data: deletedComorbidities
          })
        } catch (error) {
          res.status(500).json({ error: "Failed to delete the Comorbdiities" });
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

