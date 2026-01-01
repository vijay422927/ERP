import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Apierror } from "../utils/Apierror.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { AsynchHandler } from "../utils/Asynchhandler.js";
import { Branch } from "../models/branch.model.js";
import { Program } from "../models/program.model.js";
import { Regulation } from "../models/regulation.model.js";

const adminLogin = AsynchHandler(
    async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Apierror(400, "Require all the fields")
        }


        const admin = await User.findOne({
            email,
            role: "ADMIN",
            status: "ACTIVE"
        });


        if (!admin) {
            return res.status(401).json(new Apiresponse(401, {}, "Invalid user"));
        }

        const match = await bcrypt.compare(password, admin.password);
        if (!match) {
            return res.status(401).json(new Apiresponse(401, {}, "Invalid credentials"));
        }

        req.session.admin = {
            id: admin._id,
            role: admin.role
        };

        res
            .status(200)
            .json(new Apiresponse(200, admin, "Admin logged successfully"));
    }

);


const adminLogout = AsynchHandler(
    async (req, res) => {

        if (!req.session || !req.session.admin) {
            return res
                .status(401)
                .json(new Apiresponse(401, {}, "alredy logged out"));
        }
        req.session.destroy((err) => {
            if (err) {
                return res
                    .status(500)
                    .json(new Apiresponse(500, {}, "log out failed"));
            }

            res.clearCookie("erp-session");

            return res
                .status(200)
                .json(new Apiresponse(200, {}, "logout succesfully"));
        });
    }
);



const changeAdminPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;


    if (!oldPassword || !newPassword) {
        throw new Apierror(400, "Old password and new password are required");
    }


    if (!req.session || !req.session.admin) {
        return res
            .status(401)
            .json(new Apiresponse(401, {}, "admin is not logged in"));
    }


    const admin = await User.findById(req.session.admin.id);
    if (!admin) {
        return res
            .status(401)
            .json(new Apiresponse(401, {}, "admin is not found "));
    }


    const isMatch = await admin.isPasswordCorrect(oldPassword);
    if (!isMatch) {
        return res
            .status(401)
            .json(new Apiresponse(401, {}, "old password is in correct"));
    }

    admin.password = newPassword;
    await admin.save();

    return res
        .status(200)
        .json(new Apiresponse(200, {}, "Password changed successfully"));
};



const createFaculty = AsynchHandler(async (req, res) => {
    const { name, email, phone, branch, password } = req.body;


    if (!req.session?.admin) {
        return res
            .status(401)
            .json(new Apiresponse(401, {}, "admin is not logged in"));
    }


    if (!name || !email || !phone || !branch || !password) {
        throw new Apierror(400, "All fields are required");
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
        existingUser.status = "ACTIVE"
        existingUser.save();
        return res
            .status(200)
            .json(new Apiresponse(200, existingUser, "create afculty successfull"));
    }

    const faculty = await User.create({
        name,
        email,
        phone,
        branch,
        password,
        role: "FACULTY",
        status: "ACTIVE"
    });

    return res.status(201).json(
        new Apiresponse(
            201,
            {
                id: faculty._id,
                name: faculty.name,
                email: faculty.email,
                role: faculty.role
            },
            "Faculty access granted successfully"
        )
    );
});



const getAllFaculty = AsynchHandler(async (req, res) => {

    if (!req.session?.admin) {
        return res
            .status(401)
            .json({ message: "Admin not logged in" });
    }

    const facultyList = await User.find({
        role: "FACULTY",
        status: "ACTIVE"
    })
        .select("-password")
        .populate("branch", "name code")
        .sort({ name: 1 });

    return res.status(200).json(
        new Apiresponse(
            200,
            facultyList,
            "Faculty fetched successfully"
        )
    );
});


const deleteFaculty = AsynchHandler(async (req, res) => {

    if (!req.session?.admin) {
        return res
            .status(401)
            .json(new Apiresponse(401, {}, "admin is not logged in"));
    }

    const { facultyId } = req.query;


    const faculty = await User.findOne({
        _id: facultyId,
        role: "FACULTY"
    });

    if (!faculty) {
        return res
            .status(400)
            .json(new Apiresponse(400, {}, "invalid faculty id"));
    }


    faculty.status = "INACTIVE";
    await faculty.save();

    return res.status(200).json(
        new Apiresponse(
            200,
            {},
            "Faculty deleted (disabled) successfully"
        )
    );
});



