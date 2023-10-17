// import { NextApiRequest, NextApiResponse } from "next";
// import { connectMongo } from "../../../utils/mongodb";
//  import SymptomModel from "../../../models/symptom.model";
// import { verifyJWTandCheckUser } from "../../../utils/userFromJWT";
// import { setCookie } from "cookies-next";

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   connectMongo()
//   if (req.method === "POST") {
//     const { previousHeartAttacks,breathlessness,minorNYHA,majorNYHA,legSwelling} = req.body;
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
//       const newComorbidities = new SymptomModel({
//         userid : user._id,
//         previousHeartAttacks,
//         breathlessness,
//         minorNYHA,
//         majorNYHA,
//         legSwelling
//       });
//       const savedComorbidities = await newComorbidities.save();
//       if(savedComorbidities)
//       {
//         setCookie('comorbiditiesId', savedComorbidities._id, { req, res,    maxAge: 60 * 60 * 24 });
//       }
//       res.status(201).json({
//         success: true,
//         message: "Comorbidities created successfully",
//         data: savedComorbidities,
//       });
//     } catch (error) {
//       res.status(400).json({
//         success: false,
//         message: error.message,
//       });
//     }
//     }else if(req.method === "GET"){
//       try {
//         const symptoms = await SymptomModel.find({});
//         res.status(200).json({
//           success: true,
//           message: "successfully",
//           data: symptoms
//         });
//       }catch(error){
//           res.status(500).json({ 
//             success: false,
//             message: "Failed to retrieve symptoms" });
//          }
//        }
//         else{
//       res.status(405).json({ error: "Method not allowed" });
//     }
//   }
// export default handler;

