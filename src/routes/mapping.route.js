import express from 'express';
import { createPBRMapping, deleteProgramBranchMapping, getMappingsByBranch, getMappingsByProgram, getProgramBranchMappings } from '../controllers/mapping.controller.js';
const router=express.Router();
router.post('/pbr',createPBRMapping);
router.post('/deletepbr',deleteProgramBranchMapping);
router.get('/getMap',getProgramBranchMappings);
router.get('/getByProgram',getMappingsByProgram);
router.get('/getByBranch',getMappingsByBranch);
export default router;