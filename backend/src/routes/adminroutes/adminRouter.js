import express from "express";
import { adminLoginController } from "../../controllers/admincontrollers/adminAuthControllers";
import {
  addNewBranch,
  getAllBrachesController,
  toggleStatusBranchController,
} from "../../controllers/admincontrollers/manageBranchControllers";
import {
  addNewProgram,
  getAllPrograms,
  toggleProgramStatus,
} from "../../controllers/admincontrollers/mangePrgramsControllers";
import {
  AddCourseController,
  getAllCourseController,
} from "../../controllers/admincontrollers/manageCoursesController";
import {
  addRegulationController,
  getAllRegulationController,
  toggleRegulationStatusController,
} from "../../controllers/admincontrollers/manageRegulations";

export const adminRouter = express.Router();

// auth routers
adminRouter.post("/login", adminLoginController);

// branch routes
adminRouter.post("/add-branch", addNewBranch);
adminRouter.patch("/update-branch/:branchId", toggleStatusBranchController);
adminRouter.get("/get-braches", getAllBrachesController);

// program routes
adminRouter.post("/add-program", addNewProgram);
adminRouter.patch("/update-program/:programId", toggleProgramStatus);
adminRouter.get("/get-programs", getAllPrograms);

// course routes
adminRouter.post("/add-course", AddCourseController);
adminRouter.get("/get-courses", getAllCourseController);

// regulation routes
adminRouter.post("/add-regulation", addRegulationController);
adminRouter.patch("/update-regulation", toggleRegulationStatusController);
adminRouter.get("/get-regulations", getAllRegulationController);
