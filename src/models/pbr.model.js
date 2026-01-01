import mongoose from "mongoose";

const pbrSchema = new mongoose.Schema(
  {
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true
    },
    regulation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Regulation",
      required: true
    }
  },
  { timestamps: true }
);

const ProgramBranchRegulation =
  mongoose.model("ProgramBranchRegulation", pbrSchema);

export { ProgramBranchRegulation };
