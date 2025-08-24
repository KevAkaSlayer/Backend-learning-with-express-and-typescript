import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder"
import { facultySearchableFields } from "./faculty.constant"
import { Faculty } from "./faculty.model"
import AppError from "../../errors/AppError";
import httpStatus from "http-status"
import { User } from "../user/user.model";
import { TFaculty } from "./faculty.interface";


const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
    const facultyQuery = new QueryBuilder(Faculty.find().populate('academicDept'), query).search(facultySearchableFields).filter().sort().paginate().fields();

    const result = await facultyQuery.modelQuery;

    return result;
}


const getSingleFacultyFromDB = async (id: string) => {
    const result = await Faculty.findOne({ id }).populate('academicDept')
    return result;
}


const deleteFacultyFromDB = async (id: string) => {

    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        const deletedFaculty = await Faculty.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });

        if (!deletedFaculty) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Faculty');
        }

        const userId = deletedFaculty.user;

        const deletedUser = await User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true, session });

        if (!deletedUser) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
        }

        await session.commitTransaction();
        await session.endSession();


        return deletedFaculty;

    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
}


const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
    const { name, ...remainingFacultyData } = payload

    const modifiedUpdatedData: Record<string, unknown> = { ...remainingFacultyData };

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value

        }
    }

    const result = Faculty.findOneAndUpdate({ id }, modifiedUpdatedData, { new: true, runValidators: true });
    return result;
}

export const FacultyServices = {
    getAllFacultyFromDB,
    getSingleFacultyFromDB,
    deleteFacultyFromDB,
    updateFacultyIntoDB
}