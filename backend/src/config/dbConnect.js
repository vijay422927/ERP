import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("mongoDb is connected successfully");
  } catch (error) {
    console.error("failed to connect mongoDb :", error);
    resizeBy.status(500).json({
      success: false,
      message: "mongoDb error",
      error: error,
    });
  }
};
