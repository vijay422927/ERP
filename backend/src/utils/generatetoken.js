import jwt from "jsonwebtoken";

export const generateToken = (adminId) => {
  try {
    const accessToken = jwt.sign({ adminId: adminId }, process.env.SECRET_KEY, {
      expiresIn: "2hr",
    });

    return accessToken;
  } catch (error) {
    console.log("error while generating token :", error);
    res.status(400).json({
      success: false,
      message: "enter the valid password",
    });
  }
};
