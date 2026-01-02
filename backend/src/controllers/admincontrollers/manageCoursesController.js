import { Branch } from "../../models/Branch";
import { Course } from "../../models/Course";
import { Regulation } from "../../models/Regulation";

export const AddCourseController = async (req, res) => {
  try {
    const {
      name,
      code,
      branch,
      regulation,
      year,
      semester,
      courseType,
      electiveType,
      credits,
      status,
    } = req.body;

    const getBranch = await Branch.findOne({ name: branch });
    if (!getBranch) {
      return res.status(404).json({
        success: false,
        message: "branch is not found",
      });
    }
    const getRegulation = await Regulation.findOne({ name: regulation });
    if (!getRegulation) {
      return res.status(404).json({
        success: false,
        message: "branch is not found",
      });
    }
    const newCourse = await Course.create({
      name: name,
      code: code,
      branch: getBranch._id,
      regulation: getRegulation._id,
      year: year,
      semester: semester,
      courseType: courseType,
      electiveType: electiveType,
      credits: credits,
      status: status,
    });

    if (!newCourse) {
      return res.status(404).json({
        success: false,
        message: "failed to create branch",
      });
    }
    res.status(200).json({
      success: true,
      message: "new course is createdSuccess fully",
      newCourse,
    });
  } catch (error) {
    console.log("error while creating new course :", error);
    res.status(500).json({
      success: false,
      message: "error while creating new course",
      error: error,
    });
  }
};

export const getAllCourseController = async (req, res) => {
  try {
    const allCourses = await Course.find();
    if (!allCourses) {
      res.status(404).json({
        success: false,
        message: "failed to fetch the courses",
      });
    }
    res.status(200).json({
      success: true,
      message: "courses are successfully fetched successfully",
      allCourses,
    });
  } catch (error) {
    console.log("failed to fetch the courses :", error);
    res.status(500).json({
      success: false,
      message: "failed to fetch the courses",
      error : error
    });
  }
};
