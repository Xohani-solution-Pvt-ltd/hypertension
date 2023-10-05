import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../../utils/mongodb";
 import UserModel from "../../../../models/user.model";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectMongo()

  if(req.method === "GET"){
    // Retrieve a user by ID
    const { id } = req.query;
    try {
      const user = await UserModel.findById(req.query.id);
      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
}else if(req.method === 'PUT'){
    const { id } = req.query; 
    const { fullName, email, password,dateOfBirth,alcoholConsumption,smokingStatus, mobile, address,height,weight,gender,isActive } = req.body;
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        {
          fullName,
          email,
          password,
          dateOfBirth,
          alcoholConsumption,
          smokingStatus,
          mobile,
          address,
          height,
          weight,
          isActive,
          gender
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: updatedUser,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }else if (req.method === "DELETE") {
    // Delete a user
    const { id } = req.query;
    try {
      const deletedUser = await UserModel.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
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

