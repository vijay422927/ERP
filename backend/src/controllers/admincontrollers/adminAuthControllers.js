import { Admin } from "../../models/Admin";
import { generateToken } from "../../utils/generatetoken";

export const adminLoginController = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(404).json({
        success: false,
        message: "username and password required",
      });
    }

    const admin = await Admin.findOne({ userName: userName });
    if (admin.password !== password) {
      return res.status(400).json({
        success: false,
        message: "enter the valid password",
      });
    }
    const accessToken = generateToken(admin._id);
    res.status(200).json({
      success: true,
      message: "admin logined successfully",
      token: accessToken,
    });
  } catch (error) {
    console.log("error while login the admin :", error);
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error,
    });
  }
};


