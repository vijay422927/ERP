import express from 'express';
import { createCourse, deleteCourse, getCourses } from '../controllers/course.controller.js';
const router=express.Router();

router.post('/createCourse',createCourse);
router.get('/getCourse',getCourses);
router.delete('/deleteCourse',deleteCourse);
export default router;
