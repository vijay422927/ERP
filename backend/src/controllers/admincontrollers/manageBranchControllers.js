import { Branch } from "../../models/Branch";
import { Program } from "../../models/Program";

export const addNewBranch = async (req, res) => {
  try {
    const { name, code, program, status } = req.body;

    const existedProgram = await Program.findOne({ name: program });
    if (!existedProgram) {
      return res.status(404).json({
        success: false,
        message: "program is not found or not yet added",
      });
    }
    const newBranch = await Branch.create({
      name: name,
      code: code,
      program: existedProgram._id,
      status: status,
    });
    res.status(200).json({
      success: true,
      message: "new Branch is added Successfully",
      newBranch,
    });
  } catch (error) {
    console.log("error while adding new branch :", error);
    res.status(500).json({
      success: false,
      message: "error while adding new Branch",
      error: error,
    });
  }
};

export const toggleStatusBranchController = async (req, res) => {
  try {
    const { branchId } = req.params.branchId;
    if (!branchId) {
      return res.status(404).json({
        success: false,
        message: "branch Id is not found",
      });
    }

    const branch = await Branch.findById();
    if (!branch) {
      return res.status(404).json({
        success: false,

        message: "branch is not found",
      });
    }
    branch.status = branch.status === "active" ? "inactive" : "active";
    await branch.save();

    res.status(200).json({
      success: true,
      message: "branch status is successfully toggled",
      branch,
    });
  } catch (error) {
    console.log("error while toggling the branch status :", error);
    res.status(500).json({
      success: false,
      message: "error while toggling the branch status",
      error: error,
    });
  }
};

export const getAllBrachesController = async (req, res) => {
  try {
    const allBranches = await Branch.find();
    if (!allBranches) {
      return res.status(404).json({
        success: false,
        message: "failed to fetch branches",
      });
    }

    res.status(200).json({
      success: true,
      message: "branched fetched successfully",
      allBranches,
    });
  } catch (error) {
    console.log("error while feching the all braches :", error);
    res.status(500).json({
      success: false,
      messgae: "error while fetching the branches ",
      error: error,
    });
  }
};
