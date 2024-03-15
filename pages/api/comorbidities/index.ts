// import { NextApiRequest, NextApiResponse } from "next";
// import { connectMongo } from "../../../utils/mongodb";
// import ComorbiditiesModel from "../../../models/comorbidities.model";
// import { verifyJWTandCheckUser } from "../../../utils/userFromJWT";
// import { setCookie } from "cookies-next";

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   connectMongo();

//   if (req.method === "POST") {
//     const {
//       cva,
//       coronaryArteryDisease,
//       heartFailure,
//       diabetes,
//       pregnancy,
//       lungDisease,
//     } = req.body;
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
//       const newComorbidities = new ComorbiditiesModel({
//         userid: user._id,
//         cva,
//         coronaryArteryDisease,
//         heartFailure,
//         diabetes,
//         pregnancy,
//         lungDisease,
//       });
//       const savedComorbidities = await newComorbidities.save();
//       if (savedComorbidities) {
//         setCookie("comorbiditiesId", savedComorbidities._id, {
//           req,
//           res,
//           maxAge: 60 * 60 * 24,
//         });
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
//   } else {
//     res.status(405).json({
//       success: false,
//       message: "Invalid method",
//     });
//   }
// };

// export default handler;

import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../utils/mongodb";
import ComorbiditiesModel from "../../../models/comorbidities.model";
import { verifyJWTandCheckUser } from "../../../utils/userFromJWT";
import { setCookie } from "cookies-next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectMongo();

  if (req.method === "POST") {
    const {
      cva,
      coronaryArteryDisease,
      heartFailure,
      diabetes,
      pregnancy,
      lungDisease,
      subitems, // Include subitems in the request body
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

      // Construct the Comorbidities model based on the new schema
      const newComorbidities = new ComorbiditiesModel({
        userid: user._id,
        cva: {
          hasCVA: cva.hasCVA,
          subitems: {
            paralysis: subitems.paralysis || false,
            slurringOfSpeech: subitems.slurringOfSpeech || false,
            blurringOfVision: subitems.blurringOfVision || false,
          },
        },
        coronaryArteryDisease,
        heartFailure,
        diabetes,
        pregnancy,
        lungDisease,
      });

      // Save the Comorbidities record
      const savedComorbidities = await newComorbidities.save();

      if (savedComorbidities) {
        setCookie("comorbiditiesId", savedComorbidities._id, {
          req,
          res,
          maxAge: 60 * 60 * 24,
        });
      }

      res.status(201).json({
        success: true,
        message: "Comorbidities created successfully",
        data: savedComorbidities,
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
