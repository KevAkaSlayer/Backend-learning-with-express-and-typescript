import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";


const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // Validate input
  if (!studentData) {
    throw new Error('Student data is required');
  }

  // Create a user object
  const userData: Partial<TUser> = {};
  
  // If password isn't provided, use default pass
  userData.password = password || (config.default_password as string);
  
  // Set student role
  userData.role = 'student';

  // Set manually generated id
  userData.id = '200023636';

  const newUser = await User.create(userData); // built in static method

  // Create student
  if (Object.keys(newUser).length) {
    // Create a copy of studentData to avoid modifying the original
    const studentPayload = {
      ...studentData,
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