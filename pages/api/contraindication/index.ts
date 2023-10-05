import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../utils/mongodb";
 import UserModel from "../../../models/user.model";
import bcrypt from "bcryptjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectMongo()

  if(req.method === "POST") {
    // Create a new user
    const { fullName, email, password, mobile,address,age,gender } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 5);
      const user = await UserModel.create({
        fullName,
        email,
        password: hashedPassword,
        mobile,
        address,
        age,
        gender
      });
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }else if (req.method === "GET") {
    // Retrieve all users
    const { page = 1, limit = 100 } = req.query;
    const parsedPage = parseInt(page as string);
    const parsedLimit = parseInt(limit as string);

    try {
       const totalUsers = await UserModel.countDocuments({});
       const totalPages = Math.ceil(totalUsers / parsedLimit);

      const users = await UserModel.find({})
      .skip((parsedPage - 1) * parsedLimit)
        .limit(parsedLimit);

      res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        pagination: {
          currentPage: parsedPage,
          totalUsers,
        },
        data: users,
        
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }else if(req.method === "GET") {
    // Retrieve a user by ID
    const { id } = req.query;
    console.log("data",id)
    try {
      const user = await UserModel.findById(id);
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
    const { id, fullName, email, password, mobile, address,age,gender } = req.body;
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        {
          fullName,
          email,
          password,
          mobile,
          address,
          age,
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
    const { id } = req.body;
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

