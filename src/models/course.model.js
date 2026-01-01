import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      trim: true
    },

    courseCode: {
      type: String,
      required: true,
      trim: true
    },

    programBranch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProgramBranchRegulation",
      required: true
    },

    year: {
      type: String,
      enum: ["I", "II", "III", "IV"],
      required: true
    },

    semester: {
      type: String,
      enum: ["I", "II"],
      required: true
    },

    courseType: {
      type: String,
      enum: ["THEORY", "LAB", "PROJECT"],
      required: true
    },

    electiveType: {
      type: String,
      enum: ["CORE", "PROFESSIONAL_ELECTIVE", "OPEN_ELECTIVE"],
      required: true
    },

    credits: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE"
    }
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export { Course };
