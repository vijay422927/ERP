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
               .json(new Apiresponse(400,{},"mapping alredy exist"));
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





export { createPBRMapping,deleteProgramBranchMapping };
