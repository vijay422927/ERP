import mongoose from "mongoose";

const regulationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE"
    }
  },
  { timestamps: true }
);

const Regulation = mongoose.model("Regulation", regulationSchema);
export { Regulation };
