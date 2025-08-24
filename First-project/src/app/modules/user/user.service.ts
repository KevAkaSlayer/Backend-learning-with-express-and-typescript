import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateAdminId, generateFacultyId, generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from 'http-status'
import { TFaculty } from "../faculty/faculty.interface";
import { AcademicDept } from "../academicDepartment/academicDept.model";
import { Faculty } from "../faculty/faculty.model";
import { TAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";
import { string } from "joi";


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
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }

}

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);

  // Set student role
  userData.role = 'faculty';

  const academicDept = await AcademicDept.findById(payload.academicDept);

  if (!academicDept) {
    throw new AppError(400, 'Academic department not found');
  }


  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateFacultyId()

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    payload.id = newUser[0].id
    payload.user = newUser[0]._id



    const newFaculty = await Faculty.create([payload], { session })

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create a new faculty')
    }
    await session.commitTransaction()
    await session.endSession()

    return newFaculty;

  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }

}


const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  const userData: Partial<TUser> = {}
  userData.password = password || (config.default_password as string);

  userData.role = 'admin'
  const session = await mongoose.startSession();

  try {
    session.startTransaction()

    userData.id = await generateAdminId()

    const newUser = await User.create([userData], { session })

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    payload.id = newUser[0].id
    payload.user = newUser[0]._id
    const newAdmin = await Admin.create([payload], { session })

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create a new Admin')
    }
    await session.commitTransaction()
    await session.endSession()

    return newAdmin;


  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()

    throw new Error(err);
  }

}


export const UserService = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB

}