const createBranch = AsynchHandler(async (req, res) => {

    if (!req.session?.admin) {
        return res
            .status(401)
            .json(new Apiresponse(401, {}, "admin is not logged in or you are not admin"));
    }

    const { name, code } = req.body;

    if (!name || !code) {
        throw new Apierror(400, "Branch name and code are required");
    }

    const existingBranch = await Branch.findOne({
        $or: [{ name }, { code }]
    });

    if (existingBranch) {
        existingBranch.status = "ACTIVE";
        existingBranch.save();
        return res
            .status(200)
            .json(new Apiresponse(200, existingBranch, "create branch successfull"));

    }

    const branch = await Branch.create({
        name,
        code,
        status: "ACTIVE"
    });

    return res.status(201).json(
        new Apiresponse(
            201,
            branch,
            "Branch created successfully"
        )
    );
});





const getAllBranches = AsynchHandler(async (req, res) => {
    const branches = await Branch.find({ status: "ACTIVE" }).sort({ name: 1 });

    return res.status(200).json(
        new Apiresponse(
            200,
            branches,
            "Branches fetched successfully"
        )
    );
});




const deleteBranch = AsynchHandler(async (req, res) => {

    if (!req.session?.admin) {
        return res
            .status(401)
            .json(new Apiresponse(401, {}, "admin is not logged in"));
    }

    const { branchId } = req.query;


    const branch = await Branch.findById(branchId);

    if (!branch) {
        return res
            .status(400)
            .json(new Apiresponse(400, {}, "invalid branch id"));
    }


    branch.status = "INACTIVE";
    await branch.save();

    return res.status(200).json(
        new Apiresponse(
            200,
            {},
            "Branch deleted (disabled) successfully"
        )
    );
});




const createProgram = AsynchHandler(async (req, res) => {
    if (!req.session?.admin) {
        return res
            .status(401)
            .json(new Apiresponse(401, {}, "admin is not logged in"));
    }

    const { name } = req.body;
    if (!name) {
        throw new Apierror(400, "Program name is required");
    }

    const existing = await Program.findOne({ name });
    if (existing) {
        existing.status = "ACTIVE";
        existing.save();
        return res
            .status(401)
            .json(new Apiresponse(401, existing, "program created"));
    }

    const program = await Program.create({ name, status: "ACTIVE" });

    return res.status(201).json(
        new Apiresponse(201, program, "Program created successfully")
    );
});




const getPrograms = AsynchHandler(async (req, res) => {
    const programs = await Program.find({ status: "ACTIVE" }).sort({ name: 1 });

    return res.status(200).json(
        new Apiresponse(200, programs, "Programs fetched successfully")
    );
});


const deleteProgram = AsynchHandler(async (req, res) => {
    if (!req.session?.admin) {
        throw new Apierror(401, "Admin not logged in");
    }

    const { programId } = req.query;

    const program = await Program.findById(programId);
    if (!program) {
        return res
            .status(401)
            .json(new Apiresponse(401, {}, "Invalid Program id"));
    }

    program.status = "INACTIVE";
    await program.save();

    return res.status(200).json(
        new Apiresponse(200, {}, "Program deleted (disabled) successfully")
    );
});



const createRegulation = AsynchHandler(async (req, res) => {
    if (!req.session?.admin) {
        throw new Apierror(401, "Admin not logged in");
    }

    const { name } = req.body;
    if (!name) {
        throw new Apierror(400, "Regulation name is required");
    }

    const existing = await Regulation.findOne({ name });
    if (existing) {
        existing.status="ACTIVE";
        existing.save();
        return res
               .status(200)
               .json(new Apiresponse(200,existing,"regulation created successfully"))
        }

    const regulation = await Regulation.create({ name,status:"ACTIVE" });

    return res.status(201).json(
        new Apiresponse(201, regulation, "Regulation created successfully")
    );
});

/* GET REGULATIONS */
const getRegulations = AsynchHandler(async (req, res) => {
    const regulations = await Regulation.find({ status: "ACTIVE" }).sort({ name: 1 });

    return res.status(200).json(
        new Apiresponse(200, regulations, "Regulations fetched successfully")
    );
});


const deleteRegulation = AsynchHandler(async (req, res) => {
    if (!req.session?.admin) {
        throw new Apierror(401, "Admin not logged in");
    }

    const { regulationId } = req.query;

    const regulation = await Regulation.findById(regulationId);
    if (!regulation) {
            return res
               .status(200)
               .json(new Apiresponse(200,{},"Invalid regulation id"))
    }

    regulation.status = "INACTIVE";
    await regulation.save();

    return res.status(200).json(
        new Apiresponse(200, {}, "Regulation deleted (disabled) successfully")
    );
});

export {
    adminLogin,
    adminLogout,
    changeAdminPassword,
    createFaculty,
    getAllFaculty,
    deleteFaculty,
    createBranch,
    getAllBranches,
    deleteBranch,
    createProgram,
    getPrograms,
    deleteProgram,
    createRegulation,
    getRegulations,
    deleteRegulation
};