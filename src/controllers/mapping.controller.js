import { ProgramBranchRegulation } from "../models/pbr.model.js";
import { Apierror } from "../utils/Apierror.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { AsynchHandler } from "../utils/Asynchhandler.js";

const createPBRMapping = AsynchHandler(async (req, res) => {
  if (!req.session?.admin) {
    throw new Apierror(401, "Admin not logged in");
  }

  const { program, branch, regulation } = req.body;

  if (!program || !branch || !regulation) {
    throw new Apierror(400, "Program, Branch and Regulation are required");
  }

  const exists = await ProgramBranchRegulation.findOne({
    program,
    branch,
    regulation
  });

  if (exists) {
    return res
      .status(400)
      .json(new Apiresponse(400, {}, "mapping alredy exist"));
  }

  const mapping = await ProgramBranchRegulation.create({
    program,
    branch,
    regulation
  });

  return res.status(201).json(
    new Apiresponse(
      201,
      mapping,
      "Program–Branch–Regulation mapped successfully"
    )
  );
});




const deleteProgramBranchMapping = AsynchHandler(async (req, res) => {
  if (!req.session?.admin) {
    throw new Apierror(401, "Admin not logged in");
  }

  const { mappingId } = req.params;

  const deleted = await ProgramBranch.findByIdAndDelete(mappingId);

  if (!deleted) {
    throw new Apierror(404, "Mapping not found");
  }

  return res.status(200).json(
    new Apiresponse(
      200,
      {},
      "Program–Branch–Regulation mapping deleted successfully"
    )
  );
});


const getProgramBranchMappings = AsynchHandler(async (req, res) => {
  const mappings = await ProgramBranchRegulation.find()
    .populate("program", "name")
    .populate("branch", "name code")
    .populate("regulation", "name")
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new Apiresponse(
      200,
      mappings,
      "Program–Branch–Regulation mappings fetched successfully"
    )
  );
});




const getMappingsByProgram = AsynchHandler(async (req, res) => {
  const { programId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(programId)) {
    throw new Apierror(400, "Invalid program id");
  }

  const mappings = await ProgramBranchRegulation.find({ program: programId })
    .populate("program", "name")
    .populate("branch", "name code")
    .populate("regulation", "name")
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new Apiresponse(
      200,
      mappings,
      "Mappings fetched by program successfully"
    )
  );
});


const getMappingsByBranch = AsynchHandler(async (req, res) => {
  const { branchId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(branchId)) {
    throw new Apierror(400, "Invalid branch id");
  }

  const mappings = await ProgramBranch.find({ branch: branchId })
    .populate("program", "name")
    .populate("branch", "name code")
    .populate("regulation", "name")
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new Apiresponse(
      200,
      mappings,
      "Mappings fetched by branch successfully"
    )
  );
});







export { createPBRMapping, deleteProgramBranchMapping ,getProgramBranchMappings,getMappingsByProgram,getMappingsByBranch};
