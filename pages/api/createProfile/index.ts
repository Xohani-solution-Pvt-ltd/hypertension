// import { NextApiRequest, NextApiResponse } from "next";
// import { connectMongo } from "../../../utils/mongodb";
//  import UserModel from "../../../models/user.model";
// import bcrypt from "bcryptjs";
// import ProfileModel from "../../../models/createProfile.model";
// import { verifyJWTandCheckUser } from "../../../utils/userFromJWT";


// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   connectMongo()

//   if(req.method === "POST") {
//     // Create a new user
//     const { userid,dateOfBirth,gender, address, weight,height,alcoholConsumption,smokingStatus,physicalActivity,isActive} = req.body;
//     try {
//       const { token } = req.headers;
//       if (!token) {
//         throw new Error("Token not available");
//       }
//       const [error, user] = await verifyJWTandCheckUser(token);
//       if (error) {
//         res.status(401).json({
//           success: false,
//           message: error,
//         });
//         return;
//       }
//       const newDiagnosis = new DiagnosisModel({
//         userid : user._id,
//         systolic,
//         diastolic,
//         pulseRate,
//       });
//       const savedDiagnosis = await newDiagnosis.save();
//       if(savedDiagnosis)
//       {
//         setCookie('diagnosisId', savedDiagnosis._id, { req, res, maxAge: 60 * 60 * 24 });
//       }

//       const user = await ProfileModel.create({
//         userid,
//         dateOfBirth,
//         alcoholConsumption,
//         smokingStatus,
//         physicalActivity,
//         address,
//         height,
//         weight,
//         gender,
//         isActive
//       });
//       res.status(201).json({
//         success: true,
//         message: "Create Profile successfully",
//         data: user,
//       });
//     } catch (error) {
//       res.status(400).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   // }else if (req.method === "GET") {
//   //   // Retrieve all users
//   //   const { page = 1, limit = 100 } = req.query;
//   //   const parsedPage = parseInt(page as string);
//   //   const parsedLimit = parseInt(limit as string);

//   //   try {
//   //      const totalUsers = await ProfileModel.countDocuments({});
//   //      const totalPages = Math.ceil(totalUsers / parsedLimit);

//   //     const users = await ProfileModel.find({})
//   //     .skip((parsedPage - 1) * parsedLimit)
//   //       .limit(parsedLimit);

//   //     res.status(200).json({
//   //       success: true,
//   //       message: "Users retrieved successfully",
//   //       pagination: {
//   //         currentPage: parsedPage,
//   //         totalUsers,
//   //       },
//   //       data: users,
        
//   //     });
//   //   } catch (error) {
//   //     res.status(400).json({
//   //       success: false,
//   //       message: error.message,
//   //     });
//   //   }
//   //  } else {
//     res.status(405).json({
//       success: false,
//       message: "Invalid method",
//     });
//   }
// };

// export default handler;

