import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    phone: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["ADMIN", "FACULTY"],
      required: true
    },

    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: function () {
        return this.role === "FACULTY";
      }
    },

    password: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE"
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save",async function () {
    if(!this.isModified("password")) return ;
    this.password=await  bcrypt.hash(this.password,10);
});

userSchema.methods.isPasswordCorrect=async function (password) {
    return bcrypt.compare(password,this.password)
};

const User=mongoose.model("User",userSchema);


export {User};
//$2b$10$CTJSe3WKdhX2mT2Il0b2bO51tTdl683VFN3yNQRs9uHLS/RRXvx8a