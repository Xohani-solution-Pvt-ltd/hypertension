import mongoose, { Mongoose } from 'mongoose';

declare global {
    var mongoose: {
        conn: Mongoose | null;
    };
}

// const { MONGO_URI } = process.env;
const  MONGO_URI  = "mongodb+srv://himanshumankar:<Himsbawa@9729>@cluster0.cehu0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGO_URI) throw new Error('MONGO_URI is not defined.');

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null };

export const connectMongo = async () => {

    if (cached.conn) return cached.conn;

    cached.conn = await mongoose.connect(MONGO_URI);

    return cached.conn;
};