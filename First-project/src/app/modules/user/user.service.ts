import { TStudent } from "../student/student.interface";
import { USer } from "./user.model";


const createStudentIntoDB = async (studentData: TStudent) => {


//   if( await Student.isUserExist(studentData.id)){
//     throw new Error ('user already exist!');
//   }
  const result = await USer.create(studentData)  // built in static method 

  // const student = new Student(studentData); //create an instance
  // if(await student.isUserExist(studentData.id)){
  //   throw new Error("User Already exist!")
  // }


  // const result = await student.save(); //built in instance method
  return result;

}

export const UserService = {
    createStudentIntoDB
}