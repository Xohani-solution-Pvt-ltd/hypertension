// import { NextApiRequest, NextApiResponse } from "next";
// import { connectMongo } from "../../../utils/mongodb";
//  import UserModel from "../../../models/user.model";
// import bcrypt from "bcryptjs";
// import ProfileModel from "../../../models/createProfile.model";

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   connectMongo()

//   if(req.method === "POST") {
    
//  const { systolic, diastolic } = req.body;

//   // Define your high and low BP thresholds
//   const highThreshold = 140;
//   const lowThreshold = 90;
//   try {
//   // Check if BP is high or low
//   let bpStatus = '';
//   if (systolic >= highThreshold || diastolic >= highThreshold) {
//     bpStatus = 'High-Risk';
//   } else if (systolic <= lowThreshold || diastolic <= lowThreshold) {
//     bpStatus = 'Low-Risk';
//   } else {
//     bpStatus = 'Normal';
//   }
//       const data = await TreatmentModel.create({
//         bpStatus
//       });
//       res.status(201).json({
//         success: true,
//         message: "Treatment Modularity successfully",
//         data: data,
//       });
//     } catch (error) {
//       res.status(400).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }else if (req.method === "GET") {
//     // Retrieve all users
//     const { page = 1, limit = 100 } = req.query;
//     const parsedPage = parseInt(page as string);
//     const parsedLimit = parseInt(limit as string);

//     try {
//        const totalUsers = await UserModel.countDocuments({});
//        const totalPages = Math.ceil(totalUsers / parsedLimit);

//       const users = await UserModel.find({})
//       .skip((parsedPage - 1) * parsedLimit)
//         .limit(parsedLimit);

//       res.status(200).json({
//         success: true,
//         message: "Users retrieved successfully",
//         pagination: {
//           currentPage: parsedPage,
//           totalUsers,
//         },
//         data: users,
        
//       });
//     } catch (error) {
//       res.status(400).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   } else {
//     res.status(405).json({
//       success: false,
//       message: "Invalid method",
//     });
//   }
// };

// export default handler;

