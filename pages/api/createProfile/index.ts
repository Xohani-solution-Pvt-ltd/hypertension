import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../utils/mongodb";
import UserModel from "../../../models/user.model";
import bcrypt from "bcryptjs";
import ProfileModel from "../../../models/createProfile.model";
import { verifyJWTandCheckUser } from "../../../utils/userFromJWT";
import { setCookie } from "cookies-next";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    connectMongo()

    if (req.method === "POST") {
        const { dateOfBirth, gender, address, weight, height, alcoholConsumption, smokingStatus, physicalActivity, isActive } = req.body;
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
            const newProfileData = new ProfileModel({
                userid: user._id,
                dateOfBirth,
                alcoholConsumption,
                smokingStatus,
                physicalActivity,
                address,
                height,
                weight,
                gender,
                isActive
            });
            const savedProfile = await newProfileData.save();
            if (savedProfile) {
                // setCookie('profileId', savedProfile._id, { req, res, maxAge: 24 * 60 * 60 * 1000});
                setCookie('profileId', savedProfile._id, { req, res});
            }
            res.status(201).json({
                success: true,
                message: "Profile created successfully",
                data: savedProfile
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
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
