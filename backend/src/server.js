import express from "express";
import { connectDb } from "./config/dbConnect.js";
import dotenv from "dotenv";
import { adminRouter } from "./routes/adminroutes/adminRouter.js";
dotenv.config();
const app = express();

// connect database
await connectDb();

// routes

// admin router
app.use("/api/admin", adminRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server is running on port : 3000");
});
