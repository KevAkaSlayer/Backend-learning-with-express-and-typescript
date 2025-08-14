import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from 'http-status'


const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // Validate input
  if (!payload) {
    throw new Error('Student data is required');
  }

  // Create a user object
  const userData: Partial<TUser> = {};

  // If password isn't provided, use default pass
  userData.password = password || (config.default_password as string);

  // Set student role
  userData.role = 'student';

  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)

  const session = await mongoose.startSession()


  try {
    session.startTransaction();

    userData.id = await generateStudentId(admissionSemester);

    const newUser = await User.create([userData], { session }); // built in static method

    // Create student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create a user')
    }


    // Create a copy of studentData to avoid modifying the original

    payload.id = newUser[0].id
    payload.user = newUser[0]._id // reference id

    const newStudent = await Student.create([payload], { session });
    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create a student')
    }

    await session.commitTransaction();

    await session.endSession();

    return newStudent;
  }
  catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }

}

export const UserService = {
  createStudentIntoDB
}