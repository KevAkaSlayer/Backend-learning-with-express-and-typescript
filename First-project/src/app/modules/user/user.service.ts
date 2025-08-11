import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";


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
  // Set manually generated id
  userData.id = generateStudentId(admissionSemester);

  const newUser = await User.create(userData); // built in static method

  // Create student
  if (Object.keys(newUser).length) {
    // Create a copy of studentData to avoid modifying the original
    const studentPayload = {
      ...payload,
      id: newUser.id,
      user: newUser._id, // reference id
    };

    const newStudent = await Student.create(studentPayload);
    return newStudent;
  }

  throw new Error('Failed to create user');
}

export const UserService = {
    createStudentIntoDB
}