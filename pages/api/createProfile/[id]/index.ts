import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../../utils/mongodb";
import UserModel from "../../../../models/user.model";
import ProfileModel from "../../../../models/createProfile.model";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectMongo();

  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const user = await ProfileModel.findOne({ userid: id });
      if (!user) {
        res.status(404).json({
          success: false,
          message: "UserProfile not found",
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: "UserProfile retrieved successfully",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  } else if (req.method === "PUT") {
    const { id } = req.query;
    const {
      dateOfBirth,
      alcoholConsumption,
      smokingStatus,
      address,
      height,
      weight,
      gender,
      isActive,
    } = req.body;
    try {
      const updatedUser = await ProfileModel.findByIdAndUpdate(
        id,
        {
          dateOfBirth,
          alcoholConsumption,
          smokingStatus,
          address,
          height,
          weight,
          isActive,
          gender,
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "UserProfile updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  } else if (req.method === "DELETE") {
    // Delete a user
    const { id } = req.query;
    try {
      const deletedUser = await ProfileModel.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        message: "UserProfile deleted successfully",
        data: deletedUser,
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
