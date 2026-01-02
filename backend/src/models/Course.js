import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },

    regulation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Regulation",
      required: true,
    },

    year: {
      type: String,
      enum: ["I", "II", "III", "IV"],
      required: true,
    },

    semester: {
      type: String,
      enum: ["I", "II"],
      required: true,
    },

    courseType: {
      type: String,
      enum: ["Theory", "Lab", "Project"],
      required: true,
    },

    electiveType: {
      type: String,
      enum: ["Core", "Professional Elective", "Open Elective"],
      required: true,
    },

    credits: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
