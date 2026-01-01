import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
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

const Program = mongoose.model("Program", programSchema);
export { Program };
