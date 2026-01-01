import express from 'express';
import { createPBRMapping, deleteProgramBranchMapping } from '../controllers/mapping.controller.js';
const router=express.Router();
router.post('/pbr',createPBRMapping);
router.post('/deletepbr',deleteProgramBranchMapping);
export default router;