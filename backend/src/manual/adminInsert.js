import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";


const insertAdmin=async()=> {
  try {

    // check if admin already exists
    const adminExists = await User.findOne({
      email: "admin@gmrit.edu.in",
      role: "ADMIN"
    });

    if (adminExists) {
      console.log("Admin already exists");
      process.exit(0);
    }

    // hash password
    const hashedPassword = await bcrypt.hash("admin@", 10);

    // insert admin
    await User.create({
      name: "System Admin",
      email: "admin@gmrit.edu.in",
      phone: "9391046637",
      role: "ADMIN",
      password: hashedPassword,
      status: "ACTIVE"
    });

    console.log("Admin inserted manually successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error inserting admin:", err);
    process.exit(1);
  }
};


export {insertAdmin};
