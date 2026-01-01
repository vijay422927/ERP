import { Course } from "../models/course.model.js";
import { ProgramBranchRegulation } from "../models/pbr.model.js";
import { Apierror } from "../utils/Apierror.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { AsynchHandler } from "../utils/Asynchhandler.js";

const createCourse = AsynchHandler(async (req, res) => {
    if (!req.session?.admin) {
        throw new Apierror(401, "Admin not logged in");
    }

    const {
        courseName,
        courseCode,
        programBranch,
        year,
        semester,
        courseType,
        electiveType,
        credits
    } = req.body;

    if (
        !courseName ||
        !courseCode ||
        !programBranch ||
        !year ||
        !semester ||
        !courseType ||
        !electiveType ||
        !credits
    ) {
        throw new Apierror(400, "All fields are required");
    }


    const mapping = await ProgramBranchRegulation.findById(programBranch);
    if (!mapping) {
        throw new Apierror(400, "Invalid Program–Branch–Regulation mapping");
    }
    const existsCourse = await Course.findOne(
        {
            courseName: courseName, programBranch:
                programBranch,
        });
    if (existsCourse) {
        existsCourse.status = "ACTIVE",
            existsCourse.save();
        return res
            .status(200)
            .json(new Apiresponse(200, existsCourse, "course created"));
    }

    const course = await Course.create({
        courseName,
        courseCode,
        programBranch,
        year,
        semester,
        courseType,
        electiveType,
        credits
    });

    return res.status(201).json(
        new Apiresponse(201, { course, mapping }, "Course created successfully")
    );
});

const deleteCourse = AsynchHandler(async (req, res) => {
    if (!req.session?.admin) {
        throw new Apierror(401, "Admin not logged in");
    }

    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(200).json(new Apiresponse(200, {}, "invalid course id"));
    }

    course.status = "INACTIVE";
    await course.save();

    return res.status(200).json(
        new Apiresponse(200, {}, "Course deleted successfully")
    );
});


const getCourses = AsynchHandler(async (req, res) => {
    const courses = await Course.find({ status: "ACTIVE" })
        .populate({
            path: "programBranch",
            populate: [
                { path: "program", select: "name" },
                { path: "branch", select: "name code" },
                { path: "regulation", select: "name" }
            ]
        })
        .sort({ courseName: 1 });

    return res.status(200).json(
        new Apiresponse(200, courses, "Courses fetched successfully")
    );
});






export { createCourse, deleteCourse,getCourses };
