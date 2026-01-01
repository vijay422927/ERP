import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const connectDb=async () => {
    try {
        const connectionInstance=mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);
        console.log("DB connected",(await connectionInstance).connection.name);
        
    } catch (error) {
        console.log("connection failed",error);
        process.exit(1);
    }
};
export {connectDb};