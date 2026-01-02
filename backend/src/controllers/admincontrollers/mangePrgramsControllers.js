import { Program } from "../../models/Program";

export const addNewProgram = async (req, res) => {
  try {
    const { name, status } = req.body;
    if (!name || !status) {
      return res.status(404).json({
        success: false,
        message: "name and status are required",
      });
    }

    const newProgram = await Program.create({ name: name, status: status });
    res.status(200).json({
      success: true,
      message: "new porgram is added successfully",
      program: newProgram,
    });
  } catch (error) {
    console.log("error while adding new program :", error);
    res.status(500).json({
      success: true,
      message: "internal server error",
      error: error,
    });
  }
};

export const toggleProgramStatus = async (req, res) => {
  try {
    const { programId } = req.params.programId;
    if (!programId) {
      return res.status(404).json({
        success: false,
        message: "program id is not found",
      });
    }
    const program = await Program.findById({ _id: programId });
    if (!program) {
      return res.status(404).json({
        success: false,
        message: "program is not found",
      });
    }
    program.status = program.status === "active" ? "inactive" : "active";
    await program.save();

    res.status(200).json({
      success: true,
      message: "program status is toggles successfully",
    });
  } catch (error) {}
};

export const getAllPrograms = async (req, res) => {
  try {
    const allPrograms = await Program.find();
    if (allPrograms) {
      return res.status(404).json({
        success: false,
        message: "failed fetch the porgrams",
      });
    }
    res.status(200).json({
      success: true,
      message: "all programs are fetched successfully",
      allPrograms: allPrograms,
    });
  } catch (error) {
    console.log("error while fetching the all programs :", error);
    res.status(500).json({
      success: false,
      message: "failed to fetch the all programs",
      error: error,
    });
  }
};
